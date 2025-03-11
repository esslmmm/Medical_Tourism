"use client";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  name: string;
  title: string;
  rating: number;
  content: string;
}

const ReviewsSection: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const reviews: Review[] = [
    { name: "Steve Brown", title: "Friendly Staff", rating: 4, content: "I had an amazing experience at MFU Hospital. The doctors and nurses were incredibly professional and compassionate. The facilities were clean ...." },
    { name: "John Doe", title: "Great Service", rating: 5, content: "Excellent service and modern facilities. The staff was very kind and helpful. Would definitely recommend! ..." },
    { name: "Jane Smith", title: "Highly Recommended", rating: 4.5, content: "The best medical experience I’ve had so far. Efficient, clean, and professional! Highly recommended ..." },
    { name: "Emily Johnson", title: "Good Experience", rating: 4, content: "Doctors are great, but the waiting time was longer than expected. Otherwise, good experience ..." },
    { name: "Michael Lee", title: "Professional Team", rating: 5, content: "Very professional doctors and staff. The treatment was excellent and I felt well taken care of ..." },
  ];

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div>
      <h3 className="ml-20 text-2xl font-semibold mt-8 mb-4">Reviews</h3>

      <div className="mb-6">
        <div className="flex justify-center gap-10 flex-wrap">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="mt-4 flex justify-end mr-30">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-black font-semibold hover:underline"
          >
            {showAll ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
