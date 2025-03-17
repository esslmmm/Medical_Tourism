"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCalendarCheck, FaBox, FaUsers, FaComments, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname(); // ✅ Get current path for active styling

  return (
    <div className="w-1/4 h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-green-600 text-2xl font-bold mb-6">Medical Tourism</h1>
        <div className="space-y-2">
          <Link href="/profile">
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${pathname === "/profile" ? "bg-gray-100 font-bold" : "text-gray-600 hover:bg-gray-100"}`}>
              <FaUser className="w-5 h-5 text-gray-600" />
              <p>Profile</p>
            </div>
          </Link>

          <Link href="/admin-booking-management">
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${pathname === "/admin-booking-management" ? "bg-gray-100 font-bold" : "text-gray-600 hover:bg-gray-100"}`}>
              <FaCalendarCheck className="w-5 h-5 text-gray-600" />
              <p>Booking Management</p>
            </div>
          </Link>

          <Link href="/admin-booking-details">
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${pathname === "/admin-booking-details" ? "bg-gray-100 font-bold" : "text-gray-600 hover:bg-gray-100"}`}>
              <FaBox className="w-5 h-5 text-gray-600" />
              <p>Package Management</p>
            </div>
          </Link>

          <Link href="/user-management">
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${pathname === "/user-management" ? "bg-gray-100 font-bold" : "text-gray-600 hover:bg-gray-100"}`}>
              <FaUsers className="w-5 h-5 text-gray-600" />
              <p>User Management</p>
            </div>
          </Link>

          <Link href="/public-relationship-management">
            <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${pathname === "/public-relationship-management" ? "bg-gray-100 font-bold" : "text-gray-600 hover:bg-gray-100"}`}>
              <FaComments className="w-5 h-5 text-gray-600" />
              <p>Public Relationship Management</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ✅ Log Out Button */}
      <button className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100">
        <FaSignOutAlt className="w-5 h-5" />
        <p>Log Out</p>
      </button>
    </div>
  );
};

export default Sidebar;
