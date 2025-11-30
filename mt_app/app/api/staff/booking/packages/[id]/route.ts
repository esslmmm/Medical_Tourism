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
            child: true,
            adult: true,
            date: true,
            timeslot: true,
            status: true,
            patient_details: {
               select: {
                 patient_id: true,
                 firstname: true,
                 lastname: true,
                 gender: true,
                 dateofbirth: true,
                 nationality: true,
                 passport_number: true,
                 symptoms: true,
                 appointment_files: {
                   select: {
                     id: true,
                     fileId: true,
                     createdAt: true,
                     files: {
                       select: {
                         id: true,
                         userId: true,
                         originalName: true,
                         fileName: true,
                         fileType: true,
                         fileSize: true,
                         cloudinaryId: true,
                         url: true,
                         uploadedAt: true,
                         category: true,
                         description: true,
                       }
                     },
                   }
                 },
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