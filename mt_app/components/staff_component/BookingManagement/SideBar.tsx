import React from 'react';
import { FaRegUser, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between shadow-lg">
        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer transition-all">
              <FaRegUser size={20} />
              <span className="text-sm">Profile</span>
            </li>
            <li className="flex items-center space-x-3 text-teal-600 font-semibold cursor-pointer transition-all">
              <MdOutlineEventAvailable size={20} />
              <span className="text-sm">Booking Management</span>
            </li>
            <li className="flex items-center justify-between text-gray-600 hover:text-teal-600 cursor-pointer relative transition-all">
              <div className="flex items-center space-x-3">
                <FaRegCommentDots size={20} />
                <span className="text-sm">Chat</span>
              </div>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">•</span>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="flex items-center space-x-3 text-gray-600 hover:text-red-500 cursor-pointer transition-all">
          <HiOutlineLogout size={20} />
          <span className="text-sm">Log out</span>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
