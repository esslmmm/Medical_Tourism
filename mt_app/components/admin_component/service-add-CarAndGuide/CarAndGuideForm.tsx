import React from "react";
import { FaUpload, FaMapMarkerAlt, FaPhone, FaUsers, FaCalendar } from "react-icons/fa";

const CarAndGuideForm: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Image Section */}
        <div className="flex flex-col items-center">
          <div className="border-dashed border-2 border-gray-400 rounded-lg w-full h-48 flex items-center justify-center text-gray-500">
            <FaUpload size={30} />
            <span className="ml-2">Upload image</span>
          </div>
        </div>

        {/* Personal Info Fields */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Name :</label>
            <input type="text" placeholder="Enter name" className="border p-2 w-full rounded-lg" />
          </div>
          <div>
            <label className="font-medium">Email :</label>
            <input type="email" placeholder="Enter email" className="border p-2 w-full rounded-lg" />
          </div>
          <div>
            <label className="font-medium">City :</label>
            <select className="border p-2 w-full rounded-lg">
              <option>Chiang Rai</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Language :</label>
            <select className="border p-2 w-full rounded-lg">
              <option>Select Language</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="font-medium">Phone :</label>
          <div className="flex items-center border p-2 rounded-lg">
            <FaPhone className="text-gray-500 mr-2" />
            <input type="text" placeholder="Enter phone number" className="w-full outline-none" />
          </div>
        </div>
        <div>
          <label className="font-medium">Capacity :</label>
          <div className="flex items-center border p-2 rounded-lg">
            <FaUsers className="text-gray-500 mr-2" />
            <input type="number" placeholder="Guest number" className="w-full outline-none" />
          </div>
        </div>
        <div>
          <label className="font-medium">Career Start :</label>
          <div className="flex items-center border p-2 rounded-lg">
            <FaCalendar className="text-gray-500 mr-2" />
            <input type="number" placeholder="Year" className="w-full outline-none" />
          </div>
        </div>
      </div>

      {/* Address & Fee Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="font-medium">Address :</label>
          <div className="flex items-center border p-2 rounded-lg">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="text" placeholder="Enter address" className="w-full outline-none" />
          </div>
        </div>
        <div>
          <label className="font-medium">Fee Service :</label>
          <input type="text" placeholder="Price per time" className="border p-2 w-full rounded-lg" />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="font-medium">Description :</label>
        <textarea placeholder="Describe about service or personal information" className="border p-2 w-full rounded-lg h-24"></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Add Guide
        </button>
      </div>
    </div>
  );
};

export default CarAndGuideForm;
