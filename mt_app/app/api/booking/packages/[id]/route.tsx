import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { auth } from '../../../auth/auth';



// GET request - Fetch a single package booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id;
    const packageBooking = await prisma.package_bookings.findUnique({
      where: { booking_id: packageBookingId },
      select: {
        price: true,
        user_id: true,
        packages: {
           select: {
             package_id: true,
             image: true,
             package_name: true,
             package_type: true,
             description: {
               select: {
                 description_id: true,
                 text: true,
               }
             },
             hospitals: {
               select: {
                 name: true,
                 image: true,
               }
             }
           }
         },
        tourism_bookings: {
          select: {
            child: true,
            adult: true,
            start: true,
            end: true,
            guide_bookings: true,
            routes: {
              select: {
                route_id: true,
                title: true,
                adult_price: true,
                child_price: true,
                guide_price: true,
                car_service_price: true,
                description: true,
                duration: true,
                image: true,
                tags: {
                  select: {
                    tag_id: true,
                    tag: true,
                  }
                },
                attractions: {
                  select: {
                    places: {
                      select: {
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
        user_contact_detail: {
          select: {
            phone: true,
            firstname: true,
            lastname: true,
            email: true,
            country: true,
          }
        },
        payment: 
        {
          select: {
            amount: true,
            payment_method: true,
            payment_status: true,
          }
        },
      },
    })

    if (!packageBooking) {
      return NextResponse.json({ error: 'Package booking not found' }, { status: 404 })
    }

    if (packageBooking.user_id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { user_id, ...safeData } = packageBooking;

    return NextResponse.json(packageBooking, { status: 200 })
  } catch (error) {
    console.error('Error fetching package booking:', error)
    return NextResponse.json({ error: 'Failed to fetch package booking' }, { status: 500 })
  }
}

// PUT request - Update a package booking by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const {
      user_id,
      package_id,
      tourism_booking_id,
      appointment_id,
      contact_id,
      status,
    } = await req.json();

    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id
    const updatedPackageBooking = await prisma.package_bookings.update({
      where: { booking_id: packageBookingId },
      data: {
        user_id,
        package_id,
        tourism_booking_id,
        appointment_id,
        contact_id,
        status,
      },
    })

    return NextResponse.json(updatedPackageBooking, { status: 200 })
  } catch (error) {
    console.error('Error updating package booking:', error)
    return NextResponse.json({ error: 'Failed to update package booking' }, { status: 500 })
  }
}

// DELETE request - Delete a package booking by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const packageBookingId = params.id;
    await prisma.package_bookings.delete({
      where: { booking_id: packageBookingId },
    })

    return NextResponse.json({ message: 'Package booking deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting package booking:', error)
    return NextResponse.json({ error: 'Failed to delete package booking' }, { status: 500 })
  }
}
