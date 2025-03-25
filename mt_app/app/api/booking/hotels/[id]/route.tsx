import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch a single hotel booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const hotelBookingId = Number(params.id)
    const hotelBooking = await prisma.hotel_bookings.findUnique({
      where: { booking_id: hotelBookingId },
      include: {
        hotels: true,
        room_aggregate: {
            include:{
                hotel_rooms:true
            }
        }
      },
    })

    if (!hotelBooking) {
      return NextResponse.json({ error: 'Hotel booking not found' }, { status: 404 })
    }

    return NextResponse.json(hotelBooking, { status: 200 })
  } catch (error) {
    console.error('Error fetching hotel booking:', error)
    return NextResponse.json({ error: 'Failed to fetch hotel booking' }, { status: 500 })
  }
}


// PUT request - Update a hotel booking by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const {
        hotel_id,
        check_in_date,
        check_out_date,
        guest_children,
        guest_adult,
        total_price,
        status,
        room_aggregate
      } = await req.json();

      const hotelBookingId = Number(params.id)

    const updatedHotelBooking = await prisma.hotel_bookings.update({
      where: { booking_id: hotelBookingId },
      data: {
        hotel_id,
        check_in_date,
        check_out_date,
        guest_children,
        guest_adult,
        total_price,
        status,
        room_aggregate: {
            create: room_aggregate.map((room: { room_id: number, amount:number }) => ({
              room_id: room.room_id,
              amount: room.amount
            })),
          },
      },
    })

    return NextResponse.json(updatedHotelBooking, { status: 200 })
  } catch (error) {
    console.error('Error updating hotel booking:', error)
    return NextResponse.json({ error: 'Failed to update hotel booking' }, { status: 500 })
  }
}


// DELETE request - Delete a hotel booking by ID and its associated room_aggregate entries
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const hotelBookingId = Number(params.id);
  
      // Delete associated room_aggregate entries first
      await prisma.room_aggregate.deleteMany({
        where: { booking_id: hotelBookingId },
      });
  
      // Delete the hotel booking
      await prisma.hotel_bookings.delete({
        where: { booking_id: hotelBookingId },
      });
  
      return NextResponse.json({ message: 'Hotel booking and associated room aggregates deleted successfully' }, { status: 200 })
    } catch (error) {
      console.error('Error deleting hotel booking:', error)
      return NextResponse.json({ error: 'Failed to delete hotel booking' }, { status: 500 })
    }
  }
  