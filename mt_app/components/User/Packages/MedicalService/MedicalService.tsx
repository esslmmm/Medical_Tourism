"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import MakeAppointment from './MedicalServiceComponent/MakeAppointment';
import FAQ from './MedicalServiceComponent/FAQ';
import Facilities from './MedicalServiceComponent/Facilities';
import Reviews from './MedicalServiceComponent/Reviews';
import Recommended_Packages from './MedicalServiceComponent/Recommended_Packages';
import HospitalComponent from './MedicalServiceComponent/Hospital';
import Languages from './MedicalServiceComponent/Languages';
import Images from './MedicalServiceComponent/Images';
import { Packages } from '@/types/Package';

// Hardcoded services for now, as not in API data
const hardcodedServices = [
  'Comprehensive dental examination',
  'Follow-up consultations',
  'Dental implants (if required)',
  'Cosmetic dental procedures',
  'Professional teeth cleaning'
];

const tabs = [
  'Description',
  'Service',
  'Facilities',
  'Available Language',
  'Provider',
  'Frequently asked questions',
  'Recommended Packages',
  'Review'
];

interface MedicalPackageProps {
  onNextStep?: (date: Date) => void;
  data : Packages | null;
}


const MedicalPackage: React.FC<MedicalPackageProps> = ({ data, onNextStep }) => {
  const [activeTab, setActiveTab] = useState('Description');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

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
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold text-black mt-5">{data?.package_name}</h1>

      {/* Images */}
      <Images images={data?.package_image || []} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Section */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center">
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
          <div id="description">
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
          <p className="text-gray-700 leading-relaxed">{data?.description?.map(d => d.text).join(' ') || 'Description not available'}</p>

          {/* Services */}
          <div id="service">
              </div>
            <h2 className="text-2xl font-bold mb-4 text-black">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardcodedServices.map((service, index) => (
            <div key={index} className="flex items-center gap-3">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-black">{service}</span>
            </div>
            ))}
            </div>

          {/* Facilities */}
          <div id="facilities">
          </div>
            <Facilities />

          {/* Languages */}
          <div id="available-language">
          </div>
            <Languages />

          {/* Hospital */}
          <div id="provider">
          </div>
          {data?.hospitals && <HospitalComponent hospital={data.hospitals} />}

          {/* FAQ */}
          <div id="frequently-asked-questions">
          </div>
            <FAQ />

          {/* Recommended Packages */}
          <div id="recommended-packages">
          </div>
            <Recommended_Packages />

          {/* Reviews */}
          <div id="review">
          </div>
            <Reviews />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-10 max-h-[calc(100vh-2.5rem)] overflow-y-auto scrollbar-hide">
            <MakeAppointment onNextStep={onNextStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPackage;
