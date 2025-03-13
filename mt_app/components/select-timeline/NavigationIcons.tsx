import React from "react";
import { FaCalendarAlt, FaHospital, FaHotel, FaMapMarkerAlt, FaCar, FaUser, FaClipboardList } from "react-icons/fa";

const NavigationIcons = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md w-fit mx-auto flex gap-8 my-6">
      {[
        { icon: FaCalendarAlt, text: "Timeline", color: "bg-red-500" },
        { icon: FaClipboardList, text: "Package", color: "bg-yellow-500" },
        { icon: FaHospital, text: "Medical Service", color: "bg-yellow-500" },
        { icon: FaHotel, text: "Accommodation", color: "bg-green-500" },
        { icon: FaMapMarkerAlt, text: "Place to Visit", color: "bg-blue-500" },
        { icon: FaUser, text: "Interpreter", color: "bg-purple-500" },
        { icon: FaCar, text: "Car Service", color: "bg-blue-500" },
      ].map(({ icon: Icon, text, color }, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className={`w-10 h-10 flex items-center justify-center ${color} rounded-full text-white text-lg`}>
            <Icon />
          </div>
          <p className="text-sm mt-1">{text}</p>
        </div>
      ))}
    </div>
  );
};

export default NavigationIcons;