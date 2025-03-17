import React from "react";
import { FaRegStar, FaUser, FaCommentDots, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-5">
      <ul className="space-y-4">
        <li className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer">
          <FaCalendarAlt /> My bookings
        </li>
        <li className="flex items-center gap-3 p-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-lg">
          <FaRegStar /> Reviews
        </li>
        <li className="flex items-center gap-3 p-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-lg">
          <FaUser /> Profile
        </li>
        <li className="flex items-center gap-3 p-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-lg">
          <FaCommentDots /> Chat
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
