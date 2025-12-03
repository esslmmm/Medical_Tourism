import React from "react";
import { guide_bookings } from "@/types/Booking";
import { CalendarDays } from "lucide-react";

interface GuideProps {
  guideBooking: guide_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const Guide = ({ guideBooking, setPackageBooking }: GuideProps) => {
  if (!guideBooking) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (!guideBooking) return;

    try {
      const response = await fetch(`/api/booking/guides/${guideBooking.booking_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setPackageBooking((prev: any) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              tourism_bookings: {
                ...prev.tourism_bookings,
                guide_bookings: {
                  ...prev.tourism_bookings.guide_bookings,
                  status: newStatus,
                },
              },
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Could not update status");
    }
  };

  return (
    <div className="relative px-6 pb-8">

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Guide Details</h3>

      {/* Status Dropdown */}
      <div className="absolute top-6 right-6">
        <select
          value={guideBooking.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold shadow-sm border transition
            ${guideBooking.status === "Pending" && "bg-yellow-500 text-white"}
            ${guideBooking.status === "Approved" && "bg-green-600 text-white"}
            ${guideBooking.status === "Rejected" && "bg-red-500 text-white"}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row gap-10 mt-6">

        {/* Booking Period */}
        <div className="flex-1">
          <p className="text-md font-semibold text-gray-600 mb-2">Booking Period</p>

          <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 p-4 rounded-xl shadow-sm w-fit">
            <CalendarDays className="text-blue-500 w-6 h-6" />

            <p className="text-md font-medium text-gray-800">
              {guideBooking.start && guideBooking.end
                ? `${new Date(guideBooking.start).toLocaleDateString()} → ${new Date(
                    guideBooking.end
                  ).toLocaleDateString()}`
                : "Not specified"}
            </p>
          </div>
        </div>

        {/* Language */}
        <div className="flex-1">
          <p className="text-md font-semibold text-gray-600 mb-2">Language</p>
          <p className="text-lg font-semibold text-gray-900">
            {guideBooking.language ?? "Unknown"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Guide;
