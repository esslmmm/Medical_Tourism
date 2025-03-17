import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * Get a Chat_id to Retrieving messages in chat
 * When a user clicks on a chat, fetch all messages inside that chat.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const chatId = parseInt(params.id, 10);

        if (isNaN(chatId)) {
            return NextResponse.json({ error: "Invalid chat ID" }, { status: 400 });
        }

        // Get all messages in a chat
        const messages = await prisma.messages.findMany({
            where: { chat_id: chatId },
            orderBy: { timestamp: "asc" } // ✅ Oldest to newest
        });

        return NextResponse.json({ messages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}


/**
 * PUT: Change information after sent message
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const message_id = parseInt(params.id, 10);
        const { sender_id, message } = await request.json();

        if (isNaN(message_id) || !sender_id || !message) {
            return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
        }
        // Find the message
        const existingMessage = await prisma.messages.findUnique({
            where: { message_id },
        });

        if (!existingMessage) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        if (existingMessage.sender_id !== sender_id) {
            return NextResponse.json({ error: "Unauthorized to edit this message" }, { status: 403 });
        }

        const updatedMessage = await prisma.messages.update({
            where: { message_id },
            data: {
                message
                // updated_at: new Date()    Edit fron-end showing the edit time.
            }
        });

        return NextResponse.json({
            message: "Message updated successfully",
            updatedMessage
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
    }
}


/**
 * DELETE: Delete message after sent
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const message_id = parseInt(params.id, 10);
        const { sender_id } = await request.json();

        if (isNaN(message_id) || !sender_id) {
            return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
        }

        const existingMessage = await prisma.messages.findUnique({
            where: { message_id },
        });

        if (!existingMessage) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        if (existingMessage.sender_id !== sender_id) {
            return NextResponse.json({ error: "Unauthorized to delete this message" }, { status: 403 });
        }

        await prisma.messages.delete({
            where: { message_id }
        });

        return NextResponse.json({
            message: "Message deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}