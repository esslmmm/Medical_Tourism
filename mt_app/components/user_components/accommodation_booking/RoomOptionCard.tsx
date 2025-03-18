"use client";

import { useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const roomOptions = [
  {
    id: 1,
    name: "Deluxe Twins",
    images: ["/img/room1.png", "/img/image_2.jpg", "/img/image_3.jpg"],
    price: 5890,
    originalPrice: 6490,
    discount: "48% off",
    details: [
      "🛏 2 single beds",
      "📏 Room size: 30 m² / 323 ft²",
      "🌆 City view",
      "🚭 Non-smoking",
      "🚿 Shower",
    ],
    facilities: [
      "✔ Free fitness center access",
      "✔ Book and pay now",
      "✔ Good breakfast included",
      "✔ Non-refundable (Low price!)",
      "✔ Free WiFi",
    ],
  },
  {
    id: 2,
    name: "Luxury King Suite",
    images: ["/img/room2.png", "/img/image_2.jpg", "/img/image_3.jpg"],
    price: 7590,
    originalPrice: 8990,
    discount: "30% off",
    details: [
      "🛏 1 King bed",
      "📏 Room size: 50 m² / 538 ft²",
      "🌅 Ocean view",
      "🚭 Non-smoking",
      "🛁 Bathtub",
    ],
    facilities: [
      "✔ Private balcony",
      "✔ Free minibar",
      "✔ Complimentary breakfast",
      "✔ Non-refundable (Exclusive price!)",
      "✔ High-speed WiFi",
    ],
  },
  {
    id: 3,
    name: "Executive Suite",
    images: ["/img/room3.png", "/img/image_2.jpg", "/img/image_3.jpg"],
    price: 10290,
    originalPrice: 12490,
    discount: "20% off",
    details: [
      "🛏 1 King bed, 1 Sofa bed",
      "📏 Room size: 70 m² / 753 ft²",
      "🏙 City skyline view",
      "🚭 Non-smoking",
      "🛁 Jacuzzi",
    ],
    facilities: [
      "✔ Executive lounge access",
      "✔ Free room service",
      "✔ Complimentary breakfast and dinner",
      "✔ Late checkout option",
      "✔ Ultra-fast WiFi",
    ],
  },
];

const RoomOptionCard = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 gap-6">
      {roomOptions.map((room) => (
        <div key={room.id} className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full flex flex-col lg:flex-row">
          {/* Left Side: Images & Pricing */}
          <div className="w-full lg:w-1/3 border-gray-100 border-r-2 p-4">
            <div className="rounded-lg overflow-hidden">
              <Image src={room.images[0]} alt="Room Image" width={400} height={250} className="w-full object-cover" />
            </div>
            <div className="flex gap-2 mt-2">
              {room.images.slice(1).map((img, index) => (
                <Image key={index} src={img} alt={`Thumbnail ${index}`} width={80} height={50} className="rounded-lg" />
              ))}
              <div className="relative w-20 h-12 rounded-lg overflow-hidden">
                <Image src={room.images[0]} alt="More photos" layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold">
                  +35 photos
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 line-through text-sm">${room.originalPrice} USD</p>
              <p className="text-red-500 text-sm">{room.discount}</p>
              <p className="text-2xl font-bold">${room.price} USD</p>
              <p className="text-gray-500 text-sm">Per night includes taxes and charges</p>
            </div>
          </div>

          {/* Middle: Room Details */}
          <div className="w-full lg:w-1/3 px-6 border-r-2 border-gray-100">
            <h3 className="text-2xl font-bold">{room.name}</h3>
            <h4 className="text-lg font-semibold mt-4">Details</h4>
            <ul className="text-gray-600 mt-2 space-y-2">
              {room.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
            <a href="#" className="text-blue-600 font-medium mt-4 inline-block">➕ See all room facilities</a>
          </div>

          {/* Right: Booking Actions */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center ml-3">
            <div className="flex items-center space-x-4">
              <button onClick={decrement} className="border px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button onClick={increment} className="border px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
            <button className="w-full bg-green-400 text-white text-lg font-semibold py-3 mt-4 rounded-lg hover:bg-green-500">
              Add Now
            </button>
            <p className="text-red-500 text-sm mt-2 font-medium">Limited availability</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomOptionCard;
