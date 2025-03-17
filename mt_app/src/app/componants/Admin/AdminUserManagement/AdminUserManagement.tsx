'use client';
import { useState } from 'react';
import { FaRegUser, FaUsers, FaSearch } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiPackage, FiGlobe } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

export default function UserManagement() {
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
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FiPackage size={18} />
                            <span>Package Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-black bg-gray-100 p-2 rounded-lg cursor-pointer">
                            <FaUsers size={18} />
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

                {/* User Statistics */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 flex justify-between text-black">
                    {[{ label: 'Total', count: 100, color: 'text-blue-500' }, { label: 'New', count: 10, color: 'text-gray-500' }, { label: 'Return', count: 30, color: 'text-green-500' }].map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <FaUsers size={30} className={stat.color} />
                            <p className="text-2xl font-semibold">{stat.count}</p>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* User Table */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <div className="flex items-center space-x-3 mb-4 text-black">
                        <div className="flex items-center border p-2 rounded-lg bg-white flex-1">
                            <IoSearch size={20} className="text-gray-600 mr-2" />
                            <input type="text" className="w-full outline-none" placeholder="Search" />
                        </div>
                        <button className="border p-2 rounded-lg flex items-center space-x-2 bg-white">
                            <BsFilter size={18} className="text-gray-600" />
                            <span>Filter</span>
                        </button>
                        <div className="border p-2 rounded-lg bg-white">Show items</div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm border-b">
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(8).fill({ name: 'Ekkarat Singkhala', email: '653101137@dinamail.mfu.ac.th', role: 'Customer', lastActive: 'Tue, 12 Feb 2024, 12:30 PM' }).map((user, index) => (
                                <tr key={index}>
                                    <td className="p-2 text-black">{user.name}</td>
                                    <td className="p-2 text-black">{user.email}</td>
                                    <td className="p-2 text-black">{index < 2 ? 'Staff' : user.role}</td>
                                    <td className="p-2 text-black">{user.lastActive}</td>
                                    <td className="p-2 text-black cursor-pointer">
                                        <FaSearch size={16} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-gray-400 text-sm text-right mt-4">1-9 to 20</div>
                </div>
            </main>
        </div>
    );
}
