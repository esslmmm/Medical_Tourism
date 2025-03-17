import React from "react";
import { FaUsers, FaHourglassHalf, FaUserCheck, FaUserTimes } from "react-icons/fa";

const DashboardCards = () => {
  const cards = [
    { icon: <FaUsers />, number: 33, text: "Total", color: "bg-blue-500" },
    { icon: <FaHourglassHalf />, number: 20, text: "Pending", color: "bg-yellow-500" },
    { icon: <FaUserCheck />, number: 10, text: "Approve", color: "bg-green-500" },
    { icon: <FaUserTimes />, number: 3, text: "Disapprove", color: "bg-red-500" },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto flex justify-center gap-10">
      {cards.map(({ icon, number, text, color }, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 flex items-center justify-center rounded-full shadow-md text-white text-2xl ${color}`}>
            {icon}
          </div>
          <span className="font-bold text-lg mt-2">{number}</span>
          <p className="text-gray-700 font-semibold">{text}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
