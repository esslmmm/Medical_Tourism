import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const places = await prisma.places.findMany();
      return NextResponse.json(places);
    } catch (error) {
      console.error("Error fetching places:", error);
      return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
    }
  }


  /**
   * POST: Add a new Place
   */
  export async function POST(request: Request) {
    try {
        const {
            place_name,
            contact_info,
            location,
            city,
            image,
            description,
            fee,
            place_images
        } = await request.json();

        const newPlace = await prisma.places.create({
            data: {
                place_name,
                contact_info,
                location,
                city,
                description,
                image,
                fee
            },
            select: { place_id: true }
        });

        if (Array.isArray(place_images) && place_images.length > 0) {
            await prisma.place_image.createMany({
                data: place_images.map((img: { image: string }) => ({
                    place_id: newPlace.place_id,
                    image: img.image,
                })),
            });
        }

        return NextResponse.json({ 
            message: "Place and related data created successfully", 
            place_id: newPlace.place_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating place:", error);
        return NextResponse.json({ error: "Failed to create place" }, { status: 500 });
    }
}

// {
//     "place_name": "Luxury Grand Hotel",
//     "contact_info": "+33 123-456-789",
//     "location": "Paris, France",
//     "city": "Paris",
//     "image": "https://example.com/main-hotel.jpg",
//     "description": "A 5-star luxury hotel with premium services.",
//     "fee": 250.00,
//     "place_images": [
//         { "image": "https://example.com/hotel-room.jpg" },
//         { "image": "https://example.com/hotel-lobby.jpg" }
//     ]
// }
