import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'



// GET request - Fetch a single package booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id;

    const packageBooking = await prisma.package_bookings.findUnique({
      where: { booking_id: packageBookingId },
      include: {
        user: true,
        packages: {
          include:{
            hospitals:{
              select:{
                name: true,
                contact_info: true,
                image: true,
                hospital_code: true,
              }
            }
          }
        },
        user_contact_detail: true,
        payment: true,
      },
    });

    if (!packageBooking) {
      return NextResponse.json({ error: 'Package booking not found' }, { status: 404 });
    }

    // Fetch related bookings separately
    const [appointments, hotelBookings, tourismBookings, guideBookings] = await Promise.all([
      // Fetch appointments
      packageBooking.appointment_id ? prisma.appointments.findUnique({
        where: { appointment_id: packageBooking.appointment_id },
        include: {
          appointment_files: {
            include: {
              files: true,
            }
          }
        }
      }).then(result => result ? [result] : []) : [],
      
      // Fetch hotel bookings
      packageBooking.hotel_booking_id ? prisma.hotel_bookings.findUnique({
        where: { booking_id: packageBooking.hotel_booking_id },
        include: {
          hotels: {
            select: {
              name: true,
              image: true,
              check_in_time: true,
              contact_info: true,
              hotel_code: true,
            }
          },
          room_aggregate: {
            include: {
              hotel_rooms: true
            }
          }
        }
      }).then(result => result ? [result] : []) : [],
      
      // Fetch tourism bookings
      packageBooking.tourism_booking_id ? prisma.tourism_bookings.findUnique({
        where: { tourism_id: packageBooking.tourism_booking_id },
        include: {
          trips: {
            include: {
              package_places: {
                include: {
                  places: true
                }
              }
            }
          }
        }
      }).then(result => result ? [result] : []) : [],
      
      // Fetch guide bookings
      packageBooking.guide_booking_id ? prisma.guide_bookings.findUnique({
        where: { booking_id: packageBooking.guide_booking_id },
        include: {
          guides: true
        }
      }).then(result => result ? [result] : []) : []
    ]);

    // Combine the data
    const result = {
      ...packageBooking,
      appointments,
      hotel_bookings: hotelBookings,
      tourism_bookings: tourismBookings,
      guide_bookings: guideBookings,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching package booking:', error);
    return NextResponse.json({ error: 'Failed to fetch package booking' }, { status: 500 });
  }
}

// DELETE request - Delete a package booking
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id;

    // Check if booking exists
    const existingBooking = await prisma.package_bookings.findUnique({
      where: { booking_id: packageBookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: 'Package booking not found' }, { status: 404 });
    }

    // Delete related records first (due to foreign key constraints)
    await prisma.payment.deleteMany({
      where: { booking_id: packageBookingId },
    });

    await prisma.appointmentFile.deleteMany({
      where: { 
        appointments: {
          package_bookings: {
            some: { booking_id: packageBookingId }
          }
        }
      },
    });

    await prisma.appointments.deleteMany({
      where: { 
        package_bookings: {
          some: { booking_id: packageBookingId }
        }
      },
    });

    await prisma.room_aggregate.deleteMany({
      where: { 
        hotel_bookings: {
          package_bookings: {
            some: { booking_id: packageBookingId }
          }
        }
      },
    });

    await prisma.hotel_bookings.deleteMany({
      where: { 
        package_bookings: {
          some: { booking_id: packageBookingId }
        }
      },
    });

    await prisma.tourism_bookings.deleteMany({
      where: { 
        package_bookings: {
          some: { booking_id: packageBookingId }
        }
      },
    });

    await prisma.guide_bookings.deleteMany({
      where: { 
        package_bookings: {
          some: { booking_id: packageBookingId }
        }
      },
    });

    await prisma.user_contact_detail.deleteMany({
      where: { 
        package_bookings: {
          some: { booking_id: packageBookingId }
        }
      },
    });

    // Finally delete the main booking
    await prisma.package_bookings.delete({
      where: { booking_id: packageBookingId },
    });

    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting package booking:', error);
    return NextResponse.json({ error: 'Failed to delete package booking' }, { status: 500 });
  }
}