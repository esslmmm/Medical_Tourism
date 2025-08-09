import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '../../../utils/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    console.log('🔍 Testing user role for email:', email);
    
    const user = await findUserByEmail(email);
    
    console.log('🔍 Database user found:', user);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_email_verified: user.is_email_verified,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Error testing user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
