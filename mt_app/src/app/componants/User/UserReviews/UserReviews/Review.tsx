import React from 'react'
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      hospital: "Mae Fah Luang Hospital",
      rating: 4,
      review: "The interpreter was so helpful and professional! They made my hospital visit stress-free by ensuring I understood everything clearly.",
      date: "February 08, 2025"
    }
  ]);
  return (
    <div><main className="flex-1 bg-gray-50 flex flex-col p-6">
      {/* Search Bar */}
      <div className="flex items-center border p-3 rounded-lg bg-white mb-4">
        <IoSearch size={20} className="text-gray-600 mr-2" />
        <input type="text" className="w-full outline-none text-black" placeholder="Search History" />
      </div>

      {/* Review Card */}
      {reviews.map((review, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-lg border">
          <h3 className="font-semibold text-black">{review.hospital}</h3>
          <div className="flex items-center text-yellow-500 mb-2">
            {Array.from({ length: review.rating }).map((_, i) => (
              <FaStar key={i} />
            ))}
            {Array.from({ length: 5 - review.rating }).map((_, i) => (
              <FaStar key={i} className="text-gray-300" />
            ))}
          </div>
          <p className="text-gray-600 mb-2">{review.review}</p>
          <p className="text-gray-400 text-sm">Reviewed {review.date}</p>
        </div>
      ))}
    </main></div>
  )
}

export default Review