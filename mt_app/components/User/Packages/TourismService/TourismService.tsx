"use client"

import React, { useState, useRef, useEffect } from 'react';
import {ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import MakeBooking from '@/components/User/Packages/TourismService/TourismServiceComponent/MakeBooking';
import TripList from './TourismServiceComponent/TripList';
import FAQ from './TourismServiceComponent/FAQ';
import Facilities from './TourismServiceComponent/Facilities';
import Reviews from './TourismServiceComponent/Reviews';
import { Packages } from '@/types/Package';
import Warning from './TourismServiceComponent/Warning';
import Images from '../MedicalService/MedicalServiceComponent/Images';

interface TourismServiceProps {
  appointmentDate: Date | null;
  TripData: Packages | null;
  onGoBack: () => void;
}


const TourismService: React.FC<TourismServiceProps> = ({ TripData, appointmentDate, onGoBack }) => {
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState('Description');
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const tabsContainerRef = useRef<HTMLDivElement>(null);

    const tabs = [
      'Description',
      'Trips',
      'Facilities',
      'Frequently asked questions',
      'Review'
    ];

  // Handle scroll behavior
    const handleScroll = () => {
      if (tabsContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
      }
    };
  
    const handleScrollLeft = () => {
      tabsContainerRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
    };
  
    const handleScrollRight = () => {
      tabsContainerRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
    };
  
    useEffect(() => {
      const ref = tabsContainerRef.current;
      if (!ref) return;
      ref.addEventListener('scroll', handleScroll);
      handleScroll(); // initialize
      return () => ref.removeEventListener('scroll', handleScroll);
    }, []);
  
    const handleTabClick = (tab: string) => {
      const sectionId = tab.replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveTab(tab);
    };
  return (

      <div className="">
      {/* Header */}
      <h1 className="text-4xl font-bold text-black mt-5">{TripData?.trips.city ? `${TripData.trips.city} Trip` : 'Tourism Service'}</h1>
              
              
              {/* Images */}
              <Images images={TripData?.trips.images || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 ">
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Section */}
          <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center">
            {/* Chevron Left */}
            {showLeftArrow && (
              <button
                onClick={handleScrollLeft}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}

            {/* Tabs */}
            <div
              ref={tabsContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-3 snap-x snap-mandatory flex-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 border-b-2 px-2 transition-colors whitespace-nowrap text-sm md:text-base snap-start ${
                    activeTab === tab
                      ? 'border-teal-500 text-teal-600 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Chevron Right */}
            {showRightArrow && (
              <button
                onClick={handleScrollRight}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>

            {/* Description */}
            <section id="description">
            <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
            <p className="text-gray-700 leading-relaxed">
            {TripData?.trips.description || TripData?.description?.map(d => d.text).join(' ') || 'Description not available'}
            </p>
            </section>

        {/* TripList */}
        <section id="trips">
        <TripList onTripSelect={setSelectedTrip} trips={TripData?.trips.Trip_Routes.map(tr => tr.routes) || []} />
        </section>

        {/* Facilites */}
        <section id="facilities">
          <Facilities />
        </section>

        {/* FAQ */}
        <section id="frequently-asked-questions">
          <FAQ />
        </section>

        {/* Reviews */}
        <section id="review">
          <Reviews />
        </section>

     </div>

          {/* Booking Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-10 max-h-[calc(100vh-2.5rem)] overflow-y-auto scrollbar-hide'>
              {appointmentDate ? (
                <MakeBooking 
                  selectedTrip={selectedTrip} 
                  TripData={TripData} 
                  appointmentDate={appointmentDate} 
                />
              ) : (
                <Warning onGoBack={onGoBack} />
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default TourismService; 