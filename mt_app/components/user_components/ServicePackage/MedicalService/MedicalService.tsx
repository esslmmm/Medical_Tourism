"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  CheckIcon, 
  StarIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
  PaperClipIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  MapIcon
} from '@heroicons/react/24/solid';
import { X } from 'lucide-react';
import MakeAppointment from './MakeAppointment';
import Link from 'next/link';

const medical_package = {
  name: 'Medical Check-up',
  images: [
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test3.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test4.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries. Every elephant rescued is brought to the sanctuary in Chiang Mai and cared for with great passion and enthusiasm. Our mission is not only geared towards the protection and prevention of abused Elephants in Thailand but also to educate the public about their long history within Thai culture. Founded in 2009, Ran-Tong has rescued over 40 elephants to date with the help of public generosity, support, and private donation they can continue their ongoing vital work. Our priority is animal welfare. At Ran-Tong Save & Rescue Elephant Centre, you will completely get to learn a lot about elephants and have a memorable experience with them.',
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
  ]
};

const facilities = [
  { icon: MapIcon, title: 'Hospital\npick-up & drop-off' },
  { icon: EnvelopeIcon, title: 'Invitation Letter' },
  { icon: ChatBubbleBottomCenterTextIcon, title: 'Coordinator' },
  { icon: PhoneIcon, title: 'Post-treatment\nfollow-up' },
  { icon: PaperClipIcon, title: 'Diagnostic\nTests & Lab Reports' }
];

const reviews = [
  {
    name: 'Ahmed Muhammad',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    date: 'August 2025',
    rating: 5,
    text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was excellent as well 👌'
  },
  {
    name: 'Ahmed Muhammad',
    country: 'Qatar',
    flag: '🇶🇦',
    date: 'August 2025',
    rating: 5,
    text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was excellent as well 👌'
  },
  {
    name: 'Wunna Kaungmyat',
    country: 'Myanmar',
    flag: '🇲🇲',
    date: 'August 2025',
    rating: 4,
    text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was excellent as well 👌'
  }
];

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
    medical_package.images.length > 0 ? medical_package.images[0] : null
  );

  const previewImages = medical_package.images.slice(0, 3);
  const remainingImages = medical_package.images.slice(3);
  const displayedCenters = medical_package.hospital.centersAndClinics.slice(0, 3);
  const remainingCount = medical_package.hospital.centersAndClinics.length - 3;

  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold text-black mt-5">{medical_package.name}</h1>

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
                {medical_package.images.map((img, i) => (
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
              <p className="text-gray-700 leading-relaxed">{medical_package.description}</p>
            </div>
          )}

          {/* Services */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medical_package.services.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-black">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Facilities</h2>
            <div className="bg-white p-10 border border-gray-300 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {facilities.map((facility, index) => {
                  const IconComponent = facility.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                      <p className="text-xs font-bold whitespace-pre-line text-black">{facility.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Available Language</h2>
            <div className="flex gap-4">
              {medical_package.available_languages.map((lang, index) => (
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
                src={medical_package.hospital.image}
                alt={medical_package.hospital.name}
                width={773}
                height={434}
                className="w-full object-cover rounded-lg"
              />
              <div className="pt-5">
                <h3 className="text-xl font-bold mb-4 text-black">{medical_package.hospital.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold mb-2 text-black">📍 Location</h4>
                  <p className="text-black">{medical_package.hospital.location.address}</p>
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
                  href={medical_package.hospital.detailLinkText}
                  className="inline-flex items-center gap-2 border border-teal-500 text-teal-500 font-semibold px-5 py-2.5 rounded-full shadow-md hover:text-white hover:bg-teal-600 transition-all duration-200"
                >
                  View More Details
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-black">Frequently asked questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-4 cursor-pointer">
                  <h3 className="font-bold text-teal-500">How can I cancel my booking ?</h3>
                  <ChevronDownIcon className="w-6 h-6" />
                </div>
                <div className="text-gray-600 text-sm space-y-2">
                  <p>You can cancel your booking online on the Agoda website or app, under the "My bookings" section in the account menu.</p>
                  <p>Please double-check the cancellation policy of your activity before booking. Some operators do not allow refunds in case of cancellation.</p>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-bold text-black">When will I receive the refund for cancelled bookings?</h3>
                  <ChevronUpIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-bold text-black">How do vouchers work?</h3>
                  <ChevronUpIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-bold text-black">Who and when do I pay?</h3>
                  <ChevronUpIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Packages */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-black">Recommended Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedPackages.map((pkg, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
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
                        <span className="text-xs text-gray-500 line-through">{pkg.originalPrice}</span>
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
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Review</h2>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-black">4.8</span>
                <span className="text-sm text-gray-600">(556 reviews) from 900+ booked</span>
              </div>
              
              {/* Rating breakdown */}
              <div className="space-y-2 mb-6">
                {[
                  { stars: 5, count: 492, width: 88 },
                  { stars: 4, count: 42, width: 8 },
                  { stars: 3, count: 15, width: 4 },
                  { stars: 2, count: 0, width: 1 },
                  { stars: 1, count: 0, width: 1 }
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-black">{rating.stars} Star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-teal-500 h-1 rounded-full" 
                        style={{ width: `${rating.width}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600">{rating.count}</span>
                  </div>
                ))}
              </div>

              {/* Filter buttons */}
              <div className="flex gap-4 mb-6 text-sm">
                <button className="text-teal-500">5 Star</button>
                <button className="text-teal-500">4 Star</button>
                <button className="text-teal-500">3 Star</button>
                <button className="text-teal-500">2 Star</button>
                <button className="text-teal-500">1 Star</button>
                <div className="ml-auto border border-teal-500 rounded-full px-4 py-1">
                  <span className="text-teal-500">Most relevant</span>
                </div>
              </div>
            </div>

            {/* Review items */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <h4 className="font-bold text-gray-600">{review.name}</h4>
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border text-xs">
                          <span>{review.flag}</span>
                          <span className="font-bold text-black">{review.country}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Reviewed on {review.date}</p>
                      <p className="text-sm mb-3 text-black">{review.text}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{review.rating} out of 5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <ChevronLeftIcon className="w-6 h-6 text-gray-400" />
              <div className="border border-teal-500 rounded w-6 h-6"></div>
              <span>...</span>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </div>
          </div>
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