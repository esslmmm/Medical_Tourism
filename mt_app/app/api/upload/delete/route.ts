import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '../cloudinary';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID required' }, { status: 400 });
    }

    // Get file from database
    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) }
    });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.cloudinaryId);

    // Delete from database
    await prisma.file.delete({
      where: { id: parseInt(fileId) }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}