import React from "react";
import { FaUser, FaCalendarAlt, FaCommentDots } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-5 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold leading-tight">
        </div>
        <ul className="mt-5 space-y-3">
          <li className="flex items-center gap-2 cursor-pointer text-gray-700"><FaUser /> Profile</li>
          <li className="flex items-center gap-2 cursor-pointer text-blue-500 font-semibold"><FaCalendarAlt /> Booking Management</li>
          <li className="flex items-center gap-2 cursor-pointer text-gray-700"><FaCommentDots /> Chat</li>
        </ul>
      </div>
      <div className="border-t pt-4">
        <li className="flex items-center gap-2 cursor-pointer text-gray-700">↪ Log Out</li>
      </div>
    </div>
  );
};

export default Sidebar;
