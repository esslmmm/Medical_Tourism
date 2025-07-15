import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


// GET request - Fetch a single tourism booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
    
      const resolvedParams = await params;
      const tourismBooking = await prisma.tourism_bookings.findUnique({
        where: { tourism_id: Number(resolvedParams.id) },
        include: {
          trips: {
            include: {
              package_places: {
                include: {
                  places: true
                }
              }
            }
          },
          package_bookings: true,
        },
      })
  
      if (!tourismBooking) {
        return NextResponse.json({ error: 'Tourism booking not found' }, { status: 404 })
      }
  
      return NextResponse.json(tourismBooking, { status: 200 })
    } catch (error) {
      console.error('Error fetching tourism booking:', error)
      return NextResponse.json({ error: 'Failed to fetch tourism booking' }, { status: 500 })
    }
  }

// PUT request - Update a tourism booking by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const {
        tour_id, 
        car_id, 
        status
    } = await req.json()
    const tourismBookingId = Number(params.id)
    const updatedTourismBooking = await prisma.tourism_bookings.update({
      where: { tourism_id: tourismBookingId },
      data:{
        tour_id,
        status,
      }
    })

    return NextResponse.json(updatedTourismBooking, { status: 200 })
  } catch (error) {
    console.error('Error updating tourism booking:', error)
    return NextResponse.json({ error: 'Failed to update tourism booking' }, { status: 500 })
  }
}

// DELETE request - Delete a tourism booking by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const tourismBookingId = Number(params.id)
    await prisma.tourism_bookings.delete({
      where: { tourism_id: tourismBookingId },
    })

    return NextResponse.json({ message: 'Tourism booking deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting tourism booking:', error)
    return NextResponse.json({ error: 'Failed to delete tourism booking' }, { status: 500 })
  }
}
