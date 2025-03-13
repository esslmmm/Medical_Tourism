'use client';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";

export default function PackageList() {
    const [packages] = useState([
        { id: 1, image: "/package.jpg", name: "Package's name", expired: "Expired Date" },
        { id: 2, image: "/package.jpg", name: "Package's name", expired: "Expired Date" },
        { id: 3, image: "/package.jpg", name: "Package's name", expired: "Expired Date" },
        { id: 4, image: "/package.jpg", name: "Package's name", expired: "Expired Date" },
        { id: 5, image: "/package.jpg", name: "Package's name", expired: "Expired Date" }
    ]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Search Bar */}
            <div className="flex items-center space-x-3 border p-3 rounded-lg bg-white shadow mb-6 text-black">
                <FaSearch size={16} className="text-gray-500" />
                <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="Name, Specialty, Hospital, ..."
                />
                <button className="p-2 bg-gray-200 rounded-lg">
                    <BsFilter size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-5 gap-6">
                {packages.map(pkg => (
                    <div key={pkg.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover rounded-lg" />
                        <h3 className="mt-2 font-semibold text-black">{pkg.name}</h3>
                        <p className="text-gray-500 text-sm">{pkg.expired}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-6">
                <button className="border px-3 py-1 rounded">-</button>
                {[1, 2, 3, 4, 5, 6].map(page => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded ${page === 1 ? 'bg-purple-500 text-white' : 'border'}`}
                    >
                        {page}
                    </button>
                ))}
                <button className="border px-3 py-1 rounded">-</button>
            </div>
        </div>
    );
}
