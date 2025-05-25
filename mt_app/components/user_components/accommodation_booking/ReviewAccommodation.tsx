"use client";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";


interface Accommodation {
  hotel_id: number;
  name: string;
  hotel_cod: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
  contact_info: string;
  review_hotel: review_hotel[];
}

interface review_hotel {
  review_id: number;
  user_id: number;
  rating: number;
  title_review: string;
  comment: string;
  created_at: string;
  user: user;
}

interface user {
  user_id: number;
  name: string;
}

interface AccommodationProfileProps {
  accommodation: Accommodation | null;
}

const ReviewSection: React.FC<AccommodationProfileProps> = ({ accommodation }) => {
    if (!accommodation) return <p>No accommodation info available.</p>;
    
    const formatDate = (timestamp: string | number | Date) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return `Reviewed ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };

  return (
    <div className="bg-[#D2ECE4] py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Review</h2>
      <div className="max-w-4xl w-full space-y-6">
        {accommodation?.review_hotel.map((review) => (
          <div key={review.review_id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">"{review.title_review}"</h3>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            <div className="mt-4 text-sm text-gray-500">
              {formatDate(review.created_at)}
            </div>
            <div className="font-semibold mt-2">{review.user.name}</div>
            <div className="flex items-center mt-2">
              {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                <FaStar className="text-yellow-500" key={i} />
              ))}
              {review.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
