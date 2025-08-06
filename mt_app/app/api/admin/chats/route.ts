import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '../../../api/auth/auth';

const prisma = new PrismaClient();
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
              OR: [
              { staffId: null },
              { staffId: userId }
            ]
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
