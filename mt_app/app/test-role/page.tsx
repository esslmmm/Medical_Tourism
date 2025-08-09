'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestRole() {
  const { data: session, status } = useSession();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUserInDatabase = async () => {
    if (!session?.user?.email) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/test-user-role?email=${encodeURIComponent(session.user.email)}`);
      const data = await response.json();
      setDbUser(data.user);
      console.log('🔍 Database user check:', data);
    } catch (error) {
      console.error('Error checking user in database:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      checkUserInDatabase();
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Role Debug Test</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Session Information</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Status:</strong> {status}</p>
              {session?.user && (
                <>
                  <p><strong>Email:</strong> {session.user.email}</p>
                  <p><strong>Role:</strong> <span className="font-mono">{session.user.role}</span></p>
                  <p><strong>ID:</strong> {session.user.id}</p>
                  <p><strong>Provider:</strong> {session.user.provider}</p>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Database Information</h2>
            <div className="bg-gray-50 p-4 rounded">
              {loading ? (
                <p>Loading database info...</p>
              ) : dbUser ? (
                <>
                  <p><strong>Email:</strong> {dbUser.email}</p>
                  <p><strong>Role:</strong> <span className="font-mono">{dbUser.role}</span></p>
                  <p><strong>ID:</strong> {dbUser.id}</p>
                  <p><strong>Email Verified:</strong> {dbUser.is_email_verified ? 'Yes' : 'No'}</p>
                </>
              ) : (
                <p>No database user found</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Role Comparison</h2>
            <div className="bg-gray-50 p-4 rounded">
              {session?.user && dbUser ? (
                <>
                  <p><strong>Session Role:</strong> <span className="font-mono">{session.user.role}</span></p>
                  <p><strong>Database Role:</strong> <span className="font-mono">{dbUser.role}</span></p>
                  <p><strong>Match:</strong> {session.user.role === dbUser.role ? '✅ Yes' : '❌ No'}</p>
                </>
              ) : (
                <p>Cannot compare - missing data</p>
              )}
            </div>
          </div>

          <button
            onClick={checkUserInDatabase}
            disabled={loading || !session?.user?.email}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Refresh Database Check'}
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Check browser console for detailed logs.</p>
        </div>
      </div>
    </div>
  );
}
