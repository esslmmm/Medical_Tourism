"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

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
  status: string;
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
        const response = await fetch(`/api/admin/booking/packages/${id}`);
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

const handleStatusChange = async (newStatus: string) => {
  if (!tripData) return;

  try {
    const response = await fetch(`/api/booking/trips/${tripData.tourism_id}`, {
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
    setTripData((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
          }
        : prev
    );
  } catch (err) {
    console.error("Error updating status:", err);
    alert("Could not update status");
  }
};


if (loading) return <p className="text-center text-gray-500">Loading place details...</p>;
if (error) return <p className="text-center text-red-500">Error: {error}</p>;
if (!tripData || !tripData.trips?.package_places?.length)
  return <p className="text-center text-gray-500">No places to visit found.</p>;
if (!filteredPlaces || filteredPlaces.length === 0)
  return null;

return (
  <div className={`${inter.className} mb-8`}>
  <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Places to Visit</h2>
  <div className="border border-[#C5D1E0] w-[850px] p-4 rounded-xl shadow-md bg-white relative">
    {filteredPlaces.map((place, index) => (
      <div
        key={place.packplace_id}
        className={`flex items-center gap-6 p-4 ${
          index !== filteredPlaces.length - 1 ? "border-b border-[#C5D1E0]" : ""
        }`}
      >
        {/* Status Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <select
          id="status"
          value={tripData?.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-[18px] px-2 py-1 text-sm focus:outline-none focus:ring-2
            ${tripData?.status === 'Pending' ? 'text-white bg-[#FFCC00] border-[#C5D1E0] focus:ring-yellow-300' : ''}
            ${tripData?.status === 'Approved' ? 'text-white bg-[#28A83D] border-[#C5D1E0] focus:ring-green-300' : ''}
            ${tripData?.status === 'Rejected' ? 'text-white bg-[#FB5626] border-[#C5D1E0] focus:ring-red-300' : ''}
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