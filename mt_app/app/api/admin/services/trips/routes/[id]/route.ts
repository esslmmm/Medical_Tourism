import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const route_id = Number(resolvedParams.id);
    const route = await prisma.routes.findUnique({
      where: { route_id },
      include: {
        package_places: {
          include: { places: true },
        },
      },
    });
    if (!route) return NextResponse.json({ error: 'route not found' }, { status: 404 });
    return NextResponse.json(route);
  } catch (error) {
    console.error('Error fetching route:', error);
    return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
  }
}



export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const route_id = Number(params.id);
    const body = await request.json();
    const { route_name, description, duration, total_price, place_ids } = body;

    const route = await prisma.routes.findUnique({ where: { route_id } });
    if (!route) return NextResponse.json({ error: 'route not found' }, { status: 404 });

    await prisma.routes.update({
      where: { route_id },
      data: {
        route_name: route_name ?? null,
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
        where: { route_id },
        select: { place_id: true },
      });
      const existingSet = new Set(existing.map(e => e.place_id as string));
      const toAdd = Array.from(incoming).filter(id => !existingSet.has(id));
      const toRemove = Array.from(existingSet).filter(id => !incoming.has(id));

      if (toAdd.length) {
        await prisma.package_places.createMany({
          data: toAdd.map(place_id => ({ route_id, place_id })),
          skipDuplicates: true,
        });
      }
      if (toRemove.length) {
        await prisma.package_places.deleteMany({
          where: { route_id, place_id: { in: toRemove } },
        });
      }
    }

    return NextResponse.json({ message: 'route updated' });
  } catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}


