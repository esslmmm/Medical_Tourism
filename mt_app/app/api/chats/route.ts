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
        const { topic, sender_id, receiver_id, message, message_type, file_url, file_name, file_size, file_type} = await request.json();

        if (!sender_id || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // For file messages, ensure file_url is provided
        if (message_type !== 'TEXT' && !file_url) {
        return NextResponse.json(
            { error: 'file_url is required for non-text messages' },
            { status: 400 }
        );
        }

        // Find or create a chat
        const chat = await findOrCreateChat(topic, sender_id, receiver_id);

        // Create a new message
        const newMessage = await prisma.messages.create({
            data: {
                chat_id: chat.chat_id, // Link message to chat
                sender_id,
                receiver_id,
                message,
                message_type,
                file_url,
                file_name,
                file_size,
                file_type
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



export async function findOrCreateChat(topic: string, sender_id: number, receiver_id?: number) {
  if (receiver_id) {
    // Normal 1-to-1 chat logic
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
          topic: topic,
          user1_id: sender_id,
          user2_id: receiver_id
        }
      });
    }

    return chat;
  } else {
    // Create a "waiting room" chat for sender only
    return await prisma.chat.create({
      data: {
        topic: topic,
        user1_id: sender_id,
        user2_id: null // you must allow null in your schema
      }
    });
  }
}


// {
//     "sender_id": 1,
//     "receiver_id": 3,
//     "message": "Hello, how are you?"
// }