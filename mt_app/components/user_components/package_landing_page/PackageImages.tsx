"use client"
import React, { useState } from 'react';
import { Heart, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  duration: number;
  routes: routes[]
  description: description[];
  package_image: package_image[]
}

interface routes{
  route_id: number;
  tour_id: number;
  trips: trips
}

interface trips {
  tour_id: number;
  package_id: number;
  total_price: number;
  package_places: package_places[]
}

interface package_places {
  packplace_id: number;
  tour_id: number;
  place_id: number;
  places: places
}

interface places {
  place_id: String;
  place_name: string;
  image: string;
  description: string;
}

interface description {
  description_id: number;
  title: string;
  details: string;
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

const PackageImage: React.FC<PackageDetailProps> = ({ data }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullItinerary, setShowFullItinerary] = useState(false);

  // Early return if no data
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">Package data not available</p>
        </div>
      </div>
    );
  }

  // Hardcoded travel plan (since it's not in your data structure)
  const travelPlan = [
    {
      day: 1,
      title: "Arrival & Initial Consultation",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Initial medical consultation"]
    },
    {
      day: 2,
      title: "Medical Procedures",
      activities: ["Medical treatments", "Recovery time", "City orientation tour"]
    },
    {
      day: 3,
      title: "Recovery & Sightseeing",
      activities: ["Follow-up appointment", "Sightseeing activities", "Cultural experiences"]
    }
  ];


  const nextImage = () => {
    if (data?.package_image && data.package_image.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % data.package_image.length);
    }
  };

  const prevImage = () => {
    if (data?.package_image && data.package_image.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + data.package_image.length) % data.package_image.length);
    }
  };

  return (
      <div className="space-y-8">
        {/* Image Gallery */}
        {data.package_image && data.package_image.length > 0 && (
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden relative">
              <img
                src={data.package_image[selectedImageIndex]?.images || ''}
                alt={data.package_image[selectedImageIndex]?.title || `Package image ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {data.package_image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            {data.package_image.length > 1 && (
              <div className="flex space-x-2 mt-4">
                {data.package_image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-teal-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img.images} alt={img.title || `Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Medical Services */}
        {data.description && data.description.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Services Included</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.description.map((service, index) => (
                <div key={service.description_id || index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <div>
                    <span className="text-gray-900 font-medium">{service.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Plan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Travel Itinerary</h2>
            <button
              onClick={() => setShowFullItinerary(!showFullItinerary)}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              {showFullItinerary ? 'Show Less' : 'View Full Itinerary'}
            </button>
          </div>
          <div className="space-y-6">
            {(showFullItinerary ? travelPlan : travelPlan.slice(0, 2)).map((day) => (
              <div key={day.day} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-bold">{day.day}</span>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{day.title}</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-600">
                          <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PackageImage;