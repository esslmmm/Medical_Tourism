import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {

    const resolvedParams = await params;
    const userId = Number(resolvedParams.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        package_bookings: {
          include: {
            packages: true,
          },
        },
        review_hospital: {
          include: {
            hospitals: {
              select: {
                name: true,
              },
            },
          },
        },
        review_hotel: {
          include: {
            hotels: {
              select: {
                name: true,
              },
            },
          },
        },
        review_guide: {
          include: {
            guides: {
              select: {
                name: true,
              },
            },
          },
        },
        chat_chat_user1_idTouser: true,
        chat_chat_user2_idTouser: true,
        messages_messages_sender_idTouser: true,
        payment: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
