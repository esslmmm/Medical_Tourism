import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const routes = await prisma.routes.findMany({
        include: {
            attractions: {
            include: {
                places: {
                select: {
                    place_id: true,
                    name: true,
                    location: {
                        select: {
                            text: true
                        }
                    },
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
        const { title, duration, image, description, adult_price, child_price, car_service_price, guide_price, attractions, place_ids } = body as any;

        const createPackagePlaces = Array.isArray(place_ids)
          ? place_ids.filter((id: any) => typeof id === 'string' && id.length > 0).map((pid: string, idx: number) => ({ place_id: pid }))
          : Array.isArray(attractions)
          ? attractions.map((pp: any) => ({ place_id: pp.place_id }))
          : [];

        const created = await prisma.routes.create({
            data: {
                title: title ?? null,
                image: image ?? null,
                duration: typeof duration === 'number' ? duration : 0,
                description: description ?? null,
                adult_price: typeof adult_price === 'number' ? adult_price : 0,
                child_price: typeof child_price === 'number' ? child_price : 0,
                car_service_price: typeof car_service_price === 'number' ? car_service_price : 0,
                guide_price: typeof guide_price === 'number' ? guide_price : 0,
                attractions: createPackagePlaces.length
                  ? { create: createPackagePlaces }
                  : undefined,
            },
            include: {
                attractions: {
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
  