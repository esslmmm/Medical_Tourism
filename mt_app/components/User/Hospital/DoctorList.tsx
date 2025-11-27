"use client";

import React, { useState, useEffect } from "react";
import { Award, ChevronRight } from "lucide-react";

interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  experience: number;
  description: string;
  image: string;
}

const PAGE_SIZE = 8; // 4 columns x 2 rows

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(0); // for paging

  // Mock Data
  useEffect(() => {
    setTimeout(() => {
      setDoctors([
        {
          doctor_id: "1",
          name: "Dr. Sarah Johnson",
          specialization: "Cardiology",
          experience: 15,
          description: "Board-certified cardiologist specializing in interventional procedures",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
        {
          doctor_id: "2",
          name: "Dr. Michael Chen",
          specialization: "Orthopedic Surgery",
          experience: 12,
          description: "Expert in joint replacement and sports medicine",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",
        },
        {
          doctor_id: "3",
          name: "Dr. Priya Patel",
          specialization: "Neurology",
          experience: 10,
          description: "Specialized in stroke care and neurological disorders",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",
        },
        {
          doctor_id: "4",
          name: "Dr. Sarah Johnson",
          specialization: "Cardiology",
          experience: 15,
          description: "Board-certified cardiologist specializing in interventional procedures",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
        {
          doctor_id: "5",
          name: "Dr. Michael Chen",
          specialization: "Orthopedic Surgery",
          experience: 12,
          description: "Expert in joint replacement and sports medicine",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",
        },
        {
          doctor_id: "6",
          name: "Dr. Sarah Johnson",
          specialization: "Cardiology",
          experience: 15,
          description: "Board-certified cardiologist specializing in interventional procedures",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
        {
          doctor_id: "7",
          name: "Dr. Michael Chen",
          specialization: "Orthopedic Surgery",
          experience: 12,
          description: "Expert in joint replacement and sports medicine",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",
        },
        {
          doctor_id: "8",
          name: "Dr. Priya Patel",
          specialization: "Neurology",
          experience: 10,
          description: "Specialized in stroke care and neurological disorders",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",
        },
        // MORE THAN 8
        {
          doctor_id: "9",
          name: "Dr. Test 9",
          specialization: "Dentist",
          experience: 8,
          description: "Board-certified cardiologist specializing in interventional procedures",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
        {
          doctor_id: "10",
          name: "Dr. Test 10",
          specialization: "Surgeon",
          experience: 11,
          description: "Board-certified cardiologist specializing in interventional procedures",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
      ]);
    }, 1000);
  }, []);

  const totalPages = Math.ceil(doctors.length / PAGE_SIZE);

  const visibleDoctors = doctors.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const nextPage = () => {
    if (page < totalPages - 1) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 pb-5 relative">
      <h4 className="text-3xl font-bold text-gray-900 mb-8">Doctors</h4>


      {/* Show buttons only if more than one page */}
      {totalPages > 1 && (
        <>
          {page > 0 && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
              onClick={prevPage}
            >
              <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
            </button>
          )}

          {page < totalPages - 1 && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/3 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
              onClick={nextPage}
            >
              <ChevronRight className="w-6 h-6 text-teal-500" />
            </button>
          )}
        </>
      )}

      {/* FIXED GRID: 4 columns, 2 rows max */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleDoctors.map((doctor) => (
          <div
            key={doctor.doctor_id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="relative">
              <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />

              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-teal-700 shadow-sm">
                {doctor.specialization}
              </div>
            </div>

            <div className="p-6 flex flex-col h-full">
  <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
    {doctor.name}
  </h3>

  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
    {doctor.description}
  </p>

  {/* Pushes experience + button to bottom evenly */}
  <div className="mt-auto">
    <div className="flex items-center gap-2 mt-3 mb-3 text-gray-500">
      <Award className="w-4 h-4 text-teal-500" />
      <span className="text-sm font-medium">
        {doctor.experience} years experience
      </span>
    </div>

    <button className="w-full font-bold bg-teal-500 text-white py-2.5 rounded-xl hover:bg-teal-600 active:scale-95 transition-all shadow-sm">
      View Details
    </button>
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
