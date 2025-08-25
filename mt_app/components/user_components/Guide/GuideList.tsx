"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Package {
  package_id: number;
  package_guides: package_guides[];
}

interface package_guides {
  pack_guide_id: number;
  package_id: number;
  guide_id: number;
}

// Define Type for an Guide
interface Review {
  review_id: number;
  title_review: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Guide {
  guide_id: number;
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
  review_guide: Review[];
  guide_education: Education[];
  languages: Languages[];
  guide_bookings: Bookings[];
}

interface Bookings {
  booking_id: number;
  guide_id: number;
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

// Define Props for GuideList Component
interface GuideListProps {
  setSelectedGuide: (guide: Guide) => void;
  selectedGuide: Guide | null;
}

export default function GuideList({ setSelectedGuide, selectedGuide }: GuideListProps) {
  const { id } = useParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [guideData, setGuideData] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const packageRes = await fetch(`/api/services/packages/${id}`);

        if (!packageRes.ok) {
          throw new Error("Failed to fetch package");
        }

        const packageJson: Package = await packageRes.json();

        if (packageJson.package_guides.length > 0) {
          const guideIds = packageJson.package_guides.map((p) => p.guide_id);
          fetchGuides(guideIds);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    async function fetchGuides(guideIds: number[]) {
      try {
        const fetchedGuides = await Promise.all(
          guideIds.map(async (id) => {
            const res = await fetch(`/api/services/guides/${id}`);
            if (!res.ok) throw new Error("Failed to fetch guide");
            return res.json();
          })
        );
        setGuideData(fetchedGuides);
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
  }, [guideData]);

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
        {guideData.map((guide) => {
          const averageRating = calculateAverageRating(guide.review_guide);
          return (
            <motion.div
              key={guide.guide_id}
              className={`cursor-pointer flex flex-col items-center pt-1 px-6 mt-2 bg-white shadow-md rounded-[15px] w-[400px] h-[280px] transition-all border-2 ${
                selectedGuide?.guide_id === guide.guide_id
                  ? "border-[#2196F3]"
                  : "border-[#C5D1E0]"
              }`}
              onClick={() => setSelectedGuide(guide)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="font-bold text-center text-lg">{guide.language} Guide</h3>
              <img src={guide.image} alt={guide.name} className="w-32 h-32 rounded-full border-1 border-gray-400 shadow-md item-center m-2" />
              <h3 className="mt-3 font-semibold text-center text-lg">{guide.name}</h3>
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
