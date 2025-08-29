import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trips = await prisma.trips.findMany({
      select: { tour_id: true, description: true, duration: true }
    });
    return NextResponse.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, duration, total_price, place_ids } = body;

    const created = await prisma.trips.create({
      data: {
        description: description || null,
        duration: typeof duration === 'number' ? duration : null,
        total_price: typeof total_price === 'number' ? total_price : null,
      },
    });

    if (Array.isArray(place_ids) && place_ids.length > 0) {
      const validPlaces = place_ids.filter((id: any) => typeof id === 'string' && id.length > 0);
      if (validPlaces.length > 0) {
        await prisma.package_places.createMany({
          data: validPlaces.map((place_id: string) => ({ tour_id: created.tour_id, place_id })),
          skipDuplicates: true,
        });
      }
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}


