"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lato } from "next/font/google";
import "@/app/globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "900"] });

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

  const navigateToHospitalPage = (hospitalId: number) => {
    router.push(`/user/Hospital/${hospitalId}`);
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

  return (
    <div className={`${lato.className} container mx-auto p-6 lg:px-16 pb-10 shadow-lg`}>
      <h2 className="text-3xl font-black mb-2" style={{ fontSize: "40px" }}>
        Hospitals
      </h2>
      <p className="text-gray-600 mb-6">Popular hospitals.</p>

      {loading ? (
        <p className="text-center text-gray-500">Loading hospitals...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing p-2 -mx-2"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {hospitals.map((hospital, index) => (
            <motion.div
              key={hospital.hospital_id || `hospital-${index}`} // Fallback key in case `id` is missing
              className="min-w-[380px] md:min-w-[650px] bg-white rounded-xl shadow-md p-5 border border-gray-200 flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
            >
              
              <div className="w-1/3">
                {hospital.image && hospital.image.trim() !== '' && (() => {
                  try {
                    new URL(hospital.image.startsWith('/') ? `${window.location.origin}${hospital.image}` : hospital.image);
                    return true;
                  } catch {
                    return false;
                  }
                })() && (
                  <Image
                    src={hospital.image}
                    width={180}
                    height={120}
                    alt={hospital.name}
                    className="rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              <div className="w-2/3">
                <h3 className="font-semibold text-lg">{hospital.name}</h3>
                <div className="flex items-center text-sm text-black mt-1">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <p>{hospital.location}</p>
                </div>
                <motion.button
                  className="mt-4 px-6 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white w-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateToHospitalPage(hospital.hospital_id)}
                >
                  SEE DETAIL
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hospitaltap;
