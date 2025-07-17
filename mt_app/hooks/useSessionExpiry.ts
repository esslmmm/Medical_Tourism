'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useSessionExpiry = () => {
  const { data: session, status, update } = useSession();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const router = useRouter();

  const calculateTimeLeft = useCallback(() => {
    const expiresAt = (session as any)?.expiresAt;
    
    if (!expiresAt) {
      console.log('❌ No expiresAt found in session');
      return 0;
    }
    
    const now = Date.now();
    const timeRemaining = expiresAt - now;
    
    console.log('⏰ Time calculation:', {
      now: now,
      expiresAt: expiresAt,
      timeRemaining: timeRemaining,
      timeRemainingSeconds: Math.floor(timeRemaining / 1000)
    });
    
    return Math.max(0, Math.floor(timeRemaining / 1000));
  }, [(session as any)?.expiresAt]);

  const extendSession = useCallback(async () => {
    try {
      console.log('🔄 Extending session...');
      if ((session as any)?.authMethod === 'google') {
        await update();
        setShowWarning(false);
        console.log('✅ Session extended successfully');
      } else {
        console.log('🔄 Redirecting to login for OTP user');
        router.push('/');
      }
    } catch (error) {
      console.error('❌ Failed to extend session:', error);
      router.push('/');
    }
  }, [update, router, (session as any)?.authMethod]);

  useEffect(() => {
    
    if (status !== 'authenticated' || !session) {
      console.log('❌ Not authenticated or no session');
      return;
    }

    const updateTimer = () => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      const warningThreshold = (session as any)?.authMethod === 'otp' 
        ? 2.5 * 60 
        : 5 * 60;
      
      const shouldShowWarning = remaining <= warningThreshold && remaining > 0;
      
      setShowWarning(shouldShowWarning);
      
      // Update debug info
      setDebugInfo({
        remaining,
        warningThreshold,
        shouldShowWarning,
        authMethod: (session as any)?.authMethod,
        expiresAt: (session as any)?.expiresAt,
        currentTime: Date.now()
      });
      
      if (remaining <= 0) {
        console.log('🔚 Session expired, redirecting...');
        router.push('/');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [session, status, calculateTimeLeft, router]);

  // Log when showWarning changes
  useEffect(() => {
    console.log('🚨 Warning state changed:', showWarning);
  }, [showWarning]);

  return {
    session,
    timeLeft,
    showWarning,
    extendSession,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    authMethod: (session as any)?.authMethod,
    debugInfo, // Added for debugging
  };
};