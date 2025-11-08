const PackageTypeSkeleton = () => {
    return(
        <div className="bg-white p-6 rounded-[20px] shadow-md mb-4 flex justify-between border border-[#C5D1E0]">
            {/* Package Type Skeleton */}
            <div className="flex items-center">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-55"></div>
            </div>
            
            {/* Buttons Skeleton */}
            <div className="flex gap-2">
                {/* Cancel Button Skeleton */}
                <div className="h-8 bg-gray-200 rounded-[20px] animate-pulse w-41"></div>
                
                {/* Edit Status Button Skeleton */}
                <div className="h-8 bg-gray-200 rounded-[20px] animate-pulse w-34"></div>
            </div>
        </div> 
    )
 }

export default PackageTypeSkeleton;
