"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import PackagesSkeleton from "../skeleton-screen/DoctorProfile/PackageSkeleton";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
}

interface PackageDoc {
  package_id: number;
  packages: Package;
}

interface Doctor {
  doctor_id: number;
  name: string;
  package_doc: PackageDoc[]; // ✅ Updated to match API structure
}

const DoctorPackage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const response = await fetch(`/api/services/doctors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");

        const data = await response.json();
        console.log("Doctor Data:", data); // ✅ Debugging log
        setDoctor(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDoctor();
  }, [id]);

  useEffect(() => {
    checkScrollPosition();
  }, [doctor]);

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

  if (loading || !doctor) {
    return <PackagesSkeleton />;
  }
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-8 relative">
      <h2 className="text-2xl font-semibold text-start pl-6 mb-6">Related Packages</h2>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-gray-300"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-hidden scrollbar-hide flex space-x-6 pl-5 pr-10 scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {doctor.package_doc?.length > 0 ? (
          doctor.package_doc.map((pkg) => (
            <motion.div
              key={pkg.packages.package_id} // ✅ Access package_id inside `pkg.packages`
              className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-full h-52">
                {/* ✅ Access image from `pkg.packages.image` */}
                <Image
                  src={pkg.packages.image}
                  alt={pkg.packages.package_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className={`${poppins.className} font-medium text-[#023F76] text-md mt-4`}>
                {pkg.packages.package_name} {/* ✅ Access package name from nested `packages` */}
              </h3>
              <p className={`${poppins.className} font-light text-[#023F76] text-sm`}>
                {pkg.packages.detail} {/* ✅ Access package detail from nested `packages` */}
              </p>
              <p className={`${poppins.className} font-medium text-black mt-4`}>
                {new Date(pkg.packages.expired_date).toLocaleDateString()} {/* ✅ Format date */}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No packages available</p>
        )}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-gray-300 active:scale-90"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default DoctorPackage;
