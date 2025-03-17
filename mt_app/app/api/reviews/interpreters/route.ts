import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const reviews = await prisma.review_inter.findMany();
      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }


/**
   * POST: Add a new Interpreter
*/
export async function POST(request: Request) {
    try {
        const {
            user_id,
            interpreter_id,
            rating,
            title_review,
            comment
        } = await request.json();

        const newReview = await prisma.review_inter.create({
            data: {
                user_id,
                interpreter_id,
                rating,
                title_review,
                comment,
                created_at: new Date(),
            },
            select: { review_id: true }
        });

        return NextResponse.json({ 
            message: "Interpreter review created successfully", 
            review_id: newReview.review_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating interpreter review:", error);
        return NextResponse.json({ error: "Failed to create interpreter review" }, { status: 500 });
    }
}

// {
//     "user_id": 1,
//     "interpreter_id": 1,
//     "rating": 4.2,
//     "title_review": "Great Service!",
//     "comment": "The staff was very professional and the service was excellent."
// }