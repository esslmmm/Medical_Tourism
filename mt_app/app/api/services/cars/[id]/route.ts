import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a Car by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const car_id = parseInt(params.id, 10);

    if (isNaN(car_id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const car = await prisma.cars.findUnique({
      where: { car_id },
    });

    if (!car) {
      return NextResponse.json({ error: "car not found" }, { status: 404 });
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}


/**
 * PUT : Update Car by ID
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
      const car_id = parseInt(params.id, 10);

      if (isNaN(car_id)) {
          return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
      }

      const body = await request.json();

      // Check if the car exists
      const existingCar = await prisma.cars.findUnique({
          where: { car_id },
      });

      if (!existingCar) {
          return NextResponse.json({ error: "Car not found" }, { status: 404 });
      }

      // Update car details
      const updatedCar = await prisma.cars.update({
          where: { car_id },
          data: {
              car_name: body.car_name,
              phone: body.phone,
              email: body.email,
              address: body.address,
              city: body.city,
              image: body.image,
              description: body.description,
              fee: body.fee,
              capacity: body.capacity,
              guide_license: body.guide_license,
          },
      });

      return NextResponse.json(
          { message: "Car updated successfully", updatedCar },
          { status: 200 }
      );

  } catch (error) {
      console.error("Error updating car:", error);
      return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}



/**
 * DELETE: Delete Car by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
      const car_id = parseInt(params.id, 10);

      if (isNaN(car_id)) {
          return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
      }

      const existingCar = await prisma.cars.findUnique({
          where: { car_id },
      });

      if (!existingCar) {
          return NextResponse.json({ error: "Car not found" }, { status: 404 });
      }

      await prisma.cars.delete({
          where: { car_id }
      });

      return NextResponse.json({ message: "Car deleted successfully" }, { status: 200 });

  } catch (error) {
      console.error("Error deleting car:", error);
      return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}

//          PUT : TEST CASE
// {
//   "car_name": "Updated Luxury Tour Van",
//   "phone": 33987654321,
//   "email": "updatedluxuryvan@example.com",
//   "address": "London, UK",
//   "city": "London",
//   "image": "https://example.com/updated-van.jpg",
//   "description": "A newly upgraded luxury van for premium sightseeing.",
//   "fee": 200.00,
//   "capacity": 8,
//   "guide_license": "NEW-XYZ-789"
// }

