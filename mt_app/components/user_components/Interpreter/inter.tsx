"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Package {
  package_id: number;
  package_interpreters: Inter[];
}

interface Inter {
  inter: number;
  interpreter_id: number;
}

// Define Type for an Interpreter
interface Interpreter {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  language: string;
  bio: string;
  age?: number;
  experience?: string;
  country?: string;
  email?: string;
  title_review: string;
}

// Define Props for InterpreterList Component
interface InterpreterListProps {
  setSelectedInterpreter: (interpreter: Interpreter) => void; // Function to update selected interpreter
  selectedInterpreter: Interpreter | null; // Currently selected interpreter
}

const interpreters: Interpreter[] = [
  { id: 1, name: "Duygu Muhurdar", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "I am Duygu, a Music Programmer, Booking Agent, and an Ethnomusicologist.I've been working within the Music Industry with an experience close to a decade now as a booker, live event producer, singer and music writer. My strengths are in bookings, research, communications, content and project development and writing backed by my training in International Relations and Music.", image: "/img/Interpreter/interpreter1.png", rating: 4.2, reviews: 421, language: "English", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com"},
  { id: 2, name: "Vanessa Leiva", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Arabic Interpreter", image: "/img/Interpreter/interpreter2.png", rating: 4.0, reviews: 200, language: "Arabic", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 3, name: "Sek Han Foo", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 4, name: "Rajiv De Guia", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Burmese Interpreter", image: "/img/Interpreter/interpreter4.png", rating: 3.8, reviews: 15, language: "Burmese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 5, name: "Duygu Muhurdar", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.",bio: "English Interpreter", image: "/img/Interpreter/interpreter1.png", rating: 4.2, reviews: 421, language: "English", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 6, name: "Sek Han Foo", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 7, name: "Sek Han Foo", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 8, name: "Sek Han Foo", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
  { id: 9, name: "Sek Han Foo", title_review: "The interpreter was so helpful and professional! They made my hospital visits stress-free by ensuring I understood everything clearly.", bio: "Chinese Interpreter", image: "/img/Interpreter/interpreter3.png", rating: 4.1, reviews: 130, language: "Chinese", age: 15, experience: "5 Years",country:"Thailand",email:"Duygu.mhd@gmail.com" },
];


export default function InterpreterList({ setSelectedInterpreter, selectedInterpreter }: InterpreterListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [interpreter, setInterpreterData] = useState<Interpreter | null>(null);
  const [loading, setLoading] = useState(false);
  const packageId = 34; // Change this ID based on your requirement

  useEffect(() => {
    async function fetchPackage() {
      try {
        setLoading(true);
        const packageRes = await fetch(`/api/packages/${packageId}`);
        if (!packageRes.ok) throw new Error("Failed to fetch package");
        const packageJson = await packageRes.json();
        setPackageData(packageJson);

        // Check if there is an interpreter associated
        if (packageJson.package_interpreters.length > 0) {
          const interpreterId = packageJson.package_interpreters[0].interpreter_id;
          fetchInterpreter(interpreterId);
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchInterpreter(interpreterId: number) {
      try {
        const interpreterRes = await fetch(`/api/interpreter/${interpreterId}`);
        if (!interpreterRes.ok) throw new Error("Failed to fetch interpreter");
        const interpreterJson = await interpreterRes.json();
        setInterpreterData(interpreterJson);
      } catch (error) {
        console.error("Error fetching interpreter:", error);
      }
    }

    fetchPackage();
  }, []);
  
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
