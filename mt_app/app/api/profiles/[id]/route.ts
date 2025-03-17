import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a Place by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const place_id = parseInt(params.id, 10);

    if (isNaN(place_id)) {
      return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
    }

    const place = await prisma.places.findUnique({
      where: { place_id },
      include: {
        place_image: true,
      },
    });

    if (!place) {
      return NextResponse.json({ error: "place not found" }, { status: 404 });
    }

    return NextResponse.json(place, { status: 200 });
  } catch (error) {
    console.error("Error fetching place:", error);
    return NextResponse.json({ error: "Failed to fetch place" }, { status: 500 });
  }
}