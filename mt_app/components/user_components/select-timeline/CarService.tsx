import React from "react";
import Calendar from "./Calendar";

const CarService = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Car Service</h2>

      <div className="flex items-start">
        {/* Driver Image */}
        <img 
          src="/img/driver.png" 
          alt="Driver" 
          className="w-24 h-24 rounded-full border border-gray-300 mr-4"
        />

        {/* Driver Info */}
        <div>
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
