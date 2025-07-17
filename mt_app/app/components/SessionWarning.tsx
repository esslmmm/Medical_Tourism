'use client';

import { useSessionExpiry } from '../../hooks/useSessionExpiry';

const SessionWarning = () => {
  const { timeLeft, showWarning, extendSession, authMethod } = useSessionExpiry();

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center space-x-2">
        <div className="text-yellow-600">⚠️</div>
        <div>
          <p className="text-yellow-800 font-medium">Session Expiring</p>
          <p className="text-yellow-700 text-sm">
            Time left: {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        </div>
      </div>
      <div className="mt-3 flex space-x-2">
        {authMethod === 'google' ? (
          <button
            onClick={extendSession}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Stay logged in
          </button>
        ) : (
          <button
            onClick={extendSession}
            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
          >
            Login again
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionWarning;