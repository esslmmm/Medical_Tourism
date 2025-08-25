"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import "../../../app/globals.css";
import ReviewsSkeletonVaried from "../skeleton-screen/profile/ReviewSkeleton";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });

interface User {
  user_id: number;
  name: string;
  email: string;
  review_guide: Review[];
  review_hospital: Review[];
  review_hotel: Review[];
}

interface Review {
  review_id: number;
  rating: number;
  title_review: string;
  comment: string;
  created_at: string;
  type: "Guide" | "Hospital" | "Hotel";
  reviewed_name: string;
}

interface Review {
  review_id: number;
  rating: number;
  title_review: string;
  comment: string;
  created_at: string;
  type: "Guide" | "Hospital" | "Hotel";
  reviewed_name: string;
  hospitals?: { name: string };
  hotels?: { name: string };
  guides?: { name: string };
}

const Review = () => {
  const [user, setUser] = useState<User | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchUser() {
        try {
            const response = await fetch(`/api/profile`);
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const data: User = await response.json();
            setUser(data);

            const combinedReviews = [
                ...data.review_guide.map((r) => ({
                    ...r,
                    type: "Guide",
                    reviewed_name: r.guides?.name ?? "Unknown Guide",
                })),
                ...data.review_hospital.map((r) => ({
                    ...r,
                    type: "Hospital",
                    reviewed_name: r.hospitals?.name ?? "Unknown Hospital",
                })),
                ...data.review_hotel.map((r) => ({
                    ...r,
                    type: "Hotel",
                    reviewed_name: r.hotels?.name ?? "Unknown Hotel",
                })),
            ] as Review[];

            combinedReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setAllReviews(combinedReviews);
        } catch (error) {
            setError("Error fetching user data. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    fetchUser();
}, []);



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

  if (loading) {
    return <ReviewsSkeletonVaried />
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className={`w-4/5 max-w-4xl ${poppins.className}`}>
      {/* Scrollable Review Container */}
      <div className="max-h-[570px] overflow-y-auto space-y-4 p-2 scrollbar-hide">
        {allReviews.length > 0 ? (
          allReviews.map((review) => (
            <div key={`${review.type}-${review.review_id}`} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-2">
                <div className="text-yellow-400 flex items-center gap-1">
                  <h3 className="font-semibold text-black flex items-center text-lg mr-3">
                    {review.type} Review for {review.reviewed_name}  -  
                    "{review.title_review}" 
                  </h3>
                  {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {review.rating % 1 !== 0 && <FaStarHalfAlt />}
                </div>
                <p className="text-gray-600 text-sm font-extralight">{review.comment}</p>
                <p className="text-black font-thin text-sm">{formatDate(review.created_at)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-2">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
