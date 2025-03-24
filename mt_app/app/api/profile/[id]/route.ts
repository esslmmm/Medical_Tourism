import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a User by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user_id = parseInt(params.id, 10);

    if (isNaN(user_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { user_id },
      include: {
        package_bookings: {
          include: {
            packages: true
          }
        },
        review_hospital: {
          include: {
            hospitals: {
              select: {
                name: true,
              }
            }
          }
        },
        review_hotel: {
          include: {
            hotels: {
              select: {
                name: true,
              }
            }
          }
        },
        review_inter: {
          include: {
            interpreters: {
              select: {
                name: true,
              }
            }
          }
        },
        chat_chat_user1_idTousers: true,
        chat_chat_user2_idTousers: true,
        messages_messages_receiver_idTousers: true,
        messages_messages_sender_idTousers: true,
        payment: true
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