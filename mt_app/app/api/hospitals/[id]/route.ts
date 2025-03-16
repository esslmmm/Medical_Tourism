import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




/**
 * GET: Fetch a hospital by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const hospital_id = parseInt(params.id, 10); // Convert ID to integer

    if (isNaN(hospital_id)) {
      return NextResponse.json({ error: "Invalid hospital ID" }, { status: 400 });
    }

    // Fetch hospital along with associated doctors
    const hospital = await prisma.hospitals.findUnique({
      where: { hospital_id },
      include: {
        doctors: true,
        hospital_images : true,
        medical_services : true,
        packages : true,
        review_hospital: true,
      },
    });

    if (!hospital) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 });
    }

    return NextResponse.json(hospital, { status: 200 });
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return NextResponse.json({ error: "Failed to fetch hospital" }, { status: 500 });
  }
}

  /**
 * PUT: Update a hospital by ID
 */
  export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const hospital_id = parseInt(params.id, 10);

        if (isNaN(hospital_id)) {
            return NextResponse.json({ error: "Invalid hospital ID" }, { status: 400 });
        }

        const body = await request.json();

        
        const existingHospital = await prisma.hospitals.findUnique({
            where: { hospital_id },
        });

        if (!existingHospital) {
            return NextResponse.json({ error: "Hospital not found" }, { status: 404 });
        }

        
        const updatedHospital = await prisma.hospitals.update({
            where: { hospital_id },
            data: {
                name: body.name,
                hospital_code: body.hospital_code,
                location: body.location,
                city: body.city,
                description: body.description,
                contact_info: body.contact_info,
                rating: body.rating,
                image: body.image,
            },
        });

        
        if (Array.isArray(body.hospital_images)) {
            for (const img of body.hospital_images) {
                if (img.id) {
                    
                    await prisma.hospital_images.update({
                        where: { image_id: img.id },
                        data: { image: img.image_url },
                    });
                } else {
                    
                    await prisma.hospital_images.create({
                        data: {
                            hospital_id,
                            image: img.image_url,
                        },
                    });
                }
            }
        }

        
        if (Array.isArray(body.medical_services)) {
            for (const service of body.medical_services) {
                if (service.id) {
                    await prisma.medical_services.update({
                        where: { service_id: service.id },
                        data: {
                            service_name: service.service_name,
                            description: service.description,
                        },
                    });
                } else {
                    await prisma.medical_services.create({
                        data: {
                            hospital_id,
                            service_name: service.service_name,
                            description: service.description,
                        },
                    });
                }
            }
        }

        return NextResponse.json(
            { message: "Hospital, images, and medical services updated successfully", updatedHospital },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating hospital:", error);
        return NextResponse.json({ error: "Failed to update hospital" }, { status: 500 });
    }
}



  
  /**
   * DELETE: Remove a hospital by ID
   */
  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const hospital_id = parseInt(params.id, 10);

        if (isNaN(hospital_id)) {
            return NextResponse.json({ error: "Invalid hospital ID" }, { status: 400 });
        }

        const doctors = await prisma.doctors.findMany({
            where: { hospital_id },
            select: { doctor_id: true },
        });

        const doctorIds = doctors.map((doc) => doc.doctor_id);

        if (doctorIds.length > 0) {
            await prisma.doc_certificate.deleteMany({
                where: { doctor_id: { in: doctorIds } },
            });

            await prisma.doc_education.deleteMany({
                where: { doctor_id: { in: doctorIds } },
            });

            await prisma.doc_language.deleteMany({
                where: { doctor_id: { in: doctorIds } },
            });
        }


        await prisma.hospital_images.deleteMany({
            where: { hospital_id },
        });

        await prisma.medical_services.deleteMany({
            where: { hospital_id },
        });

        await prisma.review_hospital.deleteMany({
            where: { hospital_id },
        });

        await prisma.doctors.deleteMany({
            where: { hospital_id },
        });

        await prisma.hospitals.delete({
            where: { hospital_id },
        });

        return NextResponse.json({ message: "Hospital and related data deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting hospital:", error);
        return NextResponse.json({ error: "Failed to delete hospital" }, { status: 500 });
    }
}


  /**
 * PUT: TEST CASE
 */
// {
//   "name": "Updated Tokyo General Hospital",
//   "hospital_code": "TG123",
//   "location": "Tokyo, Japan",
//   "city": "Tokyo",
//   "description": "Updated hospital description",
//   "contact_info": "+81 123-456-7890",
//   "rating": 4.9,
//   "image": "example.com/updated-main.jpg",
//   "hospital_images": [
//       { "id": 9, "image_url": "https://example.com/updated-image1.jpg" },
//       { "image_url": "https://example.com/new-image.jpg" }          
//   ],
//   "medical_services": [
//       { "id": 9, "service_name": "Cardiology", "description": "Updated heart treatment" },
//       { "service_name": "Oncology", "description": "New cancer treatment service" } 
//   ]
// }