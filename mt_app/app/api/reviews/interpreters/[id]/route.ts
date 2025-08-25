import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET: Fetch a guide review by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const review_id = parseInt(resolvedParams.id, 10);

    if (isNaN(review_id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await prisma.review_guide.findUnique({
      where: { review_id },
      include: {
        guides: true,
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
 * PUT: Update a guide review by ID
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const review_id = parseInt(params.id, 10);

        if (isNaN(review_id)) {
            return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
        }

        const body = await request.json();

        const existingReview = await prisma.review_guide.findUnique({
            where: { review_id },
        });

        if (!existingReview) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const updatedReview = await prisma.review_guide.update({
            where: { review_id },
            data: {
                user_id: body.user_id,
                guide_id: body.guide_id,
                rating: body.rating,
                title_review: body.title_review,
                comment: body.comment,
            },
        });

        return NextResponse.json(
            { message: "guide review updated successfully", updatedReview },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating guide review:", error);
        return NextResponse.json({ error: "Failed to update guide review" }, { status: 500 });
    }
}



/**
 * DELETE: Remove a guide review by ID
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const review_id = parseInt(params.id, 10);

        if (isNaN(review_id)) {
            return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
        }

        const existingReview = await prisma.review_guide.findUnique({
            where: { review_id },
        });

        if (!existingReview) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        await prisma.review_guide.delete({
            where: { review_id }
        });

        return NextResponse.json({ message: "guide review deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting guide review:", error);
        return NextResponse.json({ error: "Failed to delete guide review" }, { status: 500 });
    }
}