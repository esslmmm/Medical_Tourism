import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all hotel bookings
export async function GET() {
  try {
    const hotelBookings = await prisma.hotel_bookings.findMany()
    return NextResponse.json(hotelBookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching hotel bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch hotel bookings' }, { status: 500 })
  }
}

// POST request - Create a new hotel booking with associated room_aggregate entries
export async function POST(req: Request) {
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
  
      const newHotelBooking = await prisma.hotel_bookings.create({
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
      });
  
      return NextResponse.json(newHotelBooking, { status: 201 });
    } catch (error) {
      console.error("Error creating hotel booking:", error);
      return NextResponse.json(
        { error: "Failed to create hotel booking" },
        { status: 500 }
      );
    }
  }


  