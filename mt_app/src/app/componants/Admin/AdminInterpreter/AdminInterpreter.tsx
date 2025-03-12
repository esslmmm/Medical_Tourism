'use client';
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiPackage, FiUsers, FiGlobe } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

export default function PackageServiceManagement() {
    const [activeTab, setActiveTab] = useState("Service Detail");
    const [activeCategory, setActiveCategory] = useState("Medical Provider");
    const person = [
        {
            name: "Duygu Muhurdar",
            Language: "English",
            Location: "365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100",
            image: "/wat_rong_khun.jpg"
        },
        {
            name: "Vanessa Leiva",
            Language: "Arabic interpreter",
            Location: "365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100",
            image: "/wat_rong_khun.jpg"
        },
        {
            name: "Sek Han Foo",
            Language: "Chinese interpreter",
            Location: "365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100",
            image: "/wat_rong_khun.jpg"
        }
    ];

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

                {/* Filter Categories */}
                <div className="bg-white p-3 rounded-lg shadow flex space-x-3 mb-4 text-black">
                    {["Medical Provider", "Accommodation", "Place", "Interpreter", "Car" , "Doctor"].map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg text-sm ${activeCategory === category ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search and Filters */}
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

                {/* Location List */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    {person.map((persons, index) => (
                        <div key={index} className="flex items-center border-b pb-4 mb-4">
                            {/* <img src={location.image} alt={location.name} className="w-24 h-16 rounded-lg object-cover" /> */}
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div className="ml-4">
                                <h3 className="font-semibold text-black">{persons.name}</h3>
                                <p className="text-gray-600"><strong>Language :</strong> {persons.Language}</p>
                                <p className="text-gray-600"><strong>Location :</strong> {persons.Location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

