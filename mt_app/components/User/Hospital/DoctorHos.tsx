"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

interface Doctor {
  doctor_id: string;
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

interface HospitalDetailProps {
  hospital : Hospital | null;
}

const DoctorHos: React.FC<HospitalDetailProps> = ({ hospital }) => {
  if (!hospital) return null;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const router = useRouter();
  
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

  const navigateTodoctor = (DoctorId: string) => {
    router.push(`/user/Doctorprofile/${DoctorId}`);
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
        className="overflow-hidden flex scrollbar-hide px-6 space-x-6 scroll-smooth py-5"
        onScroll={checkScrollPosition}
      >
        {hospital?.doctors?.map((doctor) => (
        <motion.div
          key={doctor.doctor_id } // Ensure a unique key even if `id` is missing or duplicated
          className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTodoctor(doctor.doctor_id )}
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
