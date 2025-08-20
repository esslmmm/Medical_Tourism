import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';




export async function GET() {
    try {
      const messages = await prisma.messages.findMany();
      return NextResponse.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
  }

