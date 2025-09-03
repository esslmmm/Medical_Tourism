"use client"
import React, { useState } from 'react';
import { Heart, Check, ChevronLeft, ChevronRight, Camera, Play, Maximize2, Calendar, Clock, MapPin, Star, Award } from 'lucide-react';
import Image from 'next/image';

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

  // Sample gallery images from public folder
  const galleryImages = [
    { src: "/img/medical.png", title: "Medical Facility", type: "photo" },
    { src: "/img/package.png", title: "Package Overview", type: "photo" },
    { src: "/img/hotels/wanasom01.jpg", title: "Luxury Accommodation", type: "photo" },
    { src: "/img/place.png", title: "Tourist Destinations", type: "photo" },
    { src: "/img/Homepage/health-checkup.jpg", title: "Health Checkup", type: "photo" }
  ];

  // Enhanced travel plan with more details
  const travelPlan = [
    {
      day: 1,
      title: "Arrival & Initial Consultation",
      location: "Bangkok Airport - Hotel - Hospital",
      activities: ["VIP airport pickup & transfer", "5-star hotel check-in", "Welcome dinner", "Initial medical consultation", "Meet your care coordinator"]
    },
    {
      day: 2,
      title: "Medical Procedures & Diagnostics",
      location: "Premium Medical Center",
      activities: ["Comprehensive medical examination", "Diagnostic tests & imaging", "Consultation with specialists", "Treatment planning session", "Light city orientation tour"]
    },
    {
      day: 3,
      title: "Treatment & Recovery",
      location: "Hospital - Hotel",
      activities: ["Medical treatment procedures", "Recovery monitoring", "Therapeutic sessions", "Nutritional counseling", "Relaxation & wellness activities"]
    },
    {
      day: 4,
      title: "Cultural Exploration",
      location: "Bangkok City Tour",
      activities: ["Grand Palace visit", "Wat Pho Temple tour", "Traditional Thai massage", "Floating market experience", "Cultural dining experience"]
    }
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="space-y-12">
      {/* Enhanced Image Gallery */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Package Gallery</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Camera className="w-4 h-4" />
            <span>{galleryImages.length} Photos</span>
          </div>
        </div>

        <div className="relative">
          {/* Main Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden group">
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              priority={selectedImageIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Image Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImage}
                className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-gray-900">{galleryImages[selectedImageIndex].title}</h3>
                <p className="text-sm text-gray-600">{selectedImageIndex + 1} of {galleryImages.length}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  quality={75}
                />
                {img.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Medical Services */}
      {data.description && data.description.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-4">
              <Award className="w-5 h-5 mr-2" />
              Premium Medical Services
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What's Included in Your Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive medical care combined with luxury amenities for your comfort and peace of mind</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.description.map((service, index) => (
              <div key={service.description_id || index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">5-Star Care</h4>
              <p className="text-sm text-gray-600">Premium medical facilities</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">24/7 Support</h4>
              <p className="text-sm text-gray-600">Round-the-clock assistance</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900">JCI Certified</h4>
              <p className="text-sm text-gray-600">International standards</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Travel Itinerary */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            Day-by-Day Itinerary
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Complete Journey</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setShowFullItinerary(!showFullItinerary)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {showFullItinerary ? 'Show Summary' : 'View Full Itinerary'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(showFullItinerary ? travelPlan : travelPlan.slice(0, 2)).map((day, index) => (
            <div key={day.day} className="relative">
              {/* Day Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  {/* Day Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {day.day}
                    </div>
                  </div>
                  
                  {/* Day Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{day.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        Full Day
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                          <span className="text-gray-700 text-sm font-medium">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connection Line */}
              {index < (showFullItinerary ? travelPlan : travelPlan.slice(0, 2)).length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showFullItinerary && travelPlan.length > 2 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">And {travelPlan.length - 2} more amazing days...</p>
            <button
              onClick={() => setShowFullItinerary(true)}
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              See complete {travelPlan.length}-day itinerary →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageImage;