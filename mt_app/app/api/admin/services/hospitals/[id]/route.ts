import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';


/**
 * GET: Fetch a hospital by ID
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: hospital_id } = await params;
    
    // Basic validation - check if ID exists and is not empty
    if (!hospital_id || hospital_id.trim() === '') {
      return NextResponse.json({ error: "Hospital ID is required" }, { status: 400 });
    }
    
    // Fetch hospital along with associated doctors
    const hospital = await prisma.hospitals.findUnique({
      where: { hospital_id },
      select: {
        description: true,
        name: true,
        location: true,
        city: true,
        hospital_code: true,
        contact_info: true,
        image: true,
        logo: true,
        Thai: true,
        Arabic: true,
        Myanmar: true,
        English: true,
        rating: true,
        doctors: {
          select: {
            doctor_id: true,
            name: true,
            specialization: true,
            image: true,
            experience: true,
            description: true,
          }
        },
        hospital_images: {
          select: {
            image_id: true,
            image: true,
          }
        },
        medical_services: {
          select: {
            service_name: true,
            description: true,
          }
        },
        packages: {
          select: {
            package_id: true,
            package_type: true,
            package_name: true,
            image: true,
            detail: true,
          }
        },
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: hospital_id } = await params; // ✅ direct use

    if (!hospital_id || hospital_id.trim() === "") {
      return NextResponse.json(
        { error: "Hospital ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      hospital_code,
      location,
      city,
      description,
      contact_info,
      image,
      logo,
      medical_services,
      hospital_images,
    } = body;

    // Update main hospital info
    const updatedHospital = await prisma.hospitals.update({
      where: { hospital_id }, // ❗ If hospital_id is Int, use Number(hospital_id)
      data: {
        name,
        hospital_code,
        location,
        city,
        description,
        contact_info,
        image,
        logo,
      },
    });

    // Update medical services
    if (medical_services?.length > 0) {
      await prisma.medical_services.deleteMany({
        where: { hospital_id },
      });

      await prisma.medical_services.createMany({
        data: medical_services.map((service: any) => ({
          service_name: service.service_name,
          description: service.description,
          hospital_id,
        })),
      });
    }

    // Update hospital images
    if (hospital_images?.length > 0) {
      await prisma.hospital_images.deleteMany({
        where: { hospital_id },
      });

      await prisma.hospital_images.createMany({
        data: hospital_images.map((img: string) => ({
          image: img,
          hospital_id,
        })),
      });
    }

    // Return full updated hospital with relations
    const result = await prisma.hospitals.findUnique({
      where: { hospital_id },
      include: {
        medical_services: true,
        hospital_images: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error updating hospital:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update hospital" },
      { status: 500 }
    );
  }
}





  
  /**
   * DELETE: Remove a hospital by ID
   */
  export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: hospital_id } = await params;

        if (isNaN(Number(hospital_id))) {
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
//   "logo": "/img/Hospital/Mfu3.jpg",
//   "hospital_images": [
//       { "id": 9, "image_url": "https://example.com/updated-image1.jpg" },
//       { "image_url": "https://example.com/new-image.jpg" }          
//   ],
//   "medical_services": [
//       { "id": 9, "service_name": "Cardiology", "description": "Updated heart treatment" },
//       { "service_name": "Oncology", "description": "New cancer treatment service" } 
//   ]
// }