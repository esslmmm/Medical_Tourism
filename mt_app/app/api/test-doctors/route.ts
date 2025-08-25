import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Test route works" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: "POST works", 
      received: body 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "POST failed", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}