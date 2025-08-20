import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'

// GET request - Fetch a single appointment by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const appointmentId = resolvedParams.id;
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
    const {
      date,
      timeslot,
      description,
      doctor_id,
      file_name,
      file_path,
      upload_date,
      status,
      patient,
    } = await req.json();

    const resolvedParams = await params;
    const appointmentId = resolvedParams.id;

    const updateData: any = {
      date,
      timeslot,
      description,
      doctor_id,
      file_name,
      file_path,
      upload_date,
      status,
    };

    // If patient data exists, add the update for patient_details
    if (patient) {
      updateData.patient_details = {
        update: {
          firstname: patient.firstname,
          lastname: patient.lastname,
          gender: patient.gender,
          dateofbirth: patient.dateofbirth,
          nationality: patient.nationality,
          passport_number: patient.passport_number,
        },
      };
    }

    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id: appointmentId },
      data: updateData,
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const resolvedParams = await params;
      const appointmentId = resolvedParams.id;
  
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
