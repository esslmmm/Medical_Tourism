import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { PackageImage } from '@/types/Package';

interface ImagesProps {
  images: PackageImage[];
}

const Images: React.FC<ImagesProps> = ({ images }) => {
  const previewImages = images.slice(0, 3);
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0] : null
  );

  const remainingImages = images.slice(3);

  // Close modal when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowAll(false);
    }
  };

  // Open modal & set clicked image
  const openModal = (img: PackageImage) => {
    setSelectedImage(img);
    setShowAll(true);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* Main image */}
          <div className="lg:col-span-2 relative">
            <Image
              src={previewImages[0]?.url}
              alt={previewImages[0]?.alt || ''}
              width={800}
              height={400}
              onClick={() => openModal(previewImages[0])}
              className="w-full h-full object-cover rounded-l-2xl cursor-pointer"
            />
          </div>

          {/* Side images */}
          <div className="flex flex-col gap-4 relative">
            {previewImages.slice(1, 3).map((img, i) => (
              <div key={i} className="relative">
                <Image
                  src={img.url}
                  alt={img.alt || ''}
                  width={400}
                  height={200}
                  onClick={() => openModal(img)}
                  className={`w-full h-full object-cover cursor-pointer ${i === 0 ? 'rounded-tr-2xl' : 'rounded-br-2xl'
                    }`}
                />

                {i === 1 && remainingImages.length > 0 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="absolute bottom-4 right-4 bg-white bg-opacity-50 text-teal-500 px-3 py-1 rounded border-teal-500 cursor-pointer border text-sm font-bold hover:bg-opacity-70 hover:text-white hover:bg-teal-500 transition"
                  >
                    See all photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showAll && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity"
            onClick={handleBackdropClick}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">

              {/* Close button */}
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 transition"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Main Image */}
              {selectedImage && (
                <div className="w-full flex justify-center mb-3 px-4">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt || ""}
                    width={900}
                    height={600}
                    className="w-full max-w-4xl h-auto rounded-lg object-contain"
                  />
                </div>
              )}

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto py-2 px-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage?.url === img.url
                        ? "border-white"
                        : "border-transparent"
                      }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || ""}
                      width={140}
                      height={100}
                      className="w-[140px] h-[90px] object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Images;
