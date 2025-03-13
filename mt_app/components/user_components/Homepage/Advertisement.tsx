"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../app/globals.css";

const images = [
  "img/Homepage/Test.jpg",
  "img/Packages/basiccheckup.webp",
  "img/Packages/medical2.png",
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
            className="w-full h-full object-cover brightness-90"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16 text-left">
        <h2 className="font-semibold text-[#4D4D4D] mb-4 text-4xl md:text-5xl leading-tight">
          Detail of package or<br /> promotion ads
        </h2>
        <p className="text-lg text-[#717171] mb-6">
          Hospital’s name, benefit, or package’s name
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all">
          SEE DETAIL
        </button>
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
