import Image from "next/image";


const EducationSkeleton = () => {
  return (
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
  );
};

export default EducationSkeleton;