

// Compact version with varied content lengths
const ReviewsSkeletonVaried = () => {
  const reviewVariations = [
    { titleWidth: 'w-36', nameWidth: 'w-28', commentLines: 3, commentWidths: ['w-full', 'w-4/5', 'w-2/3'] },
    { titleWidth: 'w-32', nameWidth: 'w-24', commentLines: 2, commentWidths: ['w-full', 'w-3/5'] },
    { titleWidth: 'w-40', nameWidth: 'w-32', commentLines: 4, commentWidths: ['w-full', 'w-4/5', 'w-3/5', 'w-1/2'] },
    { titleWidth: 'w-28', nameWidth: 'w-20', commentLines: 1, commentWidths: ['w-4/5'] },
    { titleWidth: 'w-44', nameWidth: 'w-36', commentLines: 3, commentWidths: ['w-full', 'w-5/6', 'w-3/4'] }
  ];

  return (
    <div className="w-4/5 max-w-4xl font-sans">
      {/* Scrollable Review Container */}
      <div className="max-h-[570px] overflow-y-auto space-y-4 p-2 scrollbar-hide">
        {reviewVariations.map((variation, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="space-y-2">
              {/* Review Header with Stars */}
              <div className="flex items-center gap-1">
                {/* Review Title and Name */}
                <div className="flex items-center gap-2 mr-3">
                  <div className={`h-5 bg-gray-300 rounded animate-pulse ${variation.titleWidth}`}></div>
                  <div className={`h-5 bg-gray-300 rounded animate-pulse ${variation.nameWidth}`}></div>
                  <div className="h-5 bg-gray-300 rounded animate-pulse w-2"></div>
                  <div className="h-5 bg-gray-300 rounded animate-pulse w-32"></div>
                </div>
                
                {/* Star Rating Skeleton */}
                <div className="flex items-center gap-1 ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-yellow-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Comment Skeleton */}
              <div className="space-y-2">
                {variation.commentWidths.map((width, i) => (
                  <div key={i} className={`h-4 bg-gray-200 rounded animate-pulse ${width}`}></div>
                ))}
              </div>
              
              {/* Date Skeleton */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSkeletonVaried;