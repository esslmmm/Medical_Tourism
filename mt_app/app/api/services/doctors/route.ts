
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';


export async function GET() {
    try {
      const doctors = await prisma.doctors.findMany(
        {
            select: {
                doctor_id: true,
                name:  true,
                specialization: true,
                image: true,
            }
        }
      );
      return NextResponse.json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
    }
  }


/**
 * POST: Add a new Doctor
 */
export async function POST(request: Request) {
    try {
        const {
            name,
            specialization,
            hospital_id,
            experience,
            description,
            image,
            create_at,
            certificate_list,
            education_list,
            languages
        } = await request.json();

        const newDoctor = await prisma.doctors.create({
            data: {
                name,
                specialization,
                hospital_id,
                experience,
                description,
                image,
                create_at: create_at ? new Date(create_at) : new Date(),
            },
            select: { doctor_id: true }
        });

        if (Array.isArray(certificate_list) && certificate_list.length > 0) {
            await prisma.doc_certificate.createMany({
                data: certificate_list.map((doc: { field_of_study: string; institution: string; year: number }) => ({
                    doctor_id: newDoctor.doctor_id,
                    field_of_study: doc.field_of_study,
                    institution: doc.institution,
                    year: doc.year,  
                })),
            });
        }

        if (Array.isArray(education_list) && education_list.length > 0) {
            await prisma.doc_education.createMany({
                data: education_list.map((edu: { field_of_study: string; institution: string; year: number }) => ({
                    doctor_id: newDoctor.doctor_id,
                    field_of_study: edu.field_of_study,
                    institution: edu.institution,
                    year: edu.year,  
                })),
            });
        }

        if (Array.isArray(languages) && languages.length > 0) {
            await prisma.doc_language.createMany({
                data: languages.map((languages: string) => ({
                    doctor_id: newDoctor.doctor_id,
                    languages: languages,
                })),
            });
        }

        return NextResponse.json({ 
            message: "Doctor and related data created successfully", 
            doctor_id: newDoctor.doctor_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating doctor:", error);
        return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
    }
}

/**
 * POST: TEST CASE
 */
// {
//     "name": "Dr. John Doe",
//     "specialization": "Cardiologist",
//     "hospital_id": 15,
//     "experience": 15,
//     "description": "Expert in heart surgery and treatment",
//     "image": "example.com/doctor-image.jpg",
//     "certificate_list": [
//         { "field_of_study": "Cardiology", "institution": "Harvard Medical School", "year": 2010 }
//     ],
//     "education_list": [
//         { "field_of_study": "Medicine", "institution": "Stanford University", "year": 2005 },
//         { "field_of_study": "Medicine15", "institution": "Stanford University", "year": 2010 }
//     ],
//     "languages": ["English", "Japanese"]
// }

