"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaRegStar, FaUser, FaCommentDots, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { path: `/user/general/profile`, icon: <FaUser />, label: "Profile" },
    { path: `/user/general/booking-status`, icon: <FaCalendarAlt />, label: "My Bookings" },
    // { path: `/user/general/reviews`, icon: <FaRegStar />, label: "Reviews" },
    { path: `/user/general/chat`, icon: <FaCommentDots />, label: "Chat" },
  ];

  return (
    <aside className="w-64  min-h-screen shadow-2xl p-2 bg-white border-r-3 border-gray-200 flex flex-col">
      {/* <h2 className="text-2xl font-semibold mb-8 text-gray-800 tracking-wid px-6 pt-6">Dashboard</h2> */}
      <div className="mt-8"></div>

      <ul className="">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer  transition-all duration-200 font-medium text-base
                ${isActive ? "text-white bg-teal-500 shadow-lg" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => router.push(item.path)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-auto pt-10 text-sm text-gray-500 border-t border-gray-200">
        © 2025 Your App
      </div>
    </aside>
  );
};

export default Sidebar;