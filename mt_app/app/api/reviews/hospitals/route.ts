import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const reviews = await prisma.review_hospital.findMany();
      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }


/**
   * POST: Add a new Hospital review
*/
export async function POST(request: Request) {
    try {
        const {
            user_id,
            hospital_id,
            rating,
            title_review,
            comment
        } = await request.json();

        const newReview = await prisma.review_hospital.create({
            data: {
                user_id,
                hospital_id,
                rating,
                title_review,
                comment,
                created_at: new Date(),
            },
            select: { review_id: true }
        });

        return NextResponse.json({ 
            message: "Hospital review created successfully", 
            review_id: newReview.review_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating hospital review:", error);
        return NextResponse.json({ error: "Failed to create hospital review" }, { status: 500 });
    }
}

// {
//     "user_id": 1,
//     "hospital_id": 1,
//     "rating": 4.5,
//     "title_review": "Great Service!",
//     "comment": "The staff was very professional and the service was excellent."
// }