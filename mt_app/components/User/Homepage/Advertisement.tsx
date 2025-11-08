// // "use client";

// // import { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import "@/app/globals.css";

// // const images = [
// //   "/img/Homepage/Test.jpg",
// //   "/img/Packages/basiccheckup.webp",
// //   "/img/Packages/medical2.png",
// // ];

// // const Advertisement = () => {
// //   const [index, setIndex] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 4000); // Change image every 4 seconds for a better transition
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="relative w-full h-[700px] flex justify-center text-gray-800 overflow-hidden">
// //       {/* Background Image */}
// //       <AnimatePresence>
// //         <motion.div
// //           key={index}
// //           className="absolute inset-0 w-full h-full"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 1 }}
// //         >
// //           <img
// //             src={images[index]}
// //             alt="Advertisement"
// //             className="w-full h-full object-cover brightness-90"
// //           />
// //         </motion.div>
// //       </AnimatePresence>

// //       {/* Overlay Content */}
// //       <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16 text-left">
// //         <h2 className="font-semibold text-[#4D4D4D] mb-4 text-4xl md:text-5xl leading-tight">
// //           Detail of package or<br /> promotion ads
// //         </h2>
// //         <p className="text-lg text-[#717171] mb-6">
// //           Hospital’s name, benefit, or package’s name
// //         </p>
// //         <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all">
// //           SEE DETAIL
// //         </button>
// //       </div>

// //       {/* Navigation Dots */}
// //       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
// //         {images.map((_, idx) => (
// //           <button
// //             key={idx}
// //             className={`w-4 h-4 rounded-full transition-all ${
// //               index === idx ? "bg-green-600 scale-110" : "bg-gray-300"
// //             }`}
// //             onClick={() => setIndex(idx)}
// //           ></button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Advertisement;


// "use client";

// import React, { useEffect, useState } from "react";

// const images = [
//   "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
//   "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
//   "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop"
// ];

// const Advertisement = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[700px] flex justify-center text-gray-800 overflow-hidden bg-slate-50">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 w-full h-full">
//         <img
//           src={images[index]}
//           alt="Medical Tourism"
//           className="w-full h-full object-cover transition-opacity duration-1000"
//         />
//         {/* Medical Blue Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-600/60 to-cyan-600/50"></div>
//       </div>

//       {/* Content Section */}
//       <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16 text-left z-10">
//         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl">
//           <div className="flex items-center mb-4">
//             <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full mr-6"></div>
//             <div>
//               <h2 className="font-bold text-slate-800 text-4xl md:text-5xl leading-tight">
//                 Premium Medical
//                 <span className="block text-blue-600">Tourism Packages</span>
//               </h2>
//             </div>
//           </div>
          
//           <p className="text-lg text-slate-600 mb-8 leading-relaxed">
//             World-class healthcare combined with exceptional hospitality. 
//             Experience top-tier medical treatments in Thailand's finest facilities.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
//               EXPLORE PACKAGES
//             </button>
//             <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold">
//               CONSULT DOCTOR
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             className={`w-4 h-4 rounded-full transition-all duration-300 ${
//               index === idx 
//                 ? "bg-white scale-125 shadow-lg" 
//                 : "bg-white/50 hover:bg-white/70"
//             }`}
//             onClick={() => setIndex(idx)}
//           ></button>
//         ))}
//       </div>

//       {/* Medical Trust Indicators */}
//       <div className="absolute bottom-8 right-8 flex items-center space-x-6 text-white/90 text-sm z-20">
//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//           <span>JCI Accredited</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//           <span>ISO Certified</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advertisement;




"use client";

import { useEffect, useState } from "react";

const Advertisement = () => {
  const [index, setIndex] = useState(0);

  // Background images for rotation
  const backgroundImages = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    "https://plus.unsplash.com/premium_photo-1682310231531-148748e7684f?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll functions
  const handleExplorePackages = () => {
    const packagesSection = document.querySelector('#packages-section');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultDoctor = () => {
    const doctorsSection = document.querySelector('#doctors-section');
    if (doctorsSection) {
      doctorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewHospitals = () => {
    const hospitalsSection = document.querySelector('#hospitals-section');
    if (hospitalsSection) {
      hospitalsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[700px] flex justify-center text-gray-800 overflow-hidden bg-slate-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImages[index]}
          alt="Medical Tourism"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-600/60 to-cyan-600/50"></div>
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16 text-left z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl">
          <div className="flex items-center mb-4">
            <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full mr-6"></div>
            <div>
              <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                THAILAND'S PREMIER PLATFORM
              </div>
              <h2 className="font-bold text-slate-800 text-4xl md:text-5xl leading-tight">
                Your Trusted
                <span className="block text-blue-600">Medical Journey Partner</span>
              </h2>
            </div>
          </div>
          
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            The only platform connecting you directly with Thailand's top-rated hospitals and internationally certified doctors. We simplify medical tourism with transparent pricing, personalized packages, and complete journey support.
          </p>

          {/* Unique Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800 text-sm font-semibold">Direct Hospital Network</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 rounded-lg p-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800 text-sm font-semibold">JCI Certified Care</span>
            </div>
            <div className="flex items-center space-x-2 bg-cyan-50 rounded-lg p-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-cyan-800 text-sm font-semibold">Custom Packages</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 rounded-lg p-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-800 text-sm font-semibold">End-to-End Support</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleExplorePackages}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              EXPLORE PACKAGES
            </button>
            <button 
              onClick={handleConsultDoctor}
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-sm"
            >
              CONSULT DOCTOR
            </button>
            <button 
              onClick={handleViewHospitals}
              className="border-2 border-cyan-600 text-cyan-600 px-6 py-3 rounded-xl hover:bg-cyan-600 hover:text-white transition-all duration-300 font-semibold text-sm"
            >
              VIEW HOSPITALS
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === idx 
                ? "bg-white scale-125 shadow-lg" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setIndex(idx)}
          ></button>
        ))}
      </div>

      {/* Medical Trust Indicators */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-6 text-white/90 text-sm z-20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>JCI Accredited</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>ISO Certified</span>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;