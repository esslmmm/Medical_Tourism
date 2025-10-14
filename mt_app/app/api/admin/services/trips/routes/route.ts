import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const routes = await prisma.routes.findMany({
        include: {
            package_places: {
            include: {
                places: {
                select: {
                    place_id: true,
                    place_name: true,
                    location: true,
                    city: true
                }
                }
            }
            }
        }
        });
        return NextResponse.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
    }
}
  

  
  export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { route_name, duration, description, total_price, package_places, place_ids } = body as any;

        const createPackagePlaces = Array.isArray(place_ids)
          ? place_ids.filter((id: any) => typeof id === 'string' && id.length > 0).map((pid: string, idx: number) => ({ place_id: pid }))
          : Array.isArray(package_places)
          ? package_places.map((pp: any) => ({ place_id: pp.place_id }))
          : [];

        const created = await prisma.routes.create({
            data: {
                route_name: route_name ?? null,
                duration: typeof duration === 'number' ? duration : null,
                description: description ?? null,
                total_price: typeof total_price === 'number' ? total_price : null,
                package_places: createPackagePlaces.length
                  ? { create: createPackagePlaces }
                  : undefined,
            },
            include: {
                package_places: {
                    include: {
                        places: true,
                    },
                },
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error("Error creating routes:", error);
        return NextResponse.json({ error: "Failed to create routes" }, { status: 500 });
    }
}
  