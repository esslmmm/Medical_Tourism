import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const cars = await prisma.cars.findMany();
      return NextResponse.json(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }
  }


  /**
     * POST: Add a new Place
  */
  export async function POST(request: Request) {
    try {
        const {
            car_name,
            phone,
            email,
            address,
            city,
            image,
            description,
            fee,
            capacity,
            guide_license
        } = await request.json();

        const newCar = await prisma.cars.create({
            data: {
                car_name,
                phone,
                email,
                address,
                city,
                image,
                description,
                fee,
                capacity,
                guide_license
            },
            select: { car_id: true }
        });

        return NextResponse.json({ 
            message: "Car created successfully", 
            car_id: newCar.car_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}

//              TEST CASE
// {
//     "car_name": "Luxury Tour Van",
//     "phone": 33123456789,
//     "email": "luxuryvan@example.com",
//     "address": "Paris, France",
//     "city": "Paris",
//     "image": "https://example.com/van.jpg",
//     "description": "A spacious and comfortable van for sightseeing tours.",
//     "fee": 150.00,
//     "capacity": 7,
//     "guide_license": "ABC123XYZ"
// }
