import React from "react";
import { FaStar, FaRegStar, FaSearch,FaSlidersH } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Steve Brown",
    title: "Friendly Staff",
    rating: 4,
    text: "I had an amazing experience at MFU Hospital. The doctors and nurses were incredibly professional and compassionate. The facilities were clean.",
    profileImg: "/img/profile.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Great Service",
    rating: 5,
    text: "The best hospital experience ever! The staff was very attentive, and the care was exceptional.",
    profileImg: "/img/driver.png",
  },
  {
    id: 3,
    name: "Michael Lee",
    title: "Highly Recommended",
    rating: 5,
    text: "Doctors are well experienced, and the environment is super clean. Highly recommended.",
    profileImg: "/img/interpreter.png",
  },
];

const HospitalReview = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Search Bar Container */}
<div className="flex items-center gap-4 mb-6">
  {/* Search Input */}
  <div className="w-full max-w-2xl relative">
    <input
      type="text"
      placeholder="Search by name, specialty, hospital..."
      className="w-full border border-gray-300 rounded-full px-5 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <FaSearch className="absolute right-4 top-3.5 text-gray-400" />
  </div>

  {/* Filter Button (Outside Search Bar) */}
  <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
    <FaSlidersH className="text-gray-600 text-lg" />
  </button>
</div>

      {/* Review Cards */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-xl p-6 flex gap-4 hover:shadow-2xl transition-shadow"
          >
            {/* Profile Image */}
            <img
              src={review.profileImg}
              alt={review.name}
              className="w-14 h-14 rounded-full object-cover border border-gray-300"
            />

            {/* Review Content */}
            <div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-gray-600 italic">{review.title}</p>

              {/* Star Rating */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-yellow-400">
                    {index < review.rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mt-3 leading-relaxed">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="px-3 py-1 bg-gray-200 rounded-l-md">‹</button>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className={`px-4 py-2 ${
              num === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            } rounded-md mx-1`}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 bg-gray-200 rounded-r-md">›</button>
      </div>
    </div>
  );
};

export default HospitalReview;
