import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch all package bookings
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build where clause for filtering
    const whereClause: any = {};
    
    if (status && status !== 'all') {
      whereClause.status = status.toUpperCase();
    }

    if (search) {
      whereClause.OR = [
        {
          user: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          packages: {
            package_name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    const packageBookings = await prisma.package_bookings.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            nationality: true,
            image: true
          }
        },
        packages: {
          select: {
            package_id: true,
            package_name: true,
            image: true,
            hospitals: {
              select: {
                name: true,
                hospital_code: true,
                image: true,
                contact_info: true
              }
            }
          }
        },
        appointments: {
          select: {
            appointment_id: true,
            date: true,
            timeslot: true,
            status: true
          }
        },
        tourism_bookings: {
          select: {
            tourism_id: true,
            status: true,
            routes: true,
          }
        },
        user_contact_detail: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            country: true
          }
        },
        payment: {
          select: {
            payment_id: true,
            amount: true,
            payment_status: true,
            payment_method: true,
            payment_date: true
          }
        }
      },
      orderBy: {
        create_at: 'desc'
      }
    });

    // Transform the data to match the frontend interface
    const transformedBookings = packageBookings.map(booking => ({
      id: booking.booking_id,
      userId: booking.user.id.toString(),
      userName: booking.user.name || 'Unknown User',
      userEmail: booking.user.email,
      userNationality: booking.user.nationality,
      userImage: booking.user.image,
      packageId: booking.package_id,
      packageTitle: booking.packages.package_name,
      packageImage: booking.packages.image,
      hospitalName: booking.packages.hospitals.name,
      hospitalCode: booking.packages.hospitals.hospital_code,
      hospitalImage: booking.packages.hospitals.image,
      hospitalContact: booking.packages.hospitals.contact_info,
      status: booking.status.toLowerCase() as 'in_progress' | 'pending' | 'approved' | 'completed' | 'rejected' | 'cancelled',
      bookingDate: booking.create_at.toISOString().split('T')[0],
      totalAmount: booking.payment?.[0]?.amount || 0,
      createdAt: booking.create_at.toISOString(),
      contactDetail: booking.user_contact_detail,
      payments: booking.payment || []
    }));

    return NextResponse.json(transformedBookings);
  } catch (error) {
    console.error('Error fetching package bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package bookings' },
      { status: 500 }
    );
  }
}

// PUT - Update booking status
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'Booking ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['In_Progress', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.package_bookings.update({
      where: { booking_id: bookingId },
      data: { status: status as any },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        packages: {
          select: {
            package_name: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Booking status updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { error: 'Failed to update booking status' },
      { status: 500 }
    );
  }
}
