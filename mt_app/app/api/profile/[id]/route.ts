import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a User by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        package_bookings: {
          include: {
            packages: true
          }
        },
        hospital_reviews: {
          include: {
            hospitals: {
              select: {
                name: true,
              }
            }
          }
        },
        hotel_reviews: {
          include: {
            hotels: {
              select: {
                name: true,
              }
            }
          }
        },
        interpreter_reviews: {
          include: {
            interpreters: {
              select: {
                name: true,
              }
            }
          }
        },
        chat_user1Id: true,
        chat_user2Id: true,
        messages_senderId: true,
        messages_receiverId: true,
        payments: true
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

// PUT request - Update an appointment by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email } = await req.json()

    const userId = Number(params.id)
    const updatedAppointment = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email
      }
    })

    return NextResponse.json(updatedAppointment, { status: 200 })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}