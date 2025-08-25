import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';



export async function GET() {
    try {
      const reviews = await prisma.review_guide.findMany();
      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }


/**
   * POST: Add a new Guide
*/
export async function POST(request: Request) {
    try {
        const {
            user_id,
            guide_id,
            rating,
            title_review,
            comment
        } = await request.json();

        const newReview = await prisma.review_guide.create({
            data: {
                user_id,
                guide_id,
                rating,
                title_review,
                comment,
                created_at: new Date(),
            },
            select: { review_id: true }
        });

        return NextResponse.json({ 
            message: "Guide review created successfully", 
            review_id: newReview.review_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating guide review:", error);
        return NextResponse.json({ error: "Failed to create guide review" }, { status: 500 });
    }
}

// {
//     "user_id": 1,
//     "guide_id": 1,
//     "rating": 4.2,
//     "title_review": "Great Service!",
//     "comment": "The staff was very professional and the service was excellent."
// }