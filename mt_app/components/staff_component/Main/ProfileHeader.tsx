import React from "react";
import { useSession } from 'next-auth/react';
import { User } from "lucide-react";
import Link from "next/link";

const ProfileHeader = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const user = session?.user;


  return (
    <div className="flex justify-between items-center bg-white px-6 py-4">
      {/* ✅ Logo on the Left */}
      <Link href="/staff/booking-management">
        <img src="/img/Logo_staff.png" alt="Logo" className="w-24 h-auto ml-5" />
      </Link>

      {status === 'loading' ? (
          <div className="flex items-center cursor-pointer p-2 rounded-md">
            {/* Profile image/avatar skeleton */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            
            {/* User name/email skeleton */}
            <div className="ml-2 hidden md:block">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        ) : !isLoggedIn ? (
          // Show when NOT logged in
          <>
            <button className="px-4 py-2 text-green-600 hover:bg-gray-200 rounded-lg transition">
              Login
            </button>
            <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Sign Up
            </Link>
          </>
        ) : (
          // Show when logged in
          <>
            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <div 
                className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
              >
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <span className="ml-2 text-gray-700 font-medium hidden md:block">{user?.name || user?.email}</span>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default ProfileHeader;
