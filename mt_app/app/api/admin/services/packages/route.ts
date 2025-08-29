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
            hospital_id,
            image,
            detail,
            duration,
            expired_date,
            create_at,
            guide_ids,
            doctor_ids,
            hotel_ids,
            descriptions,
            images,
            routes,
        } = await request.json();

        // Validate required fields
        if (!package_name) {
            return NextResponse.json({ error: "Package name and type are required" }, { status: 400 });
        }

        // Step 1: Create the package and get its ID
        const newPackage = await prisma.packages.create({
            data: {
                package_name,
                hospital_id,
                image,
                detail,
                duration,
                expired_date: new Date(expired_date),
                create_at: create_at ? new Date(create_at) : new Date(),
            },
            select: { package_id: true }
        });

        if (Array.isArray(descriptions) && descriptions.length > 0) {
            await prisma.description.createMany({
              data: descriptions.map((descriptions: { title: string; details: string }) => ({
                package_id: newPackage.package_id,
                title: descriptions.title,
                details: descriptions.details,
              })),
            });
        }
          
        if (Array.isArray(images) && images.length > 0) {
            await prisma.package_image.createMany({
              data: images.map((img: { title: string; detail: string; images: string }) => ({
                package_id: newPackage.package_id,
                title: img.title,
                detail: img.detail,
                images: img.images,
              })),
            });
        }

        if (Array.isArray(routes) && routes.length > 0) {
            await prisma.routes.createMany({
              data: routes.map((route: { tour_id: number }) => ({
                package_id: newPackage.package_id,
                tour_id: route.tour_id
              })),
            });
          }

        if (Array.isArray(doctor_ids) && doctor_ids.length > 0) {
            const doctorIdList = doctor_ids
              .map((d: any) => (typeof d === 'string' ? d : d?.doctor_id))
              .filter((id: any) => !!id);
            if (doctorIdList.length > 0) {
              await prisma.package_doc.createMany({
                data: doctorIdList.map((doctor_id: string) => ({
                  package_id: newPackage.package_id,
                  doctor_id,
                })),
                skipDuplicates: true,
              });
            }
        }

        if (Array.isArray(hotel_ids) && hotel_ids.length > 0) {
            const hotelIdList = hotel_ids
              .map((h: any) => (typeof h === 'number' ? h : h?.hotel_id))
              .filter((id: any) => typeof id === 'number');
            if (hotelIdList.length > 0) {
              await prisma.package_hotels.createMany({
                data: hotelIdList.map((hotel_id: number) => ({
                  package_id: newPackage.package_id,
                  hotel_id,
                })),
                skipDuplicates: true,
              });
            }
        }

        if (Array.isArray(guide_ids) && guide_ids.length > 0) {
            const guideIdList = guide_ids
              .map((g: any) => (typeof g === 'number' ? g : g?.guide_id))
              .filter((id: any) => typeof id === 'number');
            if (guideIdList.length > 0) {
              await prisma.package_guides.createMany({
                data: guideIdList.map((guide_id: number) => ({
                  package_id: newPackage.package_id,
                  guide_id,
                })),
                skipDuplicates: true,
              });
            }
        }
        

        return NextResponse.json({ 
            message: "Package and related data created successfully", 
            package_id: newPackage.package_id,
            package_name,
          }, { status: 201 });

    } catch (error) {
        console.error("Error creating package:", error);
        return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
    }
}