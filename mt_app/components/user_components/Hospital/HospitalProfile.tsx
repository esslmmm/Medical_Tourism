"use client";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
}

interface HospitalImage {
  image_id: number;
  image_url: string;
}

interface MedicalService {
  service_id: number;
  service_name: string;
}

interface Package {
  package_id: number;
  package_name: string;
}

interface Review {
  review_id: number;
  reviewer_name: string;
  comment: string;
  rating: number;
}

interface Hospital {
  hospital_id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  doctors: Doctor[];
  hospital_images: HospitalImage[];
  medical_services: MedicalService[];
  packages: Package[];
  review_hospital: Review[];
}

interface HospitalData {
  name: string;
  rating: number;
  reviews: number;
  location: string;
  description: string;
  images: string[];
  services: { icon: string; name: string }[];
}

interface HospitalProfileProps {
  hospitalData: HospitalData;
}

const HospitalProfile: React.FC<HospitalProfileProps> = ({ hospitalData }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setSelectedIndex(null);
    }
  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex + 1) % hospitalData.images.length : 0
    );
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex === 0 ? hospitalData.images.length - 1 : prevIndex - 1) : 0
    );
  };

  return (
    <div className="bg-white p-8">
      <div className="grid grid-cols-2 gap-8 ml-10">
        <div className="grid grid-cols-2 gap-4">
          <img
            src={hospitalData.images[0]}
            alt="Hospital"
            className="w-100 h-100 object-cover rounded-lg cursor-pointer"
            onClick={() => setSelectedIndex(0)}
          />
          <div>
            <img
              src={hospitalData.images[1]}
              alt="Room"
              className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => setSelectedIndex(1)}
            />
            <img
              src={hospitalData.images[2]}
              alt="Aerial View"
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
              onClick={() => setSelectedIndex(2)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className={`${inter.className} text-2xl font-bold mb-5 mt-3`}>
            {hospitalData.name}
          </h2>
          <div className="flex items-center text-yellow-500 mt-2">
            {[...Array(hospitalData.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className={`text-gray-600 ml-2 ${inter.className}`}>
              ({hospitalData.reviews} reviews)
            </span>
          </div>
          <div className={`${inter.className} flex items-center text-gray-600 mt-2`}>
            <FaMapMarkerAlt className="mr-2" />
            <p>{hospitalData.location}</p>
          </div>
          <p className={`${inter.className} text-gray-700 mt-4`}>
            {hospitalData.description}
          </p>
        </div>
      </div>

      <h3 className={`text-2xl font-semibold mt-8 ${inter.className}`}>Services</h3>
      <div className="grid grid-cols-6 gap-6 mt-4">
        {hospitalData.services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center text-gray-700">
            <span className="text-4xl mb-2">{service.icon}</span>
            <p className="text-sm">{service.name}</p>
          </div>
        ))}
      </div>

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
              src={hospitalData.images[selectedIndex]}
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