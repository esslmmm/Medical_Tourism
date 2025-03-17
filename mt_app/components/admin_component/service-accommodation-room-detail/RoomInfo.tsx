import React from "react";
import { FaEdit } from "react-icons/fa";

const RoomInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <h2 className="text-xl font-semibold">Extra Room</h2>

      {/* Edit Button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <FaEdit size={18} />
      </button>

      <h3 className="font-semibold mt-4">Including</h3>
      <ul className="mt-2 text-gray-600">
        <li>🛏️ 2 Single Beds</li>
        <li>📏 Room Size: 30 m²</li>
        <li>🏙️ City View</li>
        <li>🚭 Non-Smoking</li>
        <li>🚿 Shower</li>
      </ul>
      
      <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">
        🔍 See all room facilities
      </a>
    </div>
  );
};

export default RoomInfo;
