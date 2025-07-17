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

export default SidebarSkeleton;