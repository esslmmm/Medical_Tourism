import React from 'react';

const ServiceSkeleton = () => {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="ml-2 mb-2">
        <div className="h-9 bg-gray-200 rounded animate-pulse w-40"></div>
      </div>
      
      {/* Main Content Card Skeleton */}
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        {/* Image Skeleton */}
        <div className="w-55 h-40 bg-gray-200 rounded-[15px] animate-pulse"></div>
        
        {/* Content Section Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Description Skeleton */}
          <div className="flex items-start gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
          {/* Package Name Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
          
          {/* Appointment Date/Time Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-36"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          

          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-38"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;