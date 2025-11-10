'use client';
import { useEffect, useState, useCallback } from 'react';
import { Inter } from "next/font/google";
import { FaStar } from "react-icons/fa";
import { hospital_images } from '@prisma/client';

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface ReviewCardProps {
  id: number;
  onSubmitted: () => void;
}

interface hotel_bookings {
  booking_id: number;
  hotel_id: number;
  hotels: {
    hotel_id: number;
    name: string;
    image: string;
  }
}

interface Packages {
  package_id: number;
  package_name: string;
  image: string;
}

interface Booking {
  booking_id: number;
  create_at: string;
  status: string;
  hotel_booking_id: number;
  packages: Packages;
}

interface User {
  user_id: number;
  name: string;
  email: string;
  package_bookings: Booking[];
}

interface UserWithLatestBooking extends User {
  latestCompletedBooking?: Booking | null;
}

const HotelReview: React.FC<ReviewCardProps> = ({ id, onSubmitted }) => {
  const [user, setUser] = useState<UserWithLatestBooking | null>(null);
  const [hotel, setBookingHotel] = useState<hotel_bookings | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorButton, setErrorButton] = useState<string | null>(null);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
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

        const hoteBookingId = latestCompletedBooking?.hotel_booking_id;
        if (hoteBookingId) {
          const hotelResponse = await fetch(`/api/booking/hotels/${hoteBookingId}`);
          if (!hotelResponse.ok) throw new Error("Failed to fetch hotel data");
          const hotelData: hotel_bookings = await hotelResponse.json();
          setBookingHotel(hotelData);
        }
      } catch (error: any) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);
    setErrorButton(null);

    if (!hotel?.hotel_id) {
      setErrorButton("No hotel information found.");
      setLoadingButton(false);
      return;
    }

    try {
      const response = await fetch('/api/reviews/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: id,
          hotel_id: hotel.hotel_id,
          rating,
          title_review: title.trim(),
          comment: comment.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit review');

      onSubmitted(); // trigger next step
    } catch (err: any) {
      setErrorButton(err.message);
    } finally {
      setLoadingButton(false);
    }
  }, [id, hotel, rating, title, comment, onSubmitted]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-8 shadow">
      {loading ? (
        <p className="text-center text-gray-500">Loading user details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className={inter.className}>
          {/* Hotel Card */}
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src={hotel?.hotels.image || "/img/Homepage/Mfu.jpg"}
              alt="Hotel"
              className="w-30 h-20 rounded-[10px] object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{hotel?.hotels.name}</h3>
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
                    className={`cursor-pointer transition-colors ${
                      (hoverRating || rating) >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
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
              className="mt-6 w-full bg-[#D35239] text-white py-2 rounded-lg hover:bg-red-600 transition"
              disabled={loadingButton}
            >
              {loadingButton ? 'Submitting...' : 'Submit Review'}
            </button>

            {errorButton && <p className="text-red-600 text-center mt-2">{errorButton}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default HotelReview;
