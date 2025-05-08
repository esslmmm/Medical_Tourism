"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LoginModal from "../Homepage/LoginModal";

const Navbarpro: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

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

      <div className="flex items-center justify-center">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            1
          </div>
          <span className="text-sm mt-1 text-black">Customer Info</span>
        </div>

        {/* Line between steps */}
        <div className="w-12 h-1 bg-black"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-bold">
            2
          </div>
          <span className="text-sm mt-1 text-black">Confirm</span>
        </div>
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

        <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 text-green-600 hover:bg-gray-200 rounded-lg transition">
          Login
        </button>

        <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Sign Up
        </Link>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbarpro;