"use client";
import { useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lato } from "next/font/google";
import "../globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "900"] });

interface Hospital {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Mae Fah Luang Medical Center Hospital",
    phone: "+123 456 78 91",
    email: "hello@luxi.com",
    address: "Lorem ipsum street no 14 Block A",
    image: "/Mfu.jpg",
  },
  {
    id: 2,
    name: "Bangkok Hospital",
    phone: "+123 456 78 91",
    email: "info@bangkokhospital.com",
    address: "123 Bangkok Street, Thailand",
    image: "/Bangkokhospital.png",
  },
  {
    id: 3,
    name: "City General Hospital",
    phone: "+987 654 32 10",
    email: "contact@cityhospital.com",
    address: "456 Medical Lane, Downtown",
    image: "/hospital3.png",
  },
  {
    id: 4,
    name: "International Medical Center",
    phone: "+555 111 22 33",
    email: "info@imc.com",
    address: "789 Global Ave, Uptown",
    image: "/hospital4.png",
  },
  {
    id: 5,
    name: "Advanced Care Hospital",
    phone: "+321 654 98 76",
    email: "support@ach.com",
    address: "246 Health Blvd, Metropolis",
    image: "/hospital5.png",
  },
];

const Hospitaltap: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const router = useRouter();

  const navigateToHospitalPage = () => {
    router.push("/Hospital");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
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

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing p-2 -mx-2"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {hospitals.map((hospital) => (
          <motion.div
            key={hospital.id}
            className="min-w-[380px] md:min-w-[420px] bg-white rounded-xl shadow-md p-5 border border-gray-200 flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-1/3">
              {hospital.image && (
                <Image
                  src={hospital.image}
                  width={180}
                  height={120}
                  alt={hospital.name}
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            <div className="w-2/3 pl-4">
              <h3 className="font-semibold text-lg">{hospital.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                📞 {hospital.phone} &nbsp; 📧 {hospital.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center">            
                <FaMapMarkerAlt className="mr-1" />
              {hospital.address}</p>

              <motion.button
                className="mt-4 px-6 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white w-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToHospitalPage}
              >
                SEE DETAIL
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hospitaltap;
