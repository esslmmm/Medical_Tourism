import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Interface Definitions
interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  hotel_booking_id: number | null;
}

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

const AccommodationCard = () => {
  const { id } = useParams();
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [hotelBooking, setHotelBooking] = useState<HotelBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        // Step 1: Fetch package booking details
        const response = await fetch(`/api/bookings/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();
        setPackageBooking(packageData);

        // Step 2: Fetch hotel booking details if hotel_booking_id exists
        if (packageData.hotel_booking_id) {
          const hotelResponse = await fetch(`/api/bookings/hotels/${packageData.hotel_booking_id}`);
          if (!hotelResponse.ok) throw new Error("Failed to fetch hotel booking data");
          const hotelData = await hotelResponse.json();
          setHotelBooking(hotelData);
        }
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

    return `${date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };

  if (loading) return <p className="text-center text-gray-500">Loading accommodation details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!packageBooking) return <p className="text-center text-gray-500">No package booking found.</p>;
  if (!packageBooking.hotel_booking_id) return <p className="text-center text-gray-500">No hotel booking associated with this package.</p>;
  if (!hotelBooking) return <p className="text-center text-gray-500">Loading hotel details...</p>;

  return (
    <div className={`${inter.className}`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Accommodation</h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        
        {/* Left Side: Hotel Image */}
        <img
          src={hotelBooking.hotels.image} // Fallback image if not available
          alt={hotelBooking.hotels.name}
          className="w-55 h-40 rounded-[15px] object-cover"
        />
        
        {/* Right Side: Details */}
        <div className="flex-1 space-y-1">
          <p className="text-md font-bold">
            Name: <span className="font-normal">{hotelBooking.hotels.name}</span>
          </p>
          <p className="text-md font-bold">
            Date: <span className="font-normal">{formatDate(hotelBooking.check_in_date)} - {formatDate(hotelBooking.check_out_date)} | {hotelBooking.room_aggregate[0]?.amount ?? 1} night(s)</span>
          </p>
          <p className="text-md font-bold">
            Room type: <span className="font-normal">{hotelBooking.room_aggregate[0]?.hotel_rooms?.room_type ?? "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Guest: <span className="font-normal">{hotelBooking.guest_adult ?? "0"} Adults, {hotelBooking.guest_children ?? "0"} Children</span>
          </p>
          <p className="text-md font-bold">
            Check in Time: <span className="font-normal">{hotelBooking.hotels.check_in_time}</span>
          </p>
          <p className="text-md font-bold">
            Contact Number: <span className="font-normal">{hotelBooking.hotels.contact_info}</span>
          </p>
        </div>

        {/* Edit Icon */}
        {/* <FaEdit className="text-gray-500 cursor-pointer self-start" /> */}
      </div>
    </div>
  );
};

export default AccommodationCard;
