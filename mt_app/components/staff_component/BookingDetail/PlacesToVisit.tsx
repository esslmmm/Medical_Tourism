"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import { tourism_bookings_status } from "@prisma/client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


interface tourism_bookings {
  tourism_id: number;
  status: string;
  trips: trips;
}

interface trips {
  tour_id: number;
  package_places: PackagePlaces[];
};

interface PackagePlaces {
  packplace_id: number;
  place_id: number;
  tour_id: number;
  date: string;
  start: string;
  end: string;
  places: Places;
}

interface Places {
  place_id: number;
  place_name: string;
  image: string;
  fee: number;
}

interface TripProps {  
  tripBooking: tourism_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const PlacesToVisit = ({tripBooking, setPackageBooking}: TripProps) => {
  if(!tripBooking) return null;
  const addDaysToDate = (baseDate: string, daysToAdd: number) => {
    if (!baseDate) return "Invalid Date";
    const date = new Date(baseDate);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    date.setDate(date.getDate() + (daysToAdd - 1)); // Offset correctly
    return ` ${date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };
  

  const formatTime = (timeString: string) => {
    if (!timeString) return "Invalid Time";
  
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
  
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const period = isPM ? "PM" : "AM";
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

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

    const updated = await response.json();

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
  <div className={`${inter.className} mb-8`}>
  <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Places to Visit</h2>
  <div className="border border-[#C5D1E0] w-[850px] p-4 rounded-xl shadow-md bg-white relative">
    {tripBooking.trips?.package_places.map((place, index) => (
      <div
        key={place.packplace_id}
        className={`flex items-center gap-6 p-4 ${
          index !== tripBooking.trips.package_places.length - 1 ? "border-b border-[#C5D1E0]" : ""
        }`}
      >
        {/* Status Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <select
          id="status"
          value={tripBooking?.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-[18px] px-2 py-1 text-sm focus:outline-none focus:ring-2
            ${tripBooking?.status === 'Pending' ? 'text-white bg-[#FFCC00] border-[#C5D1E0] focus:ring-yellow-300' : ''}
            ${tripBooking?.status === 'Approved' ? 'text-white bg-[#28A83D] border-[#C5D1E0] focus:ring-green-300' : ''}
            ${tripBooking?.status === 'Rejected' ? 'text-white bg-[#FB5626] border-[#C5D1E0] focus:ring-red-300' : ''}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
        <img src={place.places.image} alt={place.places.place_name} className="w-50 h-30 rounded-[15px] object-cover" />

        <div className="flex-1 space-y-2">
          <p className="text-md font-bold">
            Name: <span className="font-normal">{place.places.place_name}</span>
          </p>
          <p className="text-md font-bold">
            Fee: <span className="font-normal">{place.places.fee}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
);
};

export default PlacesToVisit;