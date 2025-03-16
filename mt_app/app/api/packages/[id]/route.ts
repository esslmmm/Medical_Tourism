import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const package_id = parseInt(params.id, 10); // Convert ID to integer
  
      if (isNaN(package_id)) {
        return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
      }
  
      // Fetch package along with associated data
      const packageData = await prisma.packages.findUnique({
        where: { package_id },
        include: {
          package_interpreters: true,
          package_doc: true,
          package_hotels: true,
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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const package_id = parseInt(params.id, 10);
  
      if (isNaN(package_id)) {
        return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
      }
  
      const body = await request.json(); // Parse the request body
  
      // Check if the package exists
      const existingPackage = await prisma.packages.findUnique({
        where: { package_id },
      });
  
      if (!existingPackage) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
  
      // ✅ Update the main package record
      const updatedPackage = await prisma.packages.update({
        where: { package_id },
        data: {
          package_name: body.package_name,
          package_type: body.package_type,
          hospital_id: body.hospital_id,
          image: body.image,
          detail: body.detail,
          duration: body.duration,
          expired_date: body.expired_date ? new Date(body.expired_date) : null,
        },
      });
  

      if (Array.isArray(body.images)) {
        for (const img of body.images) {
          if (img.id) {
            await prisma.package_image.update({
              where: { image_id: img.id },
              data: { images: img.image_url },
            });
          } else {
            await prisma.package_image.create({
              data: {
                package_id,
                images: img.image_url,
              },
            });
          }
        }
      }
  
      if (Array.isArray(body.descriptions)) {
        for (const desc of body.descriptions) {
          if (desc.id) {
            await prisma.description.update({
              where: { description_id: desc.id },
              data: { details: desc.text },
            });
          } else {
            await prisma.description.create({
              data: {
                package_id,
                details: desc.text,
              },
            });
          }
        }
      }
  
      return NextResponse.json(
        { message: "Package, images, and descriptions updated successfully", updatedPackage },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating package:", error);
      return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
    }
  }


  /**
   * DELETE: Remove a hospital by ID
   */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      const package_id = parseInt(params.id, 10); // Convert ID to integer
  
      if (isNaN(package_id)) {
        return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
      }
  
      // Check if the package exists before deleting
      const existingPackage = await prisma.packages.findUnique({
        where: { package_id },
      });
  
      if (!existingPackage) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
  
      // Delete related records first (if CASCADE is not set in schema)
      await prisma.package_interpreters.deleteMany({
        where: { package_id },
      });
  
      await prisma.package_doc.deleteMany({
        where: { package_id },
      });
  
      await prisma.package_hotels.deleteMany({
        where: { package_id },
      });
  
      await prisma.package_image.deleteMany({
        where: { package_id },
      });
  
      await prisma.description.deleteMany({
        where: { package_id },
      });
  
      // Finally, delete the package
      await prisma.packages.delete({
        where: { package_id },
      });
  
      return NextResponse.json({ message: "Package and related data deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting package:", error);
      return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
    }
  }
  
  /**
 * PUT: TEST CASE
 */
//   {
//     "package_name": "Updated Medical Package",
//     "package_type": "Premium",
//     "hospital_id": 3,
//     "image": "https://example.com/updated-main.jpg",
//     "detail": "Updated package details",
//     "duration": "10 days",
//     "expired_date": "2025-12-31",
//     "create_at": "2025-03-10",
//     "images": [
//       { "id": 1, "image_url": "https://example.com/updated-image1.jpg" },  // Updates existing image
//       { "image_url": "https://example.com/new-image.jpg" }                 // Creates new image
//     ],
//     "descriptions": [
//       { "id": 5, "text": "Updated description text" },  // Updates existing description
//       { "text": "Newly added description" }            // Creates new description
//     ]
//   }