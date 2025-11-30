import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Share, Users, Award, BriefcaseMedical } from 'lucide-react';

const HospitalDetailSkeleton = () => {
  return (
    <div>
      {/* Image Carousel Skeleton */}
      <div className="relative h-96 bg-gray-300 animate-pulse">
        {/* Navigation Buttons Skeleton */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-50">
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-50">
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
        
        {/* Dots Indicator Skeleton */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full bg-white/50 ${idx === 0 ? 'w-8' : 'w-2'}`}
            />
          ))}
        </div>
      </div>

      {/* Hospital Header Skeleton */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
          <div className="flex items-start gap-6 flex-1">
            {/* Logo Skeleton */}
            <div className="w-24 h-24 rounded-lg bg-gray-200 animate-pulse" />
            
            <div className="flex-1">
              {/* Hospital Name Skeleton */}
              <div className="h-9 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
              
              {/* Location Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-64 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Share Button Skeleton */}
          <div className="ml-auto flex gap-4">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex gap-8">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className={`py-4 px-2 ${
                  idx === 1 ? 'border-b-2 border-gray-300' : ''
                }`}
              >
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* About Section Skeleton */}
        <section className="mb-8">
          {/* Section Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          
          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Doctors Card Skeleton */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-200 rounded animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-blue-200 rounded w-16 mb-2 animate-pulse" />
                <div className="h-4 bg-blue-200 rounded w-28 animate-pulse" />
              </div>
            </div>
            
            {/* Services Card Skeleton */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-200 rounded animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-green-200 rounded w-16 mb-2 animate-pulse" />
                <div className="h-4 bg-green-200 rounded w-32 animate-pulse" />
              </div>
            </div>
            
            {/* Packages Card Skeleton */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-200 rounded animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-purple-200 rounded w-16 mb-2 animate-pulse" />
                <div className="h-4 bg-purple-200 rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Available Languages Section Skeleton */}
        <div className="max-w-7xl mx-auto py-6 relative">
          {/* Section Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          
          {/* Language Badges Skeleton */}
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

        {/* Treatment & Wellness Services Section Skeleton */}
        <section className="max-w-7xl mx-auto py-6 relative">
          {/* Section Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-80 mb-8 animate-pulse" />

          {/* Navigation Buttons Skeleton */}
          <button className="absolute left-0 top-1/2 -translate-y-1/4 bg-white shadow-lg rounded-full p-2 z-20 opacity-50">
            <ChevronRight className="w-6 h-6 rotate-180 text-gray-300" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/4 bg-white shadow-lg rounded-full p-2 z-20 opacity-50">
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </button>

          {/* Services Grid Skeleton - 5 columns × 2 rows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 mt-3 animate-pulse" />
              </div>
            ))}
          </div>
        </section>

        {/* Doctors Section Skeleton */}
        <div className="max-w-7xl mx-auto py-10 pb-5 relative">
          {/* Section Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-40 mb-8 animate-pulse" />

          {/* Navigation Buttons Skeleton */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 opacity-50">
            <ChevronRight className="w-6 h-6 rotate-180 text-gray-300" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/3 bg-white shadow-lg rounded-full p-2 z-10 opacity-50">
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </button>

          {/* Doctors Grid Skeleton - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Image Skeleton */}
                <div className="relative">
                  <div className="w-full h-56 bg-gray-200 animate-pulse" />
                  {/* Specialization Badge Skeleton */}
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="p-6 flex flex-col h-full">
                  {/* Name Skeleton */}
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  
                  {/* Description Skeleton */}
                  <div className="space-y-2 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  </div>

                  {/* Experience + Button Skeleton */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mt-3 mb-3">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                    </div>
                    <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Packages Section Skeleton */}
        <div>
          <section className="w-full mx-auto py-8 pb-5 relative">
            <div className="flex justify-between items-center mb-8">
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-200 rounded w-72 animate-pulse" />
              {/* View All Link Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            </div>

            {/* Scroll Buttons Skeleton */}
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 opacity-50">
              <ChevronRight className="w-6 h-6 rotate-180 text-gray-300" />
            </button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 opacity-50">
              <ChevronRight className="w-6 h-6 text-gray-300" />
            </button>

            {/* Scrollable Container with Package Cards Skeleton */}
            <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar scrollbar-hide pb-4">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl w-[340px] shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-shrink-0"
                >
                  {/* Image Skeleton */}
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  
                  {/* Content Skeleton */}
                  <div className="p-5">
                    {/* Package Name Skeleton */}
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                    
                    {/* Description Skeleton */}
                    <div className="space-y-2 mt-2 mb-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </div>
                    
                    {/* Badge Skeleton */}
                    <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailSkeleton;