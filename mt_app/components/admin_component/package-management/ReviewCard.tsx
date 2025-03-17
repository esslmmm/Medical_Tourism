import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition hover:scale-105">
      <h4 className="text-lg font-bold">Steve Brown</h4>
      <p className="text-gray-600 text-sm">Tourist</p>
      <div className="flex mt-2 text-yellow-500">
        {[...Array(4)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-600 text-sm mt-2">Amazing experience at MFU. Highly professional and kind staff.</p>
    </div>
  );
};

export default ReviewCard;
