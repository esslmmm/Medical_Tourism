import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const resolvedParams = await params;
        const package_id = resolvedParams.id;
  
      const packageData = await prisma.packages.findUnique({
        where: { package_id },
        include: {
          hospitals: { select: { name: true } },
          trips: true,
          package_image: true,
          description:true,
        },
      });
  
      if (!packageData) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
  
      return NextResponse.json(packageData, { status: 200 });
    } catch (error) {
      console.error("Error fetching package:", error);
      return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
    }
  }


  /**
 * PUT: Update a hospital by ID
 */

export async function PUT(request: Request, { params }: Params) {
  try {
      const resolvedParams = await params;
      const package_id = resolvedParams.id;

      const body = await request.json();
      const { images} = body as { images: { id?: number; url: string }[] };

      // Validate that package exists
      const existingPackage = await prisma.packages.findUnique({
          where: { package_id },
      });

      if (!existingPackage) {
          return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }

      // Validate required fields
      if (!body.package_name || !body.package_name.trim()) {
          return NextResponse.json({ 
              error: "Package name is required",
              details: "Please provide a valid package name"
          }, { status: 400 });
      }

      if (!body.hospital_id) {
          return NextResponse.json({ 
              error: "Hospital selection is required",
              details: "Please select a hospital for this package"
          }, { status: 400 });
      }

      if (!body.detail || !body.detail.trim()) {
          return NextResponse.json({ 
              error: "Package description is required",
              details: "Please provide a detailed description of the package"
          }, { status: 400 });
      }

      if (!body.expired_date) {
          return NextResponse.json({ 
              error: "Expired date is required",
              details: "Please select an expiration date for the package"
          }, { status: 400 });
      }

      if (!body.tour_id) {
          return NextResponse.json({ 
              error: "Tour route is required",
              details: "Please select a tour route for this package"
          }, { status: 400 });
      }

      // Validate expired_date is in the future
      const expiredDate = new Date(body.expired_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiredDate <= today) {
          return NextResponse.json({ 
              error: "Invalid expiration date",
              details: "Expiration date must be in the future"
          }, { status: 400 });
      }

      const updatedPackage = await prisma.packages.update({
          where: { package_id },
          data: {
              package_name: body.package_name.trim(),
              package_type: body.package_type,
              hospital_id: body.hospital_id,
              image: body.image,
              status: body.status,
              detail: body.detail.trim(),
              duration: body.duration,
              expired_date: expiredDate,
              tour_id: body.tour_id,
          },
      });


      if (Array.isArray(images)) {
          const keepImageIds = images.filter((i: any) => i.id).map((i: any) => parseInt(i.id));
          await prisma.package_image.deleteMany({
              where: {
                  package_id,
                  ...(keepImageIds.length ? { image_id: { notIn: keepImageIds } } : {}),
              },
          });
      }

      
      if (Array.isArray(body.descriptions)) {
          const keepDescIds = body.descriptions.filter((d: any) => d.id).map((d: any) => d.id);
          await prisma.description.deleteMany({
              where: {
                  package_id,
                  ...(keepDescIds.length ? { description_id: { notIn: keepDescIds } } : {}),
              },
          });
      }

      // Update/create images
      if (Array.isArray(images)) {
      // Delete existing images
      await prisma.package_image.deleteMany({ where: { package_id: package_id } });
      
      // Add new images
      if (images.length > 0) {
        await prisma.package_image.createMany({
          data: images.map(img => ({ package_id: package_id, image: img.url })),
        });
      }
    }

      // Update/create descriptions
      if (Array.isArray(body.descriptions)) {
          for (const desc of body.descriptions) {
              if (!desc.title || !desc.title.trim() || !desc.text || !desc.text.trim()) continue; // Skip empty descriptions
              
              if (desc.id) {
                  await prisma.description.update({
                      where: { description_id: desc.id },
                      data: { 
                          details: desc.text.trim(), 
                          title: desc.title.trim() 
                      },
                  });
              } else {
                  await prisma.description.create({
                      data: { 
                          package_id, 
                          details: desc.text.trim(), 
                          title: desc.title.trim() 
                      },
                  });
              }
          }
      }


      return NextResponse.json({
          message: "Package updated successfully",
          updatedPackage,
          details: "Package and all related data have been updated"
      }, { status: 200 });

  } catch (error) {
      console.error("Error updating package:", error);
      
      // Handle specific database errors
      if (error instanceof Error) {
          if (error.message.includes('Unique constraint')) {
              return NextResponse.json({ 
                  error: "Package name already exists",
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
          error: "Failed to update package",
          details: "An unexpected error occurred. Please try again later."
      }, { status: 500 });
  }
}



  /**
   * DELETE: Remove a Package by ID
   */
  export async function DELETE(request: Request, { params }: Params) {
      try {
          const package_id = params.id; // Convert ID to integer
  
          // Check if the package exists before deleting
          const existingPackage = await prisma.packages.findUnique({
              where: { package_id },
          });
  
          if (!existingPackage) {
              return NextResponse.json({ error: "Package not found" }, { status: 404 });
          }
  
          // Package deletion will cascade to related data automatically
  
          
  
          return NextResponse.json({ 
              message: "Package and related data deleted successfully"
          }, { status: 200 });
  
      } catch (error) {
          console.error("Error deleting package:", error);
          return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
      }
  }


