"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lato } from "next/font/google";
import "../../../app/globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "900"] });


const Hospitaltap: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
  }, []);

  const navigateToHospitalPage = () => {
    router.push(`/user/package_landing_page`);
  };

  return (
    <div className={`${lato.className} container mx-auto p-6 lg:px-16 pb-10 bg-green-50`}>
      <h2 className="text-3xl font-black mb-2">Medical Package</h2>

      
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide"
        >
          
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 * 0.1 }}
              onClick={() => navigateToHospitalPage()}
              className="min-w-[280px] cursor-pointer bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/img/Packages/health_check-up.jpeg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-1">Health Check-up Packages</h3>
              <div className="text-gray-500 flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-red-400" />
                Mae Fah Luang University Medical Center Hospital
              </div>
            </motion.div>

        </div>

    </div>
  );
};

export default Hospitaltap;
