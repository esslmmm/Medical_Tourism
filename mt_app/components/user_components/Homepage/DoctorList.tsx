"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  image: string;
}

const DoctorList: React.FC = () => {
  const router = useRouter(); // Navigation hook
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
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

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div className="container mx-auto p-8 relative">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 transition rounded-full p-2 shadow-lg z-10 hover:scale-110 active:scale-90"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-hidden flex scrollbar-hide px-6 space-x-6 scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {doctors.map((doctor) => (
          <motion.button
            key={doctor.doctor_id}
            onClick={() => router.push(`/user/Doctorprofile/${doctor.doctor_id}`)} // Navigate to doctor details
            className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center cursor-pointer focus:outline-none"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className={`${poppins.className} text-[#023F76] font-bold text-lg mt-4`}>
              {doctor.name}
            </h3>
            <div className="w-24 h-[2px] bg-gray-300 my-2 mx-auto"></div>
            <p className={`${poppins.className} font-medium text-gray-600 text-sm`}>
              {doctor.specialization}
            </p>
          </motion.button>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 transition rounded-full p-2 shadow-lg z-10 hover:scale-110 active:scale-90"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default DoctorList;
