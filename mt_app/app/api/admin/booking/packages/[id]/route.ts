import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'



// GET request - Fetch a single package booking by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const packageBookingId = resolvedParams.id;

    const packageBooking = await prisma.package_bookings.findUnique({
      where: { booking_id: packageBookingId },
      include: {
        user: true,
        packages: true,
        tourism_bookings: true,
        appointments: {
          include: {
            appointment_files: {
              include: {
                files: true,
              }
            }
          }
        },
        hotel_bookings: {
          include: {
            room_aggregate: {
              include: {
                hotel_rooms: true
              }
            }
          }
        },
        user_contact_detail: true,
        inter_bookings: {
          include: {
            interpreters: true
          }
        },
        payment: true,
      },
    });

    if (!packageBooking) {
      return NextResponse.json({ error: 'Package booking not found' }, { status: 404 });
    }

    return NextResponse.json(packageBooking, { status: 200 });
  } catch (error) {
    console.error('Error fetching package booking:', error);
    return NextResponse.json({ error: 'Failed to fetch package booking' }, { status: 500 });
  }
}