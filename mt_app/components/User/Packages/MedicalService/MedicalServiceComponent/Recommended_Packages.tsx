import React, { useRef } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const recommendedPackages = [
  {
    title: 'Metal Health Package',
    price: '฿2,000',
    originalPrice: '฿4,000',
    discount: '50% OFF',
    rating: 4.8,
    reviews: '(180 reviews) from 150+ booked',
    category: 'Medical Package',
    image: '/img/Homepage/Test.jpg'
  },
  {
    title: 'Dental Package',
    price: '฿2,000',
    originalPrice: '฿4,000',
    discount: '50% OFF',
    rating: 4.8,
    reviews: '(180 reviews) from 150+ booked',
    category: 'Medical Package',
    image: '/img/Homepage/Test.jpg'
  },
  {
    title: 'Physical Therapy Package',
    price: '฿2,000',
    originalPrice: '฿4,000',
    discount: '50% OFF',
    rating: 4.8,
    reviews: '(180 reviews) from 150+ booked',
    category: 'Medical Tourism Package',
    image: '/img/Homepage/Test.jpg'
  },
  {
    title: 'Physical Therapy Package',
    price: '฿2,000',
    originalPrice: '฿4,000',
    discount: '50% OFF',
    rating: 4.8,
    reviews: '(180 reviews) from 150+ booked',
    category: 'Medical Tourism Package',
    image: '/img/Homepage/Test.jpg'
  }
];

const Recommended_Packages = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; // adjust based on card width
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">Recommended Packages</h2>
      {/* "relative" in className below */}
      <div className=""> 
        {/* Left Chevron */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Packages Scrollable */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-8"
        >
          {recommendedPackages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0 w-64"
            >
              <Image
                src={pkg.image}
                alt={pkg.title}
                width={269}
                height={186}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-black">{pkg.title}</h3>
                <div className="mb-2">
                  <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded text-xs font-bold">
                    {pkg.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-black">{pkg.rating}</span>
                  <span className="text-gray-600">{pkg.reviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">
                      {pkg.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                      {pkg.discount}
                    </span>
                  </div>
                  <span className="text-red-600 text-xs font-bold">{pkg.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Chevron */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2  bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Recommended_Packages;
