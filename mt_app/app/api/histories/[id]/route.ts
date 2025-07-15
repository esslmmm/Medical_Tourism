import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a Action by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
        const resolvedParams = await params;
        const action_id = parseInt(resolvedParams.id, 10);

    if (isNaN(action_id)) {
      return NextResponse.json({ error: "Invalid action ID" }, { status: 400 });
    }

    const doctor = await prisma.action_history.findUnique({
      where: { action_id },
      include: {
        user: true
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Action not found" }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    console.error("Error fetching Action history:", error);
    return NextResponse.json({ error: "Failed to fetch action history" }, { status: 500 });
  }
}


/**
 * PUT: Update a action history by ID
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const action_id = parseInt(params.id, 10);

        if (isNaN(action_id)) {
            return NextResponse.json({ error: "Invalid action ID" }, { status: 400 });
        }

        const body = await request.json();

        const existingAction = await prisma.action_history.findUnique({
            where: { action_id },
        });

        if (!existingAction) {
            return NextResponse.json({ error: "Action not found" }, { status: 404 });
        }

        const updatedAction = await prisma.action_history.update({
            where: { action_id },
            data: {
                user_id: body.user_id,
                type_action: body.type_action,
                action: body.action,
                id: body.id
            },
        });

        return NextResponse.json(
            { message: "Action history updated successfully", updatedAction },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating action history:", error);
        return NextResponse.json({ error: "Failed to update action history" }, { status: 500 });
    }
}