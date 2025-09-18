import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/auth';
import { prisma } from '@/lib/prisma';

// PUT - Update individual service status
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { serviceType, serviceId, status } = body;

    if (!serviceType || !serviceId || !status) {
      return NextResponse.json(
        { error: 'Service type, service ID, and status are required' },
        { status: 400 }
      );
    }

    let updatedService;

    switch (serviceType) {
      case 'appointment':
        // Validate appointment status
        const validAppointmentStatuses = ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];
        if (!validAppointmentStatuses.includes(status)) {
          return NextResponse.json(
            { error: 'Invalid appointment status' },
            { status: 400 }
          );
        }

        updatedService = await prisma.appointments.update({
          where: { appointment_id: serviceId },
          data: { status: status as any },
          include: {
            patient_details: true
          }
        });
        break;

      case 'hotel':
        // Validate hotel booking status
        const validHotelStatuses = ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
        if (!validHotelStatuses.includes(status)) {
          return NextResponse.json(
            { error: 'Invalid hotel booking status' },
            { status: 400 }
          );
        }

        updatedService = await prisma.hotel_bookings.update({
          where: { booking_id: parseInt(serviceId) },
          data: { status: status as any },
          include: {
            hotels: {
              select: {
                name: true,
                hotel_code: true
              }
            }
          }
        });
        break;

      case 'tourism':
        // Validate tourism booking status
        const validTourismStatuses = ['In_Progress', 'Pending', 'Approved', 'Rejected'];
        if (!validTourismStatuses.includes(status)) {
          return NextResponse.json(
            { error: 'Invalid tourism booking status' },
            { status: 400 }
          );
        }

        updatedService = await prisma.tourism_bookings.update({
          where: { tourism_id: serviceId },
          data: { status: status as any },
          include: {
            trips: {
              select: {
                tour_id: true,
                description: true
              }
            }
          }
        });
        break;

      case 'guide':
        // Validate guide booking status
        const validGuideStatuses = ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
        if (!validGuideStatuses.includes(status)) {
          return NextResponse.json(
            { error: 'Invalid guide booking status' },
            { status: 400 }
          );
        }

        updatedService = await prisma.guide_bookings.update({
          where: { booking_id: parseInt(serviceId) },
          data: { status: status as any },
          include: {
            guides: {
              select: {
                name: true
              }
            }
          }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid service type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: 'Service status updated successfully',
      service: updatedService
    });
  } catch (error) {
    console.error('Error updating service status:', error);
    return NextResponse.json(
      { error: 'Failed to update service status' },
      { status: 500 }
    );
  }
}
