import React from "react";
import { FaEdit } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const AccommodationCard = () => {
  return (
    <div className={`${inter.className}`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>Accommodation</h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        
        {/* Left Side: Image */}
        <img
          src="/img/room1.png" // Replace with actual image path
          alt="Chiang Rai Hotel"
          className="w-55 h-40 rounded-[15px] object-cover"
        />
        
        {/* Right Side: Details */}
        <div className="flex-1 space-y-1">
          <p className="text-md font-bold">
            Name: <span className="font-normal">Chiang Rai Hotel</span>
          </p>
          <p className="text-md font-bold">
            Date: <span className="font-normal">8 Feb 2025 - 10 Feb 2025 | 2 night</span>
          </p>
          <p className="text-md font-bold">
            Room type: <span className="font-normal">1 x Sweet dream room (90m²)</span>
          </p>
          <p className="text-md font-bold">
            Guest: <span className="font-normal">1 adult, 3 child</span>
          </p>
          <p className="text-md font-bold">
            Check in Time: <span className="font-normal">1 PM</span>
          </p>
          <p className="text-md font-bold">
            Contact Number: <span className="font-normal">+66 0712959423</span>
          </p>
        </div>

        {/* Edit Icon */}
        {/* <FaEdit className="text-gray-500 cursor-pointer self-start" /> */}
      </div>
    </div>
  );
};

export default AccommodationCard;
