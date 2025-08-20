import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';




/**
 * GET: Fetch a hospital by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const interpreter_id = parseInt(resolvedParams.id, 10);

    if (isNaN(interpreter_id)) {
      return NextResponse.json({ error: "Invalid interpreter ID" }, { status: 400 });
    }

    const interpreter = await prisma.interpreters.findUnique({
      where: { interpreter_id },
      include: {
        inter_education: true,
        languages: true,
        review_inter: true,
        inter_bookings: true,
      },
    });

    if (!interpreter) {
      return NextResponse.json({ error: "Interpreter not found" }, { status: 404 });
    }

    return NextResponse.json(interpreter, { status: 200 });
  } catch (error) {
    console.error("Error fetching interpreter:", error);
    return NextResponse.json({ error: "Failed to fetch interpreter" }, { status: 500 });
  }
}


/**
 * PUT: Update a Interpreter by ID
 */
type LanguagesProficiency = "Basic" | "Conversational" | "Fluent" | "Native";
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
      const interpreter_id = parseInt(params.id, 10);

      if (isNaN(interpreter_id)) {
          return NextResponse.json({ error: "Invalid interpreter ID" }, { status: 400 });
      }

      const body = await request.json();

      // Check if the interpreter exists
      const existingInterpreter = await prisma.interpreters.findUnique({
          where: { interpreter_id },
      });

      if (!existingInterpreter) {
          return NextResponse.json({ error: "Interpreter not found" }, { status: 404 });
      }

      // Update interpreter details
      const updatedInterpreter = await prisma.interpreters.update({
          where: { interpreter_id },
          data: {
              name: body.name,
              email: body.email,
              phone: body.phone,
              rating: body.rating,
              nationality: body.nationality,
              image: body.image,
              birthofday: body.birthofday ? new Date(body.birthofday) : existingInterpreter.birthofday,
              address: body.address,
              profile_summary: body.profile_summary,
              language: body.language
          },
      });

      // Update or Add Interpreter's Educations
      if (Array.isArray(body.educations)) {
          for (const edu of body.educations) {
              if (edu.id) {
                  await prisma.inter_education.update({
                      where: { education_id: edu.id },
                      data: {
                          degree: edu.degree,
                          field_of_study: edu.field_of_study,
                          institution: edu.institution,
                      },
                  });
              } else {
                  await prisma.inter_education.create({
                      data: {
                          interpreter_id,
                          degree: edu.degree,
                          field_of_study: edu.field_of_study,
                          institution: edu.institution,
                      },
                  });
              }
          }
      }

      // Update or Add Interpreter's Languages
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
                          interpreter_id,
                          language_name: lang.language_name,
                          proficiency: lang.proficiency as LanguagesProficiency,
                      },
                  });
              }
          }
      }

      return NextResponse.json(
          { message: "Interpreter, education, and languages updated successfully", updatedInterpreter },
          { status: 200 }
      );
  } catch (error) {
      console.error("Error updating interpreter:", error);
      return NextResponse.json({ error: "Failed to update interpreter" }, { status: 500 });
  }
}


/**
   * DELETE: Remove a Interpreter by ID
   */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
      const interpreter_id = parseInt(params.id, 10);

      if (isNaN(interpreter_id)) {
          return NextResponse.json({ error: "Invalid interpreter ID" }, { status: 400 });
      }

      // Check if the interpreter exists
      const existingInterpreter = await prisma.interpreters.findUnique({
          where: { interpreter_id },
          include: {
              inter_education: true,
              languages: true
          }
      });

      if (!existingInterpreter) {
          return NextResponse.json({ error: "Interpreter not found" }, { status: 404 });
      }

      // Delete associated education records
      await prisma.inter_education.deleteMany({
          where: { interpreter_id }
      });

      // Delete associated review records
      await prisma.review_inter.deleteMany({
          where: { interpreter_id }
      });

      // Delete associated language records
      await prisma.languages.deleteMany({
          where: { interpreter_id }
      });

      // Delete the interpreter
      await prisma.interpreters.delete({
          where: { interpreter_id }
      });

      return NextResponse.json({ message: "Interpreter and related data deleted successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error deleting interpreter:", error);
      return NextResponse.json({ error: "Failed to delete interpreter" }, { status: 500 });
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
//   "profile_summary": "Highly experienced medical interpreter.",
//   "language": "Arabic",
//   "educations": [
//       { "id": 5, "degree": "Master's", "field_of_study": "Translation Studies", "institution": "Oxford University" }
//   ],
//   "languages": [
//       { "id": 1, "language_name": "French", "proficiency": "Fluent" }
//   ]
// }
