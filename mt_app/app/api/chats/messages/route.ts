import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add this helper function at the top of your API file
async function assignStaffToChatIfNeeded(chatId: number, senderId: number) {
  try {
    // Check if the chat already has a staffId and get customerId
    const existingChat = await prisma.chat.findUnique({
      where: { chat_id: chatId },
      select: { staffId: true, customerId: true }
    });

    // If chat doesn't exist, throw error
    if (!existingChat) {
      throw new Error(`Chat with ID ${chatId} not found`);
    }

    // Prevent assigning senderId as staff if it's the same as customerId
    if (existingChat.customerId === senderId) {
      console.log(`Chat can not have same sender and customer`);
      return existingChat.staffId;
    }

    // If chat already has a staffId, no need to update
    if (existingChat.staffId) {
      console.log(`Chat ${chatId} already has staffId: ${existingChat.staffId}`);
      return existingChat.staffId;
    }

    // If no staffId, assign the current sender as staff
    console.log(`Assigning sender ${senderId} as staff for chat ${chatId}`);
    
    const updatedChat = await prisma.chat.update({
      where: { chat_id: chatId },
      data: { staffId: senderId }
    });

    console.log(`Successfully assigned staff ${senderId} to chat ${chatId}`);
    return updatedChat.staffId;

  } catch (error) {
    console.error('Error in assignStaffToChatIfNeeded:', error);
    throw error;
  }
}


export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    
    // Log the received data for debugging
    console.log('Received data:', data);
    
    const {
      message,
      message_type = 'TEXT',
      file_url,
      file_name,
      file_size,
      file_type,
      chat_id,
      sender_id,
    } = data;

    // More detailed validation with specific error messages
    const missingFields = [];
    
    if (!message) missingFields.push('message');
    if (!chat_id) missingFields.push('chat_id');
    if (!sender_id) missingFields.push('sender_id');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields,
          receivedData: data
        }, 
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message must be a string' },
        { status: 400 }
      );
    }

    // Convert to proper data types
    const parsedChatId = parseInt(chat_id);
    const parsedSenderId = parseInt(sender_id);
    const parsedFileSize = file_size ? parseInt(file_size) : null;

    // Validate converted values
    if (isNaN(parsedChatId)) {
      return NextResponse.json(
        { error: 'chat_id must be a valid number' },
        { status: 400 }
      );
    }

    if (isNaN(parsedSenderId)) {
      return NextResponse.json(
        { error: 'sender_id must be a valid number' },
        { status: 400 }
      );
    }

    if (file_size && isNaN(Number(parsedFileSize))) {
      return NextResponse.json(
        { error: 'file_size must be a valid number' },
        { status: 400 }
      );
    }

    // 🔥 ADD THIS: Staff assignment logic before creating the message
    try {
      await assignStaffToChatIfNeeded(parsedChatId, parsedSenderId);
    } catch (staffError) {
      console.error('Staff assignment failed:', staffError);
      // You can choose to continue or return error
      // Option 1: Continue anyway (recommended)
      console.log('Continuing with message creation despite staff assignment failure');
      
      // Option 2: Return error (uncomment if you want to stop on staff assignment failure)
      // return NextResponse.json(
      //   { 
      //     error: 'Failed to assign staff to chat', 
      //     details: staffError.message 
      //   },
      //   { status: 400 }
      // );
    }

    // Create the message with properly typed data (your existing code)
    const newMessage = await prisma.messages.create({
      data: {
        message,
        message_type,
        file_url: file_url || null,
        file_name: file_name || null,
        file_size: parsedFileSize,
        file_type: file_type || null,
        chat_id: parsedChatId,
        sender_id: parsedSenderId,
      },
    });

    console.log('Message created successfully:', newMessage);
    
    return NextResponse.json(newMessage, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating message:', error);
    
    // Handle Prisma-specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate entry' },
        { status: 409 }
      );
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Foreign key constraint failed - invalid chat_id or sender_id' },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.code === 'P2007') {
      return NextResponse.json(
        { error: 'Data validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create message',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}