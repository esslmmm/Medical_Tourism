import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


/**
 * GET: Fetch a Hotel review by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const review_id = parseInt(params.id, 10);

    if (isNaN(review_id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await prisma.review_hotel.findUnique({
      where: { review_id },
      include: {
        hotels: true,
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}



/**
 * PUT: Update a Hotel review by ID
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const review_id = parseInt(params.id, 10);

        if (isNaN(review_id)) {
            return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
        }

        const body = await request.json();

        const existingReview = await prisma.review_hotel.findUnique({
            where: { review_id },
        });

        if (!existingReview) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const updatedReview = await prisma.review_hotel.update({
            where: { review_id },
            data: {
                user_id: body.user_id,
                hotel_id: body.hotel_id,
                rating: body.rating,
                title_review: body.title_review,
                comment: body.comment,
            },
        });

        return NextResponse.json(
            { message: "Hotel review updated successfully", updatedReview },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating hotel review:", error);
        return NextResponse.json({ error: "Failed to update hotel review" }, { status: 500 });
    }
}



/**
 * DELETE: Remove a hotel review by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const review_id = parseInt(params.id, 10);

        if (isNaN(review_id)) {
            return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
        }

        const existingReview = await prisma.review_hotel.findUnique({
            where: { review_id },
        });

        if (!existingReview) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        await prisma.review_hotel.delete({
            where: { review_id }
        });

        return NextResponse.json({ message: "Hotel review deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting hotel review:", error);
        return NextResponse.json({ error: "Failed to delete hotel review" }, { status: 500 });
    }
}