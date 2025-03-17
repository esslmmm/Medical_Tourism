import React, { useState } from "react";

const RoomForm: React.FC = () => {
  const [roomData, setRoomData] = useState({
    name: "",
    including: "",
    facility: "",
    price: "",
    roomCount: "",
    personCount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add Room</h2>

      {/* Image Upload */}
      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400 mb-6">
        Upload Image
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Name */}
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleChange}
            placeholder="Enter Room Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Including */}
        <div>
          <label className="block text-gray-600 mb-1">Including</label>
          <select
            name="including"
            value={roomData.including}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Item in Room</option>
            <option value="TV">TV</option>
            <option value="Mini Bar">Mini Bar</option>
            <option value="Air Conditioning">Air Conditioning</option>
          </select>
        </div>

        {/* Facility */}
        <div>
          <label className="block text-gray-600 mb-1">Facility</label>
          <select
            name="facility"
            value={roomData.facility}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Additional Service</option>
            <option value="Gym Access">Gym Access</option>
            <option value="Free Breakfast">Free Breakfast</option>
            <option value="Swimming Pool">Swimming Pool</option>
          </select>
        </div>

        {/* Price */}
        <div className="relative">
          <label className="block text-gray-600 mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={roomData.price}
            onChange={handleChange}
            placeholder="Price (Baht)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-4 top-10 text-gray-500">฿</span>
        </div>

        {/* Room Count */}
        <div className="relative">
          <label className="block text-gray-600 mb-1">Room</label>
          <input
            type="text"
            name="roomCount"
            value={roomData.roomCount}
            onChange={handleChange}
            placeholder="Number of Rooms"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Person Count */}
        <div className="relative">
          <label className="block text-gray-600 mb-1">Person</label>
          <input
            type="text"
            name="personCount"
            value={roomData.personCount}
            onChange={handleChange}
            placeholder="Max People Allowed"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
