'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NavbarBD() {
    const [isOpen, setIsOpen] = useState(false);
    const [currency, setCurrency] = useState('USD');

    const toggleCurrency = () => {
        setCurrency(currency === 'USD' ? 'THB' : 'USD');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.language-selector')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between p-3 bg-[#F5F7FA] shadow-md">
            {/* Left Side: Logo */}
            <Link href="/">
                <img src="/Medical Tourism.png" alt="Logo" className="w-30 h-auto ml-5" />
            </Link>

            {/* Center: Progress Indicator */}
            <div className="flex items-center gap-4">
                {/* Step 1: Customer Info (Inactive) */}
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-black font-bold rounded-full">1</div>
                    <span className="text-sm font-medium text-gray-500">Customer Info</span>
                </div>

                {/* Connecting Line */}
                <div className="w-16 h-[2px] bg-black"></div>

                {/* Step 2: Confirm (Active) */}
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">2</div>
                    <span className="text-sm font-medium text-gray-500">Confirm</span>
                </div>
            </div>

            {/* Right Side: Currency, Language, Auth */}
            <div className="flex items-center gap-4">
                <div className="cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={toggleCurrency}>
                    <span className="text-black font-bold">{currency}</span>
                </div>

                <div className="relative language-selector">
                    <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
                        <img src="/engflag.png" alt="Flag" className="w-8 h-auto" />
                    </div>
                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-20">
                            <ul className="text-left">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-black">
                                    <img src="/engflag.png" alt="UK Flag" className="w-6 h-auto mr-2" /> English
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-black">
                                    <img src="/arabic.png" alt="Qatar Flag" className="w-6 h-auto mr-2" /> العربية
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-black">
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
