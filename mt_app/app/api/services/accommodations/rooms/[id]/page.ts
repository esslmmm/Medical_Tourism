import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET a hotel room by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {

    const roomID = Number(params.id)
    const room = await prisma.hotel_rooms.findUnique({
      where: { room_id: roomID },
      include: {
        hotel_room_facilities: true,
        room_image: true,
      },
    });
    
    if (!room) {
      return NextResponse.json({ error: "Hotel room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel room by ID:", error);
    return NextResponse.json({ error: "Failed to fetch hotel room" }, { status: 500 });
  }
}

// // PUT update a hotel room by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const {
//         hotel_id,
//         room_type,
//         price_per_night,
//         capacity,
//         description,
//         image,
//         facilities,
//         images,
//       } = await req.json();

//       const roomId = Number(params.id)

//       if (!room_type || !price_per_night || !capacity || !description) {
//         return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//       }

//     const updatedRoom = await prisma.hotel_rooms.update({
//       where: { room_id: roomId },
//       data: {
//         hotel_id,
//         room_type,
//         price_per_night,
//         capacity,
//         description,
//         image,
//         hotel_room_facilities: {
//           create: facilities?.map((facility: { facility_name: string; description: string }) => ({
//             facility_name: facility.facility_name,
//             description: facility.description,
//           })) || [],
//         },
//         room_image: {
//           create: images?.map((img: { image: string }) => ({ image: img.image })) || [],
//         },
//       },
//       include: {
//         hotel_room_facilities: true,
//         room_image: true,
//       },
//     });
    
//     return NextResponse.json({ message: "Hotel room created successfully", updatedRoom }, { status: 201 });
//     } catch (error) {
//     console.error("Error creating hotel room:", error);
//     return NextResponse.json({ error: "Failed to create hotel room" }, { status: 500 });
//     }
//     }

// PUT update a hotel room by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
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
  
      const roomId = Number(params.id);
  
      if (!room_type || !price_per_night || !capacity || !description) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      // Update the hotel room
      const updatedRoom = await prisma.hotel_rooms.update({
        where: { room_id: roomId },
        data: {
          hotel_id,
          room_type,
          price_per_night,
          capacity,
          description,
          image,
        },
        include: {
          hotel_room_facilities: true,
          room_image: true,
        },
      });
  
      // Update room images
      if (images) {
        await prisma.room_image.deleteMany({ where: { room_id: roomId } });
        await prisma.room_image.createMany({
          data: images.map((img: { image: string }) => ({ room_id: roomId, image: img.image })),
        });
      }
  
      // Update room facilities
      if (facilities) {
        await prisma.hotel_room_facilities.deleteMany({ where: { room_id: roomId } });
        await prisma.hotel_room_facilities.createMany({
          data: facilities.map((facility: { facility_name: string; description: string }) => ({
            room_id: roomId,
            facility_name: facility.facility_name,
            description: facility.description,
          })),
        });
      }
  
      return NextResponse.json({ message: "Hotel room updated successfully", updatedRoom }, { status: 200 });
    } catch (error) {
      console.error("Error updating hotel room:", error);
      return NextResponse.json({ error: "Failed to update hotel room" }, { status: 500 });
    }
  }



// DELETE a hotel room by ID along with related room images and facilities
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const roomID = Number(params.id);
  
      // Delete related room images
      await prisma.room_image.deleteMany({
        where: { room_id: roomID },
      });
  
      // Delete related room facilities
      await prisma.hotel_room_facilities.deleteMany({
        where: { room_id: roomID },
      });
  
      // Delete the hotel room
      await prisma.hotel_rooms.delete({
        where: { room_id: roomID },
      });
  
      return NextResponse.json({ message: "Hotel room and related data deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting hotel room:", error);
      return NextResponse.json({ error: "Failed to delete hotel room" }, { status: 500 });
    }
  }
