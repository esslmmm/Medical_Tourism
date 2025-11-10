import React from 'react';

const PlacesSkeleton = () => {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="ml-2 mb-2">
        <div className="h-9 bg-gray-200 rounded animate-pulse w-36"></div>
      </div>
      
      {/* Main Container */}
      <div className="w-[850px] mx-auto bg-white p-4 rounded-xl shadow-md border border-[#C5D1E0]">
        {/* Generate 3-4 skeleton place items (typical number) */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 p-4 ${
              index !== 2 ? "border-b border-[#C5D1E0]" : ""
            }`}
          >
            {/* Image Skeleton */}
            <div className="w-50 h-30 bg-gray-200 rounded-[15px] animate-pulse"></div>

            {/* Content Section */}
            <div className="flex-1 space-y-2">
              {/* Place Name Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
              
              {/* Date/Time Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
              </div>
              
              {/* Fee Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesSkeleton;