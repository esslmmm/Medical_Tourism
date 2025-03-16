import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const {id} = context.params;

        if (!id) {
            return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
        }

        const hotelIdParsed = parseInt(id, 10);

        if (isNaN(hotelIdParsed)) {
            return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
        }

        const hotelData = await prisma.hotels.findUnique({
            where: { hotel_id: hotelIdParsed },
            include: {
                hotel_rooms: true,
                review_hotel: true,
                hotel_facilities: true,
                hotel_images: true
            },
        });

        if (!hotelData) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        return NextResponse.json(hotelData, { status: 200 });

    } catch (error) {
        console.error("Error fetching hotel:", error);
        return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
    }
}

/**
* PUT: Update a Hotel by ID
*/
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;

        if (!id) {
            return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
        }

        const hotelIdParsed = parseInt(id, 10);

        if (isNaN(hotelIdParsed)) {
            return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
        }

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

        const existingHotel = await prisma.hotels.findUnique({
            where: { hotel_id: hotelIdParsed },
        });

        if (!existingHotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        const updatedHotel = await prisma.hotels.update({
            where: { hotel_id: hotelIdParsed },
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
                create_at: new Date(),
            },
        });

        if (Array.isArray(room_ids) && room_ids.length > 0) {
            await prisma.hotel_rooms.updateMany({
                where: { room_id: { in: room_ids } },
                data: { hotel_id: hotelIdParsed },
            });
        }

        if (Array.isArray(hotel_images) && hotel_images.length > 0) {
            for (const img of hotel_images) {
                if (img.id) {
                    await prisma.hotel_images.update({
                        where: { image_id: img.id },
                        data: { image: img.image_url },
                    });
                } else {
                    await prisma.hotel_images.create({
                        data: {
                            hotel_id: hotelIdParsed,
                            image: img.image_url,
                        },
                    });
                }
            }
        }

        if (Array.isArray(hotel_facilities) && hotel_facilities.length > 0) {
            for (const fac of hotel_facilities) {
                if (fac.id) {
                    await prisma.hotel_facilities.update({
                        where: { facility_id: fac.id },
                        data: {
                            facility_name: fac.facility_name,
                            description: fac.description
                        },
                    });
                } else {
                    await prisma.hotel_facilities.create({
                        data: {
                            hotel_id: hotelIdParsed,
                            facility_name: fac.facility_name,
                            description: fac.description
                        },
                    });
                }
            }
        }

        return NextResponse.json({ 
            message: "Hotel and related data updated successfully", 
            updatedHotel 
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating hotel:", error);
        return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
    }
}


/*
 DELETE: DELETE a Hotel by ID
*/
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; 

        if (!id) {
            return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
        }

        const hotelIdParsed = parseInt(id, 10);

        if (isNaN(hotelIdParsed)) {
            return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
        }

        const existingHotel = await prisma.hotels.findUnique({
            where: { hotel_id: hotelIdParsed },
        });

        if (!existingHotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        await prisma.hotel_rooms.deleteMany({ where: { hotel_id: hotelIdParsed } });
        await prisma.hotel_images.deleteMany({ where: { hotel_id: hotelIdParsed } });
        await prisma.hotel_facilities.deleteMany({ where: { hotel_id: hotelIdParsed } });
        await prisma.review_hotel.deleteMany({ where: { hotel_id: hotelIdParsed } });

        await prisma.hotels.delete({
            where: { hotel_id: hotelIdParsed },
        });

        return NextResponse.json({ 
            message: "Hotel and all related data deleted successfully" 
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting hotel:", error);
        return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
    }
}



/*
 GET: PREVIOUS CODE
*/

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//     try {
//         if (!params.id) {
//             return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
//         }

//         const hotel_id = parseInt(params.id, 10);

//         if (isNaN(hotel_id)) {
//             return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
//         }

//         const hotelData = await prisma.hotels.findUnique({
//             where: { hotel_id },
//             include: {
//                 hotel_rooms: true,
//                 review_hotel: true,
//                 hotel_facilities: true,
//                 hotel_images: true
//             },
//         });

//         if (!hotelData) {
//             return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
//         }

//         return NextResponse.json(hotelData, { status: 200 });

//     } catch (error) {
//         console.error("Error fetching hotel:", error);
//         return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
//     }
// }




/*
  PUT : TEST CASE
*/
// {
//     "name": "Updated Luxury Grand Hotel",
//     "hotel_code": "LUX999",
//     "location": "Paris, France",
//     "city": "Paris",
//     "rating": 5.0,
//     "email": "contact@luxurygrand.com",
//     "description": "A newly renovated luxury hotel",
//     "image": "https://example.com/updated-hotel.jpg",
//     "contact_info": "+33 123-456-999",
//     "room_ids": [1], 
//     "hotel_images": [
//         { "id": 11, "image_url": "example.com/updated-hotel1.jpg" },
//         { "image_url": "example.com/new-hotel-image.jpg" }
//     ],
//     "hotel_facilities": [
//         { "id": 1, "facility_name": "Gym", "description": "State-of-the-art fitness center" },
//         { "facility_name": "VIP Lounge", "description": "Exclusive lounge access for VIP guests" }
//     ]
// }
