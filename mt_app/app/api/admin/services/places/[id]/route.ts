import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch a specific place by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const resolvedParams = await params;

    const place = await prisma.places.findUnique({
      where: { place_id: resolvedParams.id },
      include: {
        place_image: true,
      },
    });

    if (!place) {
      return NextResponse.json(
        { error: 'Place not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific place
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { place_name, contact_info, location, city, description, fee, image, place_images } = body;

    // Check if place exists
    const existingPlace = await prisma.places.findUnique({
      where: { place_id: params.id },
    });

    if (!existingPlace) {
      return NextResponse.json(
        { error: 'Place not found' },
        { status: 404 }
      );
    }

    // Update the place
    const updatedPlace = await prisma.places.update({
      where: { place_id: params.id },
      data: {
        place_name: place_name || existingPlace.place_name,
        contact_info: contact_info !== undefined ? contact_info : existingPlace.contact_info,
        location: location !== undefined ? location : existingPlace.location,
        city: city !== undefined ? city : existingPlace.city,
        description: description !== undefined ? description : existingPlace.description,
        fee: fee !== undefined ? fee : existingPlace.fee,
        image: image !== undefined ? image : existingPlace.image,
      },
    });

    // Update place_images if provided
    if (place_images !== undefined) {
      // Delete existing place_images
      await prisma.place_image.deleteMany({
        where: { place_id: params.id },
      });

      // Create new place_images
      if (place_images.length > 0) {
        await prisma.place_image.createMany({
          data: place_images.map((img: string) => ({
            place_id: params.id,
            image: img,
          })),
        });
      }
    }

    // Fetch the updated place with place_images
    const finalPlace = await prisma.places.findUnique({
      where: { place_id: params.id },
      include: {
        place_image: true,
      },
    });

    return NextResponse.json(finalPlace);
  } catch (error) {
    console.error('Error updating place:', error);
    return NextResponse.json(
      { error: 'Failed to update place' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific place
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if place exists
    const existingPlace = await prisma.places.findUnique({
      where: { place_id: params.id },
    });

    if (!existingPlace) {
      return NextResponse.json(
        { error: 'Place not found' },
        { status: 404 }
      );
    }

    // Delete place images first (due to foreign key constraint)
    await prisma.place_image.deleteMany({
      where: { place_id: params.id },
    });

    // Delete the place
    await prisma.places.delete({
      where: { place_id: params.id },
    });

    return NextResponse.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
    return NextResponse.json(
      { error: 'Failed to delete place' },
      { status: 500 }
    );
  }
}
