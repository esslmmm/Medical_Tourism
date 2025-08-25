import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * GET: Fetch a contact message by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const contact_id = parseInt(params.id);

        if (isNaN(contact_id)) {
            return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 });
        }

        const contact = await prisma.contact_us.findUnique({
            where: { id: contact_id },
        });

        if (!contact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json(contact, { status: 200 });
    } catch (error) {
        console.error("Error fetching contact:", error);
        return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
    }
}

/**
 * PUT: Update a contact message by ID
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const contact_id = parseInt(params.id);

    if (isNaN(contact_id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, country, type, message, contact_us_status } = body;

    // Update the contact
    const updatedContact = await prisma.contact_us.update({
      where: { id: contact_id },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        type,
        message,
        contact_us_status, // include status
      },
    });

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error: any) {
    console.error("Error updating contact:", error);

    // Handle case when contact ID does not exist
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}


/**
 * DELETE: Remove a contact message by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const contact_id = parseInt(params.id);

        if (isNaN(contact_id)) {
            return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 });
        }

        await prisma.contact_us.delete({
            where: { id: contact_id },
        });

        return NextResponse.json({ message: "Contact deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
    }
}
