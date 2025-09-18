import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const tour_id = Number(resolvedParams.id);
    const trip = await prisma.trips.findUnique({
      where: { tour_id },
      include: {
        package_places: {
          include: { places: true },
        },
      },
    });
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    return NextResponse.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json({ error: 'Failed to fetch trip' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const tour_id = Number(params.id);
    const body = await request.json();
    const { description, duration, total_price, place_ids } = body;

    const trip = await prisma.trips.findUnique({ where: { tour_id } });
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

    await prisma.trips.update({
      where: { tour_id },
      data: {
        description: description ?? null,
        duration: typeof duration === 'number' ? duration : null,
        total_price: typeof total_price === 'number' ? total_price : null,
      },
    });

    if (Array.isArray(place_ids)) {
      const incoming = new Set(
        place_ids.filter((id: any) => typeof id === 'string' && id.length > 0)
      );
      const existing = await prisma.package_places.findMany({
        where: { tour_id },
        select: { place_id: true },
      });
      const existingSet = new Set(existing.map(e => e.place_id as string));
      const toAdd = Array.from(incoming).filter(id => !existingSet.has(id));
      const toRemove = Array.from(existingSet).filter(id => !incoming.has(id));

      if (toAdd.length) {
        await prisma.package_places.createMany({
          data: toAdd.map(place_id => ({ tour_id, place_id })),
          skipDuplicates: true,
        });
      }
      if (toRemove.length) {
        await prisma.package_places.deleteMany({
          where: { tour_id, place_id: { in: toRemove } },
        });
      }
    }

    return NextResponse.json({ message: 'Trip updated' });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json({ error: 'Failed to update trip' }, { status: 500 });
  }
}


