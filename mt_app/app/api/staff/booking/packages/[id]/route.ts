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
        user_contact_detail: {
          select:{
            firstname: true,
            lastname: true,
            phone: true,
            country: true
          }
        },
        user: {
          select:{
            name: true
          }
        },
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
          select:{
            tourism_id: true,
            adult: true,
            child: true,
            start: true,
            end: true,
            status: true,
            routes:{
              select:{
                title: true,
                image: true,
                duration: true,
                child_price: true,
                adult_price: true,
                car_service_price: true,
                guide_price: true,
                attractions:{
                  select:{
                    attraction_id: true,
                    places:{
                      select:{
                        description: true,
                        image: true,
                        name: true,
                      }
                    }
                  }
                }
              }
            },
            guide_bookings:{
              select:{
                booking_id: true,
                language: true,
                start: true,
                end: true,
                status: true,
              }
            }
          }
        },
        appointments: {
          select: {
            date: true,
            timeslot: true,
            status: true,
            adult: true,
            child: true,
            appointment_files: {
              include: {
                files: true,
              }
            }
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