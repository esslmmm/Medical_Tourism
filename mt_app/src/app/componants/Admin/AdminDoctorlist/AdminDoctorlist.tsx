'use client';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

export default function DoctorList() {
    const [doctors] = useState([
        { id: 1, image: "/doctor1.jpg", name: "Dr. Valailuck Kiattanakorn", specialty: "Thoracic Surgery" },
        { id: 2, image: "/doctor2.jpg", name: "Dr. Vitoon Pitiguagool", specialty: "Thoracic Surgery" },
        { id: 3, image: "/doctor3.jpg", name: "Dr. Stithiphol Chinnapongse", specialty: "Trauma Surgery" },
        { id: 4, image: "/doctor4.jpg", name: "Dr. Suthorn Bavonratanavech", specialty: "Orthopaedic Surgery" },
        { id: 5, image: "/doctor5.jpg", name: "Dr. Chattanong Yodwut", specialty: "Cardiology" },
        { id: 6, image: "/doctor6.jpg", name: "Prof. Dr. Somboon Kunathikom", specialty: "Reproductive Medicine" }
    ]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Search Bar */}
            <div className="flex items-center space-x-3 border p-3 rounded-lg bg-white shadow mb-6">
                <FaSearch size={16} className="text-gray-500" />
                <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="Search doctor, specialty..."
                />
            </div>

            {/* Doctor Grid */}
            <div className="grid grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <img src={doctor.image} alt={doctor.name} className="w-24 h-24 mx-auto rounded-full object-cover" />
                        <h3 className="mt-4 font-semibold text-blue-900">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">{doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
