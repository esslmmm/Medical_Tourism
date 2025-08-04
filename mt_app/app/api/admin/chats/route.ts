import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '../../../api/auth/auth';

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    const session = await auth();
      
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get waiting chats (user2_id is null) that current user can join
    // Exclude chats created by the current user to prevent joining own chats
    const waitingChats = await prisma.chat.findMany({
      where: {
        user2_id: null,
        NOT: {
          user1_id: userId // Don't show user's own waiting chats
        }
      },
      include: {
        messages: {
          include: {
            user_messages_receiver_idTouser: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: { timestamp: "desc" }
        },
        user_chat_user1_idTouser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        timestamp: "desc" // Most recent chats first
      }
    });

    // Get chats where current user is participating (either as user1 or user2)
    const userChats = await prisma.chat.findMany({
      where: {
        OR: [
          { user1_id: userId },
          { user2_id: userId }
        ]
      },
      include: {
        messages: {
          include: {
            user_messages_receiver_idTouser: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: { timestamp: "desc" }
        },
        user_chat_user1_idTouser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        user_chat_user2_idTouser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        timestamp: "desc" // Most recent chats first
      }
    });

    return NextResponse.json({ 
      waitingChats,
      userChats,
      // For backward compatibility, you can also return all chats combined
      chats: [...userChats, ...waitingChats]
    });

  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}

// Alternative version if you want everything in one query
export async function GET_ALTERNATIVE(req: Request) {
  try {
    const session = await auth();
      
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get all relevant chats in one query
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          // User's own chats (where they participate)
          { user1_id: userId },
          { user2_id: userId },
          // Available waiting chats (excluding user's own waiting chats)
          {
            user2_id: null,
            NOT: {
              user1_id: userId
            }
          }
        ]
      },
      include: {
        messages: {
          include: {
            user_messages_receiver_idTouser: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: { timestamp: "desc" }
        },
        user_chat_user1_idTouser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        user_chat_user2_idTouser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        timestamp: "desc"
      }
    });

    // Separate the chats for frontend convenience
    const userChats = chats.filter(chat => 
      chat.user1_id === userId || chat.user2_id === userId
    );
    
    const waitingChats = chats.filter(chat => 
      chat.user2_id === null && chat.user1_id !== userId
    );

    return NextResponse.json({ 
      chats, 
      userChats,
      waitingChats 
    });

  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}