"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface Package {
  package_id: string;
  package_name: string;
  image: string;
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

interface HospitalDetailProps {
  hospital : Hospital | null;
}

const MedicalPackage: React.FC<HospitalDetailProps> = ({ hospital }) => {
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

  const navigateToPackage = (packageId: string) => {
    router.push(`/user/packages/${packageId}`);
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
        ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date) 
        : "Invalid Date";
  };

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
            onClick={() => navigateToPackage(pkg.package_id)}
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
