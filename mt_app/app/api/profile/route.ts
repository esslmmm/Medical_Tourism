import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '../auth/auth';



/**
 * GET: Fetch a User by ID
 */
export async function GET(request: Request) {
  try {
    const session = await auth()
  
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId  },
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

// PUT request - Update an appointment by ID
export async function PUT(req: Request) {
  try {
    const { name, nationality } = await req.json()
    const session = await auth()
  
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = Number(session.user.id);

    const updatedAppointment = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        nationality
      }
    })

    return NextResponse.json(updatedAppointment, { status: 200 })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}