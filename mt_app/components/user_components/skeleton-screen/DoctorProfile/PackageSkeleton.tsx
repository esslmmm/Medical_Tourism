

const PackagesSkeleton = () => {
  return (
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
  );
};

export default PackagesSkeleton;