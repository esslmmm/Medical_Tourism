'use client';
import { useState } from 'react';
import { FaRegUser, FaSearch, FaPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiPackage, FiUsers, FiGlobe } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

export default function PackageServiceManagement() {
    const [activeTab, setActiveTab] = useState("Package");
    const [showModal, setShowModal] = useState(false);

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
                            <span>Package Management</span>
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
                <div className="flex justify-end items-center border-b pb-4">
                    <div className="flex items-center space-x-3">
                        {/* <img src="/profile.jpg" alt="Admin" className="w-10 h-10 rounded-full" /> */}
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <div className="font-semibold text-black">Ekkarat Singkhala</div>
                            <div className="text-sm text-gray-500">Senior Admin</div>
                        </div>
                    </div>
                </div>

                {/* Package Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h3 className="text-lg font-semibold text-black">Timeline</h3>
                    <div className="flex justify-center items-center flex-col border rounded-lg p-6 mt-4 text-gray-400 cursor-pointer hover:bg-gray-50" onClick={() => setShowModal(true)}>
                        <FaPlus size={24} />
                        <p className="mt-2">Add Package</p>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold text-center text-black">Create Package</h3>
                        <select className="w-full p-2 border rounded mt-4 text-black">
                            <option>How many day trip</option>
                            <option>1 Day</option>
                            <option>2 Days</option>
                            <option>3 Days</option>
                        </select>
                        <div className="flex justify-center space-x-4 mt-6">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
