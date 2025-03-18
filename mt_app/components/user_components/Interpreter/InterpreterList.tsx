"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Define Type for an Interpreter
interface Interpreter {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviews: number;
  language: string;
}

// Define Props for InterpreterList Component
interface InterpreterListProps {
  setSelectedInterpreter: (interpreter: Interpreter) => void; // Function to update selected interpreter
  selectedInterpreter: Interpreter | null; // Currently selected interpreter
}

const interpreters: Interpreter[] = [
  { id: 1, name: "Duygu Muhurdar", role: "English Interpreter", image: "/img/Interpreter/interpreter1.png", rating: 4.2, reviews: 421, language: "English" },
  { id: 2, name: "Vanessa Leiva", role: "Arabic Interpreter", image: "/img/Interpreter/interpreter2.png", rating: 4.0, reviews: 200, language: "Arabic" },
  { id: 3, name: "Sek Han Foo", role: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese" },
  { id: 4, name: "Rajiv De Guia", role: "Burmese Interpreter", image: "/img/Interpreter/interpreter4.png", rating: 3.8, reviews: 15, language: "Burmese" },
  { id: 5, name: "Duygu Muhurdar", role: "English Interpreter", image: "/img/Interpreter/interpreter1.png", rating: 4.2, reviews: 421, language: "English" },
  { id: 6, name: "Sek Han Foo", role: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese" },
  { id: 7, name: "Sek Han Foo", role: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese" },
  { id: 8, name: "Sek Han Foo", role: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese" },
  { id: 9, name: "Sek Han Foo", role: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese" },
];

export default function InterpreterList({ setSelectedInterpreter, selectedInterpreter }: InterpreterListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Scroll function
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Adjust scroll amount
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if arrows should be visible
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0);
        setShowRightArrow(
          scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    if (scrollRef.current) {
      checkScroll();
      scrollRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full px-10">
      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full text-gray-700 hover:bg-gray-200 z-10"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth px-4 flex-nowrap max-w-full"
  style={{ minHeight: "300px" }} // Ensures consistent height
>
        {interpreters.map((interpreter) => (
          <motion.div
          key={interpreter.id}
          className={`cursor-pointer flex flex-col items-center pt-1 px-6 mt-2 bg-white shadow-md rounded-[15px] w-[400px] h-[280px] transition-all border-2 ${
            selectedInterpreter?.id === interpreter.id ? "border-[#2196F3]" : "border-[#C5D1E0]"
          }`}
          onClick={() => setSelectedInterpreter(interpreter)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
            <h3 className="font-bold text-center text-lg" style={{fontSize: "20px"}}>{interpreter.language} Interpreter</h3>
            <img src={interpreter.image} alt={interpreter.name} className="w-32 h-32 rounded-full border-1 border-gray-400 shadow-md item-center m-2" />
            <h3 className="mt-3 font-semibold text-center text-lg">{interpreter.name}</h3>
            <div className="text-yellow-400 text-md">⭐ {interpreter.rating} ({interpreter.reviews})</div>
          </motion.div>
        ))}
      </div>

      {/* Right Scroll Button */}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full text-gray-700 hover:bg-gray-200 z-10"
          onClick={() => scroll("right")}
        >
          <FaChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
