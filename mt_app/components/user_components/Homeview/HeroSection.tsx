"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  ChevronDown,
  Search,
} from "lucide-react";



const HeroSection = () => {
    const [activeTab, setActiveTab] = useState("medical-service");
      const [appointmentDate] = useState("10 NOV 2025");
      const [appointmentTime] = useState("7:00");
      const [guests] = useState("2 Adults, 1 child");

  const backgroundImageUrl = "https://shawellness.com/shamagazine/wp-content/uploads/2017/06/wellness.jpg";
  // 🔹 Tab Data
  const tabs = [
    { id: "medical-service", label: "Medical Service" },
    { id: "medical-tourism", label: "Medical Tourism Package" },
    { id: "hospitals", label: "Hospitals & Clinics" },
    { id: "hotel", label: "Hotel" },
  ];

  return (
    <div><div className="relative h-[600px]">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 py-20">
    {/* Search Card */}
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-teal-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search a destination or package"
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Appointment Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Appointment</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Date */}
            <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
              <Calendar className="text-teal-400 w-10 h-10 flex-shrink-0" />
              <div>
                <div className="text-teal-400 font-bold text-base">{appointmentDate}</div>
                <div className="text-sm text-gray-500">Monday</div>
              </div>
            </div>
            
            {/* Time */}
            <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
              <Clock className="text-gray-400 w-10 h-10 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-500">Time:</div>
                <div className="font-bold text-gray-900 text-base">{appointmentTime}</div>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
              <div className="flex items-center gap-4">
                <Users className="text-teal-400 w-10 h-10 flex-shrink-0" />
                <div className="font-bold text-gray-900 text-base">{guests}</div>
              </div>
              <ChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full bg-teal-400 text-white py-4 rounded-xl font-bold text-base hover:bg-teal-500 transition-colors shadow-lg">
          Search
        </button>
      </div>
    </div>
  </div>
</div></div>
  )
}
export default HeroSection