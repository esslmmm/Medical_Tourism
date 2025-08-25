"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";

interface Booking {
  tourism_bookings: tourism_bookings;
}

interface tourism_bookings{
  routes: routes;
}

interface routes{
  trips: trips;
}

interface trips{
  tour_id: number;
  package_places: package_places[];
}

interface package_places{
  packplace_id: number;
  place_id: String;
  date: number;
  start: string;
  end: string;
  places: places;
}

interface places{
  place_id: String;
  place_name: string;
  description: string;
  image: string;
}

interface BookingDetailsProps {
  data: Booking;
}

const PlaceToVisit: React.FC<BookingDetailsProps> = ({ data }) => {

  return (
      <div className="bg-white p-6 border-b border-[#E0E0E0]">
        <h3 className="text-xl font-bold text-black">Place to Visit</h3>
        <div className="space-y-8">
          {data.tourism_bookings.routes.trips.package_places.map((placeItem) => (
            <div
              key={placeItem.packplace_id}
              className="flex gap-4 items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={placeItem.places.image}
                  alt={placeItem.places.place_name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col max-w-md">
                <p className="text-gray-900 font-semibold text-lg">
                  {placeItem.places.place_name}
                </p>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {placeItem.places.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default PlaceToVisit