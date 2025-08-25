import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SaveMetadataRequest {
  bookingId: string;
  userId: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  cloudinaryId: string;
  category: 'CHAT_ATTACHMENT' | 'MEDICAL_REPORT' | 'DOCUMENT',
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const {  
      userId, 
      fileName, 
      originalName, 
      fileType, 
      fileSize, 
      cloudinaryId,
      category,
      url
    }: SaveMetadataRequest = await request.json();

    if (!originalName || !category) {
          return NextResponse.json({ error: "Package name and type are required" }, { status: 400 });
        }

    // Save to database
    const fileRecord = await prisma.file.create({
      data: {
        userId: parseInt(userId),
        originalName,
        fileName,
        fileType,
        fileSize,
        cloudinaryId,
        category,
        url,
        uploadedAt: new Date(),
      }
    });

    return NextResponse.json({ success: true, fileId: fileRecord.id });

  } catch (error) {
    console.error('Error saving file metadata:', error);
    return NextResponse.json({ error: 'Failed to save file metadata' }, { status: 500 });
  }
}