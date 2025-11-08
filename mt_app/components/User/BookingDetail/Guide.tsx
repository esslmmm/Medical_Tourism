import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

interface guide_bookings {
  booking_id: number;
  guide_id: number;
  start: string;
  end: string;
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
}

const Guide = ({ guideBooking }: GuideProps) => {
  const daysInMonth = 30; 
  const startDayOfWeek = 6; 

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

  const startDate = guideBooking?.start ? getDayOnly(guideBooking.start) : null;
  const endDate = guideBooking?.end ? getDayOnly(guideBooking.end) : null;
  const markedDates =
    typeof startDate === "number" &&
    typeof endDate === "number" &&
    startDate <= endDate
      ? Array.from({ length: endDate - startDate + 1 }, (_, i) => startDate + i)
      : [];
  

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md mt-6 border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="text-xl font-bold mb-4" style={{ fontSize: "25px" }}>Guide</h2>

      <div className="flex items-start">
        {/* Guide Image */}
        <img 
          src={guideBooking?.guides.image} 
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
