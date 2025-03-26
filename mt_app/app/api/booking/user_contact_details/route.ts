import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all appointments
export async function GET() {
  try {
    const user_contact_detail = await prisma.user_contact_detail.findMany()
    return NextResponse.json(user_contact_detail, { status: 200 })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST request - Create a new appointment along with patient details
export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, country, phone, } = await req.json()

    const newUser_Contact_Detail = await prisma.user_contact_detail.create({
      data: {
        firstname,
        lastname,
        email,
        country,
        phone,
      },
    })

    return NextResponse.json(newUser_Contact_Detail, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
