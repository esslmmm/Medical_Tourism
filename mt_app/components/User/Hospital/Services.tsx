"use client";

import React, { useState } from "react";
import {
  Heart,
  Activity,
  Bone,
  ClipboardCheck,
  Scissors,
  Smile,
  Eye,
  Baby,
  Brain,
  Star,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 10; // 5 columns × 2 rows

const Services = () => {
  const [page, setPage] = useState(0);

  // 🔹 Treatment List
  const treatments = [
    { icon: Heart, name: "Heart", color: "text-teal-500" },
    { icon: Activity, name: "Cancer", color: "text-teal-500" },
    { icon: Bone, name: "Bone & Spine", color: "text-teal-500" },
    { icon: ClipboardCheck, name: "Check-up", color: "text-teal-500" },
    { icon: Scissors, name: "Surgery", color: "text-teal-500" },
    { icon: Smile, name: "Dental", color: "text-teal-500" },
    { icon: Eye, name: "Eye & Ent", color: "text-teal-500" },
    { icon: Baby, name: "Mother & Child", color: "text-teal-500" },
    { icon: Smile, name: "Aesthetic", color: "text-teal-500" },
    { icon: Brain, name: "Brain", color: "text-teal-500" },
    { icon: Star, name: "Wellness Program", color: "text-teal-500" },
    { icon: Star, name: "Rehabilitation", color: "text-teal-500" },
  ];

  const totalPages = Math.ceil(treatments.length / PAGE_SIZE);

  const visibleTreatments = treatments.slice(
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
    <section className="max-w-7xl mx-auto py-6 relative">
      <h2 className="text-3xl font-bold mb-8">Treatment & Wellness Services</h2>

      {/* Left Arrow */}
      {page > 0 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/4 bg-white shadow-lg rounded-full p-2 z-20 hover:bg-gray-100"
          onClick={prevPage}
        >
          <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
        </button>
      )}

      {/* Right Arrow */}
      {page < totalPages - 1 && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/4 bg-white shadow-lg rounded-full p-2 z-20 hover:bg-gray-100"
          onClick={nextPage}
        >
          <ChevronRight className="w-6 h-6 text-teal-500" />
        </button>
      )}

      {/* FIXED GRID: 5 columns × 2 rows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleTreatments.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
          >
            <item.icon className={`w-12 h-12 ${item.color}`} />
            <span className="font-medium mt-3 text-center">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
