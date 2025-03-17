import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all package bookings
export async function GET() {
  try {
    const packageBookings = await prisma.package_bookings.findMany()
    return NextResponse.json(packageBookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching package bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch package bookings' }, { status: 500 })
  }
}

// POST request - Create a new package booking
export async function POST(req: Request) {
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
    } = await req.json()

    const newPackageBooking = await prisma.package_bookings.create({
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

    return NextResponse.json(newPackageBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating package booking:', error)
    return NextResponse.json({ error: 'Failed to create package booking' }, { status: 500 })
  }
}


// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET() {
//   try {
//     const package_bookings = await prisma.package_bookings.findMany()
//     return Response.json(package_bookings)
//   } catch (error) {
//     return new Response(error as BodyInit, {
//       status: 500,
//     })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { package_id } = await req.json()
//     const package_bookings = await prisma.package_bookings.create({
//       data: {
//         package_id
//       },
//     })
//     return Response.json(package_bookings)
//   } catch (error) {
//     return new Response(error as BodyInit, {
//       status: 500,
//     })
//   }
// }