import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export async function GET() {
    try {
      const interpreters = await prisma.interpreters.findMany();
      return NextResponse.json(interpreters);
    } catch (error) {
      console.error("Error fetching interpreters:", error);
      return NextResponse.json({ error: "Failed to fetch interpreters" }, { status: 500 });
    }
  }



  
  type LanguagesProficiency = "Basic" | "Conversational" | "Fluent" | "Native";

/**
 * POST: Add a new Interpreter
 */
export async function POST(request: Request) {
  try {
      const {
          name,
          email,
          phone,
          rating,
          nationality,
          image,
          birthofday,
          address,
          profile_summary,
          language,
          educations,
          languages
      } = await request.json();

      const newInterpreter = await prisma.interpreters.create({
          data: {
              name,
              email,
              phone,
              rating,
              nationality,
              image,
              birthofday: new Date(birthofday),
              address,
              profile_summary,
              language,
              create_at: new Date(),
          },
          select: { interpreter_id: true }
      });

      if (Array.isArray(educations) && educations.length > 0) {
          await prisma.inter_education.createMany({
              data: educations.map((edu: { degree: string; field_of_study: string; institution: string }) => ({
                  interpreter_id: newInterpreter.interpreter_id,
                  degree: edu.degree,
                  field_of_study: edu.field_of_study,
                  institution: edu.institution
              })),
          });
      }

      if (Array.isArray(languages) && languages.length > 0) {
          await prisma.languages.createMany({
              data: languages.map((lan: { language_name: string; proficiency: string }) => ({
                  interpreter_id: newInterpreter.interpreter_id,
                  language_name: lan.language_name,
                  proficiency: lan.proficiency as LanguagesProficiency
              })),
          });
      }

      return NextResponse.json({ 
          message: "Interpreter and related data created successfully", 
          interpreter_id: newInterpreter.interpreter_id 
      }, { status: 201 });

  } catch (error) {
      console.error("Error creating interpreter:", error);
      return NextResponse.json({ error: "Failed to create interpreter" }, { status: 500 });
  }
}

// {
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "phone": "+1234567890",
//     "rating": 4.5,
//     "nationality": "American",
//     "image": "https://example.com/profile.jpg",
//     "birthofday": "1990-01-01",
//     "address": "123 Main St, New York",
//     "profile_summary": "Experienced interpreter in medical tourism.",
//     "language": "English",
//     "educations": [
//         { "degree": "Bachelor's", "field_of_study": "Linguistics", "institution": "Harvard University" },
//         { "degree": "Master's", "field_of_study": "Translation Studies", "institution": "Oxford University" }
//     ],
//     "languages": [
//         { "language_name": "English", "proficiency": "Fluent" },
//         { "language_name": "Japanese", "proficiency": "Fluent" }
//     ]
// }
