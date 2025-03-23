import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const MedicalServiceCard = () => {
  return (
    <div className={`${inter.className}`}>
        <h2 className="ml-2 text-lg font-bold mb-2" style={{fontSize:"25px"}}>Medical Service</h2>
    <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        
      {/* Left Side: Image */}
      <img
        src="/img/Packages/medical4.png"
        alt="Basic Health Check-up Package"
        className="w-55 h-40 rounded-[15px] object-cover"
      />
        
      {/* Right Side: Details */}
      <div className="flex-1 space-y-2">
        
        <p className="text-md font-bold">
          Package Name: <span className="font-normal">Medical Check-up</span>
        </p>
        <p className="text-md font-bold">
          Appointment Date / Time:{" "}
          <span className="font-normal">11 FEB 2025, 10:00 AM - 12:00 PM</span>
        </p>
        <p className="text-md font-bold">
          Attached File:{" "}
          <a href="/files/Medical_Report.pdf" className="text-blue-500 underline">
            Medical_Report.pdf
          </a>
        </p>
        <p className="text-md font-bold">
          Description:{" "}
          <span className="font-normal">
            I have had a high fever, body aches, and chills for the past three
            days. I also have a sore throat and a persistent cough.
          </span>
        </p>
      </div>

      {/* Edit Icon */}
      {/* <FaEdit className="text-gray-500 cursor-pointer self-start" /> */}
    </div>
    </div>
  );
};

export default MedicalServiceCard;
