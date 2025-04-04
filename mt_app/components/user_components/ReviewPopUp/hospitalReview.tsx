'use client';
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { FaStar } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface ReviewCardProps {
  id: number;
  onSubmitted: () => void;
}

interface Booking {
  booking_id: number;
  create_at: string;
  status: string;
  packages: Packages;
}

interface Packages {
  package_id: number;
  package_name: string;
  image: string;
  hospital_id: number;
}

interface User {
  user_id: number;
  name: string;
  email: string;
  package_bookings: Booking[];
}

interface Hospital {
  hospital_id: number;
  name: string;
  image: string;
}

interface UserWithLatestBooking extends User {
  latestCompletedBooking?: Booking | null;
}

const HospitalReview: React.FC<ReviewCardProps> = ({ id, onSubmitted }) => {
  const [user, setUser] = useState<UserWithLatestBooking | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingbutton, setLoadingbutton] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorbutton, setErrorbutton] = useState<string | null>(null);
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      try {
        const response = await fetch(`/api/profile/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data: User = await response.json();
        const completedBookings = data.package_bookings.filter(b => b.status === "Completed");
        const latestCompletedBooking = completedBookings.sort(
          (a, b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        )[0] || null;

        setUser({ ...data, latestCompletedBooking });

        if (latestCompletedBooking?.packages?.hospital_id) {
          const hospitalResponse = await fetch(`/api/services/hospitals/${latestCompletedBooking.packages.hospital_id}`);
          if (!hospitalResponse.ok) throw new Error("Failed to fetch hospital data");
          const hospitalData: Hospital = await hospitalResponse.json();
          setHospital(hospitalData);
        }
      } catch (error: any) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingbutton(true);
    setErrorbutton(null);

    if (!hospital?.hospital_id) {
      setErrorbutton("No hospital information found.");
      setLoadingbutton(false);
      return;
    }

    try {
      const response = await fetch('/api/reviews/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: id,
          hospital_id: hospital.hospital_id,
          rating,
          title_review: title,
          comment,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit review');

      onSubmitted(); // call next step

    } catch (err: any) {
      setErrorbutton(err.message);
    } finally {
      setLoadingbutton(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-8 shadow">
      {loading ? (
        <p className="text-center text-gray-500">Loading user details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className={inter.className}>
          {/* Hospital Card */}
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src={hospital?.image || "/img/Homepage/Mfu.jpg"}
              alt="Hospital"
              className="w-30 h-20 rounded-[10px] object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{hospital?.name}</h3>
              <p className="text-sm text-gray-600">
                {user?.latestCompletedBooking?.packages?.package_name || "No Package Found"}
              </p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="text-center">
              <h4 className="text-sm font-medium">What is your rate</h4>
              <div className="flex justify-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <label className="text-sm font-medium block mt-4">Review title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300 focus:outline-none"
              placeholder="Enter your review title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className="text-sm font-medium block mt-4">Please share your opinion about the service</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-24 text-gray focus:ring-2 focus:ring-gray-300 focus:outline-none"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-6 w-full bg-[#D35239] text-white py-2 rounded-lg hover:bg-red-600"
              disabled={loadingbutton}
            >
              {loadingbutton ? 'Submitting...' : 'Submit Review'}
            </button>

            {errorbutton && <p className="text-red-600 text-center mt-2">{errorbutton}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default HospitalReview;
