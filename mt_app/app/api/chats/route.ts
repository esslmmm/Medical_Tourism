import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { auth } from '../../api/auth/auth';


/*
    GET: Retrieve all the chats (for admin and staff)
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
        const chats = await prisma.chat.findMany({
            where: {
                    customerId: userId
            },
            include: {
                messages: {
                    orderBy: { timestamp: "desc" },
                }
            }
        });

        return NextResponse.json({ chats }, { status: 200 });

    } catch (error) {
        console.error("Error fetching chats:", error);
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
    }
}

  

/*
    POST: Create or find the existing chat box
*/
export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customerId = Number(session.user.id);

    if (!topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (isNaN(customerId)) {
      return NextResponse.json({ error: 'Invalid user ID(s)' }, { status: 400 });
    }

    
    const chatRoom = await prisma.chat.create({
      data: {
        customerId,
        topic,
      }
    });

    return NextResponse.json(chatRoom);
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
}


// {
//     "sender_id": 1,
//     "receiver_id": 3,
//     "message": "Hello, how are you?"
// }