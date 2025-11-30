import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'


// GET request - Fetch a single User_Contact_Detail by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user_contact_detail = await prisma.user_contact_detail.findUnique({
      where: { id: id },
    })

    if (!user_contact_detail) {
      return NextResponse.json({ error: 'User_Contact_Detail not found' }, { status: 404 })
    }

    return NextResponse.json(user_contact_detail, { status: 200 })
  } catch (error) {
    console.error('Error fetching User_Contact_Detail:', error)
    return NextResponse.json({ error: 'Failed to fetch User_Contact_Detail' }, { status: 500 })
  }
}


// PUT request - Update an User_Contact_Detail by ID
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { firstname, lastname, email, country, phone,} = await req.json()
    const updatedUser_Contact_Detail = await prisma.user_contact_detail.update({
      where: { id: id },
      data: {
        firstname,
        lastname,
        email,
        country,
        phone,
      },
    })

    return NextResponse.json(updatedUser_Contact_Detail, { status: 200 })
  } catch (error) {
    console.error('Error updating User_Contact_Detail:', error)
    return NextResponse.json({ error: 'Failed to update User_Contact_Detail' }, { status: 500 })
  }
}



export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
  
      // Fetch the patient_id related to the User_Contact_Detail
      const user_contact_detail = await prisma.user_contact_detail.findUnique({
        where: { id: id },
        select: { id: true },
      });
  
      if (!user_contact_detail) {
        return NextResponse.json({ error: 'User_Contact_Detail not found' }, { status: 404 });
      }
  
      // Delete the User_Contact_Detail first
      await prisma.user_contact_detail.delete({
        where: { id: id },
      });
  
      // If the User_Contact_Detail had a linked patient_id, delete the patient_details
      if (user_contact_detail.id) {
        await prisma.user_contact_detail.delete({
          where: { id: user_contact_detail.id },
        });
      }
  
      return NextResponse.json({ message: 'User_Contact_Detail and patient details deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting User_Contact_Detail :', error);
      return NextResponse.json({ error: 'Failed to delete User_Contact_Detail :' }, { status: 500 });
    }
  }
