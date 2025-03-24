"use client";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  fee: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Wat Rong Khun",
    date: "11 FEB 2025",
    time: "1:00 PM - 3:00 PM",
    fee: "Free",
    image: "/img/BookingDetail/Watrongkhun.png", // Update the correct path
  },
  {
    id: 2,
    name: "Khun Korn Forest Park Waterfall",
    date: "11 FEB 2025",
    time: "4:00 PM - 5:00 PM",
    fee: "Free",
    image: "/img/BookingDetail/Khunkorn.png", // Update the correct path
  },
];

const PlacesToVisit: React.FC = () => {
  return (
    <div className={`w-[850px] mx-auto bg-white p-6 rounded-xl shadow-md border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="text-xl font-bold ml-5" style={{fontSize:"25px"}}>Place to Visit</h2>
      
      {events.map((event, index) => (
        <div key={event.id} className={`flex items-center gap-6 p-4 ${index !== events.length - 1 ? "border-b border-[#C5D1E0]" : ""}`}>
          <img src={event.image} alt={event.name} className="w-50 h-30 rounded-[15px] object-cover" />
          
          <div className="flex-1 space-y-2">
            <p className="text-md font-bold">
              Name: <span className="font-normal">{event.name}</span>
            </p>
            <p className="text-md font-bold">
              Date / Time: <span className="font-normal">{event.date}, {event.time}</span>
            </p>
            <p className="text-md font-bold">
              Fee: <span className="font-normal">{event.fee}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
