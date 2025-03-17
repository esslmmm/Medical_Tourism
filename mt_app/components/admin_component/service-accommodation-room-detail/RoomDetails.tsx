import React from "react";
import { FaEdit } from "react-icons/fa";

const RoomDetails: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <h2 className="text-xl font-semibold">Room Details</h2>

      {/* Edit Button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <FaEdit size={18} />
      </button>

      <p className="mt-2">
        <span className="font-semibold">Price:</span> 1,000 bath
      </p>
      <p>
        <span className="font-semibold">Rooms Available:</span> 15 Rooms
      </p>
      <p>
        <span className="font-semibold">Max Guests:</span> 2 People
      </p>
    </div>
  );
};

export default RoomDetails;
