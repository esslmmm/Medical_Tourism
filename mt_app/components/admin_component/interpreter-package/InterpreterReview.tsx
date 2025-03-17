import React from "react";
import { FaEdit } from "react-icons/fa";

const reviews = [
  {
    title: "Value For Money",
    rating: 5,
    comment:
      "The interpreter was so helpful and professional! They made my hospital visits stress-free.",
    date: "February 08, 2025",
  },
  {
    title: "Nice",
    rating: 4,
    comment:
      "I was nervous about the language barrier, but the interpreter service was amazing! They made communication with doctors smooth and easy.",
    date: "January 25, 2025",
  },
  {
    title: "Great",
    rating: 4,
    comment:
      "Excellent service! The interpreter was patient and accurate, helping me feel comfortable throughout my treatment in Thailand.",
    date: "November 05, 2023",
  },
];

const InterpreterReview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header with Edit Icon */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500 transition-all duration-300" />
      </div>

      {/* List of Reviews */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-all duration-300">
            <h3 className="font-semibold">{review.title}</h3>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-gray-400 text-sm mt-2">Reviewed {review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterpreterReview;
