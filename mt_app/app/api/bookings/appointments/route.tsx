import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointments.findMany({
      include: {
        patient_deatils: true,
        doctors: true,
        package_bookings: true,
      },
    })
    return NextResponse.json(appointments, { status: 200 })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST request - Create a new appointment along with patient details
export async function POST(req: Request) {
    try {
      const { date, timeslot, description, doctor_id, file_name, file_path, upload_date, patient } = await req.json()
  
      const newAppointment = await prisma.appointments.create({
        data: {
          date,
          timeslot,
          description,
          doctor_id,
          file_name,
          file_path,
          upload_date,
          patient_deatils: {
            create: {
              firstname: patient.firstname,
              lastname: patient.lastname,
              gender: patient.gender,
              dateofbirth: patient.dateofbirth,
              nationality: patient.nationality,
              passport_number: patient.passport_number,
            },
          },
        },
        include: {
          patient_deatils: true,
        },
      })
  
      return NextResponse.json(newAppointment, { status: 201 })
    } catch (error) {
      console.error('Error creating appointment:', error)
      return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
    }
  }
