'use client';
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { FaStar } from "react-icons/fa";
import { useParams, useRouter } from 'next/navigation';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Booking {
    booking_id: number;
    package_id: number;
    create_at: Date;
    status:"Completed";
    packages: Packages;
  }
  
  interface Packages {
    package_id: number;
    image: string;
    package_name: string;
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

const ReviewCard = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const { id } = useParams();
    const [user, setUser] = useState<UserWithLatestBooking | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      if (!id) return;
    
      async function fetchUser() {
        try {
          const response = await fetch(`/api/profile/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
    
          const data: User = await response.json(); // Ensure correct typing
    
          // Ensure package_bookings exists before filtering
          if (!data.package_bookings || !Array.isArray(data.package_bookings)) {
            throw new Error("package_bookings is not available");
          }
    
          // Filter bookings with "Completed" status
          const completedBookings = data.package_bookings.filter(
            (booking) => booking.status === "Completed"
          );
    
          // Sort by date (latest first)
          const latestCompletedBooking = completedBookings.sort(
            (a, b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
          )[0] || null;
    
          // Store user data with latestCompletedBooking
          setUser({ ...data, latestCompletedBooking });
        } catch (error) {
          setError("Error fetching user data. Please try again.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchUser();
    }, [id]);
    
      if (loading) return <p className="text-center text-gray-500">Loading user details...</p>;
      if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className={`w-full max-w-md bg-white shadow-lg rounded-[30px] p-6 text-black ${inter.className}`}>

                    {/* Package Details Card */}
                    <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <h3 className="text-lg font-semibold">Basic Check-Up And Travel Package</h3>
                            <p className="text-sm text-gray-600">MFU Hospital</p>
                        </div>
                    </div>

                    {/* Star Rating Section */}
                    <div className="mt-6 text-center">
                        <h4 className="text-sm font-medium">What is your rate</h4>
                        <div className="flex justify-center space-x-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    size={24}
                                    className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Review Input Section */}
                    <div className="mt-6 text-center">
                        <label className="text-sm font-medium block">
                            Please share your opinion about the service
                        </label>
                        <textarea
                            className="w-full mt-2 border rounded-md p-2 h-24 text-black"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="mt-6 w-full bg-[#D35239] text-white py-2 rounded-lg hover:bg-gray-600">
                        SEND REVIEW
                    </button>
                </div>
            </div>
    );
};

export default ReviewCard;

