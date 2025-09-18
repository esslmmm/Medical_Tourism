import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

/**
 * GET: Fetch a hotel by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const hotel_id = resolvedParams.id;
    
    // Basic validation - check if ID exists and is not empty
    if (!hotel_id || hotel_id.trim() === '') {
      return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
    }
    
    // Convert to number since hotel_id is an integer in the database
    const hotelIdNumber = parseInt(hotel_id);
    if (isNaN(hotelIdNumber)) {
      return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
    }
    
    // Fetch hotel along with all related data
    const hotel = await prisma.hotels.findUnique({
      where: { hotel_id: hotelIdNumber },
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
    });
    
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }
    
    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
  }
}

/**
 * PUT: Update a hotel by ID
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hotel_id = parseInt(params.id);

    if (isNaN(hotel_id)) {
      return NextResponse.json(
        { error: "Invalid hotel ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
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
      hotel_rooms,
    } = body;

    // Update main hotel info
    const updatedHotel = await prisma.hotels.update({
      where: { hotel_id },
      data: {
        name,
        hotel_code,
        location,
        city,
        rating: rating ? parseFloat(rating) : null,
        email,
        description,
        image,
        check_in_time,
        contact_info,
      },
    });

    // Update hotel facilities
    if (hotel_facilities) {
      // Remove old facilities
      await prisma.hotel_facilities.deleteMany({
        where: { hotel_id },
      });

      // Insert new facilities
      if (hotel_facilities.length > 0) {
        await prisma.hotel_facilities.createMany({
          data: hotel_facilities.map((facility: any) => ({
            facility_name: facility.facility_name,
            description: facility.description,
            hotel_id,
          })),
        });
      }
    }

    // Update hotel images
    if (hotel_images) {
      // Remove old images
      await prisma.hotel_images.deleteMany({
        where: { hotel_id },
      });

      // Insert new images
      if (hotel_images.length > 0) {
        await prisma.hotel_images.createMany({
          data: hotel_images.map((img: string) => ({
            image: img,
            hotel_id,
          })),
        });
      }
    }

    // Update hotel rooms (more complex due to nested relations)
    if (hotel_rooms) {
      // Get existing rooms to clean up their related data
      const existingRooms = await prisma.hotel_rooms.findMany({
        where: { hotel_id },
        select: { room_id: true }
      });

      // Delete related room data first
      for (const room of existingRooms) {
        await prisma.hotel_room_facilities.deleteMany({
          where: { room_id: room.room_id }
        });
        await prisma.room_image.deleteMany({
          where: { room_id: room.room_id }
        });
      }

      // Delete all rooms
      await prisma.hotel_rooms.deleteMany({
        where: { hotel_id },
      });

      // Create new rooms with their relations
      for (const room of hotel_rooms) {
        const newRoom = await prisma.hotel_rooms.create({
          data: {
            hotel_id,
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

    // Return full updated hotel with relations
    const result = await prisma.hotels.findUnique({
      where: { hotel_id },
      include: {
        hotel_facilities: true,
        hotel_images: true,
        hotel_rooms: {
          include: {
            hotel_room_facilities: true,
            room_image: true,
          }
        },
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error updating hotel:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update hotel" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove a hotel by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const hotel_id = parseInt(params.id);

    if (isNaN(hotel_id)) {
      return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
    }

    // Get all rooms for this hotel to clean up their related data
    const rooms = await prisma.hotel_rooms.findMany({
      where: { hotel_id },
      select: { room_id: true },
    });

    const roomIds = rooms.map((room) => room.room_id);

    // Delete room-related data first
    if (roomIds.length > 0) {
      await prisma.hotel_room_facilities.deleteMany({
        where: { room_id: { in: roomIds } },
      });

      await prisma.room_image.deleteMany({
        where: { room_id: { in: roomIds } },
      });

      await prisma.room_aggregate.deleteMany({
        where: { room_id: { in: roomIds } },
      });
    }

    // Delete hotel-related data
    await prisma.hotel_images.deleteMany({
      where: { hotel_id },
    });

    await prisma.hotel_facilities.deleteMany({
      where: { hotel_id },
    });

    await prisma.review_hotel.deleteMany({
      where: { hotel_id },
    });

    await prisma.hotel_rooms.deleteMany({
      where: { hotel_id },
    });

    // Delete hotel bookings related data
    const hotelBookings = await prisma.hotel_bookings.findMany({
      where: { hotel_id },
      select: { booking_id: true }
    });

    if (hotelBookings.length > 0) {
      const bookingIds = hotelBookings.map(b => b.booking_id);
      
      // Delete package_bookings that reference these hotel_bookings
      await prisma.package_bookings.updateMany({
        where: { hotel_booking_id: { in: bookingIds } },
        data: { hotel_booking_id: null }
      });

      // Delete the hotel_bookings
      await prisma.hotel_bookings.deleteMany({
        where: { hotel_id },
      });
    }

    // Finally delete the hotel
    await prisma.hotels.delete({
      where: { hotel_id },
    });

    return NextResponse.json({ message: "Hotel and related data deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
  }
}