import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch all places
export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const places = await prisma.places.findMany({
      include: {
        place_image: true,
      },
      orderBy: {
        place_name: 'asc',
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
    const { place_name, contact_info, location, city, description, fee, images } = body;

    // Validate required fields
    if (!place_name) {
      return NextResponse.json(
        { error: 'Place name is required' },
        { status: 400 }
      );
    }

    // Create the place
    const place = await prisma.places.create({
      data: {
        place_name,
        contact_info: contact_info || null,
        location: location || null,
        city: city || null,
        description: description || null,
        fee: fee || null,
        image: images && images.length > 0 ? images[0] : null,
      },
    });

    // Create place images if provided
    if (images && images.length > 0) {
      await prisma.place_image.createMany({
        data: images.map((image: string) => ({
          place_id: place.place_id,
          image,
        })),
      });
    }

    // Fetch the created place with images
    const createdPlace = await prisma.places.findUnique({
      where: { place_id: place.place_id },
      include: {
        place_image: true,
      },
    });

    return NextResponse.json(createdPlace, { status: 201 });
  } catch (error) {
    console.error('Error creating place:', error);
    return NextResponse.json(
      { error: 'Failed to create place' },
      { status: 500 }
    );
  }
}
