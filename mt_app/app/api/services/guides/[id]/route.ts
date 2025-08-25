import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';




/**
 * GET: Fetch a hospital by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const guide_id = parseInt(resolvedParams.id, 10);

    if (isNaN(guide_id)) {
      return NextResponse.json({ error: "Invalid guide ID" }, { status: 400 });
    }

    const guide = await prisma.guides.findUnique({
      where: { guide_id },
      include: {
        guide_education: true,
        languages: true,
        review_guide: true,
        guide_bookings: true,
      },
    });

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    return NextResponse.json(guide, { status: 200 });
  } catch (error) {
    console.error("Error fetching guide:", error);
    return NextResponse.json({ error: "Failed to fetch guide" }, { status: 500 });
  }
}


/**
 * PUT: Update a guide by ID
 */
type LanguagesProficiency = "Basic" | "Conversational" | "Fluent" | "Native";
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
      const guide_id = parseInt(params.id, 10);

      if (isNaN(guide_id)) {
          return NextResponse.json({ error: "Invalid guide ID" }, { status: 400 });
      }

      const body = await request.json();

      // Check if the guide exists
      const existingGuide = await prisma.guides.findUnique({
          where: { guide_id },
      });

      if (!existingGuide) {
          return NextResponse.json({ error: "Guide not found" }, { status: 404 });
      }

      // Update guide details
      const updatedGuide = await prisma.guides.update({
          where: { guide_id },
          data: {
              name: body.name,
              email: body.email,
              phone: body.phone,
              rating: body.rating,
              nationality: body.nationality,
              image: body.image,
              birthofday: body.birthofday ? new Date(body.birthofday) : existingGuide.birthofday,
              address: body.address,
              profile_summary: body.profile_summary,
              language: body.language
          },
      });

      // Update or Add guide's Educations
      if (Array.isArray(body.educations)) {
          for (const edu of body.educations) {
              if (edu.id) {
                  await prisma.guide_education.update({
                      where: { education_id: edu.id },
                      data: {
                          degree: edu.degree,
                          field_of_study: edu.field_of_study,
                          institution: edu.institution,
                      },
                  });
              } else {
                  await prisma.guide_education.create({
                      data: {
                          guide_id,
                          degree: edu.degree,
                          field_of_study: edu.field_of_study,
                          institution: edu.institution,
                      },
                  });
              }
          }
      }

      // Update or Add guide's Languages
      if (Array.isArray(body.languages)) {
          for (const lang of body.languages) {
              if (lang.id) {
                  await prisma.languages.update({
                      where: { lang_id: lang.id },
                      data: {
                          language_name: lang.language_name,
                          proficiency: lang.proficiency as LanguagesProficiency,
                      },
                  });
              } else {
                  await prisma.languages.create({
                      data: {
                          guide_id,
                          language_name: lang.language_name,
                          proficiency: lang.proficiency as LanguagesProficiency,
                      },
                  });
              }
          }
      }

      return NextResponse.json(
          { message: "Guide, education, and languages updated successfully", updatedGuide },
          { status: 200 }
      );
  } catch (error) {
      console.error("Error updating guide:", error);
      return NextResponse.json({ error: "Failed to update guide" }, { status: 500 });
  }
}


/**
   * DELETE: Remove a guide by ID
   */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
      const guide_id = parseInt(params.id, 10);

      if (isNaN(guide_id)) {
          return NextResponse.json({ error: "Invalid guide ID" }, { status: 400 });
      }

      // Check if the guide exists
      const existingGuide = await prisma.guides.findUnique({
          where: { guide_id },
          include: {
              guide_education: true,
              languages: true
          }
      });

      if (!existingGuide) {
          return NextResponse.json({ error: "Guide not found" }, { status: 404 });
      }

      // Delete associated education records
      await prisma.guide_education.deleteMany({
          where: { guide_id }
      });

      // Delete associated review records
      await prisma.review_guide.deleteMany({
          where: { guide_id }
      });

      // Delete associated language records
      await prisma.languages.deleteMany({
          where: { guide_id }
      });

      // Delete the guide
      await prisma.guides.delete({
          where: { guide_id }
      });

      return NextResponse.json({ message: "Guide and related data deleted successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error deleting guide:", error);
      return NextResponse.json({ error: "Failed to delete guide" }, { status: 500 });
  }
}



/**
 * PUT: TEST CASE
 */
// {
//   "name": "Updated John Doe",
//   "email": "updated@example.com",
//   "phone": "+9876543210",
//   "rating": 4.8,
//   "nationality": "Canadian",
//   "image": "https://example.com/updated-profile.jpg",
//   "birthofday": "1985-06-15",
//   "address": "456 Maple St, Toronto",
//   "profile_summary": "Highly experienced medical guide.",
//   "language": "Arabic",
//   "educations": [
//       { "id": 5, "degree": "Master's", "field_of_study": "Translation Studies", "institution": "Oxford University" }
//   ],
//   "languages": [
//       { "id": 1, "language_name": "French", "proficiency": "Fluent" }
//   ]
// }
