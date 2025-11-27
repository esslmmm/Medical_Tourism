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
                title: true,
                duration: true,
                description: true,
                adult_price: true,
                child_price: true,
                car_service_price: true,
                guide_price: true,
                created_at: true
              }
            }
          }
        },
        images: {
          select: {
            url: true,
            alt: true,
          }
        },
        languages:{
          select: {
            name: true,
            flag: true,
          }
        }
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
    const { description, city, route_ids, images, languages } = body as { 
      description: string;
      city?: string; 
      route_ids?: number[]; 
      images?: Array<{ url: string; publicId?: string; alt?: string }>;
      languages?: Array<{ name: string; flag: string }>;
    };

    if (!city) {
      return NextResponse.json({ error: 'city is required' }, { status: 400 });
    }

    const routeIdsArray = Array.isArray(route_ids) ? route_ids.filter((r) => Number.isFinite(r)) : [];
    const LanguagesArray = Array.isArray(languages) ? languages.filter((l) => typeof l?.name === 'string') : [];
    const imagesArray = Array.isArray(images) ? images : [];

    const created = await prisma.trips.create({
      data: {
        description,
        city,
        Trip_Routes: routeIdsArray.length
          ? {
              create: routeIdsArray.map((rid) => ({ route_id: rid as number }))
            }
          : undefined,
        images: imagesArray.length
          ? {
              create: imagesArray.map(img => ({ url: img.url, alt: img.alt || null }))
            }
          : undefined,
        languages: LanguagesArray.length 
          ? {
              create: LanguagesArray.map(lang => ({ name: lang.name, flag: lang.flag }))
            }
          : undefined,
      },
      include: {
        Trip_Routes: {
          include: { routes: true }
        },
        images: true,
        languages: true,
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}


