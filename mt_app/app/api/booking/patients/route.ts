import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // adjust path to your setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if body is an array (multiple patients) or single object
    const isArray = Array.isArray(body);
    
    if (isArray) {
      // Handle multiple patients
      const patients = body;
      
      // Validate required fields for each patient
      for (const patient of patients) {
        if (!patient.appointment_id || !patient.firstname || !patient.lastname) {
          return NextResponse.json(
            { error: 'Missing required fields in one or more patient records' },
            { status: 400 }
          );
        }
      }
      
      // Create all patient records
      const newPatientDetails = await Promise.all(
        patients.map(patient => 
          prisma.patient_details.create({
            data: {
              appointment_id: patient.appointment_id,
              firstname: patient.firstname,
              lastname: patient.lastname,
              gender: patient.gender,
              dateofbirth: new Date(patient.dateofbirth),
              nationality: patient.nationality,
              passport_number: patient.passport_number,
              symptoms: patient.symptoms,
            }
          })
        )
      );
      
      return NextResponse.json(newPatientDetails, { status: 201 });
      
    } else {
      // Handle single patient
      const {
        appointment_id,
        firstname,
        lastname,
        gender,
        dateofbirth,
        nationality,
        passport_number,
        symptoms,
      } = body;
      
      console.log("Creating patient:", appointment_id);
      
      if (!appointment_id || !firstname || !lastname) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      const newPatientDetail = await prisma.patient_details.create({
        data: {
          appointment_id,
          firstname,
          lastname,
          gender,
          dateofbirth: new Date(dateofbirth),
          nationality,
          passport_number,
          symptoms,
        },
      });

      
      return NextResponse.json(newPatientDetail, { status: 201 });
    }
    
  } catch (error) {
    console.error('❌ Error creating patient detail:', error);
    return NextResponse.json(
      { error: 'Failed to create patient detail' },
      { status: 500 }
    );
  }
}



