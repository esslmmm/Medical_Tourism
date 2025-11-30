"use client";
import {
  Star,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PackagesSkeleton from "../skeleton-screen/DoctorProfile/PackageSkeleton";

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
  package_type: string;
}

const RecommendPackage = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    useEffect(() => {
      async function fetchPackages() {
        try {
          const response = await fetch("/api/services/packages");
          if (!response.ok) {
            throw new Error("Failed to fetch packages");
          }
          const data = await response.json();
          setPackages(data);
        } catch (error) {
          console.error("Error fetching packages:", error);
          setError("Error fetching packages");
        } finally {
          setLoading(false);
        }
      }
  
      fetchPackages();
    }, []);
  
    useEffect(() => {
      checkScrollPosition();
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
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  if (loading) {
    return <PackagesSkeleton />;
  }
  
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  
  return (
    <div><section className="max-w-7xl mx-auto px-6 py-10 pb-5 relative">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">Recommended Packages</h2>
    <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
      View All <ChevronRight className="w-4 h-4" />
    </a>
  </div>

  {/* Scroll Buttons */}
  {canScrollLeft && (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={scrollLeft}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  )}
  {canScrollRight && (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={scrollRight}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>
  )}

  {/* Scrollable Container */}
  <div
    ref={scrollRef}
    onScroll={checkScrollPosition}
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {packages.map((pkg, idx) => (
      <div
        key={idx}
        className="min-w-[280px] border border-gray-300 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex-shrink-0"
        onClick={() => router.push(`/user/packages/${pkg.package_id}`)}
      >
        <div className="relative">
          <img src={pkg.image} alt={pkg.package_name} className="w-full h-48 object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{pkg.package_name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4</span>
            <span className="text-sm text-gray-500">
              (15 reviews from 35+ booked)
            </span>
          </div>
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs mb-3">
            {pkg.package_type}
          </div>
        </div>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default RecommendPackage