"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { FaRegStar, FaUser, FaCommentDots, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { path: "/user/profile/approval-status/1", icon: <FaCalendarAlt />, label: "My Bookings" },
    { path: "/user/profile/UserReviews/1", icon: <FaRegStar />, label: "Reviews" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/user/profile/UserChat/1", icon: <FaCommentDots />, label: "Chat" },
  ];

  return (
    <div className="w-64 bg-gray-100 p-5 min-h-screen">
      <ul className="space-y-4">
        {sidebarItems.map((item) => (
          <li
            key={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
              ${pathname === item.path ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`}
            onClick={() => router.push(item.path)}
          >
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
