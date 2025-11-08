import React from 'react';

// Enhanced version with shimmer effect
const BookingSkeleton = () => {
  return (
    <div className='w-2/3'>
      {/* Tabs Skeleton */}
      <div className="flex gap-50 mb-6 relative">
        {["In Process", "Wait for Payment", "Completed"].map((tab, index) => (
          <div key={index} className="relative">
            <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-26 mb-2 ml-3"></div>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-yellow-400 rounded"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Booking Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col md:flex-row items-center bg-white p-3 rounded-lg shadow-md">
            {/* Package Image Skeleton */}
            <div className="w-24 h-16 md:w-40 md:h-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-md"></div>

            {/* Booking Details Skeleton */}
            <div className="flex-1 ml-4 text-center md:text-left flex flex-col justify-start space-y-2">
              {/* Package Name Skeleton */}
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-3/4"></div>
              {/* Date Skeleton */}
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-1/2"></div>
              {/* Conditional expired message skeleton */}
              {item === 2 && (
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-4/5"></div>
              )}
            </div>

            {/* Buttons Skeleton */}
            <div className="ml-auto flex gap-3 mt-4 md:mt-0">
              {/* View More Button Skeleton */}
              <div className="h-10 w-25 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"></div>
              
              {/* Pay Now Button Skeleton */}
              {item === 2 && (
                <div className="h-10 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};


export default BookingSkeleton;