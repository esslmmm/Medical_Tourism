import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { differenceInDays } from 'date-fns';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface HotelBooking {
  booking_id: number;
  hotel_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  guest_adult: string | null;
  guest_children: string | null;
  hotels: Hotels;
  room_aggregate: RoomAggregate[];
}

interface Hotels {
  hotel_id: number;
  name: string;
  contact_info: string;
  check_in_time: string;
  image: string;
}

interface RoomAggregate {
  aggregate_id: number;
  room_id: number;
  booking_id: number;
  amount: number;
  hotel_rooms: HotelRooms;
}

interface HotelRooms {
  room_id: number;
  hotel_id: number;
  room_type: string;
}

const AccommodationCard = ({ hotelBooking }: { hotelBooking: HotelBooking | null }) => {

  const nights = differenceInDays(
    new Date(hotelBooking?.check_out_date ?? ""),
    new Date(hotelBooking?.check_in_date ?? "")
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDateForSelectedDay = (baseDate: string, dayOffset: number): Date | null => {
    if (!baseDate) return null;
    const date = new Date(baseDate);
    if (isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + (dayOffset - 1)); // ✅ Correctly adds days
    return date;
  };


  return (
    <div className={`${inter.className}`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Accommodation</h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        {/* Left Side: Hotel Image */}
        <img
          src={hotelBooking?.hotels?.image ?? "/default-hotel.jpg"} // ✅ Fallback image if not available
          alt={hotelBooking?.hotels?.name ?? "Hotel Image"}
          className="w-55 h-40 rounded-[15px] object-cover"
        />
        
        {/* Right Side: Details */}
        <div className="flex-1 space-y-1">
          <p className="text-md font-bold">
            Name: <span className="font-normal">{hotelBooking?.hotels?.name ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Date: <span className="font-normal">
              {formatDate(hotelBooking?.check_in_date ?? "")} - {formatDate(hotelBooking?.check_out_date ?? "")}
              | {nights} night(s)
            </span>
          </p>
          <p className="text-md font-bold">
            Room type: <span className="font-normal">{hotelBooking?.room_aggregate[0]?.hotel_rooms?.room_type ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Guest: <span className="font-normal">{hotelBooking?.guest_adult ?? "0"} Adults, {hotelBooking?.guest_children ?? "0"} Children</span>
          </p>
          <p className="text-md font-bold">
            Check in Time: <span className="font-normal">{hotelBooking?.hotels?.check_in_time}</span>
          </p>
          <p className="text-md font-bold">
            Contact Number: <span className="font-normal">{hotelBooking?.hotels?.contact_info}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
