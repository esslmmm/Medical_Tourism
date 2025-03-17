import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all trips
export async function GET() {
  try {
    const trips = await prisma.trips.findMany();
    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}

// POST a new trip
export async function POST(req: Request) {
  try {
    const  { tour_id, description, total_price, package_places, packages, tourism_bookings }  = await req.json();

    if (!tour_id || !description || !total_price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTrip = await prisma.trips.create({
      data: {
        tour_id,
        description,
        total_price,
        package_places: {
          create: package_places?.map((place: { place_id: number }) => ({
            place_id: place.place_id,
          })) || [],
        },
        packages: {
          create: packages?.map((pkg: { package_id: number }) => ({
            package_id: pkg.package_id,
          })) || [],
        },
        tourism_bookings: {
          create: tourism_bookings?.map((booking: { booking_id: number }) => ({
            booking_id: booking.booking_id,
          })) || [],
        },
      },
      include: {
        package_places: true,
        packages: true,
        tourism_bookings: true,
      },
    });

    return NextResponse.json({ message: "Trip created successfully", newTrip }, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}
