import { auth } from "../auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ authenticated: false });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expiresAt = (session as any)?.expiresAt;
    
    if (!expiresAt) {
      return NextResponse.json({ authenticated: true });
    }

    const expiryTime = Math.floor(expiresAt / 1000);
    const timeLeft = expiryTime - currentTime;
    
    // Check if session is about to expire (within 5 minutes)
    const expiryWarning = 5 * 60; // 5 minutes
    
    const response = NextResponse.json({
      authenticated: true,
      timeLeft: timeLeft,
      expiryWarning: timeLeft <= expiryWarning && timeLeft > 0
    });

    if (timeLeft <= expiryWarning && timeLeft > 0) {
      response.headers.set('X-Session-Expiry-Warning', 'true');
      response.headers.set('X-Time-Left', String(timeLeft));
    }

    return response;
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}