

const CarouselSkeleton = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slide Container */}
      <div className="flex w-full h-full overflow-hidden">
        {/* Current Slide Skeleton */}
        <div className="w-full flex-shrink-0 h-full snap-center relative">
          {/* Image Skeleton */}
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          
          {/* Overlay Content Skeleton */}
          <div className="absolute inset-0 bg-black opacity-10 flex flex-col justify-center items-center text-white text-center px-4">
            {/* Title Skeleton */}
            <div className="mb-2">
              <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-5 w-80 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-72 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows Skeleton — Desktop */}
      <>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-black/50 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-black/50 rounded-full animate-pulse"></div>
        </div>
      </>

      {/* Dots Skeleton */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {/* Active dot */}
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
        {/* Inactive dots */}
        <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;