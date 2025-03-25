import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all interpreter bookings
export async function GET() {
  try {
    const interpreterBookings = await prisma.inter_bookings.findMany()
    return NextResponse.json(interpreterBookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching interpreter bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch interpreter bookings' }, { status: 500 })
  }
}

// POST request - Create a new interpreter booking
export async function POST(req: Request) {
  try {
    const { interpreter_id, start, end, status } = await req.json()

    const newInterpreterBooking = await prisma.inter_bookings.create({
      data: {
        interpreter_id,
        start,
        end,
        status,
      },
    })

    return NextResponse.json(newInterpreterBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating interpreter booking:', error)
    return NextResponse.json({ error: 'Failed to create interpreter booking' }, { status: 500 })
  }
}