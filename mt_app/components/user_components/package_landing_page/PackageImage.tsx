'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/img/place.png',
    title: 'Medical Check-Up at MFU Hospital',
    expiry: 'Expire Date 31/12/2025',
  },
  {
    image: '/img/medical.png',
    title: 'Advanced Health Screening',
    expiry: 'Expire Date 30/06/2025',
  },
  {
    image: '/img/interpreter.png',
    title: 'Comprehensive Wellness Package',
    expiry: 'Expire Date 31/12/2024',
  },
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <img
        src={slides[index].image}
        alt={`Slide ${index + 1}`}
        className="w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center">
        <h2 className="text-2xl font-semibold">{slides[index].title}</h2>
        <p className="text-lg mt-2">{slides[index].expiry}</p>
      </div>
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
        <ChevronLeft className="text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
        <ChevronRight className="text-white" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-green-400' : 'bg-white'}`}
          ></span>
        ))}
      </div>
    </div>
  );
}