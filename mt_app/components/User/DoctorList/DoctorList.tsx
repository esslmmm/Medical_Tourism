"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Filter } from "lucide-react"; // Icons for search and filter

// const doctors = [
//   { id: 1, name: "Dr. Manoch Techachokwiwat", specialty: "Nephrology", image: "/doctor1.png" },
//   { id: 2, name: "Dr. Valailuck Kiatthanakorn", specialty: "Thoracic Surgery", image: "/doctor2.png" },
//   { id: 3, name: "Dr. Vitoon Pitiguagool", specialty: "Thoracic Surgery", image: "/doctor3.png" },
//   { id: 4, name: "Dr. Sithiphol Chinnapongse", specialty: "Trauma Surgery", image: "/doctor4.png" },
//   { id: 5, name: "Dr. Suthorn Bavoratanavech", specialty: "Trauma Surgery", image: "/doctor5.png" },
//   { id: 6, name: "Dr. Suthorn Bavoratanavech", specialty: "Orthopedic Surgery", image: "/doctor6.png" },
//   { id: 7, name: "Dr. Chattanong Yodwut", specialty: "Cardiology", image: "/doctor7.png" },
//   { id: 8, name: "Prof. Dr. Somboon Kunathikom", specialty: "Reproductive Medicine", image: "/doctor8.png" },
// ];

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  image: string;
}

const DoctorList = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await fetch("/api/services/doctors");
          if (!response.ok) {
            throw new Error("Failed to fetch doctors");
          }
          const data: Doctor[] = await response.json();
          setDoctors(data);
        } catch (error) {
          setError("Error fetching doctors");
        } finally {
          setLoading(false);
        }
      };
  
      fetchDoctors();
    }, []);
  
    if (loading) return <p className="text-center">Loading doctors...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
  

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md w-full max-w-3xl mx-auto">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Name, Specialty, Hospital..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1 outline-none bg-transparent text-gray-700"
        />
        <button className="text-gray-600 hover:bg-gray-200 rounded-full p-2">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.doctor_id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            {/* Doctor Image */}
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
              <Image src={doctor.image} alt={doctor.name} width={96} height={96} className="w-full h-full object-cover" />
            </div>
            
            {/* Doctor Info */}
            <h3 className="text-lg font-semibold text-center text-[#023F76] mt-4">{doctor.name}</h3>
            <p className="text-center text-gray-600 text-sm">{doctor.specialization}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button className="px-3 py-1 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400">{"<"}</button>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={num} className={`px-3 py-1 rounded-lg text-gray-700 ${num === 1 ? "bg-[#7A42B6] text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
            {num}
          </button>
        ))}
        <button className="px-3 py-1 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400">{">"}</button>
      </div>
    </div>
  );
};

export default DoctorList;
