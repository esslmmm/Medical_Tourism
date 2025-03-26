"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCalendarCheck, FaBox, FaUsers, FaComments, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname(); // ✅ Get current path for active styling

  return (
    <div className="w-1/4 h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between shadow-md">
      <div>
        <div className="space-y-2">
          {/** ✅ Sidebar Items List **/}
          {[
            { href: "/profile", label: "Profile", icon: FaUser },
            { href: "/admin-booking-management", label: "Booking Management", icon: FaCalendarCheck },
            { href: "/admin-booking-details", label: "Package Management", icon: FaBox },
            { href: "/user-management", label: "User Management", icon: FaUsers },
            { href: "/public-relationship-management", label: "Public Relationship Management", icon: FaComments },
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  pathname === item.href ? "bg-gray-100 font-bold text-teal-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-5 h-5 ${pathname === item.href ? "text-teal-700" : "text-gray-600"}`} />
                <p>{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Log Out Button */}
      <button className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 transition-all duration-200">
        <FaSignOutAlt className="w-5 h-5" />
        <p>Log Out</p>
      </button>
    </div>
  );
};

export default Sidebar;
