'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getRoleBasedRedirectUrl } from '../../../utils/roleRedirect';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (status === 'unauthenticated') {
      // Not authenticated, redirect to home
      router.push('/?isLoginOpen=true');
      return;
    }

    if (status === 'authenticated' && session?.user?.role) {
      // Get return URL from localStorage if available
      const returnUrl = localStorage.getItem('loginReturnUrl');
      const redirectUrl = getRoleBasedRedirectUrl(session.user.role, returnUrl || undefined);
      
      // Debug logging
      console.log('🔄 Auth Callback Debug:', {
        role: session.user.role,
        returnUrl,
        redirectUrl,
        session: session.user,
        timestamp: new Date().toISOString()
      });
      
      // Clean up localStorage
      localStorage.removeItem('loginReturnUrl');
      
      // Use window.location.href to ensure a full page navigation
      // This prevents any remaining conflicts with router.push
      window.location.href = redirectUrl;
    }
  }, [status, session, router]);

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}
