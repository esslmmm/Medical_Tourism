import React from 'react';

const HospitalSkeleton = () => {
  return (
    <div className="bg-white p-8">
      <div className="grid grid-cols-2 gap-8 ml-10">
        {/* Hospital Images Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {/* Main image skeleton */}
          <div className="w-85 h-100 bg-gray-200 rounded-lg animate-pulse"></div>
          
          {/* Side images skeleton */}
          <div className="space-y-4">
            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              {/* Overlay for "more images" */}
              <div className="absolute inset-0 bg-gray-300/50 flex items-center justify-center rounded-lg">
                <div className="w-16 h-6 bg-gray-400 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Info Skeleton */}
        <div className="flex flex-col">
          {/* Hospital name skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-5 mt-3 animate-pulse"></div>
          
          {/* Rating skeleton */}
          <div className="flex items-center mt-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="w-24 h-4 bg-gray-200 rounded ml-2 animate-pulse"></div>
          </div>
          
          {/* Location skeleton */}
          <div className="flex items-center text-gray-600 mt-2">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="col-span-2">
        {/* Services title skeleton */}
        <div className="h-8 bg-gray-200 rounded w-32 mt-8 mb-4 animate-pulse"></div>
        
        {/* Services grid skeleton */}
        <div className="grid grid-cols-6 gap-6 mt-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Service icon skeleton */}
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
              {/* Service name skeleton */}
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalSkeleton;