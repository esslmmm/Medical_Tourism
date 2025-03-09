import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="mb-4 border p-4 rounded-lg bg-gray-100 shadow-sm">
      <h4 className="text-gray-800 font-semibold">{review.user} 
        <FaStar className="inline text-yellow-500 ml-1" /> {review.rating}/5
      </h4>
      <p className="text-gray-700">{review.comment}</p>
      <span className="text-sm text-gray-500">{review.date}</span>
    </div>
  );
};

export default ReviewCard;
