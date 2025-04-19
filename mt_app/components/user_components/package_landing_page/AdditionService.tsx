"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ServiceType = "accommodation" | "interpreter";

const AdditionService: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Record<ServiceType, boolean>>({
    accommodation: false,
    interpreter: false,
  });
  const router = useRouter();

  const navigateToHospitalPage = () => {
    router.push(`/user/package_landing_page`);
  };

  const toggleSelection = (service: ServiceType) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <div className=" bg-green-100 flex justify-center items-center p-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Addition Service
        </h1>

        

        {/* Service Cards */}
        <div className="space-y-6">
          {/* Accommodation Card */}
          <div
            title="Click to select or deselect Accommodation"
            className={`flex items-center p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border-2 relative ${
              selectedServices.accommodation
                ? "bg-green-100 border-green-500 scale-105"
                : "bg-white border-gray-300 hover:shadow-xl hover:scale-105"
            }`}
            onClick={() => toggleSelection("accommodation")}
          >
            <img
              src="/img/room1.png"
              alt="Accommodation"
              className="w-1/3 h-40 object-cover rounded-lg"
            />
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Accommodation</h2>
              <p className="text-gray-600 text-lg mt-2">Options:</p>
              <ul className="mt-3 space-y-3">
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  The Heritage Chiang Rai Hotel and Convention
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  The Legacy of The Legend Chiang Rai Boutique River Resort & Spa
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  Le Meridien Chiang Rai Resort, Thailand
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionService;
