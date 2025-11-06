import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/app/api/auth/auth';
// GET - Fetch all places
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const places = await prisma.places.findMany({
      include: {
        location:{
          select: {
            text: true,
          }
        },
        place_image: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}

// POST - Create a new place
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, contact_info, location, city, description, fee, image, place_images } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Place name is required' },
        { status: 400 }
      );
    }


    const place = await prisma.places.create({
      data: {
        name,
        contact_info: contact_info || null,
        city: city || null,
        description: description || null,
        fee: fee || null,
        image: image || null,
        place_image: place_images && place_images.length > 0 ? {
          create: place_images.map((url: string) => ({ url })),
        } : undefined,
        location: location ? {
          create: {
            text: location.text || '',
            url: location.url || '',
          },
        } : undefined,
      },
      include: {
        place_image: true,
      },
    });


    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    console.error('Error creating place:', error);
    return NextResponse.json(
      { error: 'Failed to create place' },
      { status: 500 }
    );
  }
}
