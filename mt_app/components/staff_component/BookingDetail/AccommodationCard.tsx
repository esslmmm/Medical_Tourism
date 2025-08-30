import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


interface hotel_bookings {
  booking_id: number;
  hotel_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: string;
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
  hotel_code: number;
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

interface AccommodationCardProps {
  hotelBooking: hotel_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const AccommodationCard = ({ hotelBooking, setPackageBooking }: AccommodationCardProps) => {
  if(!hotelBooking) return null;

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

  const handleStatusChange = async (newStatus: string) => {
    if (!hotelBooking) return;
  
    try {
      const response = await fetch(`/api/booking/hotels/${hotelBooking.booking_id}`, {
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
  
      // Update local state - update the nested hotel_bookings status
      setPackageBooking((prev: any) =>
        prev
          ? {
              ...prev,
              hotel_bookings: {
                ...prev.hotel_bookings,
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
    <div className={`${inter.className} mt-2`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Accommodation</h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4 relative">
        {/* Status Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <select
          id="status"
          value={hotelBooking?.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-[18px] px-2 py-1 text-sm focus:outline-none focus:ring-2
            ${hotelBooking?.status === 'Pending' ? 'text-white bg-[#FFCC00] border-[#C5D1E0] focus:ring-yellow-300' : ''}
            ${hotelBooking?.status === 'Approved' ? 'text-white bg-[#28A83D] border-[#C5D1E0] focus:ring-green-300' : ''}
            ${hotelBooking?.status === 'Rejected' ? 'text-white bg-[#FB5626] border-[#C5D1E0] focus:ring-red-300' : ''}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

        {/* Left Side: Hotel Image */}
        <img
          src={hotelBooking.hotels?.image ?? "/default-hotel.jpg"} // ✅ Fallback image if not available
          alt={hotelBooking.hotels?.name ?? "Hotel Image"}
          className="w-55 h-45 rounded-[15px] object-cover"
        />
        
        {/* Right Side: Details */}
        <div className="flex-1 space-y-1">
          <p className="text-md font-bold">
            Name: <span className="font-normal">{hotelBooking.hotels?.name ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Date: <span className="font-normal">
              {formatDate(hotelBooking.check_in_date)} - {formatDate(hotelBooking.check_out_date)}
              | {hotelBooking.room_aggregate[0]?.amount ?? 1} night(s)
            </span>
          </p>
          <p className="text-md font-bold">
            Room type: <span className="font-normal">{hotelBooking.room_aggregate[0]?.hotel_rooms?.room_type ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Guest: <span className="font-normal">{hotelBooking.guest_adult ?? "0"} Adults, {hotelBooking.guest_children ?? "0"} Children</span>
          </p>
          <p className="text-md font-bold">
            Check in Time: <span className="font-normal">{hotelBooking.hotels?.check_in_time ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Contact Number: <span className="font-normal">{hotelBooking.hotels?.contact_info ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Code: <span className="font-normal">{hotelBooking.hotels?.hotel_code ?? "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
