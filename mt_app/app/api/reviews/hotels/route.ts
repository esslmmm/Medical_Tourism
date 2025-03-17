import { packages_package_type, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
    try {
      const reviews = await prisma.review_hotel.findMany();
      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }


/**
   * POST: Add a new Hotel review
*/
export async function POST(request: Request) {
    try {
        const {
            user_id,
            hotel_id,
            rating,
            title_review,
            comment
        } = await request.json();

        const newReview = await prisma.review_hotel.create({
            data: {
                user_id,
                hotel_id,
                rating,
                title_review,
                comment,
                created_at: new Date(),
            },
            select: { review_id: true }
        });

        return NextResponse.json({ 
            message: "Hotel review created successfully", 
            review_id: newReview.review_id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating hotel review:", error);
        return NextResponse.json({ error: "Failed to create hotel review" }, { status: 500 });
    }
}

// {
//     "user_id": 1,
//     "hotel_id": 1,
//     "rating": 5,
//     "title_review": "Great Service!",
//     "comment": "The staff was very professional and the service was excellent."
// }
