import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const history = await prisma.action_history.findMany();
      return NextResponse.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
  }




/**
 * POST: Add a new History
 */
export async function POST(request: Request) {
    try {
        const {
            user_id,
            type_action,
            action,
            id
        } = await request.json();

        const newHistory = await prisma.action_history.create({
            data: {
                user_id,
                type_action,
                action,
                id,
                timestamp: new Date(),
            },
        });

        return NextResponse.json({ 
            message: "Action history recorded successfully", 
            action_id: newHistory.action_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating action history:", error);
        return NextResponse.json({ error: "Failed to create action history" }, { status: 500 });
    }
}


/**
 * DELETE: Remove a action history by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const action_id = parseInt(params.id, 10);

        if (isNaN(action_id)) {
            return NextResponse.json({ error: "Invalid action ID" }, { status: 400 });
        }

        const existingAction = await prisma.action_history.findUnique({
            where: { action_id },
        });

        if (!existingAction) {
            return NextResponse.json({ error: "Action not found" }, { status: 404 });
        }

        await prisma.action_history.delete({
            where: { action_id },
        });

        return NextResponse.json(
            { message: "Action history deleted successfully", action_id },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting action history:", error);
        return NextResponse.json({ error: "Failed to delete action history" }, { status: 500 });
    }
}



/**
 * PUT: TEST CASE
 */
// {
//     "user_id": 2,
//     "type_action": "Remove",
//     "action": "Removed a doctor's record",
//     "id": 2
// }