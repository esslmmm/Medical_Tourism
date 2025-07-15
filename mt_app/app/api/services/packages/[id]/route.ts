import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const resolvedParams = await params;
        const package_id = parseInt(resolvedParams.id, 10); // Convert ID to integer
  
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
          trips: {
            include: {
              package_places: {
                include: {
                    places: true
                }
              }
            }
          },
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
  function formatTime(timeString: string): string {
    return timeString.padStart(5, "0"); // Ensure it's in "HH:mm" format
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
      const package_id = parseInt(params.id, 10);
      if (isNaN(package_id)) {
          return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
      }

      const body = await request.json();

      // Validate that package exists
      const existingPackage = await prisma.packages.findUnique({
          where: { package_id },
      });

      if (!existingPackage) {
          return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }

      // ✅ Update Package
      const updatedPackage = await prisma.packages.update({
          where: { package_id },
          data: {
              package_name: body.package_name,
              package_type: body.package_type,
              hospital_id: body.hospital_id,
              image: body.image,
              detail: body.detail,
              duration: body.duration,
              expired_date: new Date(body.expired_date),
          },
      });

      // ✅ Update or Insert Images
      if (Array.isArray(body.images)) {
          for (const img of body.images) {
              if (img.id) {
                  await prisma.package_image.update({
                      where: { image_id: img.id },
                      data: { images: img.images, detail: img.detail, title: img.title },
                  });
              } else {
                  await prisma.package_image.create({
                      data: { package_id, images: img.images, detail: img.detail, title: img.title },
                  });
              }
          }
      }

      // ✅ Update or Insert Descriptions
      if (Array.isArray(body.descriptions)) {
          for (const desc of body.descriptions) {
              if (desc.id) {
                  await prisma.description.update({
                      where: { description_id: desc.id },
                      data: { details: desc.text, title: desc.title },
                  });
              } else {
                  await prisma.description.create({
                      data: { package_id, details: desc.text, title: desc.title },
                  });
              }
          }
      }

      // ✅ Update or Insert Trips
      if (Array.isArray(body.trips)) {
          for (const trip of body.trips) {
              if (trip.id) {
                  await prisma.trips.update({
                      where: { tour_id: trip.id },
                      data: { description: trip.description },
                  });
              } else {
                  await prisma.trips.create({
                      data: { package_id, description: trip.description },
                  });
              }
          }
      }

      // ✅ Fetch Updated Trip IDs
      const tripIds = await prisma.trips.findMany({
          where: { package_id },
          select: { tour_id: true },
      });

      console.log("Updated Trips:", tripIds);

      // ✅ Update or Insert Package Places
      if (Array.isArray(body.package_places) && tripIds.length > 0) {
        const trip_id = tripIds[0].tour_id; // Use the first trip ID
    
        for (const place of body.package_places) {
            if (place.packplace_id) {
                await prisma.package_places.update({
                    where: { packplace_id: place.packplace_id },
                    data: {
                        date: place.date,
                        start: place.start || null, // Store as string
                        end: place.end || null,
                    },
                });
            } else {
                await prisma.package_places.create({
                    data: {
                        tour_id: trip_id,
                        place_id: place.place_id,
                        date: place.date,
                        start: place.start || null, // Store as string
                        end: place.end || null,
                    },
                });
            }
        }
    }

      return NextResponse.json({
          message: "Package updated successfully",
          updatedPackage,
      }, { status: 200 });

  } catch (error) {
      console.error("Error updating package:", error);
      return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}



  /**
   * DELETE: Remove a Package by ID
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
  
          // ✅ Fetch all trips linked to this package before deletion
          const trips = await prisma.trips.findMany({
              where: { package_id },
              select: { tour_id: true },
          });
  
          const tripIds = trips.map(trip => trip.tour_id); // Extract tour IDs
  
          // ✅ Run all deletions inside a transaction to ensure data integrity
          await prisma.$transaction(async (tx) => {
              // Delete related records first (if CASCADE is not set in schema)
              await tx.package_interpreters.deleteMany({ where: { package_id } });
              await tx.package_doc.deleteMany({ where: { package_id } });
  
              // Delete package_places using retrieved trip IDs
              if (tripIds.length > 0) {
                  await tx.package_places.deleteMany({
                      where: { tour_id: { in: tripIds } },
                  });
              }
  
              await tx.trips.deleteMany({ where: { package_id } });
              await tx.package_hotels.deleteMany({ where: { package_id } });
              await tx.package_image.deleteMany({ where: { package_id } });
              await tx.description.deleteMany({ where: { package_id } });
  
              // Finally, delete the package
              await tx.packages.delete({ where: { package_id } });
          });
  
          return NextResponse.json({ 
              message: "Package and related data deleted successfully",
              deletedTrips: tripIds, 
          }, { status: 200 });
  
      } catch (error) {
          console.error("Error deleting package:", error);
          return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
      }
  }
  
  
  /**
 * PUT: TEST CASE
 */
//   {
//   "package_name": "Premium Health Package",
//   "expired_date": "2025-12-31",

//   "images": [
//    { "images": "https://example.com/image2.jpg" }
//   ],
//   "descriptions": [
//     { "id": 27, "text": "Includes full body check-up and diagnostic tests." }],
//        "trips": [
//     { "description": "Guided tour of the hospital facilities." }
//   ],

//   "package_places": [
//     {
//       "place_id": 1,
//       "date": "2025-05-16",
//       "start": "14:00",
//       "end": "16:00"
//     }
//   ]
// }
