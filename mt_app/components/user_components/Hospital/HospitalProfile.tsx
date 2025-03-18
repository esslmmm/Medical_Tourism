"use client";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface HospitalImage {
  image_id: number;
  image: string;
}

interface MedicalService {
  service_id: number;
  service_name: string;
}

interface Package {
  package_id: number;
  package_name: string;
  image: string;
  detail: string;
  expired_date: string; // ✅ Changed from number to string
}

interface Review {
  review_id: number;
  user_id: number;
  reviewer_name: string;
  rating: number;
  title_review: string; // ✅ Changed from Text to string
  comment: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  reviews: number;
  image: string;
  description: string;
  hospital_images: HospitalImage[]; // ✅ Changed from images to hospital_images
  medical_services: MedicalService[];
  packages: Package[];
  review_hospital: Review[];
}

const HospitalProfile: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");

        const data = await response.json();
        console.log("Hospital Data:", data); // ✅ Debugging log
        setHospital(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHospital();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading hospital details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!hospital) return <p className="text-center text-gray-500">Hospital not found</p>;

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setSelectedIndex(null);
    }
  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null && hospital.hospital_images.length > 0
        ? (prevIndex + 1) % hospital.hospital_images.length
        : 0
    );
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null && hospital.hospital_images.length > 0
        ? (prevIndex === 0 ? hospital.hospital_images.length - 1 : prevIndex - 1)
        : 0
    );
  };

  return (
    <div className="bg-white p-8">
      <div className="grid grid-cols-2 gap-8 ml-10">
        {/* Hospital Images */}
        <div className="grid grid-cols-2 gap-4">
          {hospital.hospital_images.length > 0 ? (
            <>
              <img
                src={hospital.image}
                alt="Hospital"
                className="w-100 h-100 object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedIndex(0)}
              />
              <div className="relative">
                {hospital.hospital_images.slice(1, 3).map((img, index, arr) => (
                  <div key={img.image_id} className="relative">
                    <img
                      src={img.image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                      onClick={() => setSelectedIndex(index + 1)}
                    />
                    {index === arr.length - 1 && hospital.hospital_images.length > 3 && (
                      <div
                        className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() => setSelectedIndex(index + 1)}
                      >
                        <span className="text-white font-semibold text-lg">
                          +{hospital.hospital_images.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>

        {/* Hospital Info */}
        <div className="flex flex-col">
          <h2 className={`${inter.className} text-2xl font-bold mb-5 mt-3`}>
            {hospital.name}
          </h2>
          <div className="flex items-center text-yellow-500 mt-2">
            {[...Array(hospital.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className={`text-gray-600 ml-2 ${inter.className}`}>
              ({hospital.reviews} reviews)
            </span>
          </div>
          <div className={`${inter.className} flex items-center text-gray-600 mt-2`}>
          <FaMapMarkerAlt className="mr-2 text-red-500" />
            <p>{hospital.location}</p>
          </div>
          <p className={`${inter.className} text-gray-700 mt-4`}>
            {hospital.description}
          </p>
        </div>
      </div>

            {/* Services */}
        <div className="col-span-2">
          <h3 className={`text-2xl font-semibold mt-8`}>Services</h3>
          <div className="grid grid-cols-6 gap-6 mt-4">
            {hospital.medical_services.map((service, index) => {
              const servicesList = [
                { icon: "❤️", name: "Heart" },
                { icon: "🎗", name: "Cancer" },
                { icon: "🦴", name: "Bone" },
                { icon: "🧠", name: "Brain" },
                { icon: "🚑", name: "Trauma" },
                { icon: "✅", name: "Check-up" },
                { icon: "🔪", name: "Surgery" },
                { icon: "🦷", name: "Dental" },
                { icon: "👶", name: "Child" },
                { icon: "💆", name: "Aesthetic" },
                { icon: "👁️", name: "Eye & ENT" },
                { icon: "➕", name: "Others" },
              ];

              const serviceIcon = servicesList.find(s => s.name === service.service_name)?.icon || "➕";

              return (
                <div key={index} className="flex flex-col items-center text-center text-gray-700">
                  <span className="text-4xl mb-2">{serviceIcon}</span>
                  <p className="text-sm">{service.service_name}</p>
                </div>
              );
            })}
          </div>
        </div>


      {/* Image Modal */}
      {selectedIndex !== null && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black/75 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <button
            className="absolute left-4 text-white bg-gray-800 hover:bg-gray-500 p-3 rounded-full ml-25"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
          <FaChevronLeft size={24} />
          </button>
          <div className="relative flex items-center">
            <img
              src={hospital.hospital_images[selectedIndex]?.image} // ✅ Fix modal image source
              alt="Full View"
              className="max-w-screen-lg max-h-screen-lg rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button
            className="absolute right-4 text-white bg-gray-800 hover:bg-gray-500 p-3 rounded-full mr-25"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;
