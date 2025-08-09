'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getDefaultDashboardUrl } from '../../utils/roleRedirect';

export default function TestAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
          <p className="mb-4">You are not authenticated.</p>
          <button 
            onClick={() => router.push('/?isLoginOpen=true')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const goToDashboard = () => {
    const dashboardUrl = getDefaultDashboardUrl(session?.user?.role || 'customer');
    router.push(dashboardUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Authentication Test</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID:</label>
            <p className="text-gray-900">{session?.user?.id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <p className="text-gray-900">{session?.user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <p className="text-gray-900">{session?.user?.name || 'Not set'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Role:</label>
            <p className={`text-lg font-semibold ${
              session?.user?.role === 'admin' ? 'text-red-600' :
              session?.user?.role === 'staff' ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {session?.user?.role?.toUpperCase() || 'CUSTOMER'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider:</label>
            <p className="text-gray-900">{session?.user?.provider || 'Unknown'}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={goToDashboard}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Go to My Dashboard
          </button>
          
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-medium mb-2">Role Access:</h3>
          <ul className="space-y-1 text-xs">
            <li>• <strong>Customer:</strong> Can access /user/* routes</li>
            <li>• <strong>Staff:</strong> Can access /staff/* and /user/* routes</li>
            <li>• <strong>Admin:</strong> Can access all routes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
