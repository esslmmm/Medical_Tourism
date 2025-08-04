"use client";
import { useState } from "react";
import ReviewCard from "./ReviewCard";


interface User{
  id: number;
  name: string;
}

interface Review {
  review_id: number;
  user_id: number;
  reviewer_name: string;
  rating: number;
  title_review: string;
  comment: string;
  user: User;
}

interface Hospital {
  hospital_id: number;
  name: string;
  review_hospital: Review[];
}

interface HospitalDetailProps {
  hospital : Hospital | null;
}

const ReviewsSection: React.FC<HospitalDetailProps> = ({ hospital }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedReviews = showAll ? hospital?.review_hospital ?? [] : hospital?.review_hospital?.slice(0, 3) ?? [];

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
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
