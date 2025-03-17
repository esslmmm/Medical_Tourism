import React from "react";
import { FaEdit } from "react-icons/fa";

const facilities = [
  "✅ Free Wi-Fi",
  "✅ Fitness Center",
  "✅ Pool with View",
  "✅ Free Parking",
  "✅ Restaurant",
  "✅ Bar",
  "✅ 24-hour Front Desk",
  "✅ Airport Transfer",
];

const RoomFacilities: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 relative">
      <h2 className="text-xl font-semibold">Facilities</h2>

      {/* Edit Button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <FaEdit size={18} />
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-gray-700">
        {facilities.map((facility, index) => (
          <p key={index}>{facility}</p>
        ))}
      </div>
    </div>
  );
};

export default RoomFacilities;
