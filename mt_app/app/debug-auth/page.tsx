'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function DebugAuth() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      console.log('Debug Auth - User Role:', session.user.role);
    }
  }, [session, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Auth Debug</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <p className="text-gray-900">{status}</p>
          </div>
          
          {session?.user && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID:</label>
                <p className="text-gray-900">{session.user.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="text-gray-900">{session.user.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <p className={`text-lg font-semibold ${
                  session.user.role === 'admin' ? 'text-red-600' :
                  session.user.role === 'staff' ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {session.user.role?.toUpperCase() || 'CUSTOMER'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider:</label>
                <p className="text-gray-900">{session.user.provider || 'Unknown'}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Check browser console for detailed logs.</p>
        </div>
      </div>
    </div>
  );
}
