import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
      {/* Avatar skeleton */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
      
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-300 rounded-lg mt-4"></div>
      
      {/* Actions skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;