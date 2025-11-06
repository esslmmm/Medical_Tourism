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
        languages: true,
        images: true,
        Trip_Routes: {
          select: {
            trip_route_id: true,
            routes: {
              select: {
                route_id: true,
                title: true,
                duration: true,
                description: true,
                adult_price: true,
                child_price: true,
                car_service_price: true,
                guide_price: true,
                created_at: true,
                attractions: {
                  select: {
                    places: {
                      select: {
                        place_id: true,
                        name: true,
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
    const { city, route_ids, images, languages, description } = body as { 
      city: string; 
      route_ids?: number[]; 
      images?: Array<{ url: string; publicId?: string; alt?: string }>; 
      languages?: Array<{ name: string; flag: string }>;
      description: string;
    };

    const trip = await prisma.trips.findUnique({ where: { tour_id: tripId } });
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

    // Update city if provided
      await prisma.trips.update({ where: { tour_id: tripId }, data: { city, description } });


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
          data: toAdd.map((rid) => ({ trip_id: tripId, route_id: rid})),
          skipDuplicates: true,
        });
      }
      if (toRemove.length) {
        await prisma.trip_Routes.deleteMany({ where: { trip_id: tripId, route_id: { in: toRemove } } });
      }
    }

    // Sync trips' images if provided
    if (Array.isArray(images)) {
      // Delete existing images
      await prisma.images.deleteMany({ where: { tour_id: tripId } });
      
      // Add new images
      if (images.length > 0) {
        await prisma.images.createMany({
          data: images.map(img => ({ tour_id: tripId, url: img.url, alt: img.alt })),
        });
      }
    }

    // Sync trips' languages if provided
    if (Array.isArray(languages)) {
      const cleanLanguages = languages
        .filter((l) => l && typeof l.name === "string" && l.name.trim() !== "")
        .map((l) => ({
          name: l.name.trim(),
          flag: l.flag || "",
        }));

      const existing = await prisma.languages.findMany({
        where: { trip_id: tripId },
        select: { name: true },
      });

      const existingSet = new Set(existing.map((e) => e.name));
      const incomingSet = new Set(cleanLanguages.map((l) => l.name));

      const toAdd = cleanLanguages.filter((l) => !existingSet.has(l.name));
      const toRemove = Array.from(existingSet).filter((name) => !incomingSet.has(name));

      if (toAdd.length > 0) {
        await prisma.languages.createMany({
          data: toAdd.map((l) => ({
            trip_id: tripId,
            name: l.name,
            flag: l.flag,
          })),
          skipDuplicates: true,
        });
      }

      if (toRemove.length > 0) {
        await prisma.languages.deleteMany({
          where: { trip_id: tripId, name: { in: toRemove } },
        });
      }
    }

    const updated = await prisma.trips.findUnique({
      where: { tour_id: tripId },
      include: {
        images: true,
        languages: true,
        Trip_Routes: { include: { routes: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json({ error: 'Failed to update trip' }, { status: 500 });
  }
}