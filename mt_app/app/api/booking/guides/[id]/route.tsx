import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'

// GET request - Fetch a single guide booking by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const guideBookingId = Number(id)
    const guideBooking = await prisma.guide_bookings.findUnique({
      where: { booking_id: guideBookingId }
    })

    if (!guideBooking) {
      return NextResponse.json({ error: 'Guide booking not found' }, { status: 404 })
    }

    return NextResponse.json(guideBooking, { status: 200 })
  } catch (error) {
    console.error('Error fetching guide booking:', error)
    return NextResponse.json({ error: 'Failed to fetch guide booking' }, { status: 500 })
  }
}

// PUT request - Update an guide booking by ID
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { guide_id, start, end, status } = await req.json();
    const { id } = await params;
    const guideBookingId = Number(id);

    // Prepare the update data conditionally
    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (start) dataToUpdate.start = new Date(start);
    if (end) dataToUpdate.end = new Date(end);

    const updatedGuideBooking = await prisma.guide_bookings.update({
      where: { booking_id: guideBookingId },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedGuideBooking, { status: 200 });
  } catch (error) {
    console.error('Error updating guide booking:', error);
    return NextResponse.json({ error: 'Failed to update guide booking' }, { status: 500 });
  }
}



// DELETE request - Delete an guide booking by ID
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const guideBookingId = Number(id)
    await prisma.guide_bookings.delete({
      where: { booking_id: guideBookingId },
    })

    return NextResponse.json({ message: 'Guide booking deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting guide booking:', error)
    return NextResponse.json({ error: 'Failed to delete guide booking' }, { status: 500 })
  }
}