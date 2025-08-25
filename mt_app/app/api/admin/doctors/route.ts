import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctors.findMany({
      include: {
        hospitals: {
          select: {
            name: true,
            hospital_code: true,
          },
        },
        doc_education: true,
        doc_certificate: true,
        doc_language: true,
      },
    });
    
    // Transform the data to match frontend expectations
    const transformedDoctors = doctors.map(doctor => ({
      ...doctor,
      hospital: doctor.hospitals,
    }));
    
    return NextResponse.json(transformedDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      specialization,
      hospital_id,
      experience,
      description,
      image,
      doc_education,
      doc_certificate,
      doc_language,
    } = await request.json();

    console.log('Creating doctor with data:', {
      name,
      specialization,
      hospital_id,
      experience,
      description,
      image,
    });

    // Create the doctor
    const newDoctor = await prisma.doctors.create({
      data: {
        name,
        specialization,
        hospital_id: hospital_id || null, // Handle empty string as null
        experience,
        description,
        image,
      },
    });

    console.log('Doctor created:', newDoctor);

    // Create related education records
    if (doc_education && doc_education.length > 0) {
      await prisma.doc_education.createMany({
        data: doc_education.map((edu: any) => ({
          doctor_id: newDoctor.doctor_id,
          field_of_study: edu.field_of_study,
          institution: edu.institution,
          year: edu.year,
        })),
      });
    }

    // Create related certificate records
    if (doc_certificate && doc_certificate.length > 0) {
      await prisma.doc_certificate.createMany({
        data: doc_certificate.map((cert: any) => ({
          doctor_id: newDoctor.doctor_id,
          field_of_study: cert.field_of_study,
          institution: cert.institution,
          year: cert.year,
        })),
      });
    }

    // Create related language records
    if (doc_language && doc_language.length > 0) {
      await prisma.doc_language.createMany({
        data: doc_language.map((lang: any) => ({
          doctor_id: newDoctor.doctor_id,
          languages: lang.languages,
        })),
      });
    }

    // Fetch the complete doctor with all relations
    const doctorWithRelations = await prisma.doctors.findUnique({
      where: { doctor_id: newDoctor.doctor_id },
      include: {
        hospitals: {
          select: {
            name: true,
            hospital_code: true,
          },
        },
        doc_education: true,
        doc_certificate: true,
        doc_language: true,
      },
    });

    return NextResponse.json(doctorWithRelations, { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: "Failed to create doctor", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}