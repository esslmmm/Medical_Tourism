"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
  package_type: string;
}

// const packages: Package[] = [
//   { id: 1, image: "/img/Packages/medical1.png", name: "CT Scan Heart & Lung", details: "Package’s detail or promotion description", expired: "Expired Date" },
//   { id: 2, image: "/img/Packages/medical2.png", name: "Best Medical Service", details: "Package’s detail or promotion description", expired: "Expired Date" },
//   { id: 3, image: "/img/Packages/medical3.png", name: "Know Your Rhythm", details: "Package’s detail or promotion description", expired: "Expired Date" },
//   { id: 4, image: "/img/Packages/medical4.png", name: "Robotic Assisted Surgery", details: "Package’s detail or promotion description", expired: "Expired Date" },
//   { id: 5, image: "/img/Packages/package1.jpg", name: "Advanced Medical Package", details: "Package’s detail or promotion description", expired: "Expired Date" },
// ];

const MedicalList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchPackages() {
        try {
          const response = await fetch("/api/packages");
          if (!response.ok) {
            throw new Error("Failed to fetch packages");
          }
          const data = await response.json();
          setPackages(data);
        } catch (error) {
          console.error("Error fetching packages:", error);
          setError("Error fetching packages");
        } finally {
          setLoading(false);
        }
      }
  
      fetchPackages();
    }, []);

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
        ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date) 
        : "Invalid Date";
};

  return (
    <div className="relative container mx-auto p-12">
      <h2 className="text-2xl font-semibold text-start pl-6 mb-6">Medical Packages</h2>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-3 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-gray-300 z-10"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {loading ? (
        <p className="text-gray-500">Loading packages...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (

      <div
        ref={scrollRef}
        className="flex space-x-6 pl-5 pr-10 scroll-smooth overflow-hidden"
      >
        {packages.filter(pkg => pkg.package_type === "Medical_Service_Only").map((pkg) => (
          <motion.div
            key={pkg.package_id}
            className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-52">
              <Image src={pkg.image} alt={pkg.package_name} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <h3 className={`${poppins.className} font-medium text-[#023F76] text-md mt-4`}>
              {pkg.package_name}
            </h3>
            <p className={`${poppins.className} font-light text-[#023F76] text-sm`}>
              {pkg.detail}
            </p>
            <p className={`${poppins.className} font-medium text-black mt-4`}>{formatDate(pkg.expired_date)}</p>
          </motion.div>
        ))}
      </div>

      )}
      
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-3 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-gray-300 active:scale-90 z-10"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default MedicalList;
