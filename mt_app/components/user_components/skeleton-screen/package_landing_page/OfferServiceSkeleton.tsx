

const OfferServiceSkeleton = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Book Button Skeleton */}
      <div className="w-2/3 sm:w-1/2 md:w-2/3 bg-gray-300 text-lg px-8 py-4 rounded-2xl flex justify-center items-center mx-auto animate-pulse">
        <div className="h-8 w-16 bg-gray-400 rounded"></div>
      </div>

      {/* Services Section */}
      <section className="py-12 text-center">
        {/* Title Skeleton */}
        <div className="mb-6">
          <div className="h-9 w-40 bg-gray-300 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Top row - first 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6">
          {/* Service Card 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            {/* Service Title Skeleton */}
            <div className="mb-2">
              <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
            {/* Service Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            {/* Service Title Skeleton */}
            <div className="mb-2">
              <div className="h-6 w-4/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
            {/* Service Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            {/* Service Title Skeleton */}
            <div className="mb-2">
              <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
            {/* Service Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Bottom row - remaining items (2 cards centered) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Service Card 4 */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            {/* Service Title Skeleton */}
            <div className="mb-2">
              <div className="h-6 w-3/5 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
            {/* Service Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            {/* Service Title Skeleton */}
            <div className="mb-2">
              <div className="h-6 w-4/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
            {/* Service Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfferServiceSkeleton;