import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const PlaceAdd: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add New Place</h2>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
          Add
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="w-full h-40 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-lg mb-6 bg-gray-50 hover:bg-gray-100 transition-all">
        <span className="text-gray-500 font-medium">Upload Image</span>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name & Location */}
        <div>
          <label className="font-medium">Name:</label>
          <input
            type="text"
            placeholder="Place Name"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Location:</label>
            <input
              type="text"
              placeholder="Location"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-6">
            <button className="bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all">
              <FaMapMarkerAlt className="text-gray-600" />
              Choose Location
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description:</label>
          <textarea
            placeholder="Write description..."
            className="w-full mt-1 border rounded-lg px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
        </div>

        {/* Admission Fee */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Admission Fee:</label>
            <div className="flex items-center border rounded-lg px-4 py-2">
              <input
                type="number"
                placeholder="Fee"
                className="w-full focus:ring-0 focus:outline-none"
              />
              <span className="text-gray-500 ml-2">Baht</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="font-medium">Special Instruction:</label>
          <textarea
            placeholder="Write special instructions..."
            className="w-full mt-1 border rounded-lg px-4 py-2 h-20 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
        </div>

        {/* Wheelchair Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="wheelchair" className="hidden peer" />
          <label
            htmlFor="wheelchair"
            className="flex items-center gap-2 cursor-pointer peer-checked:text-blue-500 peer-checked:font-semibold transition-all"
          >
            <IoCheckmarkCircleOutline className="text-gray-500 peer-checked:text-blue-500 text-2xl transition-all" />
            Wheelchair Access
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlaceAdd;
