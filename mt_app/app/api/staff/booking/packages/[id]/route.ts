import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'



// GET request - Fetch a single package booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id;

    const packageBooking = await prisma.package_bookings.findUnique({
      where: { booking_id: packageBookingId },
      select: {
          price: true,
          user_id: true,
          user: true,
          packages: {
            select:{
              image: true,
              package_name: true,
              package_type: true,
              hospitals:{
                select:{
                  name: true,
                  image: true,
                  logo: true,
                }
              }
            },
          },
          tourism_bookings:{
            select: {
                child: true,
                adult: true,
                start: true,
                end: true,
                guide_bookings: true,
                routes:{
                  select:{
                    title: true,
                    adult_price: true,
                    child_price: true,
                    guide_price: true,
                    car_service_price: true,
                    description: true,
                    image: true,
                    tags: true,
                    attractions:{
                      select:{
                        places:{
                          select:{
                            name: true,
                            description: true,
                            location: true,
                            image: true,
                        }
                      }
                    }
                  }
                }
              }
            },
          },
          appointments: {
            select: {
              child: true,
              adult: true,
              date: true,
              timeslot: true,
              description: true,
              appointment_files: {
                select: {
                  files: true,
                }
              }
            }
          },
          user_contact_detail: {
            select: {
              phone: true,
              firstname: true,
              lastname: true,
              email: true,
              country: true,
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