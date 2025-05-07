import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



/*
    GET: Retrieve all the chats (for admin and staff)
*/
export async function GET() {
    try {
      const chats = await prisma.chat.findMany();
      return NextResponse.json(chats);
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
        const { sender_id, receiver_id, message } = await request.json();

        if (!sender_id || !receiver_id || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find or create a chat
        const chat = await findOrCreateChat(sender_id, receiver_id);

        // Create a new message
        const newMessage = await prisma.messages.create({
            data: {
                chat_id: chat.chat_id, // Link message to chat
                sender_id,
                receiver_id,
                message,
                timestamp: new Date()
            }
        });

        return NextResponse.json({
            message: "Message sent successfully",
            message_id: newMessage.message_id
        }, { status: 201 });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}



async function findOrCreateChat(sender_id: number, receiver_id: number) {
    let chat = await prisma.chat.findFirst({
        where: {
            OR: [
                { user1_id: sender_id, user2_id: receiver_id },
                { user1_id: receiver_id, user2_id: sender_id }
            ]
        }
    });

    if (!chat) {
        chat = await prisma.chat.create({
            data: {
                user1_id: sender_id,
                user2_id: receiver_id
            }
        });
    }

    return chat;
}

// {
//     "sender_id": 1,
//     "receiver_id": 3,
//     "message": "Hello, how are you?"
// }