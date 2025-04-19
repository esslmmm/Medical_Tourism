"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../app/globals.css";

const images = [
  "/img/landing01.jpg",
  "/img/landing02.jpeg",
  "/img/landing03.jpg",
  `/img/landing04.jpg`
];

const Advertisement = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds for a better transition
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] flex justify-center text-gray-800 overflow-hidden">
      {/* Background Image */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={images[index]}
            alt="Advertisement"
            className="w-full h-full object-cover brightness-90 opacity-50 

Button B
"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-16 text-left">
        <div >
        <img
              src="/img/Footer&Navbar/carepath_logo.png"
              alt="Logo"
              className="w-35 h-auto mx-auto"
            />
            <p className="font-semibold text-[#4D4D4D] mb-4 text-4xl md:text-5xl leading-tight">
          CAREPATH
        </p>
        </div>
        
        <p className="text-lg text-[#4D4D4D] mb-6">
        We help international patients access medical service in Thailand easier
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full transition-all ${
              index === idx ? "bg-green-600 scale-110" : "bg-gray-300"
            }`}
            onClick={() => setIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
