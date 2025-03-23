import React from "react";
import Calendar from "./Calendar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const CarService = () => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md mt-6 border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="text-xl font-bold mb-4">Car Service</h2>

      <div className="flex items-start">
        {/* Driver Image */}
        <img 
          src="/img/Interpreter/interpreter1.png" 
          alt="Driver" 
          className="w-30 h-30 rounded-full ml-15 mb-5 border border-gray-300 mr-4"
        />

        {/* Driver Info */}
        <div className="ml-10 space-y-1">
          <p className="text-md font-bold">Name: <span className="font-normal">Rayji De Guia</span></p>
          <p className="text-md font-bold">Language: <span className="font-normal">Chinese</span></p>
          <p className="text-md font-bold">Contact Number: <span className="font-normal">+66 811248294</span></p>
          <p className="text-md font-bold">In Plan: <span className="font-normal">2-3 Feb 2025</span></p>
          <p className="text-md font-bold">Personal Needs: <span className="font-normal">4 Feb 2025</span></p>
        </div>
      </div>

      {/* Add Calendar Component */}
      <Calendar />
    </div>
  );
};

export default CarService;
