import React from 'react';

const HospitalSkeleton = () => {
  return (
    <div>
      {/* Profile Hospital Skeleton Screen */}
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

      {/* Related Packages Skeleton */}
      <div className="container mx-auto p-8 relative">
          {/* Title Skeleton */}
          <div className="pl-6 mb-6">
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Packages Container */}
          <div className="overflow-hidden flex space-x-6 pl-5 ml-5">
            {/* Package Card 1 */}
            <div className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200">
              {/* Image Skeleton */}
              <div className="relative w-full h-52">
                <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 2 */}
            <div className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200">
              {/* Image Skeleton */}
              <div className="relative w-full h-52">
                <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-4/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 3 */}
            <div className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200">
              {/* Image Skeleton */}
              <div className="relative w-full h-52">
                <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-2/3 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 4 */}
            <div className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200">
              {/* Image Skeleton */}
              <div className="relative w-full h-52">
                <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-2/3 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Right Arrow Skeleton */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>


        {/* Related Doctors Skeleton Screen */}
        <div className="container mx-auto p-5 relative">
          {/* Packages Container */}
          <div className="overflow-hidden flex space-x-6 pl-5 ml-5">
            {/* Package Card 1 */}
            <div className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center">
              {/* Image Skeleton */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-30 h-30 bg-gray-300 rounded-full mx-auto"></div>
              </div>

              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-[2px] w-1/3 bg-gray-300 rounded animate-pulse my-2 mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 2 */}
            <div className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center">
              {/* Image Skeleton */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-30 h-30 bg-gray-300 rounded-full mx-auto"></div>
              </div>

              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-[2px] w-1/3 bg-gray-300 rounded animate-pulse my-2 mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 3 */}
            <div className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center">
              {/* Image Skeleton */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-30 h-30 bg-gray-300 rounded-full mx-auto"></div>
              </div>

              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-[2px] w-1/3 bg-gray-300 rounded animate-pulse my-2 mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>

            {/* Package Card 4 */}
            <div className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center">
              {/* Image Skeleton */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-30 h-30 bg-gray-300 rounded-full mx-auto"></div>
              </div>

              {/* Package Name Skeleton */}
              <div className="mt-4 mb-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
              
              {/* Package Detail Skeleton */}
              <div className="mb-2">
                <div className="h-[2px] w-1/3 bg-gray-300 rounded animate-pulse my-2 mx-auto"></div>
              </div>
              
              {/* Date Skeleton */}
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Right Arrow Skeleton */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>


        {/* Review Skeleton Screen */}
        <div className="mt-8 ml-5 mb-13">
          <div className="mb-4 ml-10">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-center gap-10 flex-wrap">

            {/* Item Card 1 */}
              <div className="bg-white shadow-lg border border-gray-200 p-6 w-full max-w-sm rounded-2xl">
              {/* User name skeleton */}
              <div className="h-5 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              
              {/* Review title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              
              {/* Rating stars skeleton */}
              <div className="flex items-center mt-2 mb-2">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Comment skeleton */}
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Show More button skeleton */}
              <div className="h-4 bg-gray-200 rounded w-20 mt-2 animate-pulse"></div>
            </div>
              
            {/* Item Card 2 */}
            <div className="bg-white shadow-lg border border-gray-200 p-6 w-full max-w-sm rounded-2xl">
              {/* User name skeleton */}
              <div className="h-5 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              
              {/* Review title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              
              {/* Rating stars skeleton */}
              <div className="flex items-center mt-2 mb-2">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Comment skeleton */}
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Show More button skeleton */}
              <div className="h-4 bg-gray-200 rounded w-20 mt-2 animate-pulse"></div>
            </div>

            {/* Item Card 3 */}
            <div className="bg-white shadow-lg border border-gray-200 p-6 w-full max-w-sm rounded-2xl">
              {/* User name skeleton */}
              <div className="h-5 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              
              {/* Review title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              
              {/* Rating stars skeleton */}
              <div className="flex items-center mt-2 mb-2">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Comment skeleton */}
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Show More button skeleton */}
              <div className="h-4 bg-gray-200 rounded w-20 mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default HospitalSkeleton;