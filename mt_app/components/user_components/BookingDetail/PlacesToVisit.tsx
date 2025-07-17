"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import PlacesSkeleton from "../skeleton-screen/BookingDetail/PlacesSkeleton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  appointment_id: number;
  package_id: number;
  tourism_bookings: { tourism_id: number };
}

interface TourismTrip {
  tourism_id: number;
  trips: {
    tour_id: number;
    package_places: PackagePlaces[];
  };
}

interface HotelBooking {
  booking_id: number;
  hotel_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  guest_adult: string | null;
  guest_children: string | null;
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

interface PlacesToVisitProps {
  selectedDay: number | "all"; // ✅ Accepts selectedDay as a prop
}

const PlacesToVisit: React.FC<PlacesToVisitProps> = ({ selectedDay }) => {
  const { id } = useParams();
  const [tourismId, setTourismId] = useState<number | null>(null);
  const [hotelBooking, setHotelBooking] = useState<HotelBooking | null>(null);
  const [tripData, setTripData] = useState<TourismTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        // Step 1: Fetch package booking details
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();

        if (!packageData.tourism_bookings?.tourism_id) {
          setError("No tourism booking associated with this package.");
          setLoading(false);
          return;
        }

        if (packageData.hotel_booking_id) {
          const hotelResponse = await fetch(`/api/booking/hotels/${packageData.hotel_booking_id}`);
          if (!hotelResponse.ok) throw new Error("Failed to fetch hotel booking data");
          const hotelData = await hotelResponse.json();
          setHotelBooking(hotelData);
        }

        setTourismId(packageData.tourism_bookings.tourism_id);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);

  useEffect(() => {
    if (!tourismId) return;

    const fetchTourismTrip = async () => {
      try {
        // Step 2: Fetch trip details using tourism_booking_id
        const response = await fetch(`/api/booking/trips/${tourismId}`);
        if (!response.ok) throw new Error("Failed to fetch tourism trip data");
        const tripResult = await response.json();
        setTripData(tripResult);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourismTrip();
  }, [tourismId]);


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

const filteredPlaces = tripData?.trips?.package_places.filter(place =>
  selectedDay === "all" || parseInt(place.date) === selectedDay
);


if (loading) {
  return <PlacesSkeleton />
}
if (error) return <p className="text-center text-red-500">Error: {error}</p>;
if (!tripData || !tripData.trips?.package_places?.length)
  return <p className="text-center text-gray-500">No places to visit found.</p>;
if (!filteredPlaces || filteredPlaces.length === 0)
  return null;

return (
  <div className={`${inter.className}`}>
    <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Places to Visit</h2>
  <div className="w-[850px] mx-auto bg-white p-4 rounded-xl shadow-md border border-[#C5D1E0]">
    {filteredPlaces.map((place, index) => (
      <div
        key={place.packplace_id}
        className={`flex items-center gap-6 p-4 ${
          index !== filteredPlaces.length - 1 ? "border-b border-[#C5D1E0]" : ""
        }`}
      >
        <img src={place.places.image} alt={place.places.place_name} className="w-50 h-30 rounded-[15px] object-cover" />

        <div className="flex-1 space-y-2">
          <p className="text-md font-bold">
            Name: <span className="font-normal">{place.places.place_name}</span>
          </p>
          <p className="text-md font-bold">
              Date / Time: 
              <span className="font-normal">
                 {hotelBooking?.check_in_date ? addDaysToDate(hotelBooking.check_in_date, parseInt(place.date)) : "Unknown Date"}, {formatTime(place.start)} - {formatTime(place.end)}
              </span>
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