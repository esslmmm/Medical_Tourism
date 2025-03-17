"use client";
import { FaEdit } from "react-icons/fa";

export default function AccommodationInfo() {
  return (
    <div className="mt-6 bg-transparent p-6 w-full max-w-3xl mx-auto"> 
      {/* Name */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Mae Fah Luang Hospital Center</h2>
        <button className="text-gray-500 hover:text-blue-500">
          <FaEdit size={18} />
        </button>
      </div>

      {/* Contact Number */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700">
          <strong>Contact Number:</strong> +66 814208490
        </p>
        <button className="text-gray-500 hover:text-blue-500">
          <FaEdit size={18} />
        </button>
      </div>

      {/* Code */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700">
          <strong>Code:</strong> AZ8490
        </p>
        <button className="text-gray-500 hover:text-blue-500">
          <FaEdit size={18} />
        </button>
      </div>

      {/* Location */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700">
          <strong>Location:</strong> 365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100
        </p>
        <button className="text-gray-500 hover:text-blue-500">
          <FaEdit size={18} />
        </button>
      </div>

      {/* Description */}
      <div className="flex justify-between items-center">
        <p className="text-gray-700">
          <strong>Description:</strong>{" "}
          <span className="text-sm">
            Mae Fah Luang Medical Center Hospital was established in 1972 as one
            of the first private hospitals in Thailand. Over the past 50 years,
            we have expanded our operations to become a tertiary care facility
            with dedicated hospitals for cancer and cardiology.
          </span>
        </p>
        <button className="text-gray-500 hover:text-blue-500">
          <FaEdit size={18} />
        </button>
      </div>
    </div>
  );
}
