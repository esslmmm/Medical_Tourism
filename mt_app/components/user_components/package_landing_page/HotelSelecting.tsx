import React, { useState } from 'react';
import { Hotel, MapPin, Users, Calendar, CheckCircle2, Info, Star, Wifi, Car, Utensils } from 'lucide-react';


interface PackageDetailProps {
    includeAccommodation: boolean;
    setIncludeAccommodation: React.Dispatch<React.SetStateAction<boolean>>;
  }

const HotelSelecting: React.FC<PackageDetailProps> = ({ includeAccommodation, setIncludeAccommodation }) => {
  const [showDetails, setShowDetails] = useState(false);

  const benefits = [
    "Convenient location near medical facilities",
    "Comfortable recovery environment",
    "24/7 concierge assistance",
    "Transportation coordination",
  ];

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Car, label: "Hospital Transfer" },
    { icon: Utensils, label: "Dining Options" },
    { icon: Users, label: "Guest Services" }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Hotel className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Accommodation Services</h3>
              <p className="text-gray-600 mt-1">Comfortable stay during your medical treatment in Thailand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Service Toggle */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="accommodation-toggle"
                checked={includeAccommodation}
                onChange={(e) => setIncludeAccommodation(e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="accommodation-toggle" className="text-lg font-medium text-gray-900 cursor-pointer">
                Include accommodation in my medical package
              </label>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium">Details</span>
            </button>
          </div>

          {includeAccommodation && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Accommodation added to your package</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                You'll be able to select your preferred hotel and room details on the next page.
              </p>
            </div>
          )}
        </div>

        {/* Details Section */}
        {showDetails && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Benefits */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Why Choose Our Accommodation?</span>
              </h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Included Amenities</h4>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
                    <amenity.icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Flexible Booking</h5>
            <p className="text-sm text-gray-600">Choose your stay duration based on treatment schedule</p>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <MapPin className="h-6 w-6 text-teal-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Prime Locations</h5>
            <p className="text-sm text-gray-600">Hotels within 20 minutes of medical facilities</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Companion Friendly</h5>
            <p className="text-sm text-gray-600">Accommodations for patients and companions</p>
          </div>
        </div>

        {/* Call to Action */}
        {includeAccommodation && (
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Ready to select your accommodation?</h4>
                <p className="text-sm text-blue-100 mt-1">Browse our partner hotels and room options</p>
              </div>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-amber-800 mb-1">Important Information</h5>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Accommodation can be modified up to 48 hours afetr reservation</li>
                <li>• Prices vary by hotel</li>
                <li>• Facilities vary from hotel to hotel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSelecting;