'use client';
import { useState } from 'react';
import { FaRegUser, FaSearch } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiPackage, FiUsers, FiGlobe } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

export default function PackageServiceManagement() {
    const [activeTab, setActiveTab] = useState("Package");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col">
                <h2 className="text-2xl font-semibold text-teal-600">Medical <br /> Tourism</h2>
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <MdOutlineEventAvailable size={18} />
                            <span>Booking Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-black bg-gray-100 p-2 rounded-lg cursor-pointer">
                            <FiPackage size={18} />
                            <span>Package & Service Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FiUsers size={18} />
                            <span>User Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FiGlobe size={18} />
                            <span>Public Relationship Management</span>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                    <HiOutlineLogout size={18} />
                    <span>Log in</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                {/* Top Right Profile */}
                <div className="p-4 flex justify-end border-b bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <div className="font-semibold text-black">Ekkarat Singkhala</div>
                            <div className="text-sm text-black">Admin</div>
                        </div>
                    </div>
                </div>
                {/* Header Tabs */}
                <div className="flex space-x-4 mb-4 border-b text-black">
                    {["Package", "Service Detail"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 text-lg font-semibold ${activeTab === tab ? 'border-b-2 border-black' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Package Overview */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <div className="grid grid-cols-4 items-center border-b pb-4">
                        <div>
                            <h3 className="text-lg text-black font-semibold">Number of Package</h3>
                            <p className="text-4xl text-black font-bold">300</p>
                        </div>
                        <div className="col-span-3">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 text-sm border-b">
                                        <th className="p-2">Booking ID</th>
                                        <th className="p-2">Package Type</th>
                                        <th className="p-2">Ranking</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 text-black">Booking #104</td>
                                        <td className="p-2 text-black">Medical Tourism</td>
                                        <td className="p-2 text-black">1 <span className="text-green-500">▲3</span></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 text-black">Booking #104</td>
                                        <td className="p-2 text-black">Medical Tourism</td>
                                        <td className="p-2 text-black">2</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 text-black">Booking #104</td>
                                        <td className="p-2 text-black">Tourism</td>
                                        <td className="p-2 text-black">3 <span className="text-red-500">▼3</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Service Details Table */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-3 mb-4 text-black">
                        <div className="flex items-center border p-2 rounded-lg bg-white flex-1">
                            <IoSearch size={20} className="text-gray-600 mr-2" />
                            <input type="text" className="w-full outline-none" placeholder="Search" />
                        </div>
                        <button className="border p-2 rounded-lg flex items-center space-x-2 bg-white">
                            <BsFilter size={18} className="text-gray-600" />
                            <span>Filter</span>
                        </button>
                        <div className="border p-2 rounded-lg bg-white">4 Show items</div>
                        <button className="border p-2 rounded-lg bg-white">Add</button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-black text-sm border-b">
                                <th className="p-2">Booking ID</th>
                                <th className="p-2">Package Type</th>
                                <th className="p-2">Number of Service</th>
                                <th className="p-2">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[153, 102, 53, 51, 50].map((service, index) => (
                                <tr key={index}>
                                    <td className="p-2 text-black">Booking #124</td>
                                    <td className="p-2 text-black">{index % 2 === 0 ? 'Medical Tourism' : 'Tourism'}</td>
                                    <td className="p-2 text-black">{service}</td>
                                    <td className="p-2 text-black">{[4.1, 4.0, 4.9, 3.5, 4.0][index]}/5</td>
                                    <td className="p-2 text-gray cursor-pointer">
                                        <FaSearch size={16} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-gray-400 text-sm text-right mt-4">1-5 to 20</div>
                </div>
            </main>
        </div>
    );
}




