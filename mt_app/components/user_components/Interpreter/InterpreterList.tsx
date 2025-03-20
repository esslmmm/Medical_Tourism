"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Package {
  package_id: number;
  package_interpreters: Inter[];
}

interface Inter {
  inter_id: number;
  package_id: number;
  interpreter_id: number;
}

// Define Type for an Interpreter
interface Review {
  review_id: number;
  title_review: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Interpreter {
  interpreter_id: number;
  name: string;
  email: string;
  phone: string;
  rating: number;
  nationality: string;
  image: string;
  birthofday: Date;
  profile_summary: string;
  reviews: number;
  language: string;
  experience: Date;
  review_inter: Review[];
  inter_education: Education[];
  languages: Languages[];
  inter_bookings: Bookings[];
}

interface Bookings {
  booking_id: number;
  interpreter_id: number;
  status: string;
}

interface Languages {
  lang_id: number;
  language_name: string;
  proficiency: string;
}

interface Education {
  education_id: number;
  degree: string;
  field_of_study: string;
  institution: string;
}

// Define Props for InterpreterList Component
interface InterpreterListProps {
  setSelectedInterpreter: (interpreter: Interpreter) => void;
  selectedInterpreter: Interpreter | null;
}

export default function InterpreterList({ setSelectedInterpreter, selectedInterpreter }: InterpreterListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [interpreterData, setInterpreterData] = useState<Interpreter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const packageId = 34;

  // Function to Calculate Average Rating
  const calculateAverageRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  useEffect(() => {
    async function fetchPackage() {
      try {
        setLoading(true);
        setError(null);
        const packageRes = await fetch(`/api/packages/${packageId}`);

        if (!packageRes.ok) {
          throw new Error("Failed to fetch package");
        }

        const packageJson: Package = await packageRes.json();

        if (packageJson.package_interpreters.length > 0) {
          const interpreterIds = packageJson.package_interpreters.map((p) => p.interpreter_id);
          fetchInterpreters(interpreterIds);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    async function fetchInterpreters(interpreterIds: number[]) {
      try {
        const fetchedInterpreters = await Promise.all(
          interpreterIds.map(async (id) => {
            const res = await fetch(`/api/interpreters/${id}`);
            if (!res.ok) throw new Error("Failed to fetch interpreter");
            return res.json();
          })
        );
        setInterpreterData(fetchedInterpreters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    }

    fetchPackage();
  }, []);

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
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [interpreterData]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative w-full px-10">
      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full text-gray-700 hover:bg-gray-200 z-10"
          onClick={() => scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" })}
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth px-4 flex-nowrap max-w-full"
        style={{ minHeight: "300px" }}
      >
        {interpreterData.map((interpreter) => {
          const averageRating = calculateAverageRating(interpreter.review_inter);
          return (
            <motion.div
              key={interpreter.interpreter_id}
              className={`cursor-pointer flex flex-col items-center pt-1 px-6 mt-2 bg-white shadow-md rounded-[15px] w-[400px] h-[280px] transition-all border-2 ${
                selectedInterpreter?.interpreter_id === interpreter.interpreter_id
                  ? "border-[#2196F3]"
                  : "border-[#C5D1E0]"
              }`}
              onClick={() => setSelectedInterpreter(interpreter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="font-bold text-center text-lg">{interpreter.language} Interpreter</h3>
              <img src={interpreter.image} alt={interpreter.name} className="w-32 h-32 rounded-full border-1 border-gray-400 shadow-md item-center m-2" />
              <h3 className="mt-3 font-semibold text-center text-lg">{interpreter.name}</h3>
              <div className="text-yellow-400 flex items-center gap-1 mt-2">
                {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                  <FaStar key={i} />
                ))}
                {averageRating % 1 !== 0 && <FaStarHalfAlt />}
                <span className="text-gray-700 ml-2">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
