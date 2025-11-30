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
            image: true,
          }
        },
        medical_services: {
          select: {
            service_name: true,
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
