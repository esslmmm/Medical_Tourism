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
    const requestBody = await request.json();

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
    } = requestBody;

    // Validate required fields
    if (!name || !specialization) {
      return NextResponse.json({ 
        error: "Name and specialization are required" 
      }, { status: 400 });
    }

    // Use transaction to ensure all data is created together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the doctor
      const newDoctor = await tx.doctors.create({
        data: {
          name: name.trim(),
          specialization: specialization.trim(),
          hospital_id: hospital_id && hospital_id.trim() !== '' ? hospital_id : null,
          experience: experience && experience.toString().trim() !== '' ? 
            parseInt(experience.toString().replace(/\D/g, '') || '0') : null,
          description: description && description.trim() !== '' ? description.trim() : null,
          image: image && image.trim() !== '' ? image.trim() : null,
        },
      });

      console.log('Doctor created with ID:', newDoctor.doctor_id);

      // 2. Create education records
      if (doc_education && Array.isArray(doc_education)) {
        for (const edu of doc_education) {
          if (edu.field_of_study && edu.field_of_study.trim()) {
            await tx.doc_education.create({
              data: {
                doctor_id: newDoctor.doctor_id,
                field_of_study: edu.field_of_study.trim(),
                institution: edu.institution?.trim() || null,
                year: edu.year && edu.year.toString().trim() !== '' ? parseInt(edu.year.toString()) : null,
              }
            });
            console.log('Created education:', edu.field_of_study);
          }
        }
      }

      // 3. Create certificate records
      if (doc_certificate && Array.isArray(doc_certificate)) {
        for (const cert of doc_certificate) {
          if (cert.field_of_study && cert.field_of_study.trim()) {
            await tx.doc_certificate.create({
              data: {
                doctor_id: newDoctor.doctor_id,
                field_of_study: cert.field_of_study.trim(),
                institution: cert.institution?.trim() || null,
                year: cert.year && cert.year.toString().trim() !== '' ? parseInt(cert.year.toString()) : null,
              }
            });
            console.log('Created certificate:', cert.field_of_study);
          }
        }
      }

      // 4. Create language records
      if (doc_language && Array.isArray(doc_language)) {
        for (const lang of doc_language) {
          if (lang.languages && lang.languages.trim()) {
            await tx.doc_language.create({
              data: {
                doctor_id: newDoctor.doctor_id,
                languages: lang.languages.trim(),
              }
            });
            console.log('Created language:', lang.languages);
          }
        }
      }

      return newDoctor;
    });

    // Fetch the complete doctor with all relations
    const doctorWithRelations = await prisma.doctors.findUnique({
      where: { doctor_id: result.doctor_id },
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
    return NextResponse.json({ 
      error: "Failed to create doctor", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}