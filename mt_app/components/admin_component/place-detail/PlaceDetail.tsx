import React from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";

const PlaceDetail: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      {/* Image Gallery */}
      <div className="relative flex justify-center gap-4">
        <div className="relative w-1/3 transition-transform duration-300 hover:scale-105">
          <Image src="/img/place.png" alt="Place" width={320} height={200} className="rounded-lg object-cover w-full shadow-md" />
        </div>
        <div className="relative w-1/3 opacity-90 transition-transform duration-300 hover:scale-105">
          <Image src="/img/place.png" alt="Place" width={320} height={200} className="rounded-lg object-cover w-full shadow-md" />
        </div>
        <div className="relative w-1/3 opacity-75 transition-transform duration-300 hover:scale-105">
          <Image src="/img/place.png" alt="Place" width={320} height={200} className="rounded-lg object-cover w-full shadow-md" />
          <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">
            +13 pictures
          </span>
        </div>
      </div>

      {/* Edit Image Button */}
      <button className="absolute top-4 right-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition">
        Edit Image
      </button>

      {/* Place Information */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Name: <span className="font-normal">Wat Long Khun</span></h2>
          <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
            <FaEdit />
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span> 365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100
          </p>
          <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
            <FaEdit />
          </button>
        </div>

        <div className="flex justify-between items-start mt-2">
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span> <span className="font-bold">MAE FAH LUANG MEDICAL CENTER HOSPITAL</span> was established in 1972 as one of the first private hospitals in Thailand. Over the past 50 years we have expanded our operations to become a tertiary care facility with dedicated hospitals for cancer and cardiology.
          </p>
          <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
            <FaEdit />
          </button>
        </div>

        {/* Additional Details */}
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-600"><span className="font-semibold">Admission Fee:</span> 30 bath</p>
            <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              <FaEdit />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600"><span className="font-semibold">Special Instruction:</span> No photography inside, dress modestly</p>
            <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              <FaEdit />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600"><span className="font-semibold">Wheelchair Accessible:</span> Yes</p>
            <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
