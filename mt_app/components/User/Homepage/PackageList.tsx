"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { MapPin } from "lucide-react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import PackagesSkeleton from "../skeleton-screen/DoctorProfile/PackageSkeleton";
import Image from "next/image";
import "@/app/globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
  package_type: string;
}

const PackageList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("/api/services/packages");
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
  }, [packages]);

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
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
        ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date) 
        : "Contact for details";
  };
  
  if (loading) {
    return <PackagesSkeleton />;
  }
  
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-12 relative bg-white">
      {/* Professional Header Design */}
      <div className="text-left mb-8 pl-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Medical + Tourism Packages
            </h2>
            <p className="text-slate-600 text-lg">
              Complete healthcare experience with travel and tourism
            </p>
          </div>
        </div>
      </div>
      
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border-2 border-blue-200 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-110 active:scale-90 z-10"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-hidden scrollbar-hide flex space-x-8 pl-5 pr-10 scroll-smooth snap-x"
        onScroll={checkScrollPosition}
      >
        {packages.filter(pkg => pkg.package_type === 'Medical_Tourism').map((pkg) => (
          <motion.div
            key={pkg.package_id}
            className="flex-shrink-0 w-[340px] bg-white shadow-lg rounded-xl p-6 text-left border border-slate-200 snap-center cursor-pointer overflow-hidden group hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            onClick={() => router.push(`/user/packages/${pkg.package_id}`)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-48 mb-6">
              <Image
                src={pkg.image}
                alt={pkg.package_name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                  Medical + Tourism
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`${poppins.className} font-semibold text-slate-800 text-lg leading-tight group-hover:text-green-700 transition-colors duration-300`}>
                {pkg.package_name}
              </h3>
              
              <p className={`${poppins.className} font-light text-slate-600 text-sm leading-relaxed line-clamp-3`}>
                {pkg.detail}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-500 font-medium">Valid Until</span>
                </div>
                <span className={`${poppins.className} font-medium text-slate-700 text-sm`}>
                  {formatDate(pkg.expired_date)}
                </span>
              </div>

              {/* <div className="pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 group-hover:bg-slate-100 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-semibold text-sm">View Details</span>
                    <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
      
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border-2 border-blue-200 text-blue-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-110 active:scale-90 z-10"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default PackageList;