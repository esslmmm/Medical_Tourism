

const ReviewCardSkeleton = () => {
  return (
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
    
  );
};

export default ReviewCardSkeleton;