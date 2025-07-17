const PlaceToVisitSkeleton = () => {
  return (
    <section className="bg-[#D8EAE4] py-12 px-20">
      {/* Title Skeleton */}
      <div className="mb-8">
        <div className="h-11 w-48 bg-gray-300 rounded animate-pulse mx-auto"></div>
      </div>

      {/* Grid Container */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Place Card 1 */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="relative z-10">
              {/* Place Name Skeleton */}
              <div className="mb-5">
                <div className="h-5 w-3/4 bg-gray-200 rounded ml-9 animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="h-8 w-20 bg-gray-200 rounded-full ml-25 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Place Card 2 */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="relative z-10">
              {/* Place Name Skeleton */}
              <div className="mb-5">
                <div className="h-5 w-3/4 bg-gray-200 rounded ml-9 animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="h-8 w-20 bg-gray-200 rounded-full ml-25 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Place Card 3 */}
       <div className="relative rounded-lg shadow-lg overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="relative z-10">
              {/* Place Name Skeleton */}
              <div className="mb-5">
                <div className="h-5 w-3/4 bg-gray-200 rounded ml-9 animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="h-8 w-20 bg-gray-200 rounded-full ml-25 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Place Card 4 */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="relative z-10">
              {/* Place Name Skeleton */}
              <div className="mb-5">
                <div className="h-5 w-3/4 bg-gray-200 rounded ml-9 animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="h-8 w-20 bg-gray-200 rounded-full ml-25 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceToVisitSkeleton;