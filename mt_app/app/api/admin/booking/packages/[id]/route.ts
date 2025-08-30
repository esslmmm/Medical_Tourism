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
        tourism_bookings: {
          include: {
            trips:{
              include:{
                package_places:{
                  include: {
                    places: true
                  }
                }
              }
            }
          }
        },
        appointments: {
          include: {
            appointment_files: {
              include: {
                files: true,
              }
            }
          }
        },
        hotel_bookings: {
          include: {
            hotels:{
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
        },
        user_contact_detail: true,
        guide_bookings: {
          include: {
            guides: true
          }
        },
        payment: true,
      },
    });

    if (!packageBooking) {
      return NextResponse.json({ error: 'Package booking not found' }, { status: 404 });
    }

    return NextResponse.json(packageBooking, { status: 200 });
  } catch (error) {
    console.error('Error fetching package booking:', error);
    return NextResponse.json({ error: 'Failed to fetch package booking' }, { status: 500 });
  }
}