

const DoctorCardSkeleton = () => {
  return (
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
  );
};

export default DoctorCardSkeleton;