import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export async function GET() {
    try {
      const hospitals = await prisma.hospitals.findMany();
      return NextResponse.json(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
    }
  }


  /**
 * POST: Add a new hospital
 */
  export async function POST(request: Request) {
    try {
        const {
            name,
            hospital_code,
            location,
            city,
            description,
            contact_info,
            rating,
            image,
            logo,
            medical_services,
            hospital_images,
        } = await request.json();

        // Step 1: Create the hospital and get its ID
        const newHospital = await prisma.hospitals.create({
            data: {
                name,
                hospital_code,
                location,
                city,
                description,
                contact_info,
                rating,
                image,
                logo
            },
            select: { hospital_id: true }
        });


        if (Array.isArray(medical_services) && medical_services.length > 0) {
            await prisma.medical_services.createMany({
                data: medical_services.map((service: { service_name: string; description: string }) => ({
                    hospital_id: newHospital.hospital_id,
                    service_name: service.service_name,
                    description: service.description,  
                })),
            });
        }


        if (Array.isArray(hospital_images) && hospital_images.length > 0) {
            await prisma.hospital_images.createMany({
                data: hospital_images.map((image: string) => ({
                    hospital_id: newHospital.hospital_id,
                    image, 
                })),
            });
        }

        return NextResponse.json({ 
            message: "Hospital and related data created successfully", 
            hospital_id: newHospital.hospital_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating hospital:", error);
        return NextResponse.json({ error: "Failed to create hospital" }, { status: 500 });
    }
}

  /**
 * POST: TEST CASE
 */
// {
//   "name": "Tokyo General Hospital",
//   "hospital_code": "TG123",
//   "location": "Tokyo, Japan",
//   "city": "Tokyo",
//   "description": "A leading hospital in Tokyo",
//   "contact_info": "+81 123-456-7890",
//   "rating": 4.8,
//   "image": "/img/Hospital/Mfu3.jpg",
//   "logo": "/img/Hospital/Mfu3.jpg",
//   "medical_services": [
//       { "service_name": "Cardiology", "description": "Heart and vascular treatments" },
//       { "service_name": "Neurology", "description": "Brain and nervous system care" }
//   ],
//   "hospital_images": [
//       "https://example.com/image1.jpg",
//       "https://example.com/image2.jpg"
//   ]
// }