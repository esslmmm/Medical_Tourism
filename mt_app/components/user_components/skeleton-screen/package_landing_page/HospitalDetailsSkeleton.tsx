
const HospitalDetailsSkeleton = () => {
  return (
    <div className="px-4 pb-4">
      {/* Divider */}
      <div className="border border-t border-gray-200 my-5"></div>
      
      <div className="flex justify-center items-center w-full bg-white p-4">
        <div className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-xl shadow-md border border-gray-300 w-full max-w-2xl space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Image Section Skeleton */}
          <div className="w-60 h-35 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          </div>

          {/* Hospital Details Skeleton */}
          <div className="text-center sm:text-left flex-1">
            {/* Hospital Name Skeleton */}
            <div className="mb-3">
              <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mx-auto sm:mx-0"></div>
            </div>
            
            {/* Location Skeleton */}
            <div className="flex sm:justify-start justify-center items-center mt-1 mb-3">
              {/* Map Icon Skeleton */}
              <div className="w-4 h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
              {/* Location Text Skeleton */}
              <div className="h-4 w-56 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Button Skeleton */}
            <div className="mt-3">
              <div className="h-8 w-24 bg-gray-300 rounded-full animate-pulse mx-auto sm:mx-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsSkeleton;