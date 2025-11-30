import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Note: guides table doesn't exist in the current schema
    // const guides = await prisma.guides.findMany({
    //   select: { guide_id: true, name: true }
    // });
    // return NextResponse.json(guides);
    return NextResponse.json({ message: 'Guides endpoint not yet implemented' });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 });
  }
}


