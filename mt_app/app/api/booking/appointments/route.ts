import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'


// GET request - Fetch all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointments.findMany()
    return NextResponse.json(appointments, { status: 200 })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST request - Create a new appointment along with patient details
export async function POST(req: Request) {
  try {
    const { date, timeslot, description, patient_id, status, patient } = await req.json()

    const newAppointment = await prisma.appointments.create({
      data: {
        date,
        timeslot,
        description,
        patient_id,
        status,
        patient_details: {
          create: {
            firstname: patient.firstname,
            lastname: patient.lastname,
            gender: patient.gender,
            dateofbirth: patient.dateofbirth,
            nationality: patient.nationality,
            passport_number: patient.passport_number,
          },
        },
      }
    });

    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
