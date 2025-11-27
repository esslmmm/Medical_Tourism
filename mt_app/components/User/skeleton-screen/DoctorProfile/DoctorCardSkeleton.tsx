import Image from "next/image";

const DoctorCardSkeleton = () => {
  return (
    <div>
      {/* Profile Doctor Card Skeleton  */}
      <div className="animate-pulse">
        {/* Main Doctor Card Skeleton */}
        <div className="flex items-center justify-center mx-auto  w-270 h-60 shadow-lg shadow-purple-500/15 rounded-2xl p-6 border border-purple-200 m-10 bg-gray-50/70">
          {/* Doctor Image Skeleton */}
          <div className="w-40 h-40 rounded-full bg-gray-300 mr-6 flex-shrink-0"></div>

          {/* Doctor Information Skeleton */}
          <div className="ml-4 flex-1">
            {/* Name Skeleton */}
            <div className="ml-2 h-9 bg-gray-300 rounded w-3/4 mb-4"></div>
            
            {/* Decorative Lines Skeleton */}
            <div className="flex items-center mb-2 mt-2">
              <div className="w-65 h-1 bg-gray-300 rounded"></div>
              <div className="w-65 h-1 bg-gray-300 rounded ml-1"></div>
            </div>
            
            {/* Description Skeleton */}
            <div className="ml-5 mr-10 mt-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
            
            {/* Specialization Skeleton */}
            <div className="ml-4 mt-5 h-8 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="mt-4 rounded-3xl flex items-center px-6 py-3 mx-auto w-270 h-15 shadow-lg shadow-purple-500/15 bg-white">
          {/* First Part Skeleton */}
          <div className="flex-1 flex justify-center">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>

          {/* Vertical Line */}
          <div className="h-12 w-0.5 bg-gray-200 mx-4"></div>

          {/* Second Part - Hospital Logo Skeleton */}
          <div className="flex-1 flex justify-center">
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
          </div>

          {/* Vertical Line */}
          <div className="h-12 w-0.5 bg-gray-200 mx-4"></div>

          {/* Third Part Skeleton */}
          <div className="flex-1 flex justify-center">
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>


      {/* Education Skeleton */}
      <div className="relative max-w-270 mx-auto my-10">
            {/* Background Image Skeleton */}
            <div className="relative w-full h-[370px]">
                    <Image
                      src="/img/DoctorProfile/Edu-background.png"
                      alt="Education Background"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl border-purple-200"
                    />
                  </div>
      
            {/* Overlay Content Skeleton */}
            <div className="absolute top-0 rounded-xl flex flex-col p-6">
              {/* Title Skeleton */}
              <div className="absolute top-4 left-3">
                <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
      
              {/* Education Items Skeleton */}
              <div className="p-4 overflow-auto max-h-[300px] mt-15 space-y-4">
                {/* Education Item 1 */}
                <div className="grid grid-cols-12 gap-10 p-2">
                  {/* Year Skeleton */}
                  <div className="col-span-2">
                    <div className="h-6 w-18 bg-gray-300 rounded animate-pulse mr-13"></div>
                  </div>
      
                  {/* Degree Skeleton */}
                  <div className="col-span-6">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                  </div>
      
                  {/* Institution Skeleton */}
                  <div className="col-span-4">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
      
                {/* Education Item 2 */}
                <div className="grid grid-cols-12 gap-10 p-2">
                  {/* Year Skeleton */}
                  <div className="col-span-2">
                    <div className="h-6 w-18 bg-gray-300 rounded animate-pulse mr-13"></div>
                  </div>
      
                  {/* Degree Skeleton */}
                  <div className="col-span-6">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                  </div>
      
                  {/* Institution Skeleton */}
                  <div className="col-span-4">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
      
                {/* Education Item 3 */}
                <div className="grid grid-cols-12 gap-10 p-2">
                  {/* Year Skeleton */}
                  <div className="col-span-2">
                    <div className="h-6 w-18 bg-gray-300 rounded animate-pulse mr-13"></div>
                  </div>
      
                  {/* Degree Skeleton */}
                  <div className="col-span-6">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                  </div>
      
                  {/* Institution Skeleton */}
                  <div className="col-span-4">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
      
      
                {/* Education Item 4 */}
                <div className="grid grid-cols-12 gap-10 p-2">
                  {/* Year Skeleton */}
                  <div className="col-span-2">
                    <div className="h-6 w-18 bg-gray-300 rounded animate-pulse mr-13"></div>
                  </div>
      
                  {/* Degree Skeleton */}
                  <div className="col-span-6">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                  </div>
      
                  {/* Institution Skeleton */}
                  <div className="col-span-4">
                    <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Skeleton */}
          <div className="relative max-w-270 mx-auto my-10">
                {/* Background Image Skeleton */}
                  <div className="relative w-full h-40">
                        <Image
                          src="/img/DoctorProfile/Cer-background.png"
                          alt="Education Background"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl border-purple-200"
                        />
                  </div>
          
                {/* Overlay Content Skeleton */}
                <div className="absolute top-0 rounded-xl flex flex-col p-6">
                  {/* Title Skeleton */}
                  <div className="absolute top-4 left-3">
                    <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
                  </div>
          
                  {/* Education Items Skeleton */}
                  <div className="p-4 overflow-auto max-h-[300px] mt-15 space-y-4">
                    {/* Education Item 1 */}
                    <div className="grid grid-cols-12 gap-10 p-2">
                      {/* Year Skeleton */}
                      <div className="col-span-2">
                        <div className="h-6 w-18 bg-gray-300 rounded animate-pulse mr-13"></div>
                      </div>
          
                      {/* Degree Skeleton */}
                      <div className="col-span-6">
                        <div className="h-6 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
                      </div>
          
                      {/* Institution Skeleton */}
                      <div className="col-span-4">
                        <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </div>
          
                  </div>
                </div>
              </div>
      </div>
  );
};

export default DoctorCardSkeleton;
