"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currency, setCurrency] = useState("USD");

    const toggleCurrency = () => {
        setCurrency(currency === "USD" ? "THB" : "USD");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
    const handleClickOutside = (event) => {
        if (event.target && !event.target.closest(".language-selector")) {
            setIsOpen(false);
        }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
}, []);


    return (
        <nav className="flex items-center justify-between p-3 bg-[#F5F7FA] shadow-md">
            {/* Left Side: Logo */}
            <Link href="/">
                <img src="/Medical Tourism.png" alt="Logo" className="w-30 h-auto ml-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Center: Navigation Links and Search */}
            <div className={`
                md:flex md:items-center md:gap-10 md:ml-20
                ${isMobileMenuOpen ? "flex flex-col absolute top-14 left-0 w-full bg-[#F5F7FA] p-4 shadow-md z-10" : "hidden"}
            `}>
                <Link href="/doctor" className="text-gray-700 hover:text-blue-500 text-base">Doctor</Link>
                <Link href="/hospital" className="text-gray-700 hover:text-blue-500 text-base">Hospital</Link>
                <Link href="/medical" className="text-gray-700 hover:text-blue-500 text-base">Medical</Link>
                <Link href="/medical-tourism" className="text-gray-700 hover:text-blue-500 text-base">Medical & Tourism</Link>

                <div className="relative group">
                    <Link href="/contact" className="text-gray-700 hover:text-blue-500 text-base">Contact Us</Link>
                    <div className="absolute left-0 hidden group-hover:block bg-white shadow-md border border-gray-200 mt-2 w-55 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                        <ul className="text-gray-700 ">
                            <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300">
                                <Link href="/contact/support">Chat service</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300">
                                <Link href="/contact/form">Technical feedback</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 last:border-b-0">
                                <Link href="/contact/locations">Help center</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="ml-10 mr-5 relative bg-white rounded-xl ">
                    <input type="text" placeholder="Search..." className="px-10 py-2 pr-20 border rounded-xl focus:ring focus:ring-blue-100" />
                    <img src="/Vector.png" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
            </div>

            {/* Right Side: Currency, Language, Auth */}
            <div className="flex items-center gap-4">
                <div className="cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={toggleCurrency}>
                    <span className="text-black-700 font-bold">{currency}</span>
                </div>

                <div className="relative language-selector">
                    <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
                        <img src="/engflag.png" alt="Flag" className="w-8 h-auto" />
                    </div>
                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-20">
                            <ul className="text-left">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <img src="/engflag.png" alt="UK Flag" className="w-6 h-auto mr-2" /> English
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <img src="/arabic.png" alt="Qatar Flag" className="w-6 h-auto mr-2" /> العربية
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <img src="/myanmar.png" alt="Myanmar Flag" className="w-6 h-auto mr-2" /> မြန်မာ
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <Link href="/login" className="px-4 py-2 text-green-600 hover:bg-gray-200 rounded-lg">Login</Link>
                <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Sign Up</Link>
            </div>
        </nav>
    );
}
