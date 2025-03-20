"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  reviews: number;
  image: string;
  description: string;
  packages: Package[];
}

const MedicalPackage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");

        const data = await response.json();
        console.log("Hospital Data:", data);
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

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
        ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date) 
        : "Invalid Date";
  };

  if (loading) return <p className="text-center text-gray-500">Loading hospital details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!hospital) return <p className="text-center text-gray-500">Hospital not found</p>;

  return (
    <div className="container mx-auto p-12 relative">
      <h2 className="text-2xl font-semibold text-start pl-6 mb-3">Medical Packages</h2>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-gray-300"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-hidden scrollbar-hide flex space-x-6 pl-5 pr-10 scroll-smooth py-3"
        onScroll={checkScrollPosition}
      >
        {hospital.packages.map((pkg) => (
          <motion.div
            key={pkg.package_id}
            className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-52">
              <Image
                src={pkg.image}
                alt={pkg.package_name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
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

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-gray-300 active:scale-90"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default MedicalPackage;
