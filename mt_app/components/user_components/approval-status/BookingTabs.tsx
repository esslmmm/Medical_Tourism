"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BookingSkeleton from "../skeleton-screen/profile/BookingSkeleton";


interface Booking {
  booking_id: number;
  package_id: number;
  create_at: Date;
  status: "Pending" | "Approved" | "Completed";
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

const BookingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Completed">("Pending");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Error fetching user data. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
        ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date) 
        : "Invalid Date";
};


  if (loading) {
    return <BookingSkeleton />
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      {/* Tabs for Booking Status */}
        <div className="flex gap-50 text-lg font-bold cursor-pointer mb-6 relative">
          {["Pending", "Approved", "Completed"].map((tab) => (
            <div key={tab} className="relative">
              <span
                className={`px-4 pb-2 transition-all duration-300 ${
                  activeTab === tab
                    ? tab === "Pending"
                      ? "text-[#FFCC00]"
                      : tab === "Approved"
                      ? "text-[#2196F3]"
                      : "text-[#4CAF50]"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab(tab as "Pending" | "Approved" | "Completed")}
              >
                {tab === "Pending" ? "In Process" : tab === "Approved" ? "Wait for Payment" : "Completed"}
              </span>
              {/* Motion Underline Animation */}
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className={`absolute bottom-0 left-0 w-full h-1 ${
                    tab === "Pending"
                      ? "bg-yellow-400"
                      : tab === "Approved"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
        
      
      {/* Booking List */}
        {(user?.package_bookings ?? []).filter((booking) => booking.status === activeTab).length > 0 ? ( user?.package_bookings
          .filter((booking) => booking.status === activeTab)
          .map((booking) => (
            <div key={booking.booking_id} className="flex flex-col md:flex-row items-center bg-white p-3 rounded-lg shadow-md mb-4">
              {/* Package Image */}
              <img
                src={booking.packages.image || "/img/xray.png"}
                alt="Package Image"
                className="w-24 h-16 rounded-md shadow-md md:w-40 md:h-28"
              />

              {/* Booking Details */}
              <div className="flex-1 ml-4 text-center md:text-left flex flex-col justify-start">
                <h3 className="text-lg font-semibold">{booking.packages.package_name}</h3>
                <p className="text-gray-600">Date: {formatDate(booking.create_at)}</p>
                {booking.status === "Approved" && (
                  <p className="text-red-500 text-sm">Expired 3 days before the booking confirmation timeout.</p>
                )}
              </div>

              {/* Buttons */}
              <div className="ml-auto flex gap-3 mt-4 md:mt-0">
                {/* View More Button */}
                <motion.button
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => router.push(`/user/BookingDetail/${booking.booking_id}`)}
                  whileTap={{ scale: 0.95 }}
                >
                  View More
                </motion.button>

                {/* Pay Now Button (Only visible for Approved Bookings) */}
                {booking.status === "Approved" && (
                  <motion.button
                    className="bg-black text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                    whileTap={{ scale: 0.95 }}
                  >
                    Pay Now
                  </motion.button>
                )}
              </div>
            </div>
          ))
      ) : (
        // Display No Content Image if there are no bookings
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
          <img src="/img/Packages/Nocontent.png" alt="No Content" className="w-120 h-120 object-contain" />
        </div>
      )}
    </div>
  );
};

export default BookingTabs;
