import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch a specific place by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const resolvedParams = await params;

    const trip = await prisma.trips.findUnique({
      where: { tour_id: Number(resolvedParams.id) },
      include: {
        trip_images: true,
        Trip_Routes: {
          include: {
            routes: {
              include: {
                package_places: {
                  include: {
                    places: {
                      select: {
                        place_id: true,
                        place_name: true,
                        location: true,
                        city: true,
                        description: true,
                        fee: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    });

    if (!trip) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Error fetching place:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const resolvedParams = await params;
    const tripId = Number(resolvedParams.id);
    const body = await request.json();
    const { city, route_ids, images } = body as { 
      city?: string; 
      route_ids?: number[]; 
      images?: Array<{ url: string; publicId?: string }> 
    };

    const trip = await prisma.trips.findUnique({ where: { tour_id: tripId } });
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

    // Update city if provided
    if (typeof city === 'string') {
      await prisma.trips.update({ where: { tour_id: tripId }, data: { city } });
    }

    // Sync Trip_Routes if provided
    if (Array.isArray(route_ids)) {
      const cleanIds: number[] = route_ids
        .map((r: unknown) => (typeof r === 'number' ? r : Number(r)))
        .filter((r: number) => Number.isFinite(r));

      // Fetch existing associations
      const existing = await prisma.trip_Routes.findMany({
        where: { trip_id: tripId },
        select: { route_id: true },
      });
      const existingSet = new Set(existing.map((e: { route_id: number }) => e.route_id));
      const incomingSet = new Set(cleanIds);

      const toAdd = cleanIds.filter((id) => !existingSet.has(id));
      const toRemove = Array.from(existingSet).filter((id) => !incomingSet.has(id));

      if (toAdd.length) {
        await prisma.trip_Routes.createMany({
          data: toAdd.map((rid, idx) => ({ trip_id: tripId, route_id: rid, sequence_order: idx + 1 })),
          skipDuplicates: true,
        });
      }
      if (toRemove.length) {
        await prisma.trip_Routes.deleteMany({ where: { trip_id: tripId, route_id: { in: toRemove } } });
      }
    }

    // Sync trip_images if provided
    if (Array.isArray(images)) {
      // Delete existing images
      await prisma.trip_images.deleteMany({ where: { tour_id: tripId } });
      
      // Add new images
      if (images.length > 0) {
        await prisma.trip_images.createMany({
          data: images.map(img => ({ tour_id: tripId, image: img.url })),
        });
      }
    }

    const updated = await prisma.trips.findUnique({
      where: { tour_id: tripId },
      include: {
        trip_images: true,
        Trip_Routes: { include: { routes: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json({ error: 'Failed to update trip' }, { status: 500 });
  }
}