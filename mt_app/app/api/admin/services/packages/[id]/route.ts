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
            package_hotels: {
                include: { hotels: { select: { name: true, hotel_id: true } } }
              },
              package_guides: {
                include: { guides: { select: { name: true, guide_id: true } } }
              },
          package_doc: {
            include: {
              doctors: { select: { name: true, specialization: true, doctor_id: true } }
            }
          },
          routes: true,
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

// export async function GET(_req: Request, { params }: Params) {
//   try {
//     const resolvedParams = await params;
//     const { id } = resolvedParams;
//     const pkg = await prisma.packages.findUnique({
//       where: { package_id: id },
//       include: {
//         hospitals: { select: { name: true } },
//         description: true,
//         package_image: true,
//         package_doc: {
//           include: {
//             doctors: { select: { name: true, specialization: true, doctor_id: true } }
//           }
//         },
//         package_hotels: {
//           include: { hotels: { select: { name: true, hotel_id: true } } }
//         },
//         package_guides: {
//           include: { guides: { select: { name: true, guide_id: true } } }
//         },
//         routes: true,
//       }
//     });

//     if (!pkg) {
//       return NextResponse.json({ error: 'Package not found' }, { status: 404 });
//     }

//     return NextResponse.json(pkg);
//   } catch (error) {
//     console.error('Error fetching Package by id:', error);
//     return NextResponse.json({ error: 'Failed to fetch Package' }, { status: 500 });
//   }
// }


  /**
 * PUT: Update a hospital by ID
 */

