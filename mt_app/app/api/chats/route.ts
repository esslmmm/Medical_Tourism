import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from '../../api/auth/auth';

const prisma = new PrismaClient();

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
                OR: [
                    { user1_id: userId },
                    { user2_id: userId }
                ]
            },
            include: {
                messages: {
                    include:{
                        user_messages_receiver_idTouser: true,
                    },
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

        const messageData: any = {
            chat_id: chat.chat_id,
            sender_id,
            message,
            message_type: message_type || 'TEXT',
            timestamp: new Date().toISOString(),
        };

        // Add file-related fields only if they exist
        if (file_url) messageData.file_url = file_url;
        if (file_name) messageData.file_name = file_name;
        if (file_size) messageData.file_size = file_size;
        if (file_type) messageData.file_type = file_type;

        // Only include receiver_id if it's provided and valid
        if (receiver_id) {
            messageData.receiver_id = receiver_id;
        }

        const newMessage = await prisma.messages.create({
            data: messageData
        });

        return NextResponse.json({
            message: "Message sent successfully",
            message_id: newMessage.message_id,
            chat_id: chat.chat_id,
            timestamp: newMessage.timestamp || new Date().toISOString()
        }, { status: 201 });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

export async function findOrCreateChat(topic: string, sender_id: number, receiver_id?: number) {
    if (receiver_id) {
        // When both users are known, first check if there's already an existing chat between them
        // Check both directions: (user1=sender, user2=receiver) OR (user1=receiver, user2=sender)
        let existingChat = await prisma.chat.findFirst({
            where: {
                topic,
                OR: [
                    // Chat where sender is user1 and receiver is user2
                    {
                        user1_id: sender_id,
                        user2_id: receiver_id
                    },
                    // Chat where receiver is user1 and sender is user2
                    {
                        user1_id: receiver_id,
                        user2_id: sender_id
                    }
                ]
            },
            orderBy: {
                chat_id: 'asc'
            }
        });

        if (existingChat) {
            return existingChat;
        }

        // If no existing chat found, look for a WAITING chat created by the receiver
        // that this sender can join
        let waitingChat = await prisma.chat.findFirst({
            where: {
                topic,
                user1_id: receiver_id, // The receiver created this waiting chat
                user2_id: null,        // And it's still waiting for someone to join
            },
            orderBy: {
                chat_id: 'asc'
            }
        });

        if (waitingChat) {
            // Join that waiting chat by setting user2_id to sender_id
            return await prisma.chat.update({
                where: { chat_id: waitingChat.chat_id },
                data: { user2_id: sender_id }
            });
        }

        // If no waiting chat found, create a brand new chat
        return await prisma.chat.create({
            data: {
                topic,
                user1_id: sender_id,
                user2_id: receiver_id
            }
        });
    } else {
        // No receiver: create or reuse a waiting chat created by this sender
        let existingWaitingChat = await prisma.chat.findFirst({
            where: {
                topic,
                user1_id: sender_id,
                user2_id: null
            },
            orderBy: {
                chat_id: 'asc'
            }
        });

        if (existingWaitingChat) return existingWaitingChat;

        // Create new waiting chat
        return await prisma.chat.create({
            data: {
                topic,
                user1_id: sender_id,
                user2_id: null
            }
        });
    }
}

// Optional: Helper function to get all chats for a specific user
export async function getUserChats(userId: number) {
    return await prisma.chat.findMany({
        where: {
            OR: [
                { user1_id: userId },
                { user2_id: userId }
            ]
        },
        include: {
            messages: {
                orderBy: {
                    timestamp: 'desc'
                },
                take: 1 // Get only the latest message for preview
            },
            user_chat_user1_idTouser: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            },
            user_chat_user2_idTouser: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        },
        orderBy: {
            timestamp: 'desc'
        }
    });
}


// {
//     "sender_id": 1,
//     "receiver_id": 3,
//     "message": "Hello, how are you?"
// }