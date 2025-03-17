import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/img/room1.png",
  "/img/room2.png",
  "/img/room3.png",
];

const RoomImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Room Image"
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* Left Button */}
      <button
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
        onClick={prevImage}
      >
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
        onClick={nextImage}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default RoomImageGallery;
