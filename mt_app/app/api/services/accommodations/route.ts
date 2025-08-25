import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
      const hotels = await prisma.hotels.findMany();
      return NextResponse.json(hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
    }
  }


/**
* POST: Create a new Hotel
*/
export async function POST(request: Request) {
    try {
        const {
            name,
            hotel_code,
            location,
            city,
            rating,
            email,
            description,
            image,
            contact_info,
            room_ids,
            hotel_images,
            hotel_facilities
        } = await request.json();

        const newHotel = await prisma.hotels.create({
            data: {
                name,
                hotel_code,
                location,
                city,
                rating,
                email,
                description,
                image,
                contact_info,
                create_at: new Date()
            },
            select: { hotel_id: true }
        });

        if (Array.isArray(room_ids) && room_ids.length > 0) {
            await prisma.hotel_rooms.updateMany({
                where: { room_id: { in: room_ids } },
                data: {
                    hotel_id: newHotel.hotel_id,
                },
            });
        }        

        if (Array.isArray(hotel_images) && hotel_images.length > 0) {
            await prisma.hotel_images.createMany({
                data: hotel_images.map((image: string) => ({
                    hotel_id: newHotel.hotel_id,
                    image,
                })),
            });
        }

        if (Array.isArray(hotel_facilities) && hotel_facilities.length > 0) {
            await prisma.hotel_facilities.createMany({
                data: hotel_facilities.map((fac: { facility_name: string; description: string }) => ({
                    hotel_id: newHotel.hotel_id,
                    facility_name: fac.facility_name,
                    description: fac.description
                })),
            });
        }

        return NextResponse.json({ 
            message: "Hotel and related data created successfully", 
            hotel_id: newHotel.hotel_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating hotel:", error);
        return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
    }
}

// {
//     "name": "Luxury Grand Hotel",
//     "hotel_code": "LUX123",
//     "location": "Paris, France",
//     "city": "Paris",
//     "rating": 4.9,
//     "email": "info@luxurygrand.com",
//     "description": "A luxurious 5-star hotel",
//     "image": "https://example.com/hotel-image.jpg",
//     "contact_info": "+33 123-456-789",
//     "room_ids": [1], 
//     "hotel_images": [
//         "https://example.com/hotel1.jpg",
//         "https://example.com/hotel2.jpg"
//     ],
//     "hotel_facilities": [
//         { "facility_name": "Swimming Pool", "description": "Heated indoor pool" },
//         { "facility_name": "Spa", "description": "Luxury spa with massage treatments" }
//     ]
// }
