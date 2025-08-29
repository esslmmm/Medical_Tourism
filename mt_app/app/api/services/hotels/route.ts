import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotels = await prisma.hotels.findMany({
      include: {
        hotel_images: true,
        hotel_facilities: true,
        hotel_rooms: {
          include: {
            hotel_room_facilities: true,
            room_image: true,
          }
        },
        review_hotel: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        create_at: 'desc'
      }
    });
    
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}

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
      check_in_time,
      contact_info,
      hotel_facilities,
      hotel_images,
      hotel_rooms
    } = await request.json();

    console.log('Creating hotel with data:', {
      name,
      hotel_code,
      location,
      city,
      rating,
      email,
      description,
      image,
      check_in_time,
      contact_info,
    });

    // Create the hotel
    const newHotel = await prisma.hotels.create({
      data: {
        name,
        hotel_code,
        location,
        city,
        rating: rating ? parseFloat(rating) : null,
        email,
        description,
        image,
        check_in_time: check_in_time || "2 PM",
        contact_info,
      },
    });

    console.log('Hotel created:', newHotel);

    // Create related hotel facilities
    if (hotel_facilities && hotel_facilities.length > 0) {
      await prisma.hotel_facilities.createMany({
        data: hotel_facilities.map((facility: any) => ({
          hotel_id: newHotel.hotel_id,
          facility_name: facility.facility_name,
          description: facility.description,
        })),
      });
    }

    // Create related hotel images
    if (hotel_images && hotel_images.length > 0) {
      await prisma.hotel_images.createMany({
        data: hotel_images.map((image: string) => ({
          hotel_id: newHotel.hotel_id,
          image: image,
        })),
      });
    }

    // Create related hotel rooms
    if (hotel_rooms && hotel_rooms.length > 0) {
      for (const room of hotel_rooms) {
        const newRoom = await prisma.hotel_rooms.create({
          data: {
            hotel_id: newHotel.hotel_id,
            room_type: room.room_type,
            price_per_night: room.price_per_night ? parseFloat(room.price_per_night) : null,
            capacity: room.capacity,
            description: room.description,
            image: room.image,
          },
        });

        // Create room facilities if provided
        if (room.room_facilities && room.room_facilities.length > 0) {
          await prisma.hotel_room_facilities.createMany({
            data: room.room_facilities.map((facility: any) => ({
              room_id: newRoom.room_id,
              facility_name: facility.facility_name,
              description: facility.description,
            })),
          });
        }

        // Create room images if provided
        if (room.room_images && room.room_images.length > 0) {
          await prisma.room_image.createMany({
            data: room.room_images.map((image: string) => ({
              room_id: newRoom.room_id,
              image: image,
            })),
          });
        }
      }
    }

    // Fetch the complete hotel with all relations
    const hotelWithRelations = await prisma.hotels.findUnique({
      where: { hotel_id: newHotel.hotel_id },
      include: {
        hotel_images: true,
        hotel_facilities: true,
        hotel_rooms: {
          include: {
            hotel_room_facilities: true,
            room_image: true,
          }
        },
      },
    });

    return NextResponse.json(hotelWithRelations, { status: 201 });
  } catch (error) {
    console.error("Error creating hotel:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: "Failed to create hotel", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}