import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotelRooms = await prisma.hotel_rooms.findMany();

    return NextResponse.json(hotelRooms, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotel rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch hotel rooms' }, { status: 500 });
  }
}


// POST a new hotel room with facilities and images
export async function POST(req: Request) {
    try {
      const {
        hotel_id,
        room_type,
        price_per_night,
        capacity,
        description,
        image,
        facilities,
        images,
      } = await req.json();
  
      if (!room_type || !price_per_night || !capacity || !description) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const newRoom = await prisma.hotel_rooms.create({
        data: {
          hotel_id,
          room_type,
          price_per_night,
          capacity,
          description,
          image,
          hotel_room_facilities: {
            create: facilities?.map((facility: { facility_name: string; description: string }) => ({
              facility_name: facility.facility_name,
              description: facility.description,
            })) || [],
          },
          room_image: {
            create: images?.map((img: { image: string }) => ({ image: img.image })) || [],
          },
        },
        include: {
          hotel_room_facilities: true,
          room_image: true,
        },
      });
  
      return NextResponse.json({ message: "Hotel room created successfully", newRoom }, { status: 201 });
    } catch (error) {
      console.error("Error creating hotel room:", error);
      return NextResponse.json({ error: "Failed to create hotel room" }, { status: 500 });
    }
  }