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



/**
 * PUT: Update a Place by ID
*/
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const place_id = parseInt(params.id, 10);

        if (isNaN(place_id)) {
            return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
        }

        const body = await request.json();

        const existingPlace = await prisma.places.findUnique({
            where: { place_id },
        });

        if (!existingPlace) {
            return NextResponse.json({ error: "Place not found" }, { status: 404 });
        }

        const updatedPlace = await prisma.places.update({
            where: { place_id },
            data: {
                place_name: body.place_name,
                contact_info: body.contact_info,
                location: body.location,
                city: body.city,
                description: body.description,
                image: body.image,
                fee: body.fee,
            },
        });

        if (Array.isArray(body.place_images)) {
            for (const img of body.place_images) {
                if (img.id) {
                    await prisma.place_image.update({
                        where: { image_id: img.id },
                        data: { image: img.image },
                    });
                } else {
                    await prisma.place_image.create({
                        data: { place_id, image: img.image },
                    });
                }
            }
        }

        return NextResponse.json(
            { message: "Place and images updated successfully", updatedPlace },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating place:", error);
        return NextResponse.json({ error: "Failed to update place" }, { status: 500 });
    }
}



/**
   * DELETE: Remove a Place by ID
*/
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const place_id = parseInt(params.id, 10);

        if (isNaN(place_id)) {
            return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
        }

        const existingPlace = await prisma.places.findUnique({
            where: { place_id },
            include: {
                place_image: true, 
            }
        });

        if (!existingPlace) {
            return NextResponse.json({ error: "Place not found" }, { status: 404 });
        }

        await prisma.place_image.deleteMany({
            where: { place_id }
        });

        await prisma.places.delete({
            where: { place_id }
        });

        return NextResponse.json({ message: "Place and related images deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting place:", error);
        return NextResponse.json({ error: "Failed to delete place" }, { status: 500 });
    }
}


/**
 * PUT: TEST CASE
*/
// {
//     "place_name": "Updated Grand Hotel",
//     "contact_info": "+33 987-654-321",
//     "location": "London, UK",
//     "city": "London",
//     "image": "https://example.com/updated-main-hotel.jpg",
//     "description": "A renovated 5-star luxury hotel.",
//     "fee": 300.00,
//     "place_images": [
//         { "id": 4, "image": "https://example.com/updated-hotel-room.jpg" },
//         { "image": "https://example.com/new-hotel-lobby.jpg" }
//     ]
// }
