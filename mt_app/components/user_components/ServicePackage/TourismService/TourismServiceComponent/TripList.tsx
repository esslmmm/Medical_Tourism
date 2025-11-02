"use client";
import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { Attraction, Include, InfoItem, Route, Highlight } from '@/types/Package';


interface TripListProps {
  onTripSelect?: (trip: Route) => void;
  trips: Route[];
}

interface TripDetailModalProps {
  trip: Route | null;
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Trip Detail Modal Component
const TripDetailModal: React.FC<TripDetailModalProps> = ({ trip, isOpen, onClose }) => {  
  if (!isOpen || !trip) return null;
  
  // Flatten all images from all attractions
  const allAttractionImages = trip.attractions.flatMap(attraction =>
    [{ url: attraction.places.image, alt: attraction.places.name }]
  );

  const [selectedImage, setSelectedImage] = useState(allAttractionImages[0] || null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (attractionIndex: number, section: string) => {
    const key = `${attractionIndex}-${section}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-6xl w-full relative overflow-y-auto max-h-[90vh] border border-gray-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">{trip.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Overview Trip Image Gallery */}
        <div className="px-6 py-4">
          {selectedImage && (
            <div className="mb-4 w-full flex justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full max-w-4xl h-auto object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex gap-4 overflow-x-auto py-2">
            {allAttractionImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                  selectedImage?.url === img.url ? "border-teal-500" : "border-transparent"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-[150px] h-[100px] object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="px-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Description <span className="text-orange-500 font-normal">({trip.duration} {trip.duration > 1 ? 'days' : 'day'})</span>
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {trip.description}
          </p>
        </div>

        {/* Attractions */}
        {trip.attractions.map((attraction: Attraction, attractionIndex: number) => (
          <div key={attractionIndex} className="px-6 mb-6 border-t border-gray-200 pt-6">
            <div className="flex gap-4 mb-4">
              {/* Attraction Image */}
              <div className="w-64 flex-shrink-0">
                <img
                  src={attraction.places.image}
                  alt={attraction.places.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              {/* Name & Description */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.places.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {attraction.places.description}
                </p>
                
                {/* Highlights */}
                {attraction.places.highlights && attraction.places.highlights.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-base font-bold text-gray-900 mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {attraction.places.highlights
                        .slice(0, expandedSections[`${attractionIndex}-highlights`] ? undefined : 3)
                        .map((item: Highlight, i: number) => (
                          <li key={i} className="text-gray-700 text-sm flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {item.text}
                          </li>
                        ))}
                    </ul>
                    {attraction.places.highlights.length > 3 && (
                      <button
                        onClick={() => toggleSection(attractionIndex, 'highlights')}
                        className="text-teal-400 text-sm font-medium mt-2"
                      >
                        {expandedSections[`${attractionIndex}-highlights`] ? 'See less' : 'See more'}
                      </button>
                    )}
                  </div>
                )}

                {/* Includes */}
                {attraction.places.includes && attraction.places.includes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-base font-bold text-gray-900 mb-2">Includes</h4>
                    <ul className="space-y-1">
                      {attraction.places.includes
                        .slice(0, expandedSections[`${attractionIndex}-includes`] ? undefined : 3)
                        .map((item: Include, i: number) => (
                          <li key={i} className="text-gray-700 text-sm flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {item.text}
                          </li>
                        ))}
                    </ul>
                    {attraction.places.includes.length > 3 && (
                      <button
                        onClick={() => toggleSection(attractionIndex, 'includes')}
                        className="text-teal-400 text-sm font-medium mt-2"
                      >
                        {expandedSections[`${attractionIndex}-includes`] ? 'See less' : 'See more'}
                      </button>
                    )}
                  </div>
                )}

                {/* Important Information */}
                {attraction.places.important_info && (
                  <div className="mb-6">
                    <h4 className="text-base font-bold text-gray-900 mb-3">Important Information</h4>

                    {/* Not Allowed */}
                    {attraction.places.important_info.not_allowed && attraction.places.important_info.not_allowed.length > 0 && (
                      <div className="mb-3">
                        <h5 className="font-semibold text-red-500 mb-1">🚫 Not Allowed</h5>
                        <ul className="space-y-1">
                          {attraction.places.important_info.not_allowed
                            .slice(0, expandedSections[`${attractionIndex}-not_allowed`] ? undefined : 3)
                            .map((item: InfoItem, i: number) => (
                              <li key={i} className="text-gray-700 text-sm flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                {item.text}
                              </li>
                            ))}
                        </ul>
                        {attraction.places.important_info.not_allowed.length > 3 && (
                          <button
                            onClick={() => toggleSection(attractionIndex, 'not_allowed')}
                            className="text-teal-400 text-sm font-medium mt-2"
                          >
                            {expandedSections[`${attractionIndex}-not_allowed`] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Recommend to Bring */}
                    {attraction.places.important_info.recommend_to_bring && attraction.places.important_info.recommend_to_bring.length > 0 && (
                      <div className="mb-3">
                        <h5 className="font-semibold text-teal-500 mb-1">🎒 Recommend to Bring</h5>
                        <ul className="space-y-1">
                          {attraction.places.important_info.recommend_to_bring
                            .slice(0, expandedSections[`${attractionIndex}-recommend`] ? undefined : 3)
                            .map((item: InfoItem, i: number) => (
                              <li key={i} className="text-gray-700 text-sm flex items-start">
                                <span className="text-teal-400 mr-2">✓</span>
                                {item.text}
                              </li>
                            ))}
                        </ul>
                        {attraction.places.important_info.recommend_to_bring.length > 3 && (
                          <button
                            onClick={() => toggleSection(attractionIndex, 'recommend')}
                            className="text-teal-400 text-sm font-medium mt-2"
                          >
                            {expandedSections[`${attractionIndex}-recommend`] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Know Before You Go */}
                    {attraction.places.important_info.know_before_you_go && attraction.places.important_info.know_before_you_go.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-orange-500 mb-1">ℹ️ Know Before You Go</h5>
                        <ul className="space-y-1">
                          {attraction.places.important_info.know_before_you_go
                            .slice(0, expandedSections[`${attractionIndex}-know`] ? undefined : 3)
                            .map((item: InfoItem, i: number) => (
                              <li key={i} className="text-gray-700 text-sm flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                {item.text}
                              </li>
                            ))}
                        </ul>
                        {attraction.places.important_info.know_before_you_go.length > 3 && (
                          <button
                            onClick={() => toggleSection(attractionIndex, 'know')}
                            className="text-teal-400 text-sm font-medium mt-2"
                          >
                            {expandedSections[`${attractionIndex}-know`] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Location */}
                {attraction.places.location && (
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Location</h4>
                    <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-3 overflow-hidden">
                      <iframe
                        src={attraction.places.location.url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Location Map"
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm">{attraction.places.location.text}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Trip List Component
const TripList: React.FC<TripListProps> = ({ onTripSelect, trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Route | null>(null);
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSeeDetails = (trip: Route, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  const handleSelectTrip = (trip: Route, index: number) => {
    setSelectedTripIndex(index);
    setSelectedTrip(trip);
    if (onTripSelect) onTripSelect(trip);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trip</h1>
      </div>

      <div className="space-y-4">
        {trips.map((trip: Route, index: number) => (
          <div
            key={index}
            onClick={() => handleSelectTrip(trip, index)}
            className={`cursor-pointer bg-white rounded-2xl drop-shadow-lg border p-4 mb-4 transition-colors ${
              selectedTripIndex === index ? "border-teal-500 border-2" : "border-gray-300"
            }`}
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <img src={trip.image} alt={trip.title} className="w-32 h-48 object-cover rounded-2xl" />
              </div>

              <div className="flex-1 py-2 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {trip.title} <span className="text-orange-500 font-normal">({trip.duration} {trip.duration > 1 ? "days" : "day"})</span>
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {trip.attractions.map((attraction: Attraction, idx: number) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {attraction.places.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={(e) => handleSeeDetails(trip, e)}
                    className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1"
                  >
                    See details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-600 text-sm">Start from</span>
                    <span className="text-gray-400 text-sm">฿</span>
                    <span className="text-2xl font-bold text-red-500">
                      {(trip.guide_price + trip.car_service_price).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTrip(trip, index);
                    }}
                    className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-colors border-2 ${
                      selectedTripIndex === index
                        ? "border-teal-500 text-teal-500 bg-teal-50"
                        : "border-teal-200 text-teal-400 hover:bg-teal-50"
                    }`}
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TripDetailModal trip={selectedTrip} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TripList;