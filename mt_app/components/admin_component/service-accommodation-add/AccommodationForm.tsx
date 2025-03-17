import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";

const AccommodationForm: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mx-auto mt-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Accommodation</h2>

      {/* Image Upload */}
      <div className="relative bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg h-48 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition">
        <span className="text-gray-500 text-lg">Upload Image</span>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input type="text" placeholder="Hotel Name" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Country Code</label>
            <input type="text" placeholder="+66" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Phone Number</label>
            <input type="text" placeholder="Phone number" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Code</label>
          <input type="text" placeholder="Enter Code" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Location</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50 transition hover:bg-gray-100">
            <input type="text" placeholder="Location" className="flex-1 bg-transparent outline-none" />
            <FaMapMarkerAlt className="text-gray-500" />
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea placeholder="Write description" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition h-24 resize-none"></textarea>
        </div>

        <div className="relative">
          <label className="text-gray-700 font-medium mb-1">Facility</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50 cursor-pointer transition hover:bg-gray-100">
            <span className="flex-1 text-gray-600">Select Facility</span>
            <IoIosArrowDown className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Room Section */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border relative">
        <h3 className="text-lg font-semibold">Room</h3>
        <p className="text-gray-500">No Package</p>

        {/* Add Room Button Moved to Top Right Corner */}
        <button className="absolute top-4 right-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          <MdOutlineAddBox className="mr-2" />
          Add Room
        </button>
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Add
        </button>
      </div>
    </div>
  );
};

export default AccommodationForm;
