import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


// GET request - Fetch a single package booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
    const resolvedParams = await params;
    const packageBookingId = Number(resolvedParams.id)
      const packageBooking = await prisma.package_bookings.findUnique({
        where: { booking_id: packageBookingId },
        include: {
          user: true,
          packages: true,
          tourism_bookings: true,
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
              room_aggregate: {
                include: {
                  hotel_rooms: true
                }
              }
            }
          },
          user_contact_detail: true,
          inter_bookings: {
            include: {
              interpreters: true
            }
          },
          payment: true,
        },
      })
  
      if (!packageBooking) {
        return NextResponse.json({ error: 'Package booking not found' }, { status: 404 })
      }
  
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
        hotel_booking_id,
        contact_id,
        inter_booking_id,
        status,
      } = await req.json();
      
      const resolvedParams = await params;
      const packageBookingId = Number(resolvedParams.id)
      const updatedPackageBooking = await prisma.package_bookings.update({
        where: { booking_id: packageBookingId },
        data: {
            user_id,
            package_id,
            tourism_booking_id,
            appointment_id,
            hotel_booking_id,
            contact_id,
            inter_booking_id,
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
        const packageBookingId = Number(params.id)
      await prisma.package_bookings.delete({
        where: { booking_id: packageBookingId },
      })
  
      return NextResponse.json({ message: 'Package booking deleted successfully' }, { status: 200 })
    } catch (error) {
      console.error('Error deleting package booking:', error)
      return NextResponse.json({ error: 'Failed to delete package booking' }, { status: 500 })
    }
  }
  