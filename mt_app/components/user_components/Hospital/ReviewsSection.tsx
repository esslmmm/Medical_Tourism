"use client";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useParams } from "next/navigation";


interface User{
  user_id: number;
  name: string;
}

interface Review {
  user_id: number;
  title_review: string;
  rating: number;
  comment: string;
  user: User;
}

interface Hospital {
  hospital_id: number;
  name: string;
  review_hospital: Review[];
}

const ReviewsSection: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/services/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");

        const data = await response.json();
        console.log("Hospital Data:", data);
        setHospital(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHospital();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading hospital details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!hospital) return <p className="text-center text-gray-500">Hospital not found</p>;
  if (hospital?.review_hospital?.length === 0) return <p className="text-center text-gray-500">No reviews available.</p>;

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
