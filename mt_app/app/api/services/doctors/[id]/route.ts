
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


/**
 * GET: Fetch a doctor by ID
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: doctor_id } = await params;
  
      const doctor = await prisma.doctors.findUnique({
        where: { doctor_id },
        select: {
            name: true,
            specialization: true,
            image: true,
            experience: true,
            description: true,
          hospitals: {
            select: {
                logo: true,
                hospital_id: true,
            },
          },
          doc_certificate: {
            select: {
                field_of_study: true,
                institution: true,
                year: true,}
          },
          doc_education: {
            select: {
                field_of_study: true,
                institution: true,
                year: true,
            }
          },
          doc_language:{
            select: {
                languages: true,
            }
          },
        },
      });
  
      if (!doctor) {
        return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
      }
  
      return NextResponse.json(doctor, { status: 200 });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
    }
  }


/**
 * PUT: Update a doctor by ID
*/
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: doctor_id } = await params;

        if (isNaN(Number(doctor_id))) {
            return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
        }

        const body = await request.json();

        const existingDoctor = await prisma.doctors.findUnique({
            where: { doctor_id },
        });

        if (!existingDoctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        const updatedDoctor = await prisma.doctors.update({
            where: { doctor_id },
            data: {
                name: body.name,
                specialization: body.specialization,
                hospital_id: body.hospital_id,
                experience: body.experience,
                description: body.description,
                image: body.image,
            },
        });

        if (Array.isArray(body.doc_certificate)) {
            for (const doc of body.doc_certificate) {
                if (doc.id) {
                    await prisma.doc_certificate.update({
                        where: { cerfiticate_id: doc.id }, 
                        data: {
                            field_of_study: doc.field_of_study,
                            institution: doc.institution, 
                            year: doc.year,  
                        },
                    });
                } else {
                    await prisma.doc_certificate.create({
                        data: {
                            doctor_id,
                            field_of_study: doc.field_of_study,
                            institution: doc.institution,
                            year: doc.year,  
                        },
                    });
                }
            }
        }

        if (Array.isArray(body.doc_education)) {
            for (const edu of body.doc_education) {
                if (edu.id) {
                    await prisma.doc_education.update({
                        where: { education_id: edu.id },
                        data: {
                            field_of_study: edu.field_of_study,
                            institution: edu.institution,
                            year: edu.year,  
                        },
                    });
                } else {
                    await prisma.doc_education.create({
                        data: {
                            doctor_id,
                            field_of_study: edu.field_of_study,
                            institution: edu.institution,
                            year: edu.year, 
                        },
                    });
                }
            }
        }

        if (Array.isArray(body.doc_language)) {
            for (const lang of body.doc_language) {
                if (lang.id) {
                    await prisma.doc_language.update({
                        where: { language_id: lang.id },
                        data: {
                            languages: lang.language_name
                        },
                    });
                } else {
                    await prisma.doc_language.create({
                        data: {
                            doctor_id,
                            languages: lang.language_name 
                        },
                    });
                }
            }
        }

        return NextResponse.json(
            { message: "Doctor, certificates, education, and languages updated successfully", updatedDoctor },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating doctor:", error);
        return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
    }
}

/**
   * DELETE: Remove a doctor by ID
   */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: doctor_id } = await params;

        if (isNaN(Number(doctor_id))) {
            return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
        }

        await prisma.doc_certificate.deleteMany({
            where: { doctor_id },
        });

        await prisma.doc_education.deleteMany({
            where: { doctor_id },
        });

        await prisma.doc_language.deleteMany({
            where: { doctor_id },
        });

        await prisma.doctors.delete({
            where: { doctor_id },
        });

        return NextResponse.json({ message: "Doctor and related data deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
    }
}

/**
 * PUT: TEST CASE
*/
// {
//     "name": "Dr. John Doe",
//     "specialization": "Cardiologist",
//     "hospital_id": 15,
//     "experience": 10,
//     "description": "Expert in heart surgery",
//     "image": "example.com/doctor-image.jpg",
//     "doc_certificate": [
//         { "id": 3, "field_of_study": "Cardiology", "institution": "Harvard", "year": 2010 },
//         { "field_of_study": "Heart Surgery", "institution": "Stanford", "year": 2012 }
//     ],
//     "doc_education": [
//         { "id": 4, "field_of_study": "Medicine11", "institution": "Oxford", "year": 2005 }
//     ],
//     "doc_language": [
//         { "id": 3, "language_name": "chinese" }
//     ]
// }
