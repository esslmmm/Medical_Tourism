import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';


// GET: Fetch all payments
export async function GET() {
  try {
    const contactForm = await prisma.contact_us.findMany();
    return NextResponse.json(contactForm, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

// POST: Create a new Contact Form Submission
export async function POST(request: Request) {
    try {
      const { firstName, lastName, email, phoneNumber, country, type, message } = await request.json();

  
      // // Validate required fields
      // if (!firstName || !lastName || !email || !phoneNumber || !country || !type || !message) {
      //   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      // }
  
      // Create a new contact form entry
      const newContact = await prisma.contact_us.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          country,
          type,
          message,
        },
      });
  
      return NextResponse.json(newContact, { status: 201 });
    } catch (error) {
      console.error("Error creating contact form entry:", error);
      return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
    }
  }
