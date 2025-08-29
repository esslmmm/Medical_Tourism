import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface TimelineSelectorProps {
  selectedDay: number | "all";
  setSelectedDay: React.Dispatch<React.SetStateAction<number | "all">>;
}

interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  appointment_id: number;
  package_id: string;
  hotel_bookings: hotel_bookings;
}

interface hotel_bookings {
  booking_id: number;
  hotel_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  guest_adult: string | null;
  guest_children: string | null;
}

interface Packages {
  package_id: string;
  package_type: string;
  duration: number;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ selectedDay, setSelectedDay }) => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [bookingData, setBookingData] = useState<PackageBooking | null>(null);
  const [packageData, setPackageData] = useState<Packages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const bookingResponse = await fetch(`/api/admin/booking/packages/${id}`);
        if (!bookingResponse.ok) throw new Error("Failed to fetch booking data");
        const bookingResult: PackageBooking = await bookingResponse.json();
        setBookingData(bookingResult);

        // Fetch package details using extracted package_id
        const packageResponse = await fetch(`/api/services/packages/${bookingResult.package_id}`);
        if (!packageResponse.ok) throw new Error("Failed to fetch package data");
        const packageResult: Packages = await packageResponse.json();
        setPackageData(packageResult);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);

  const formatDate = (timestamp: string | number | Date) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <p className="text-center text-gray-500">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!bookingData || !packageData) return <p className="text-center text-gray-500">No data found.</p>;

  // Convert check-in date to a date object
  const checkInDate = new Date(bookingData.hotel_bookings?.check_in_date);

  return (
    <div className={`bg-white p-5 rounded-[20px] shadow-md mb-4 border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="font-bold mb-3" style={{ fontSize: "22px" }}>Timeline</h2>
      <div className="flex gap-3">
        
        {/* ✅ Dynamically Map Days Based on packageData.duration */}
        {[...Array(packageData.duration)].map((_, index) => {
          const day = index + 1;
          const dayDate = new Date(checkInDate);
          dayDate.setDate(checkInDate.getDate() + index); // Increment day based on index

          return (
            <button
              key={day}
              className={`py-1 font-bold rounded-[18px] w-[120px] ${
                selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              style={{ fontSize: "14px" }}
              onClick={() => setSelectedDay(day)}
            >
              Day {day}<br />
              <span style={{ fontSize: "12px" }}>{formatDate(dayDate)}</span>
            </button>
          );
        })}

        {/* ✅ All Days Button */}
        <button
          className={`py-1 font-semibold rounded-[18px] w-[120px] ${
            selectedDay === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedDay("all")}
        >
          All Trip
        </button>
      </div>
    </div>
  );
};

export default TimelineSelector;
