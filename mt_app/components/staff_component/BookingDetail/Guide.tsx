import React, { useEffect, useState } from "react";
import { guide_bookings } from "@/types/Booking";
import { CalendarDays } from "lucide-react";

interface GuideProps {  
  guideBooking: guide_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const Guide = ({guideBooking, setPackageBooking}: GuideProps) => {
  if(!guideBooking) return null;

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
  
      // Update local state
      setPackageBooking((prev: any) =>
          prev
            ? {
                ...prev,
                status: newStatus,
                  tourism_bookings: {
                    ...prev.tourism_bookings,
                      guide_bookings:{
                        ...prev.tourism_bookings.guide_bookings,
                        status: newStatus,
                    },
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


  return (
    <div
      className={`p-6 relative`}
    >
      {/* Title */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">Guide</h3>

      {/* Status Dropdown - Top Right */}
      <div className="absolute top-6 right-6">
        <select
          id="status"
          value={guideBooking?.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 transition
            ${
              guideBooking?.status === "Pending"
                ? "text-white bg-[#FFCC00] border-[#E0C050] focus:ring-yellow-300"
                : ""
            }
            ${
              guideBooking?.status === "Approved"
                ? "text-white bg-[#28A83D] border-[#1E7A2E] focus:ring-green-300"
                : ""
            }
            ${
              guideBooking?.status === "Rejected"
                ? "text-white bg-[#FB5626] border-[#C9441F] focus:ring-red-300"
                : ""
            }
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Content Section */}
      <div className="ml-15 mt-4 space-x-30 flex text-gray-700">
        {/* Date Range */}
        <div>
          <p className="text-md font-semibold text-gray-600 mb-2">Booking Period</p>
          <div className="flex items-center gap-3 border border-[#D6E0EE] bg-[#F9FBFD] p-3 rounded-xl w-fit">
            <CalendarDays className="text-[#3B82F6] w-5 h-5" />
            <p className="text-md font-medium text-gray-800">
              {guideBooking?.start && guideBooking?.end
                ? `${new Date(guideBooking.start).toLocaleDateString()} → ${new Date(
                    guideBooking.end
                  ).toLocaleDateString()}`
                : "Not specified"}
            </p>
          </div>
        </div>

        {/* Language */}
        <div>
          <p className="text-md font-semibold text-gray-600">Language</p>
          <p className="text-lg font-medium mt-1 black">
            {guideBooking?.language ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
