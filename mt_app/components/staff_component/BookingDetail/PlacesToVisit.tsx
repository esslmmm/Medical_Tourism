"use client";
import React from "react";
import { Clock, MapPin } from "lucide-react";
import { tourism_bookings } from "@/types/Booking";

interface TripProps {  
  tripBooking: tourism_bookings | null;
  setPackageBooking: (arg: any) => void;
}

const PlacesToVisit = ({ tripBooking, setPackageBooking }: TripProps) => {
  if (!tripBooking) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (!tripBooking) return;
    try {
      const response = await fetch(`/api/booking/trips/${tripBooking.tourism_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed");

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
      console.error(err);
      alert("Could not update status");
    }
  };

  return (
    <div className="">
      {/* Main Card */}
      <div className="p-6 relative">

        {/* Status Dropdown */}
        <div className="absolute top-6 right-6">
          <select
            id="status"
            value={tripBooking?.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold shadow-sm border transition-all
              ${tripBooking?.status === "Pending" && "bg-yellow-500 text-white"}
              ${tripBooking?.status === "Approved" && "bg-green-600 text-white"}
              ${tripBooking?.status === "Rejected" && "bg-red-500 text-white"}
            `}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Route Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="overflow-hidden rounded-xl shadow-md border border-gray-200">
            <img
              src={tripBooking.routes?.image}
              alt={tripBooking.routes?.title}
              className="w-full md:w-[300px] h-[200px] object-cover scale-100 hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                 <h3 className="text-2xl font-bold text-gray-900">
              {tripBooking.routes?.title}
            </h3>
                </h3>

                <p className="flex items-center text-gray-600 gap-2 text-lg">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">
                {tripBooking.routes?.duration ?? "N/A"} Day(s)
              </span>
                </p>
              </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-b border-gray-200"></div>

        {/* Places to Visit */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">Places to Visit</h3>

        <div className="space-y-6">
          {tripBooking.routes?.attractions?.map((place) => (
            <div
              key={place.attraction_id}
              className="flex flex-col md:flex-row gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <img
                  src={place.places.image}
                  alt={place.places.name}
                  className="w-full md:w-[220px] h-[150px] object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {place.places.name}
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {place.places.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-6 border-b border-gray-200"></div>

      </div>
    </div>
  );
};

export default PlacesToVisit;
