import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('GET request for doctor ID:', id);

    const doctor = await prisma.doctors.findUnique({
      where: { doctor_id: id },
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

    console.log('Doctor found in database:', doctor ? 'Yes' : 'No');
    if (doctor) {
      console.log('Doctor data:', { id: doctor.doctor_id, name: doctor.name });
    }

    if (!doctor) {
      console.log('Doctor not found for ID:', id);
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Transform the data to match frontend expectations
    const transformedDoctor = {
      ...doctor,
      hospital: doctor.hospitals,
    };

    return NextResponse.json(transformedDoctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
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

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update the main doctor record
      const updatedDoctor = await tx.doctors.update({
        where: { doctor_id: id },
        data: {
          name,
          specialization,
          hospital_id: hospital_id || null,
          experience: experience ? parseInt(experience.toString().replace(/\D/g, '') || '0') : null,
          description,
          image,
        },
      });

      // Delete existing related records
      await tx.doc_education.deleteMany({
        where: { doctor_id: id },
      });
      await tx.doc_certificate.deleteMany({
        where: { doctor_id: id },
      });
      await tx.doc_language.deleteMany({
        where: { doctor_id: id },
      });

      // Create new education records
      if (doc_education && doc_education.length > 0) {
        await tx.doc_education.createMany({
          data: doc_education.map((edu: any) => ({
            doctor_id: id,
            field_of_study: edu.field_of_study,
            institution: edu.institution,
            year: edu.year && edu.year.toString().trim() !== '' ? parseInt(edu.year.toString()) : null,
          })),
        });
      }

      // Create new certificate records
      if (doc_certificate && doc_certificate.length > 0) {
        await tx.doc_certificate.createMany({
          data: doc_certificate.map((cert: any) => ({
            doctor_id: id,
            field_of_study: cert.field_of_study,
            institution: cert.institution,
            year: cert.year && cert.year.toString().trim() !== '' ? parseInt(cert.year.toString()) : null,
          })),
        });
      }

      // Create new language records
      if (doc_language && doc_language.length > 0) {
        await tx.doc_language.createMany({
          data: doc_language.map((lang: any) => ({
            doctor_id: id,
            languages: lang.languages,
          })),
        });
      }

      return updatedDoctor;
    });

    // Fetch the updated doctor with all relations
    const doctorWithRelations = await prisma.doctors.findUnique({
      where: { doctor_id: id },
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

    return NextResponse.json(doctorWithRelations);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Start a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Delete related records first
      await tx.doc_education.deleteMany({
        where: { doctor_id: id },
      });
      await tx.doc_certificate.deleteMany({
        where: { doctor_id: id },
      });
      await tx.doc_language.deleteMany({
        where: { doctor_id: id },
      });

      // Delete the doctor
      await tx.doctors.delete({
        where: { doctor_id: id },
      });
    });

    return NextResponse.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
  }
}