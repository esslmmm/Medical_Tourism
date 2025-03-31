"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { User } from "lucide-react";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image: string;

}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  reviews: number;
  image: string;
  description: string;
  doctors: Doctor[];
}

const DoctorHos: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Always call hooks before any return statements
  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/services/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");

        const data = await response.json();
        console.log("Hospital Data:", data); // ✅ Debugging log
        setHospital(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHospital();
  }, [id]);

  useEffect(() => {
    checkScrollPosition();
  }, []);

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

  if (loading) return <p className="text-center text-gray-500">Loading hospital details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!hospital) return <p className="text-center text-gray-500">Hospital not found</p>;

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
        className="overflow-hidden flex scrollbar-hide px-6 space-x-6 scroll-smooth py-5"
        onScroll={checkScrollPosition}
      >
        {hospital?.doctors?.map((doctor, index) => (
        <motion.div
          key={doctor.id || `doctor-${index}`} // Ensure a unique key even if `id` is missing or duplicated
          className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center"
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
        </motion.div>
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

export default DoctorHos;
