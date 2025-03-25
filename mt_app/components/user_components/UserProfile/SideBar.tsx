'use client';
import React, { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Profile"); // Default active item

  const menuItems = [
    { name: "My bookings", icon: <MdOutlineEventAvailable size={18} /> },
    { name: "Reviews", icon: <FaStar size={18} /> },
    { name: "Profile", icon: <FaRegUser size={18} /> },
    { name: "Chat", icon: <FaRegCommentDots size={18} /> },
  ];

  return (
    <aside className="w-96 bg-white border-r border-gray-300 p-5 flex flex-col shadow-md min-h-screen text-2xl">
      <nav className="mt-8">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
                ${activeItem === item.name 
                  ? "bg-teal-600 text-white shadow-md" 
                  : "text-gray-600 hover:text-teal-600 hover:bg-gray-100"}`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
