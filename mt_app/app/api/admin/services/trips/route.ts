import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trips = await prisma.trips.findMany({
      include: {
        Trip_Routes: {
          include: {
            routes: {
              select: {
                route_id: true,
                route_name: true,
                duration: true,
                description: true,
                total_price: true,
                created_at: true
              }
            }
          }
        },
        trip_images: true
      }
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
    const { city, route_ids, images } = body as { 
      city?: string; 
      route_ids?: number[]; 
      images?: Array<{ url: string; publicId?: string }> 
    };

    if (!city) {
      return NextResponse.json({ error: 'city is required' }, { status: 400 });
    }

    const routeIdsArray = Array.isArray(route_ids) ? route_ids.filter((r) => Number.isFinite(r)) : [];
    const imagesArray = Array.isArray(images) ? images : [];

    const created = await prisma.trips.create({
      data: {
        city,
        Trip_Routes: routeIdsArray.length
          ? {
              create: routeIdsArray.map((rid, idx) => ({ route_id: rid as number, sequence_order: idx + 1 }))
            }
          : undefined,
        trip_images: imagesArray.length
          ? {
              create: imagesArray.map(img => ({ image: img.url }))
            }
          : undefined
      },
      include: {
        Trip_Routes: {
          include: { routes: true }
        },
        trip_images: true
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}


