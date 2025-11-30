"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { tourism_bookings } from '@/types/Booking';

interface BookingDetailsProps {
  data: tourism_bookings | null;
}

const PlaceToVisit: React.FC<BookingDetailsProps> = ({ data }) => {
  if(!data) return;
  return (
      <div className="bg-whit border-b border-[#E0E0E0] mt-4">
        <h3 className="text-xl font-bold text-black mb-2">Place to Visit</h3>
        <div className="space-y-8">
          {data.routes?.attractions.map((placeItem) => (
            <div
              key={placeItem.attraction_id}
              className="flex gap-4 items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={placeItem.places.image}
                  alt={placeItem.places.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col max-w-md">
                <p className="text-gray-900 font-semibold text-lg">
                  {placeItem.places.name}
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