export async function PUT(request: Request, { params }: Params) {
  try {
      const package_id = params.id;

      const body = await request.json();

      // Validate that package exists
      const existingPackage = await prisma.packages.findUnique({
          where: { package_id },
      });

      if (!existingPackage) {
          return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }

      const updatedPackage = await prisma.packages.update({
          where: { package_id },
          data: {
              package_name: body.package_name,
              hospital_id: body.hospital_id,
              image: body.image,
              detail: body.detail,
              duration: body.duration,
              expired_date: new Date(body.expired_date),
          },
      });


      if (Array.isArray(body.images)) {
          const keepImageIds = body.images.filter((i: any) => i.id).map((i: any) => i.id);
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

      if (Array.isArray(body.doctor_ids)) {
          const existingDocs = await prisma.package_doc.findMany({
              where: { package_id },
              select: { doctor_id: true },
          });
          const existingSet = new Set(existingDocs.map(d => d.doctor_id));
          const incomingSet = new Set((body.doctor_ids as any[]));
          const toAdd = Array.from(incomingSet).filter(id => !existingSet.has(id as any));
          const toRemove = Array.from(existingSet).filter(id => !incomingSet.has(id as any));
          if (toAdd.length) {
              await prisma.package_doc.createMany({
                  data: toAdd.map((doctor_id: any) => ({ package_id, doctor_id })),
                  skipDuplicates: true,
              });
          }
          if (toRemove.length) {
              await prisma.package_doc.deleteMany({
                  where: { package_id, doctor_id: { in: toRemove as any[] } },
              });
          }
      }

      if (Array.isArray(body.hotel_ids)) {
          const existingHotels = await prisma.package_hotels.findMany({
              where: { package_id },
              select: { hotel_id: true },
          });
          const existingSet = new Set(existingHotels.map(h => h.hotel_id));
          const incomingSet = new Set((body.hotel_ids as any[]));
          const toAdd = Array.from(incomingSet).filter(id => !existingSet.has(id as any));
          const toRemove = Array.from(existingSet).filter(id => !incomingSet.has(id as any));
          if (toAdd.length) {
              await prisma.package_hotels.createMany({
                  data: toAdd.map((hotel_id: any) => ({ package_id, hotel_id })),
                  skipDuplicates: true,
              });
          }
          if (toRemove.length) {
              await prisma.package_hotels.deleteMany({
                  where: { package_id, hotel_id: { in: toRemove as any[] } },
              });
          }
      }

      if (Array.isArray(body.guide_ids)) {
          const existingGuides = await prisma.package_guides.findMany({
              where: { package_id },
              select: { guide_id: true },
          });
          const existingSet = new Set(existingGuides.map(g => g.guide_id));
          const incomingSet = new Set((body.guide_ids as any[]));
          const toAdd = Array.from(incomingSet).filter(id => !existingSet.has(id as any));
          const toRemove = Array.from(existingSet).filter(id => !incomingSet.has(id as any));
          if (toAdd.length) {
              await prisma.package_guides.createMany({
                  data: toAdd.map((guide_id: any) => ({ package_id, guide_id })),
                  skipDuplicates: true,
              });
          }
          if (toRemove.length) {
              await prisma.package_guides.deleteMany({
                  where: { package_id, guide_id: { in: toRemove as any[] } },
              });
          }
      }

      if (Array.isArray(body.routes) && (!Array.isArray(body.trips) || body.trips.length === 0)) {
          const existing = await prisma.routes.findMany({
              where: { package_id },
              select: { tour_id: true },
          });

          const existingIds = new Set(existing.map(r => r.tour_id));
          const incomingIds = new Set((body.routes as Array<{ tour_id: any }>).map(r => r.tour_id));

          const toAdd = Array.from(incomingIds).filter(id => !existingIds.has(id));
          const toRemove = Array.from(existingIds).filter(id => !incomingIds.has(id));

          if (toAdd.length > 0) {
              await prisma.routes.createMany({
                  data: toAdd.map((tour_id: any) => ({ package_id, tour_id })),
                  skipDuplicates: true,
              });
          }

          if (toRemove.length > 0) {
              await prisma.routes.deleteMany({
                  where: { package_id, tour_id: { in: toRemove as any[] } },
              });
          }
      }

      if (Array.isArray(body.trips)) {
          for (const trip of body.trips) {
              if (trip.id) {
                  await prisma.trips.update({
                      where: { tour_id: trip.id },
                      data: { description: trip.description },
                  });
              } else {
                  // Create trip first
                  const newTrip = await prisma.trips.create({
                      data: { description: trip.description },
                  });
                  
                  // Then create the route connection
                  await prisma.routes.create({
                      data: { 
                          package_id, 
                          tour_id: newTrip.tour_id 
                      },
                  });
              }
          }
      }

      const tripIds = await prisma.routes.findMany({
          where: { package_id },
          select: { tour_id: true },
      });

      if (Array.isArray(body.package_places) && tripIds.length > 0) {
        const trip_id = tripIds[0].tour_id; // Use the first trip ID
    
        for (const place of body.package_places) {
            if (place.packplace_id) {
                await prisma.package_places.update({
                    where: { packplace_id: place.packplace_id },
                    data: {
                        date: place.date,
                        start: place.start || null,
                        end: place.end || null,
                    },
                });
            } else {
                await prisma.package_places.create({
                    data: {
                        tour_id: trip_id,
                        place_id: place.place_id,
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
  
          // ✅ Fetch all trips linked to this package through routes before deletion
          const trips = await prisma.routes.findMany({
              where: { package_id },
              select: { tour_id: true },
          });

          const tripIds = trips.map(trip => trip.tour_id); // Extract tour IDs
  
          // ✅ Run all deletions inside a transaction to ensure data integrity
          await prisma.$transaction(async (tx) => {
              // Delete related records first (if CASCADE is not set in schema)
              await tx.package_guides.deleteMany({ where: { package_id } });
              await tx.package_doc.deleteMany({ where: { package_id } });
  
              // Delete package_places using retrieved trip IDs
              if (tripIds.length > 0) {
                  await tx.package_places.deleteMany({
                      where: { tour_id: { in: tripIds } },
                  });
              }
  
              // Delete routes first (junction table)
              await tx.routes.deleteMany({ where: { package_id } });
              
              // Delete trips
              if (tripIds.length > 0) {
                  await tx.trips.deleteMany({ 
                      where: { tour_id: { in: tripIds } } 
                  });
              }
              
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


