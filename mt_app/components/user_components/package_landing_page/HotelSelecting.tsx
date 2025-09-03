import React, { useState } from 'react';
import { Hotel, MapPin, Users, Calendar, CheckCircle2, Star, Wifi, Car, Utensils, Shield, Waves, Coffee, Zap } from 'lucide-react';
import Image from 'next/image';


interface PackageDetailProps {
    includeAccommodation: boolean;
    setIncludeAccommodation: React.Dispatch<React.SetStateAction<boolean>>;
  }

const HotelSelecting: React.FC<PackageDetailProps> = ({ includeAccommodation, setIncludeAccommodation }) => {
  const [selectedHotel, setSelectedHotel] = useState(0);

  const featuredHotels = [
    {
      name: "Grand Medical Plaza Bangkok",
      image: "/img/hotels/wanasom01.jpg",
      rating: 4.9,
      reviews: 1247,
      price: 180,
      distance: "5 min to hospital",
      highlights: ["Medical Wing", "Recovery Suites", "Thai Spa"],
      amenities: [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Waves, label: "Pool & Spa" },
        { icon: Car, label: "Medical Transfer" },
        { icon: Utensils, label: "Healthy Dining" }
      ]
    },
    {
      name: "Wellness Resort & Spa",
      image: "/img/room1.png",
      rating: 4.8,
      reviews: 934,
      price: 220,
      distance: "8 min to hospital",
      highlights: ["Luxury Spa", "Garden Views", "Private Balcony"],
      amenities: [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "24h Room Service" },
        { icon: Shield, label: "Private Security" },
        { icon: Car, label: "VIP Transport" }
      ]
    },
    {
      name: "Modern Care Hotel",
      image: "/img/room2.png", 
      rating: 4.7,
      reviews: 756,
      price: 150,
      distance: "3 min to hospital",
      highlights: ["Nurse Station", "Medical Equipment", "Quiet Zone"],
      amenities: [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Zap, label: "Fast Recovery" },
        { icon: Users, label: "Caregiver Support" },
        { icon: Car, label: "Emergency Transport" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Simplified Choice Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Accommodation Preference</h3>
        </div>
        
        {/* Modern Toggle Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => setIncludeAccommodation(true)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
              includeAccommodation 
                ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">🏨</div>
            <h4 className="font-bold text-gray-900 mb-2">We'll Help You</h4>
            <p className="text-sm text-gray-700">Select from our partner hotels</p>
          </button>
          
          <button
            onClick={() => setIncludeAccommodation(false)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
              !includeAccommodation 
                ? 'border-gray-500 bg-gray-50 shadow-lg transform scale-105' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">🏠</div>
            <h4 className="font-bold text-gray-900 mb-2">I'll Arrange</h4>
            <p className="text-sm text-gray-700">Handle my own accommodation</p>
          </button>
        </div>

        {/* Hotel Selection */}
        {includeAccommodation && (
          <div className="space-y-6 mt-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-4">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Partner Hotels Available
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Select Your Hotel</h4>
              <p className="text-gray-700 text-sm">Medical-friendly accommodations near healthcare facilities</p>
            </div>

            {/* Hotel Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {featuredHotels.map((hotel, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
                    selectedHotel === index ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedHotel(index)}
                >
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-bold text-sm">{hotel.rating}</span>
                          <span className="text-gray-700 text-xs ml-1">({hotel.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${hotel.price}/night
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h5 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h5>
                    <div className="flex items-center text-gray-700 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{hotel.distance}</span>
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-2 mb-4">
                      {hotel.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                          <amenity.icon className="w-3 h-3 text-blue-600 mr-2" />
                          <span className="text-xs text-gray-700">{amenity.label}</span>
                        </div>
                      ))}
                    </div>

                    {selectedHotel === index && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-800">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Selected as your preferred hotel</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Confirmation */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl text-center">
              <h4 className="text-lg font-bold mb-2">✅ Hotel Selected</h4>
              <p className="text-green-100 mb-3">
                {featuredHotels[selectedHotel].name}
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
                <div className="text-xl font-bold">${featuredHotels[selectedHotel].price}/night</div>
                <div className="text-green-100 text-xs">Pricing confirmed during consultation</div>
              </div>
            </div>
          </div>
        )}

        {/* No Accommodation Selected */}
        {!includeAccommodation && (
          <div className="text-center bg-gray-50 p-6 rounded-2xl mt-8">
            <div className="text-4xl mb-3">🏠</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Self-Arranged Accommodation</h4>
            <p className="text-gray-700 text-sm">
              We can provide hotel recommendations during your consultation if needed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSelecting;