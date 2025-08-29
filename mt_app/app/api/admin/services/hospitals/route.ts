import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hospitals = await prisma.hospitals.findMany({
      select: {
        hospital_id: true,
        name: true,
        doctors: {
          select: {
            doctor_id: true,
            specialization: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({ error: 'Failed to fetch hospitals' }, { status: 500 });
  }
}


