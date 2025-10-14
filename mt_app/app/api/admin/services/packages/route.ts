import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const packages = await prisma.packages.findMany({
        include:{
            hospitals:{
                select:{
                    name: true
                }
            }
        }
      });
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
            status,
            expired_date,
            tour_id,
            descriptions,
            images,
        } = await request.json();

        // Validate required fields
        if (!package_name || !package_name.trim()) {
            return NextResponse.json({ 
                error: "Package name is required",
                details: "Please provide a valid package name"
            }, { status: 400 });
        }

        if (!hospital_id) {
            return NextResponse.json({ 
                error: "Hospital selection is required",
                details: "Please select a hospital for this package"
            }, { status: 400 });
        }

        if (!detail || !detail.trim()) {
            return NextResponse.json({ 
                error: "Package description is required",
                details: "Please provide a detailed description of the package"
            }, { status: 400 });
        }

        if (!expired_date) {
            return NextResponse.json({ 
                error: "Expired date is required",
                details: "Please select an expiration date for the package"
            }, { status: 400 });
        }

        if (!tour_id) {
            return NextResponse.json({ 
                error: "Tour route is required",
                details: "Please select a tour route for this package"
            }, { status: 400 });
        }

        // Validate expired_date is in the future
        const expiredDate = new Date(expired_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (expiredDate <= today) {
            return NextResponse.json({ 
                error: "Invalid expiration date",
                details: "Expiration date must be in the future"
            }, { status: 400 });
        }

        // Step 1: Create the package and get its ID
        const newPackage = await prisma.packages.create({
            data: {
                package_name: package_name.trim(),
                package_type,
                hospital_id,
                image,
                status,
                detail: detail.trim(),
                duration,
                expired_date: expiredDate,
                tour_id,
            },
            select: { package_id: true }
        });

        // Step 2: Create descriptions if provided
        if (Array.isArray(descriptions) && descriptions.length > 0) {
            const validDescriptions = descriptions.filter(desc => 
                desc.title && desc.title.trim() && desc.details && desc.details.trim()
            );
            
            if (validDescriptions.length > 0) {
                await prisma.description.createMany({
                    data: validDescriptions.map((desc: { title: string; details: string }) => ({
                        package_id: newPackage.package_id,
                        title: desc.title.trim(),
                        details: desc.details.trim(),
                    })),
                });
            }
        }
          
        // Step 3: Create package images if provided
        if (Array.isArray(images) && images.length > 0) {
            const validImages = images.filter(img => img.images && img.images.trim());
            
            if (validImages.length > 0) {
                await prisma.package_image.createMany({
                    data: validImages.map((img: { images: string }) => ({
                        package_id: newPackage.package_id,
                        image: img.images.trim(),
                    })),
                });
            }
        }

        return NextResponse.json({ 
            message: "Package created successfully", 
            package_id: newPackage.package_id,
            package_name: package_name.trim(),
            details: "Package and all related data have been saved"
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating package:", error);
        
        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json({ 
                    error: "Package already exists",
                    details: "A package with this name already exists. Please choose a different name."
                }, { status: 409 });
            }
            
            if (error.message.includes('Foreign key constraint')) {
                return NextResponse.json({ 
                    error: "Invalid reference",
                    details: "The selected hospital or tour route does not exist. Please refresh and try again."
                }, { status: 400 });
            }
        }
        
        return NextResponse.json({ 
            error: "Failed to create package",
            details: "An unexpected error occurred. Please try again later."
        }, { status: 500 });
    }
}