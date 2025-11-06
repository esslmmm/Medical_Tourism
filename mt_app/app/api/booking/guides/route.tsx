import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'

// GET request - Fetch all guide bookings
export async function GET() {
  try {
    const guideBookings = await prisma.guide_bookings.findMany()
    return NextResponse.json(guideBookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching guide bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch guide bookings' }, { status: 500 })
  }
}

// POST request - Create a new guide booking
export async function POST(req: Request) {
  try {
    const { language, start, end, status } = await req.json()
    const newGuideBooking = await prisma.guide_bookings.create({
      data: {
        language,
        start,
        end,
        status,
      },
    })

    return NextResponse.json(newGuideBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating guide booking:', error)
    return NextResponse.json({ error: 'Failed to create guide booking' }, { status: 500 })
  }
}