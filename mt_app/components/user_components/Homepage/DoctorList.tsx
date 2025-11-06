// "use client";

// import { useRef, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import { Poppins } from "next/font/google";
// import DoctorCardSkeleton from "../skeleton-screen/HomePage/DoctorCardSkeleton";

// const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

// interface Doctor {
//   doctor_id: number;
//   name: string;
//   specialization: string;
//   image: string;
// }

// const DoctorList: React.FC = () => {
//   const router = useRouter();
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
//   const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("/api/services/doctors");
//         if (!response.ok) {
//           throw new Error("Failed to fetch doctors");
//         }
//         const data: Doctor[] = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         setError("Error fetching doctors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

  
//   const checkScrollPosition = () => {
//     if (scrollRef.current) {
//       setCanScrollLeft(scrollRef.current.scrollLeft > 0);
//       setCanScrollRight(
//         scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
//       );
//     }
//   };
  
//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
//       setTimeout(checkScrollPosition, 300);
//     }
//   };
  
//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
//       setTimeout(checkScrollPosition, 300);
//     }
//   };

//   if (loading) {
//     return <DoctorCardSkeleton />
//   }
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
  
//   return (
//     <div className="container mx-auto p-8 relative">
//       {canScrollLeft && (
//         <button
//           onClick={scrollLeft}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 transition rounded-full p-2 shadow-lg z-10 hover:scale-110 active:scale-90"
//         >
//           <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
//         </button>
//       )}

//       <div
//         ref={scrollRef}
//         className="overflow-hidden flex scrollbar-hide px-6 space-x-6 scroll-smooth"
//         onScroll={checkScrollPosition}
//       >
//         {doctors.map((doctor) => (
//           <motion.button
//             key={doctor.doctor_id}
//             onClick={() => router.push(`/user/Doctorprofile/${doctor.doctor_id}`)} // Navigate to doctor details
//             className="flex-shrink-0 w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg p-8 text-center cursor-pointer focus:outline-none"
//             whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <div className="relative w-32 h-32 mx-auto">
//               <Image
//                 src={doctor.image}
//                 alt={doctor.name}
//                 width={128}
//                 height={128}
//                 className="rounded-full object-cover"
//               />
//             </div>
//             <h3 className={`${poppins.className} text-[#023F76] font-bold text-lg mt-4`}>
//               {doctor.name}
//             </h3>
//             <div className="w-24 h-[2px] bg-gray-300 my-2 mx-auto"></div>
//             <p className={`${poppins.className} font-medium text-gray-600 text-sm`}>
//               {doctor.specialization}
//             </p>
//           </motion.button>
//         ))}
//       </div>

//       {canScrollRight && (
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 transition rounded-full p-2 shadow-lg z-10 hover:scale-110 active:scale-90"
//         >
//           <ChevronRightIcon className="w-6 h-6 text-gray-700" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default DoctorList;




"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ImageWithFallback from "../shared/ImageWithFallback";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Users } from "lucide-react";
import { Poppins } from "next/font/google";
import DoctorCardSkeleton from "../skeleton-screen/HomePage/DoctorCardSkeleton";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  image: string;
}

const DoctorList: React.FC = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/services/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (error) {
        setError("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
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

  const getSpecializationColor = (specialization: string) => {
    if (!specialization) return 'bg-slate-100 text-slate-600';
    
    const colors = [
      'bg-slate-100 text-slate-700',
      'bg-slate-200 text-slate-800',
      'bg-slate-100 text-slate-700',
      'bg-slate-200 text-slate-800',
      'bg-slate-100 text-slate-700',
    ];
    
    const hash = specialization.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return <DoctorCardSkeleton />
  }
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  
  return (
    <div id="doctors-section" className="container mx-auto p-8 relative bg-white">
      <div className="mb-8 text-center">
        {/* Professional Header Design */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
            <Users className="w-8 h-8 text-slate-600" />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
              Expert Medical Professionals
            </h2>
            <p className="text-slate-600 text-lg">
              Internationally trained specialists committed to world-class healthcare
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
        className="overflow-hidden flex scrollbar-hide px-6 space-x-8 scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {doctors.map((doctor) => (
          <motion.button
            key={doctor.doctor_id}
            onClick={() => router.push(`/user/Doctorprofile/${doctor.doctor_id}`)}
            className="flex-shrink-0 w-[380px] bg-white shadow-lg rounded-xl p-8 text-center cursor-pointer focus:outline-none border border-slate-200 group hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-slate-100 rounded-full"></div>
              <ImageWithFallback
                src={doctor.image}
                alt={doctor.name}
                width={128}
                height={128}
                fallbackSrc="https://placehold.co/128x128/e2e8f0/64748b?text=Doctor"
                className="relative rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`${poppins.className} text-slate-800 font-bold text-xl group-hover:text-slate-600 transition-colors duration-300`}>
                Dr. {doctor.name}
              </h3>
              
              <div className="w-16 h-0.5 bg-slate-300 mx-auto rounded-full"></div>
              
              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getSpecializationColor(doctor.specialization)}`}>
                  {doctor.specialization}
                </span>
              </div>

              <div className="pt-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 group-hover:bg-slate-100 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-slate-700 font-semibold text-sm">View Profile</span>
                    <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span className="text-xs text-slate-500">Certified</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span className="text-xs text-slate-500">Available</span>
              </div>
            </div>
          </motion.button>
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

export default DoctorList;