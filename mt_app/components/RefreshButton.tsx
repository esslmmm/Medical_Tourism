'use client';

import React from 'react';

const RefreshButton: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="mb-6 text-center">
      <button 
        onClick={handleRefresh}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refresh Feed
      </button>
    </div>
  );
};

export default RefreshButton;