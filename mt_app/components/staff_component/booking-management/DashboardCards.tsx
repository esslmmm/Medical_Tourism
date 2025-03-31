import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import for optimized images
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PackageBooking {
  booking_id: number; // Fixed typo from "bookind_id" to "booking_id"
  package_id: number;
  create_at: string;
  status: string;
}

const DashboardCards = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [disapprovedCount, setDisapprovedCount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data: PackageBooking[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setBookings(data);
        setCount(data.length);
        setPendingCount(data.filter((booking) => booking.status === "Pending").length);
        setApprovedCount(data.filter((booking) => booking.status === "Approved").length);
        setDisapprovedCount(data.filter((booking) => booking.status === "Disapproved").length);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cards = [
    { imgSrc: "/img/booking-management/total.png", number: count, text: "Total" },
    { imgSrc: "/img/booking-management/pending.png", number: pendingCount, text: "Pending" },
    { imgSrc: "/img/booking-management/approve.png", number: approvedCount, text: "Approved" },
    { imgSrc: "/img/booking-management/disapprove.png", number: disapprovedCount, text: "Disapproved" },
  ];

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div
      className={`pt-10 border border-[#C5D1E0] bg-white rounded-[30px] shadow-md w-full h-[230px] mx-auto flex justify-center gap-40 ${inter.className}`}
    >
      {cards.map(({ imgSrc, number, text }, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <Image src={imgSrc} alt={text} width={96} height={96} className="w-24 h-24" />
          <span className="font-bold text-lg mt-2" style={{ fontSize: "25px" }}>
            {number}
          </span>
          <p className="text-gray-700 font-semibold" style={{ fontSize: "15px" }}>
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
