import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all tourism bookings
export async function GET() {
  try {
    const tourismBookings = await prisma.tourism_bookings.findMany()
    return NextResponse.json(tourismBookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching tourism bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch tourism bookings' }, { status: 500 })
  }
}

// POST request - Create a new tourism booking
export async function POST(req: Request) {
  try {
    const { tour_id, car_id, status } = await req.json()

    const newTourismBooking = await prisma.tourism_bookings.create({
      data: {
        tour_id,
        car_id,
        status,
      },
    })

    return NextResponse.json(newTourismBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating tourism booking:', error)
    return NextResponse.json({ error: 'Failed to create tourism booking' }, { status: 500 })
  }
}
