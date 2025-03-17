import React from "react";
import { FaUser, FaCalendarCheck, FaBox, FaUsers, FaComments } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-200 p-6">
      <h1 className="text-green-600 text-2xl font-bold mb-6">Medical Tourism</h1>
      <div className="space-y-2">
        {[
          { icon: FaUser, text: "Profile" },
          { icon: FaCalendarCheck, text: "Booking Management" },
          { icon: FaBox, text: "Package Management" },
          { icon: FaUsers, text: "User Management" },
          { icon: FaComments, text: "Public Relationship Management" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${text === "Package Management" ? "bg-gray-100 font-bold" : "text-gray-600"}`}>
            <Icon className="w-5 h-5 text-gray-600" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
