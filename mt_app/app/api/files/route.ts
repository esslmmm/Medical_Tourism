import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function POST(req: Request) {
  try {
    const { appointmentId, fileId } = await req.json()

    const newAppointment = await prisma.appointmentFile.create({
      data: {
        appointments: {
          connect: { appointment_id: appointmentId }
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
