

const PackageLandingSkeleton = () => {
  return (
    <div>
      {/* ImageCarousel Skeleton Screen */}
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


      {/* OfferService Skeleton Screen */}
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


        {/* HospitalDetailsSkeleton */}
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

        
        {/* PlaceToVisitSkeleton */}
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


        {/* TimelineSkeleton */}
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

    </div>
  );
};

export default PackageLandingSkeleton;