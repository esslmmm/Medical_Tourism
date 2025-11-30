"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaBed, FaUserMd, FaStar } from "react-icons/fa";
import { Shield } from "lucide-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lato } from "next/font/google";
import "@/app/globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

interface Hospital {
  hospital_id: number;
  name: string;
  location: string;
  image: string;
}

const Hospitaltap: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const response = await fetch("/api/services/hospitals");
        if (!response.ok) {
          throw new Error("Failed to fetch hospitals");
        }
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        setError("Error fetching hospitals. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [hospitals]);

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
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const navigateToHospitalPage = (hospitalId: number) => {
    router.push(`/user/hospital/${hospitalId}`);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - e.pageX) * 2;
    scrollRef.current.scrollLeft -= walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className={`${lato.className} bg-gradient-to-br from-slate-50 to-blue-50 py-16`}>
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading world-class hospitals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${lato.className} bg-gradient-to-br from-slate-50 to-blue-50 py-16`}>
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center">
            <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 inline-block">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="hospitals-section" className={`${lato.className} bg-slate-50 py-16`}>
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Professional Header Design */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Premier Healthcare Facilities
              </h2>
              <p className="text-slate-600 text-lg">
                World-class hospitals with cutting-edge technology and certified professionals
              </p>
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white border-2 border-blue-200 text-blue-600 rounded-full p-4 shadow-2xl transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-110 active:scale-90 z-20 group"
            >
              <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white border-2 border-blue-200 text-blue-600 rounded-full p-4 shadow-2xl transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-110 active:scale-90 z-20 group"
            >
              <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing p-2 -mx-2 pb-4 scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={checkScrollPosition}
          >
          {hospitals.map((hospital, index) => (
            <motion.div
              key={hospital.hospital_id || `hospital-${index}`}
              className="min-w-[420px] lg:min-w-[480px] bg-white rounded-xl shadow-lg hover:shadow-xl border border-slate-200 flex-shrink-0 overflow-hidden group cursor-pointer"
              whileHover={{ y: -4, transition: { duration: 0.4 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToHospitalPage(hospital.hospital_id)}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                {hospital.image && (
                  <Image
                    src={hospital.image}
                    fill
                    alt={hospital.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Floating Badge */}
                {/* <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                    <FaStar className="text-slate-600 text-sm" />
                    <span className="text-slate-800 font-semibold text-sm">4.8</span>
                  </div>
                </div> */}

                {/* Status Indicators */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full border border-white"></div>
                  <div className="text-white text-xs font-semibold bg-slate-500/80 backdrop-blur-sm rounded-lg px-2 py-1">
                    Available
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-600 transition-colors duration-300">
                  {hospital.name}
                </h3>
                
                <div className="flex items-center text-slate-600 mb-4">
                  <FaMapMarkerAlt className="mr-3 text-slate-500 text-sm" />
                  <p className="text-sm font-medium">{hospital.location}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-2">
                    <FaUserMd className="text-slate-600 text-sm" />
                    <span className="text-slate-700 text-xs font-medium">Expert Doctors</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-2">
                    <FaBed className="text-slate-600 text-sm" />
                    <span className="text-slate-700 text-xs font-medium">Modern Facilities</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group hover:bg-teal-700"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToHospitalPage(hospital.hospital_id);
                  }}
                >
                  <span>Explore Hospital</span>
                  <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
                      ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitaltap;