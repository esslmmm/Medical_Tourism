import React, { useEffect, useState } from "react";
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

interface AccommodationCardProps {
  selectedDay: number | "all"; // ✅ Accepts selectedDay as a prop
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ selectedDay }) => {
  const { id } = useParams();
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [hotelBooking, setHotelBooking] = useState<HotelBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        // Step 1: Fetch package booking details
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();
        setPackageBooking(packageData);

        // Step 2: Fetch hotel booking details if hotel_booking_id exists
        if (packageData.hotel_booking_id) {
          const hotelResponse = await fetch(`/api/booking/hotels/${packageData.hotel_booking_id}`);
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

  if (loading) return <p className="text-center text-gray-500">Loading accommodation details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!packageBooking) return <p className="text-center text-gray-500">No package booking found.</p>;
  if (!packageBooking.hotel_booking_id) return <p className="text-center text-gray-500">No hotel booking associated with this package.</p>;
  if (!hotelBooking) return <p className="text-center text-gray-500">Loading hotel details...</p>;

  // ✅ Correctly Calculate the Selected Date
  let showAccommodation = false;
  let selectedDate: Date | null = null;

  if (selectedDay !== "all" && hotelBooking) {
    selectedDate = getDateForSelectedDay(hotelBooking.check_in_date, selectedDay);
    const checkInDate = new Date(hotelBooking.check_in_date);
    const checkOutDate = new Date(hotelBooking.check_out_date);

    // ✅ Ensure selectedDate is within range
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      showAccommodation = selectedDate >= checkInDate && selectedDate <= checkOutDate;
    }
  } else {
    showAccommodation = true; // Show everything if "all" is selected
  }

  if (!showAccommodation) return null; // ✅ Hide accommodation if it's not for the selected day

  return (
    <div className={`${inter.className} mt-2`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Accommodation</h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        {/* Left Side: Hotel Image */}
        <img
          src={hotelBooking.hotels?.image ?? "/default-hotel.jpg"} // ✅ Fallback image if not available
          alt={hotelBooking.hotels?.name ?? "Hotel Image"}
          className="w-55 h-40 rounded-[15px] object-cover"
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
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
