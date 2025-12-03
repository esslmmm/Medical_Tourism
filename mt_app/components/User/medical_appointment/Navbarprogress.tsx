"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { LogOut, Menu, User, X } from "lucide-react";
import LoginModal from "../Homepage/LoginModal";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaCalendarAlt, FaCommentDots, FaRegStar } from "react-icons/fa";



const Navbarpro: React.FC = () => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  
  // Use NextAuth session instead of manual state
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const user = session?.user;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.get('isLoginOpen') === 'true' && !session) {
      setIsLoginOpen(true);
    }
  }, [searchParams, session]);

  const sidebarItems = [
  { label: "Customer Info", path: `/user/Form/medical_appointment/${id}` },
  { label: "Confirm", path: `/user/Form/BookingConfirm/${id}` },
];

    const currentStep = sidebarItems.findIndex(item => pathname?.startsWith(item.path));



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

      <div className="flex justify-center">
      {sidebarItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => router.push(item.path)}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                index === currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-1 text-black">
              {item.label.replace("_", " ")}
            </span>
          </div>

          {index < sidebarItems.length - 1 && (
            <div className="w-12 h-1 bg-black mt-4 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>


      <div className="flex items-center gap-4">
        

        {/* Show loading state while checking authentication */}
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
            </div>
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbarpro;