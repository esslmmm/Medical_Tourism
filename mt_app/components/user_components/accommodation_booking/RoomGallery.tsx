"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HotelImage {
  image_id: number;
  image: string;
}

interface Accommodation {
  hotel_id: number;
  name: string;
  hotel_cod: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
  contact_info: string;
  create_at: Date;
  hotel_images: HotelImage[];
}

interface AccommodationProfileProps {
  accommodation: Accommodation | null;
}

const RoomGallery: React.FC<AccommodationProfileProps> = ({ accommodation }) => {
  const images = accommodation?.hotel_images.map((img) => img.image) || [];
  const [mainImage, setMainImage] = useState<string>(images[0] || "/placeholder.jpg");
  const [showAll, setShowAll] = useState(false);
  const maxThumbnails = 3;
  const extraPhotos = images.length - maxThumbnails;

  // Reset mainImage when accommodation (or images[0]) changes
  useEffect(() => {
    setMainImage(images[0] || "/placeholder.jpg");
  }, [images[0]]);

  return (
    <div className="flex justify-center items-center bg-[#D2ECE4] py-10">
      <div className="relative max-w-500 rounded-xl overflow-hidden shadow-lg">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt="Room Image"
          width={800}
          height={500}
          className="w-200 h-120 object-cover rounded-xl"
        />

        {/* Thumbnail Images */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {(showAll ? images : images.slice(0, maxThumbnails)).map((img, index) => (
            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`Thumbnail ${index}`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer hover:opacity-80 transition"
                onClick={() => setMainImage(img)}
              />

              {/* +X more overlay */}
              {!showAll && index === maxThumbnails - 1 && extraPhotos > 0 && (
                <button
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                  onClick={() => setShowAll(true)}
                >
                  <span className="text-white text-sm font-semibold">
                    +{extraPhotos} photos
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Show Less Button */}
        {showAll && (
          <div className="absolute top-4 right-4">
            <button
              className="bg-white text-black px-3 py-1 rounded-lg text-sm"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomGallery;
