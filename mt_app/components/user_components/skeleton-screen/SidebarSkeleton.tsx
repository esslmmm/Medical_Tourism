import React from 'react';

const SidebarSkeleton = () => {
  return (
    <div className="w-64 bg-gray-100 p-5 min-h-screen">
      <ul className="space-y-4">
        {/* Generate 4 skeleton items (matching the original sidebar items) */}
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg"
          >
            {/* Icon Skeleton */}
            <div className="w-7 h-7 bg-gray-200 rounded animate-pulse"></div>
            
            {/* Label Skeleton with varying widths */}
            <div 
              className={`h-7 bg-gray-200 rounded animate-pulse ${
                index === 0 ? 'w-20' : // My Bookings
                index === 1 ? 'w-12' : // Reviews
                index === 2 ? 'w-15' : // Profile
                'w-8' // Chat
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};



const NavigationSkeleton = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand skeleton */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="ml-2 h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Navigation links skeleton (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-18 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-14 animate-pulse"></div>
        </div>

        {/* Right side - Profile and actions */}
        <div className="flex items-center space-x-4">
          {/* Search or notification skeleton */}
          <div className="hidden md:block w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          
          {/* Profile dropdown skeleton */}
          <div className="flex items-center cursor-pointer p-2 rounded-md">
            {/* Profile image/avatar skeleton */}
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            
            {/* User name/email skeleton */}
            <div className="ml-2 hidden md:block">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            
            {/* Dropdown arrow skeleton */}
            <div className="ml-1 w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Mobile menu button skeleton */}
          <div className="md:hidden w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationSkeleton;