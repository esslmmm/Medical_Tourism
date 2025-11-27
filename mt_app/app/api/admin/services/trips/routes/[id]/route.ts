import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const route_id = Number(resolvedParams.id);
    const route = await prisma.routes.findUnique({
      where: { route_id },
      select: {
        duration: true,
        title: true,
        image: true,
        description: true,
        created_at: true,
        adult_price: true,
        child_price: true,
        car_service_price: true,
        guide_price: true,
        attractions: {
          select: {
            place_id: true,
            attraction_id: true, 
            places: {
              select: {
                place_id: true,
                name: true,
                city: true,
                location:{
                  select: {
                    text: true
                  }
                }
              }
          } },
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
    const resolvedParams = await params;
    const route_id = Number(resolvedParams.id);
    const body = await request.json();
    const { title, image, description, duration, adult_price, child_price, car_service_price, guide_price, place_ids } = body;
    console.log('Updating route with data:', title);
    const route = await prisma.routes.findUnique({ where: { route_id } });
    if (!route) return NextResponse.json({ error: 'route not found' }, { status: 404 });

    await prisma.routes.update({
      where: { route_id },
      data: {
        title: title,
        image: image ?? null,
        description: description ?? null,
        duration: typeof duration === 'number' ? duration : 0,
        adult_price: typeof adult_price === 'number' ? adult_price : 0,
        child_price: typeof child_price === 'number' ? child_price : 0,
        car_service_price: typeof car_service_price === 'number' ? car_service_price : 0,
        guide_price: typeof guide_price === 'number' ? guide_price : 0,
      },
    });

    if (Array.isArray(place_ids)) {
      const incoming = new Set(
        place_ids.filter((id: any) => typeof id === 'string' && id.length > 0)
      );
      const existing = await prisma.attractions.findMany({
        where: { route_id },
        select: { place_id: true },
      });
      const existingSet = new Set(existing.map(e => e.place_id as string));
      const toAdd = Array.from(incoming).filter(id => !existingSet.has(id));
      const toRemove = Array.from(existingSet).filter(id => !incoming.has(id));

      if (toAdd.length) {
        await prisma.attractions.createMany({
          data: toAdd.map(place_id => ({ route_id, place_id })),
          skipDuplicates: true,
        });
      }
      if (toRemove.length) {
        await prisma.attractions.deleteMany({
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


