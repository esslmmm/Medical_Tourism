

const TimelineSkeleton = () => {
  return (
    <div className="bg-white p-5 rounded-[20px] shadow-md mb-4 border border-[#C5D1E0]">
      {/* Timeline Title Skeleton */}
      <div className="mb-3">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
      
      {/* Day Buttons Skeleton */}
      <div className="flex gap-3">
        {/* Generate 3-5 skeleton day buttons (typical package duration) */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="py-1 rounded-[18px] w-[120px] h-12 bg-gray-200 animate-pulse flex flex-col items-center justify-center gap-1"
          >
            {/* Day text skeleton */}
            <div className="h-3 bg-gray-300 rounded w-10"></div>
            {/* Date text skeleton */}
            <div className="h-2 bg-gray-300 rounded w-12"></div>
          </div>
        ))}
        
        {/* All Trip Button Skeleton */}
        <div className="py-1 rounded-[18px] w-[120px] h-12 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSkeleton
