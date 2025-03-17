import React from "react";
import { FaPlus, FaLocationArrow } from "react-icons/fa";

const HospitalAddForm: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Hospital</h2>

      {/* Image Upload */}
      <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-5 mb-6">
        <button className="text-gray-600 font-semibold">Upload Image</button>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Hospital Name:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter hospital name"
          />
        </div>

        <div>
          <label className="font-semibold">Contact Number:</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-1/3 border rounded-lg p-2 mt-1"
              placeholder="Country Code"
            />
            <input
              type="text"
              className="w-2/3 border rounded-lg p-2 mt-1"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Code:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Hospital Code"
          />
        </div>

        <div>
          <label className="font-semibold">Location:</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter Location"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaLocationArrow className="mr-1" /> Choose Location
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="font-semibold">Description:</label>
          <textarea
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Write description"
            rows={3}
          />
        </div>

        {/* Services Dropdown */}
        <div className="col-span-2">
          <label className="font-semibold">Service:</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option value="">Select Service</option>
            <option value="heart">Heart</option>
            <option value="cancer">Cancer</option>
            <option value="brain">Brain</option>
            <option value="surgery">Surgery</option>
          </select>
        </div>
      </div>

      {/* Doctors & Certificates */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <label className="font-semibold">Doctors:</label>
          <div className="border p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-500">No Doctor</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Add
            </button>
          </div>
        </div>

        <div>
          <label className="font-semibold">Certificates & Awards:</label>
          <div className="border p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-500">No Certificate and Award</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
          Add
        </button>
      </div>
    </div>
  );
};

export default HospitalAddForm;
