"use client";

import { useState } from "react";
import Image from "next/image";

const accommodations = [
  {
    id: 1,
    name: "The Heritage Chiang Rai Hotel 1",
    image: "/img/room1.png", 
    rating: 4.7,
    features: ["Free WiFi", "Spa", "+4"],
  },
  {
    id: 2,
    name: "The Heritage Chiang Rai Hotel 2",
    image: "/img/room2.png", 
    rating: 4.7,
    features: ["Swimming", "Spa", "+4"],
  },
  {
    id: 3,
    name: "The Heritage Chiang Rai Hotel 3",
    image: "/img/room3.png", 
    rating: 4.7,
    features: ["Free WiFi", "Spa", "+4"],
  },
];

const AccommodationCard = () => {
  const [selected, setSelected] = useState<number | null>(null);


  return (
    <div>
      <div className="flex justify-center bg-white mt-6">
        <h1 className="text-4xl font-bold">Accommodation</h1>
      </div>
      <div className="flex justify-center py-10 bg-white">
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {accommodations.map((hotel) => (
            <div
              key={hotel.id}
              className={`relative bg-white overflow-hidden shadow-lg w-60 cursor-pointer transition transform ${
                selected === hotel.id ? "ring-4 ring-green-500 scale-105" : ""
              }`}
              onClick={() => setSelected(hotel.id)}
            >
              {/* Hotel Image */}
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={243}
                height={200}
                className="w-full h-90 object-cover"
              />

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium text-sm">{hotel.rating}/5</span>
              </div>

              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10">
                  {/* Hotel Name */}
                  <div className="text-white text-md font-semibold mb-8">{hotel.name}</div>

                  {/* Features */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hotel.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-white px-3 py-1 rounded-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div className="flex justify-center mt-6">
          <p className="text-2xl font-semibold text-black mb-11">
            {accommodations.find((hotel) => hotel.id === selected)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccommodationCard;
