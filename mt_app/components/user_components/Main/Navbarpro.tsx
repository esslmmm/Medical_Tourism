"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import LoginModal from "../Homepage/LoginModal";
import { FaCalendarAlt, FaCommentDots, FaRegStar } from "react-icons/fa";
import { useSession, signOut } from 'next-auth/react';


const Navbarpro: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);
  // Use NextAuth session instead of manual state
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const user = session?.user;

  // Handle logout using NextAuth
    const handleLogout = async () => {
      await signOut({ redirect: true });
      setIsProfileDropdownOpen(false);
    };


  const toggleCurrency = () => setCurrency(currency === "USD" ? "THB" : "USD");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(".language-selector") &&
        !(event.target as HTMLElement).closest(".dropdown-container")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="relative z-50 flex items-center justify-between p-3 bg-[#F5F7FA] shadow-md">
      <Link href="/">
        <img src="/img/Footer&Navbar/Medical Tourism.png" alt="Logo" className="w-30 h-auto ml-5" />
      </Link>

      <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          md:flex md:items-center md:gap-10 md:ml-10
          ${isMobileMenuOpen ? "flex flex-col absolute top-14 left-0 w-full bg-[#F5F7FA] p-4 shadow-md z-10" : "hidden"}
        `}
      >
        {["Doctor", "Hospital", "Medical", "Medical & Tourism"].map((item, index) => (
          <Link key={index} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700 hover:text-green-600 text-base">
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={toggleCurrency}>
          <span className="text-black-700 font-bold">{currency}</span>
        </div>

        <div className="relative language-selector">
          <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
            <img src="/img/Footer&Navbar/engflag.png" alt="Flag" className="w-8 h-auto" />
          </div>
          {isOpen && (
            <div className="absolute left-0 mt-2 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-50">
              <ul className="text-left">
                {[
                  { name: "English", img: "/img/Footer&Navbar/engflag.png" },
                  { name: "العربية", img: "/img/Footer&Navbar/arabic.png" },
                  { name: "မြန်မာ", img: "/img/Footer&Navbar/myanmar.png" },
                ].map((lang, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <img src={lang.img} alt={lang.name} className="w-6 h-auto mr-2" />
                    {lang.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Show loading state while checking authentication */}
        {status === 'loading' ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !isLoggedIn ? (
          // Show when NOT logged in
          <>
            <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 text-green-600 hover:bg-gray-200 rounded-lg transition">
              Login
            </button>
            <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Sign Up
            </Link>
          </>
        ) : (
          // Show when logged in
          <>
            {/* Notifications (optional) */}
            {/* <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600 transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div> */}

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <div 
                className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
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

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-md z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link href="/user/general/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link href={`/user/general/reviews`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                        <FaRegStar  className="w-4 h-4 mr-3" />
                          Reviews
                      </Link>
                    </li>
                    <li>
                      <Link href={`/user/general/booking-status`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                        <FaCalendarAlt className="w-4 h-4 mr-3" />
                        My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link href={`/user/general/chat`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                        <FaCommentDots className="w-4 h-4 mr-3" />
                        Chat
                      </Link>
                    </li>
                    <li className="border-t border-gray-200 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbarpro;