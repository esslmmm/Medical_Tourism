'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface Packages {
  package_id: number;
  package_name: string;
  package_image: package_image[]
}

interface package_image {
  image_id: number;
  images: string;
  title: string;
  detail: string
}

interface PackageDetailProps {
  data: Packages | null;
}


const ImageCarousel: React.FC<PackageDetailProps> = ({data}) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  if (!isMobile && data?.package_image.length) {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.package_image.length);
    }, 3000);
    return () => clearInterval(interval);
  }
}, [isMobile, data]);


  // Sync scroll to index for desktop
  useEffect(() => {
    if (!isMobile && carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.clientWidth * index,
        behavior: 'smooth',
      });
    }
  }, [index, isMobile]);

  // Detect scroll position on mobile
  const handleScroll = () => {
    if (carouselRef.current && isMobile) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== index) setIndex(newIndex);
    }
  };

const prevSlide = () =>
  setIndex((prev) =>
    data && data.package_image.length
      ? (prev === 0 ? data.package_image.length - 1 : prev - 1)
      : 0
  );

const nextSlide = () =>
  setIndex((prev) =>
    data && data.package_image.length
      ? (prev + 1) % data.package_image.length
      : 0
  );


  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slide Container */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className={`flex w-full h-full ${
          isMobile
            ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-hide'
            : 'overflow-hidden'
        }`}
      >
        {data?.package_image.map((slide, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 h-full snap-center relative"
          >
            <img
              src={slide.images}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-2xl font-semibold">{slide.title}</h2>
              <p className="text-lg mt-2">{slide.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows — only show on desktop */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          >
            <ChevronRight className="text-white" />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data?.package_image.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-green-400' : 'bg-white'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
