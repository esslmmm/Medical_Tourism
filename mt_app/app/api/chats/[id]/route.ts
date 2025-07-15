import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * GET : Get all chats where the user is involved
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const resolvedParams = await params;
        const userId = parseInt(resolvedParams.id, 10);

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
                        users_messages_receiver_idTousers: true,
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

// /**
//  * DELETE: Delete chat and related message
//  */
// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     try {
//         const message_id = parseInt(params.id, 10);
//         const { sender_id } = await request.json();

//         if (isNaN(message_id) || !sender_id) {
//             return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
//         }

//         const existingMessage = await prisma.messages.findUnique({
//             where: { message_id },
//         });

//         if (!existingMessage) {
//             return NextResponse.json({ error: "Message not found" }, { status: 404 });
//         }

//         if (existingMessage.sender_id !== sender_id) {
//             return NextResponse.json({ error: "Unauthorized to delete this message" }, { status: 403 });
//         }

//         await prisma.messages.delete({
//             where: { message_id }
//         });

//         return NextResponse.json({
//             message: "Message deleted successfully"
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Error deleting message:", error);
//         return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
//     }
// }