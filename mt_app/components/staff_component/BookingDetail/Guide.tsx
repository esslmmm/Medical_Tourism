import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

interface guide_bookings {
  booking_id: number;
  guide_id: number;
  start: string;
  end: string;
  status: string
  guides: Guides;
}

interface Guides {
  guide_id: number;
  name: string;
  language: string;
  phone: string;
  image: string;
}

interface GuideProps {  
  guideBooking: guide_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const Guide = ({guideBooking, setPackageBooking}: GuideProps) => {
  if(!guideBooking) return null;

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYearMonth = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; 
  
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  };

  const getDayOnly = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; 
  
    return date.getDate();
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!guideBooking) return;
    try {
      const response = await fetch(`/api/booking/guides/${guideBooking.booking_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus, // Only send the status
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
  
      const updated = await response.json();
  
      // Update local state
      setPackageBooking((prev: any) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              guide_bookings: {
                ...prev.guide_bookings,
                status: newStatus,
              },
            }
          : prev
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Could not update status");
    }
  };
  
  const startDate = guideBooking?.start ? getDayOnly(guideBooking.start) : null;
  const endDate = guideBooking?.end ? getDayOnly(guideBooking.end) : null;
  const markedDates =
    typeof startDate === "number" &&
    typeof endDate === "number" &&
    startDate <= endDate
      ? Array.from({ length: endDate - startDate + 1 }, (_, i) => startDate + i)
      : [];


  return (
    <div className={`border border-[#C5D1E0] w-[850px] p-4 rounded-xl shadow-md bg-white relative ${inter.className}`}>
      <h2 className="text-xl font-bold mb-4" style={{ fontSize: "25px" }}>Guide</h2>
      {/* Status Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <select
          id="status"
          value={guideBooking?.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-[18px] px-2 py-1 text-sm focus:outline-none focus:ring-2
            ${guideBooking?.status === 'Pending' ? 'text-white bg-[#FFCC00] border-[#C5D1E0] focus:ring-yellow-300' : ''}
            ${guideBooking?.status === 'Approved' ? 'text-white bg-[#28A83D] border-[#C5D1E0] focus:ring-green-300' : ''}
            ${guideBooking?.status === 'Rejected' ? 'text-white bg-[#FB5626] border-[#C5D1E0] focus:ring-red-300' : ''}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex items-start">
        {/* Guide Image */}
        <img 
          src={guideBooking.guides.image} 
          alt="Guide" 
          className="w-30 h-30 rounded-full ml-15 mb-5 border border-gray-300 mr-4"
        />

        {/* Guide Info */}
        <div className="ml-10 space-y-1">
          <p className="text-md font-bold">Name: <span className="font-normal">{guideBooking?.guides?.name ?? "Unknown"}</span></p>
          <p className="text-md font-bold">Language: <span className="font-normal">{guideBooking?.guides?.language ?? "Unknown"}</span></p>
          <p className="text-md font-bold">Contact Number: <span className="font-normal">{guideBooking?.guides?.phone ?? "Unknown"}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
