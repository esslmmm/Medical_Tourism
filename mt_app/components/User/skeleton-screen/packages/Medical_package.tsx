import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PackageDetailSkeleton = () => {
  return (
    <div>
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 p-4 text-sm">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
        <span className="text-gray-300">›</span>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
        <span className="text-gray-300">›</span>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />

        <div className="ml-auto flex gap-4">
          {/* Ask Button Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
          </div>
          {/* Share Button Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Service Tabs Skeleton */}
      <div className="pt-3 border-b border-gray-300">
        <div className="flex items-center gap-8">
          <div>
            <div className="h-10 bg-gray-200 rounded w-36 animate-pulse" />
            <div className="border-t-2 border-gray-300 mt-3" />
          </div>
          <div>
            <div className="h-10 bg-gray-200 rounded w-36 animate-pulse" />
            <div className="mt-3" />
          </div>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="h-10 bg-gray-200 rounded w-2/3 mt-5 mb-6 animate-pulse" />

      {/* Images Skeleton */}
      <div className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* Large Image Skeleton */}
          <div className="lg:col-span-2 relative">
            <div className="w-full h-[400px] bg-gray-300 rounded-l-2xl animate-pulse" />
          </div>

          {/* Two Smaller Images Skeleton */}
          <div className="flex flex-col gap-4 relative">
            <div className="relative">
              <div className="w-full h-[196px] bg-gray-300 rounded-tr-2xl animate-pulse" />
            </div>
            <div className="relative">
              <div className="w-full h-[196px] bg-gray-300 rounded-br-2xl animate-pulse" />
              {/* See All Photos Button Skeleton */}
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-50 px-3 py-1 rounded border border-gray-300">
                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Section Skeleton */}
          <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center">
            {/* Chevron Left */}
            <button className="p-2 text-gray-300" aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Tabs */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-3 flex-1">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className={`pb-2 px-2 ${idx === 1 ? 'border-b-2 border-gray-300' : ''}`}
                >
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
              ))}
            </div>

            {/* Chevron Right */}
            <button className="p-2 text-gray-300" aria-label="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Description Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-40 mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Services Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-56 mb-4 animate-pulse" />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-4 bg-white text-lg px-4 py-2 rounded-full border border-gray-200"
                >
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Packages Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-72 mb-4 animate-pulse" />
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl w-[280px] shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-shrink-0"
                >
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section Skeleton */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Make Appointment Card Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 max-h-[calc(100vh-2.5rem)]">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              {/* Price Section */}
              <div className="mb-6">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
              </div>

              {/* Date Selector */}
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded w-40 mb-3 animate-pulse" />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div key={idx} className="h-10 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Guest Selector */}
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Book Button */}
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailSkeleton;