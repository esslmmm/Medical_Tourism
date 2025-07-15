import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET request - Fetch a single interpreter booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const interpreterBookingId = Number(resolvedParams.id)
    const interpreterBooking = await prisma.inter_bookings.findUnique({
      where: { booking_id: interpreterBookingId },
      include: {
        interpreters: {
            include:{
                languages:true
            }
        }
      },
    })

    if (!interpreterBooking) {
      return NextResponse.json({ error: 'Interpreter booking not found' }, { status: 404 })
    }

    return NextResponse.json(interpreterBooking, { status: 200 })
  } catch (error) {
    console.error('Error fetching interpreter booking:', error)
    return NextResponse.json({ error: 'Failed to fetch interpreter booking' }, { status: 500 })
  }
}

// PUT request - Update an interpreter booking by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { interpreter_id, start, end, status } = await req.json();
    const interpreterBookingId = Number(params.id);

    // Prepare the update data conditionally
    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (interpreter_id) dataToUpdate.interpreter_id = interpreter_id;
    if (start) dataToUpdate.start = new Date(start);
    if (end) dataToUpdate.end = new Date(end);

    const updatedInterpreterBooking = await prisma.inter_bookings.update({
      where: { booking_id: interpreterBookingId },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedInterpreterBooking, { status: 200 });
  } catch (error) {
    console.error('Error updating interpreter booking:', error);
    return NextResponse.json({ error: 'Failed to update interpreter booking' }, { status: 500 });
  }
}



// DELETE request - Delete an interpreter booking by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const interpreterBookingId = Number(params.id)
    await prisma.inter_bookings.delete({
      where: { booking_id: interpreterBookingId },
    })

    return NextResponse.json({ message: 'Interpreter booking deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting interpreter booking:', error)
    return NextResponse.json({ error: 'Failed to delete interpreter booking' }, { status: 500 })
  }
}