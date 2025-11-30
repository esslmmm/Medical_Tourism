import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  try {
    const { patient_id, fileId } = await req.json()

    const newAppointment = await prisma.appointmentFile.create({
      data: {
        patient_details: {
          connect: { patient_id: patient_id }
        },
        files: {
          connect: { id: fileId }
        }
      }
    });

    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointments file:', error)
    return NextResponse.json({ error: 'Failed to create appointments file' }, { status: 500 })
  }
}
