import React from "react";
import { FaStar } from "react-icons/fa";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-primary">Reviews</h2>
      <div className="mt-4 space-y-3">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-lg bg-background shadow-sm">
            <h4 className="text-gray-700 font-bold">
              {review.user} <FaStar className="inline text-yellow-500" /> {review.rating}/5
            </h4>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
