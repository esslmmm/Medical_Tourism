"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  CheckIcon, 
  StarIcon, 
} from '@heroicons/react/24/solid';
import { X } from 'lucide-react';
import MakeAppointment from './MedicalServiceComponent/MakeAppointment';
import Link from 'next/link';
import FAQ from './MedicalServiceComponent/FAQ';
import Facilities from './MedicalServiceComponent/Facilities';
import Reviews from './MedicalServiceComponent/Reviews';
import Recommended_Packages from './MedicalServiceComponent/Recommended_Packages';

const medical_service = {
  name: 'Medical Check-up',
  images: [
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test3.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test4.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries...',
  services: [
    'Comprehensive dental examination',
    'Follow-up consultations',
    'Dental implants (if required)',
    'Cosmetic dental procedures',
    'Professional teeth cleaning'
  ],
  hospital: {
    name: "Bangkok Hospital Phuket",
    image: "/img/Homepage/Test.jpg",
    location: {
      address: "Hongyok, Hongyokutis Rd, Taladyai, Muang, Phuket, Thailand",
      city: "Phuket",
      country: "Thailand"
    },
    centersAndClinics: [
      "Oncology",
      "Cardiovascular",
      "Neuroscience",
      "Bone",
      "Colorectal Deseases",
      "Brain",
    ],
    detailLinkText: "/user/Hospital/745f7b01-f313-40bb-8c45-8568a544e03d"
  },
  available_languages: [
    { language: 'Saudi Arabia', flag: '🇸🇦' },
    { language: 'Qatar', flag: '🇶🇦' },
    { language: 'Myanmar', flag: '🇲🇲' }
  ],
  reviews:[
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Qatar',
      flag: '🇶🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Wunna Kaungmyat',
      profile: '/img/Homepage/Test.jpg',
      country: 'Myanmar',
      flag: '🇲🇲',
      date: 'August 2025',
      rating: 4,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    }
  ]
};

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
  }
];

const tabs = ['Description', 'Service', 'Facilities', 'Available Language', 'Hospital', 'Frequently'];

interface MedicalPackageProps {
  onNextStep?: (date: Date) => void;
}

const MedicalPackage: React.FC<MedicalPackageProps> = ({ onNextStep }) => {
  const [activeTab, setActiveTab] = useState('Description');
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    medical_service.images.length > 0 ? medical_service.images[0] : null
  );

  const previewImages = medical_service.images.slice(0, 3);
  const remainingImages = medical_service.images.slice(3);
  const displayedCenters = medical_service.hospital.centersAndClinics.slice(0, 3);
  const remainingCount = medical_service.hospital.centersAndClinics.length - 3;

  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold text-black mt-5">{medical_service.name}</h1>

      {/* Images */}
      <div className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          <div className="lg:col-span-2 relative">
            <Image
              src={previewImages[0].url}
              alt={previewImages[0].alt}
              width={800}
              height={400}
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>

          <div className="flex flex-col gap-4 relative">
            {previewImages.slice(1, 3).map((img, i) => (
              <div key={i} className="relative">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={400}
                  height={200}
                  className={`w-full h-full object-cover ${
                    i === 0 ? "rounded-tr-2xl" : "rounded-br-2xl"
                  }`}
                />
                {i === 1 && remainingImages.length > 0 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="absolute bottom-4 right-4 bg-white bg-opacity-50 text-teal-500 px-3 py-1 rounded border-teal-500 border text-sm font-bold hover:bg-opacity-70 hover:text-white hover:bg-teal-500 transition"
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
          <div className="fixed inset-0 backdrop-blur-xs bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-5xl w-full relative overflow-y-auto max-h-[90vh] border border-gray-300">
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-3 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <X className=" w-8 h-8 " />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-black">All Photos</h2>

              {selectedImage && (
                <div className="mb-4 w-full flex justify-center">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    width={600}
                    height={400}
                    className="w-full max-w-3xl h-auto object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex gap-4 overflow-x-auto py-2">
                {medical_service.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                      selectedImage!.url === img.url
                        ? "border-teal-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={150}
                      height={100}
                      className="w-[150px] h-auto object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs */}
          <div className="border-b sticky top-10  bg-white">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-teal-500 text-teal-500 font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'Description' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
              <p className="text-gray-700 leading-relaxed">{medical_service.description}</p>
            </div>
          )}

          {/* Services */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medical_service.services.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-black">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <Facilities />

          {/* Languages */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Available Language</h2>
            <div className="flex gap-4">
              {medical_service.available_languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border text-xs">
                  <span>{lang.flag}</span>
                  <span className="font-bold text-sm text-black">{lang.language}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Hospital</h2>
            <div className="bg-white overflow-hidden">
              <Image
                src={medical_service.hospital.image}
                alt={medical_service.hospital.name}
                width={773}
                height={434}
                className="w-full object-cover rounded-lg"
              />
              <div className="pt-5">
                <h3 className="text-xl font-bold mb-4 text-black">{medical_service.hospital.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold mb-2 text-black">📍 Location</h4>
                  <p className="text-black">{medical_service.hospital.location.address}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold mb-3 text-black">🩺 Centers & Clinics</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayedCenters.map((center, index) => (
                      <span key={index} className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                        {center}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                        +{remainingCount} centers
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={medical_service.hospital.detailLinkText}
                  className="inline-flex items-center gap-2 border border-teal-500 text-teal-500 font-semibold px-5 py-2.5 rounded-full shadow-md hover:text-white hover:bg-teal-600 transition-all duration-200"
                >
                  View More Details
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <FAQ/>

          {/* Recommended Packages */}
          <Recommended_Packages />

          {/* Reviews */}
          <Reviews />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-10">
            <MakeAppointment onNextStep={onNextStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPackage;