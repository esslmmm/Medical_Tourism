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
  tourismservices: {
    tour_id: number;
    package_places: PackagePlaces[];
  };
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

const PlacesToVisit: React.FC = () => {
  const { id } = useParams();
  const [tourismId, setTourismId] = useState<number | null>(null);
  const [tripData, setTripData] = useState<TourismTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        // Step 1: Fetch package booking details
        const response = await fetch(`/api/bookings/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();

        if (!packageData.tourism_bookings?.tourism_id) {
          setError("No tourism booking associated with this package.");
          setLoading(false);
          return;
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
        const response = await fetch(`/api/bookings/trips/${tourismId}`);
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

  const formatTime = (isoString: string) => {
    if (!isoString) return "Invalid Time";
  
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Time"; // Check if date is valid
  
    const hours = date.getUTCHours(); // Extract UTC hours
    const minutes = date.getUTCMinutes(); // Extract UTC minutes
  
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 0-23 hours to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure 2-digit minutes
    const period = isPM ? "PM" : "AM";
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  
  

  if (loading) return <p className="text-center text-gray-500">Loading place details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!tripData || !tripData.tourismservices?.package_places?.length)
    return <p className="text-center text-gray-500">No places to visit found.</p>;

  return (
    <div className={`w-[850px] mx-auto bg-white p-6 rounded-xl shadow-md border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="text-xl font-bold ml-5" style={{ fontSize: "25px" }}>Places to Visit</h2>

      {tripData.tourismservices.package_places.map((place, index) => (
        <div
          key={place.packplace_id}
          className={`flex items-center gap-6 p-4 ${
            index !== tripData.tourismservices.package_places.length - 1 ? "border-b border-[#C5D1E0]" : ""
          }`}
        >
          <img src={place.places.image} alt={place.places.place_name} className="w-50 h-30 rounded-[15px] object-cover" />

          <div className="flex-1 space-y-2">
            <p className="text-md font-bold">
              Name: <span className="font-normal">{place.places.place_name}</span>
            </p>
            <p className="text-md font-bold">
              Date / Time: <span className="font-normal">{formatDate(place.date)}, {formatTime(place.start)} - {formatTime(place.end)}</span>
            </p>
            <p className="text-md font-bold">
              Fee: <span className="font-normal">{place.places.fee}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
