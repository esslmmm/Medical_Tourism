// "use client";
// import { useEffect, useRef, useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Lato } from "next/font/google";
// import "@/app/globals.css";

// const lato = Lato({ subsets: ["latin"], weight: ["400", "900"] });

// interface Hospital {
//   hospital_id: number;
//   name: string;
//   location: string;
//   image: string;
// }

// const Hospitaltap: React.FC = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchHospitals() {
//       try {
//         const response = await fetch("/api/services/hospitals");
//         if (!response.ok) {
//           throw new Error("Failed to fetch hospitals");
//         }
//         const data = await response.json();
//         setHospitals(data);
//       } catch (error) {
//         setError("Error fetching hospitals. Please try again.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHospitals();
//   }, []);

//   const navigateToHospitalPage = (hospitalId: number) => {
//     router.push(`/user/Hospital/${hospitalId}`);
//   };

//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging || !scrollRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - (scrollRef.current.offsetLeft || 0);
//     const walk = (x - e.pageX) * 2;
//     scrollRef.current.scrollLeft -= walk;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className={`${lato.className} container mx-auto p-6 lg:px-16 pb-10 shadow-lg`}>
//       <h2 className="text-3xl font-black mb-2" style={{ fontSize: "40px" }}>
//         Hospitals
//       </h2>
//       <p className="text-gray-600 mb-6">Popular hospitals.</p>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading hospitals...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div
//           ref={scrollRef}
//           className="flex space-x-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing p-2 -mx-2"
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseUp}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//         >
//           {hospitals.map((hospital, index) => (
//             <motion.div
//               key={hospital.hospital_id || `hospital-${index}`} // Fallback key in case `id` is missing
//               className="min-w-[380px] md:min-w-[650px] bg-white rounded-xl shadow-md p-5 border border-gray-200 flex-shrink-0 flex items-center"
//               whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
//               whileTap={{ scale: 0.98 }}
//             >
              
//               <div className="w-1/3">
//                 {hospital.image && (
//                   <Image
//                     src={hospital.image}
//                     width={180}
//                     height={120}
//                     alt={hospital.name}
//                     className="rounded-lg object-cover"
//                   />
//                 )}
//               </div>

//               <div className="w-2/3">
//                 <h3 className="font-semibold text-lg">{hospital.name}</h3>
//                 <div className="flex items-center text-sm text-black mt-1">
//                   <FaMapMarkerAlt className="mr-2 text-red-500" />
//                   <p>{hospital.location}</p>
//                 </div>
//                 <motion.button
//                   className="mt-4 px-6 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white w-full transition-all"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigateToHospitalPage(hospital.hospital_id)}
//                 >
//                   SEE DETAIL
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hospitaltap;

"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaBed, FaUserMd, FaStar } from "react-icons/fa";
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
    <div id="hospitals-section" className={`${lato.className} bg-gradient-to-br from-slate-50 to-blue-50 py-16`}>
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          
          {/* New Stylized Header Design */}
          <div className="relative inline-block">
            {/* Background decoration */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            
            {/* Main title with gradient and shadow effects */}
            <h2 className="relative text-4xl lg:text-5xl font-black text-slate-800 mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
              Premier Healthcare Facilities
            </h2>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-6 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse delay-150"></div>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
            </div>
          </div>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover world-class hospitals equipped with cutting-edge technology and internationally certified medical professionals
          </p>
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
              className="min-w-[420px] lg:min-w-[480px] bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200 flex-shrink-0 overflow-hidden group cursor-pointer"
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToHospitalPage(hospital.hospital_id)}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                {hospital.image && (
                  <Image
                    src={hospital.image}
                    fill
                    alt={hospital.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-slate-800 font-semibold text-sm">4.8</span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="absolute top-6 right-6 flex space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  <div className="text-white text-xs font-semibold bg-green-500/80 backdrop-blur-sm rounded-full px-2 py-1">
                    Available
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {hospital.name}
                </h3>
                
                <div className="flex items-center text-slate-600 mb-6">
                  <FaMapMarkerAlt className="mr-3 text-red-500 text-lg" />
                  <p className="text-base font-medium">{hospital.location}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-3">
                    <FaUserMd className="text-blue-600" />
                    <span className="text-blue-800 text-sm font-medium">Expert Doctors</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-cyan-50 rounded-lg p-3">
                    <FaBed className="text-cyan-600" />
                    <span className="text-cyan-800 text-sm font-medium">Modern Facilities</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToHospitalPage(hospital.hospital_id);
                  }}
                >
                  <span>Explore Hospital</span>
                  <HiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
                      ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Need help choosing the right hospital?</p>
          <motion.button 
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Medical Concierge
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hospitaltap;