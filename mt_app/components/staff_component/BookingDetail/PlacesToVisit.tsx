"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Clock, MapPin } from "lucide-react";
import { tourism_bookings } from "@/types/Booking";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface TripProps {  
  tripBooking: tourism_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const PlacesToVisit = ({tripBooking, setPackageBooking}: TripProps) => {
  if(!tripBooking) return null;

const handleStatusChange = async (newStatus: string) => {
  if (!tripBooking) return;

  try {
    const response = await fetch(`/api/booking/trips/${tripBooking.tourism_id}`, {
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


return (
  <div className={`${inter.className} mb-10 mt-5`}>
      {/* Section Title */}
      <h2 className="ml-2 text-2xl font-bold mb-4 text-gray-800">Tourism Booking</h2>

      <div className="border border-[#C5D1E0] w-full max-w-[850px] p-6 rounded-2xl shadow-md bg-white relative hover:shadow-lg transition-all">
        {/* Status Dropdown - Top Right */}
        <div className="absolute top-6 right-6">
          <select
            id="status"
            value={tripBooking?.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`border rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 transition
              ${
                tripBooking?.status === "Pending"
                  ? "text-white bg-[#FFCC00] border-[#E0C050] focus:ring-yellow-300"
                  : ""
              }
              ${
                tripBooking?.status === "Approved"
                  ? "text-white bg-[#28A83D] border-[#1E7A2E] focus:ring-green-300"
                  : ""
              }
              ${
                tripBooking?.status === "Rejected"
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

        {/* Route Information */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={tripBooking.routes?.image}
            alt={tripBooking.routes?.title}
            className="w-full md:w-[280px] h-[180px] object-cover rounded-xl border border-gray-200"
          />
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-gray-800">{tripBooking.routes?.title ?? "Unknown Route"}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{tripBooking.routes?.duration ?? "N/A"} Day(s)</span>
            </div>
          </div>
        </div>

        {/* Attractions List */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Place To Visit</h3>
        <div className="space-y-5">
          {tripBooking.routes?.attractions?.map((place, index) => (
            <div
              key={place.attraction_id}
              className={`flex flex-col md:flex-row gap-6 pb-4 ${
                index !== tripBooking.routes.attractions.length - 1 ? "border-b border-[#E2E8F0]" : ""
              }`}
            >
              <img
                src={place.places.image}
                alt={place.places.name}
                className="w-full md:w-[200px] h-[140px] object-cover rounded-lg border border-gray-200"
              />

              <div className="flex-1 space-y-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  <MapPin className="inline-block w-4 h-4 text-blue-500 mr-1" />
                  {place.places.name}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {place.places.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
);
};

export default PlacesToVisit;