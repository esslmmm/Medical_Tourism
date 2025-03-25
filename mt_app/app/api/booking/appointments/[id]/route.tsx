import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch a single appointment by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const appointmentId = Number(params.id)
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: appointmentId },
      include: {
        patient_details: true,
        doctors: true,

      },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointment, { status: 200 })
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 })
  }
}


// PUT request - Update an appointment by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { date, timeslot, description, doctor_id, file_name, file_path, upload_date, patient } = await req.json()

    const appointmentId = Number(params.id)
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id: appointmentId },
      data: {
        date,
        timeslot,
        description,
        doctor_id,
        file_name,
        file_path,
        upload_date,
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
    })

    return NextResponse.json(updatedAppointment, { status: 200 })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
  }
}



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const appointmentId = Number(params.id);
  
      // Fetch the patient_id related to the appointment
      const appointment = await prisma.appointments.findUnique({
        where: { appointment_id: appointmentId },
        select: { patient_id: true },
      });
  
      if (!appointment) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }
  
      // Delete the appointment first
      await prisma.appointments.delete({
        where: { appointment_id: appointmentId },
      });
  
      // If the appointment had a linked patient_id, delete the patient_details
      if (appointment.patient_id) {
        await prisma.patient_details.delete({
          where: { patient_id: appointment.patient_id },
        });
      }
  
      return NextResponse.json({ message: 'Appointment and patient details deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting appointment and patient details:', error);
      return NextResponse.json({ error: 'Failed to delete appointment and patient details' }, { status: 500 });
    }
  }
