import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const packages = await prisma.packages.findMany();
      return NextResponse.json(packages);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
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
            images
        } = await request.json();

        // Validate required fields
        if (!package_name || !package_type) {
            return NextResponse.json({ error: "Package name and type are required" }, { status: 400 });
        }

        // Validate package_type (Ensure packages_package_type is properly defined)
        if (typeof packages_package_type !== "undefined" && !Object.values(packages_package_type).includes(package_type)) {
            return NextResponse.json({ error: "Invalid package type" }, { status: 400 });
        }

        // Ensure expired_date is correctly formatted
        const formattedExpiredDate = expired_date ? new Date(expired_date) : null;

        // Step 1: Create the package and get its ID
        const newPackage = await prisma.packages.create({
            data: {
                package_name,
                package_type,
                hospital_id,
                image,
                detail,
                duration,
                expired_date: formattedExpiredDate,
                create_at: create_at ? new Date(create_at) : new Date(),
            },
            select: { package_id: true }
        });

        // Step 2: Insert related data if IDs exist
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

        return NextResponse.json({ message: "Package and related data created successfully", package_id: newPackage.package_id }, { status: 201 });
    } catch (error) {
        console.error("Error creating package:", error);
        return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
    }
}
  