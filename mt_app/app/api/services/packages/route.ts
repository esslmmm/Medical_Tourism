import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const packages = await prisma.packages.findMany();
      return NextResponse.json(packages);
    } catch (error) {
      console.error("Error fetching Packages:", error);
      return NextResponse.json({ error: "Failed to fetch Packages" }, { status: 500 });
    }
  }

  /**
 * POST: Create a new package
 */
  export async function POST(request: Request) {
    try {
        const {
            package_name,
            package_type,
            hospital_id,
            image,
            detail,
            duration,
            expired_date,
            create_at,
            interpreter_ids,
            doctor_ids,
            hotel_ids,
            descriptions,
            images,
            trips,
            package_places // New field for package_place entries
        } = await request.json();

        // Validate required fields
        if (!package_name || !package_type) {
            return NextResponse.json({ error: "Package name and type are required" }, { status: 400 });
        }

        // Step 1: Create the package and get its ID
        const newPackage = await prisma.packages.create({
            data: {
                package_name,
                package_type,
                hospital_id,
                image,
                detail,
                duration,
                expired_date: new Date(expired_date),
                create_at: create_at ? new Date(create_at) : new Date(),
            },
            select: { package_id: true }
        });

        console.log("Trips Data Received:", trips); // ✅ Log incoming trips data

        if (Array.isArray(trips) && trips.length > 0) {
            console.log("Trips Array is Valid. Proceeding with insertion...");
        
            // Step 1: Create multiple trips
            await prisma.trips.createMany({
                data: trips.map(({ description }) => ({
                    package_id: newPackage.package_id, // Ensure valid package_id
                    description: description // Use correct field
                })),
                skipDuplicates: true // Avoid duplicate inserts
            });
        
            // Step 2: Fetch newly created trip IDs
            const tripIds = await prisma.trips.findMany({
                where: { package_id: newPackage.package_id },
                select: { tour_id: true }
            });
        
            console.log("Created Trips:", tripIds);
        
            // Step 3: Insert into `package_places` using the first trip ID
            if (Array.isArray(package_places) && package_places.length > 0 && tripIds.length > 0) {
                const trip_id = tripIds[0].tour_id; // Use the first trip ID
            
                await prisma.package_places.createMany({
                    data: package_places.map((place) => ({
                        tour_id: trip_id,
                        place_id: place.place_id,
                        date: new Date(place.date), // Store date correctly
                        start: new Date(place.start), // ✅ Convert TIME to full DateTime
                        end: new Date(place.end), // ✅ Convert TIME to full DateTime
                    })),
                });
            
                console.log(`Inserted Package Places for Trip ID: ${trip_id}`);
            }
            
        }

        if (Array.isArray(interpreter_ids) && interpreter_ids.length > 0) {
            await prisma.package_interpreters.createMany({
                data: interpreter_ids.map((interpreter_id: number) => ({
                    package_id: newPackage.package_id,
                    interpreter_id,
                })),
            });
        }

        if (Array.isArray(doctor_ids) && doctor_ids.length > 0) {
            await prisma.package_doc.createMany({
                data: doctor_ids.map((doctor_id: number) => ({
                    package_id: newPackage.package_id,
                    doctor_id,
                })),
            });
        }

        if (Array.isArray(hotel_ids) && hotel_ids.length > 0) {
            await prisma.package_hotels.createMany({
                data: hotel_ids.map((hotel_id: number) => ({
                    package_id: newPackage.package_id, 
                    hotel_id,
                })),
            });
        }

        if (Array.isArray(images) && images.length > 0) {
            await prisma.package_image.createMany({
                data: images.map((images: string) => ({
                    package_id: newPackage.package_id, 
                    images,
                })),
            });
        }

        if (Array.isArray(descriptions) && descriptions.length > 0) {
            await prisma.description.createMany({
                data: descriptions.map((details: string) => ({
                    package_id: newPackage.package_id,
                    details,
                })),
            });
        }

        return NextResponse.json({ 
            message: "Package and related data created successfully", 
            package_id: newPackage.package_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating package:", error);
        return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
    }
}



// {
//     "package_name": "Luxury Medical Package",
//     "package_type": "Medical_Tourism",
//     "hospital_id": 1,
//     "image": "/img/Packages/medical4.png",
//     "detail": "A premium medical package with top-tier services.",
//     "duration": 7,
//     "expired_date": "2025-12-31",
//     "interpreter_ids": [1],
//     "doctor_ids": [3],
//     "hotel_ids": [1],
//     "descriptions": [
//       "Includes 24/7 medical consultation.",
//       "Luxury accommodation in a 5-star hotel.",
//       "Personal interpreter and medical concierge."
//     ],
//     "images": [
//       "https://example.com/image1.jpg",
//       "https://example.com/image2.jpg"
//     ],
//     "trips": [
//       {"description": "hi"}
//     ],
//     "package_places": [
//       {
//     "place_id": 1,
//     "date": "2025-04-02",
//     "start": "2025-04-02T14:30:00Z",
//     "end": "2025-04-02T16:45:00Z"
//   }
//   ,
//       {
//     "place_id": 1,
//     "date": "2025-04-02",
//     "start": "2025-04-02T14:30:00Z",
//     "end": "2025-04-02T16:45:00Z"
//   }
  
//     ]
//   }
  