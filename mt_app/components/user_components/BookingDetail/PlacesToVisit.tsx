"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import PlacesSkeleton from "../skeleton-screen/BookingDetail/PlacesSkeleton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


interface tourism_bookings {
  tourism_id: number;
  trips: trips
  
}

interface trips {
  tour_id: number;
  package_places: PackagePlaces[];
}

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
}

const PlacesToVisit = ({ tripBooking }: TripProps) => {

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


return (
  <div className={`${inter.className}`}>
    <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Places to Visit</h2>
  <div className="w-[850px] mx-auto bg-white p-4 rounded-xl shadow-md border border-[#C5D1E0]">
    {tripBooking?.trips?.package_places.map((place, index) => (
      <div
        key={place.packplace_id}
        className={`flex items-center gap-6 p-4 ${
          index !== tripBooking?.trips?.package_places.length - 1 ? "border-b border-[#C5D1E0]" : ""
        }`}
      >
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