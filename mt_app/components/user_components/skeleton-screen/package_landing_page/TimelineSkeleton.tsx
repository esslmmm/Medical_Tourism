

const TimelineSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-8">
      {/* Title Skeleton */}
      <div className="mb-6">
        <div className="h-9 w-24 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-green-400 pl-6">
        {/* Timeline Event 1 - Left aligned */}
        <div className="mb-8 flex items-center">
          <div className="w-48 mr-4">
            <div className="w-full h-[150px] bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
        </div>

        {/* Timeline Event 2 - Right aligned */}
        <div className="mb-8 flex items-center">
          <div className="flex flex-col items-end text-right">
            <div className="h-5 w-36 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-44 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-48 ml-4">
            <div className="w-full h-[150px] bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
        </div>

        {/* Timeline Event 3 - Left aligned */}
        <div className="mb-8 flex items-center">
          <div className="w-48 mr-4">
            <div className="w-full h-[150px] bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <div className="h-5 w-28 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-36 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
        </div>

        {/* Timeline Event 4 - Right aligned */}
        <div className="mb-8 flex items-center">
          <div className="flex flex-col items-end text-right">
            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-48 ml-4">
            <div className="w-full h-[150px] bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
        </div>

        {/* Timeline Event 5 - Left aligned */}
        <div className="mb-8 flex items-center">
          <div className="w-48 mr-4">
            <div className="w-full h-[150px] bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-42 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
        </div>
      </div>

      {/* Toggle Button Skeleton */}
      <div className="mt-4">
        <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default TimelineSkeleton;