"use client";
import React, { useState, useEffect, RefObject } from "react";
import { motion } from "framer-motion";

interface Sections {
  [key: string]: RefObject<HTMLDivElement>;
}

interface NavigationIconsProps {
  sections: Sections; // 🔥 Enforces sections as a required prop
}

const NavigationIcons: React.FC<NavigationIconsProps> = ({ sections }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    if (!sections[id]) {
      console.error(`❌ Error: Section with ID '${id}' is not defined.`);
      return;
    }

    if (!sections[id].current) {
      console.error(`❌ Error: Ref for section '${id}' is not attached to any element.`);
      return;
    }

    sections[id].current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`w-[850px] mx-auto my-6 shadow-md border border-[#C5D1E0]
        ${isSticky ? "fixed top-20 left-6 bg-white/75 shadow-md z-50 px-4 py-2 rounded-lg w-auto" 
                   : "p-4 rounded-[20px]"}`}
    >
      <div className={`flex flex-col   ${isSticky ? "items-start gap-5" : "items-center flex-row justify-center gap-12"}`}>
        {[
          { id: "timeline", img: "/img/BookingDetail/Timeline.png", text: "Timeline" },
          { id: "package", img: "/img/BookingDetail/Package.png", text: "Package" },
          { id: "medical", img: "/img/BookingDetail/Medical service.png", text: "Medical Service" },
          { id: "accommodation", img: "/img/BookingDetail/Accommodation.png", text: "Accommodation" },
          { id: "place", img: "/img/BookingDetail/Place to visit.png", text: "Place to Visit" },
          { id: "interpreter", img: "/img/BookingDetail/Interpreter.png", text: "Interpreter" },
        ].map(({ id, img, text }, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.15, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-20 h-20 ${isSticky ? "w-12 h-12" : ""} rounded-full cursor-pointer`}
              onClick={() => handleScrollToSection(id)}
            >
              <img src={img} alt={text} className="w-full h-full object-contain rounded-full" />
            </motion.div>
            <p className={`text-sm mt-1 ${isSticky ? "hidden" : ""}`}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationIcons;
