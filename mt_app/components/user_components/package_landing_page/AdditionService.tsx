"use client";
import React, { useState } from 'react';
import { MapPin, Users, Star, Heart, CheckCircle2, User, Languages, Car, Utensils, Wifi, Camera, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

type ServiceType = "accommodation_booking" | "Guide";

interface ServicesProps {
  selectedServices: Record<ServiceType, boolean>;
  setSelectedServices: React.Dispatch<React.SetStateAction<Record<ServiceType, boolean>>>;
}

const AdditionService: React.FC<ServicesProps> = ({selectedServices, setSelectedServices}) => {
  const [showDetails, setShowDetails] = useState<ServiceType | null>(null);

  const toggleSelection = (service: ServiceType) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const serviceDetails = {
    accommodation_booking: {
      name: "Premium Accommodation",
      subtitle: "5-Star Hotels & Recovery Centers",
      description: "Stay in comfort during your recovery with our carefully selected partner accommodations",
      image: "/img/room1.png",
      price: "$180-320",
      period: "per night",
      benefits: [
        "Medical-grade cleanliness standards",
        "24/7 concierge & medical support",
        "Recovery-friendly room amenities",
        "Healthy dining options",
        "Transportation to hospital included"
      ],
      options: [
        {
          name: "Grand Medical Plaza Bangkok",
          features: ["Recovery Suites", "Medical Wing", "Thai Spa"],
          rating: 4.9,
          price: "$220"
        },
        {
          name: "Wellness Resort & Recovery Center",
          features: ["Garden Views", "Private Balcony", "Nurse Station"],
          rating: 4.8,
          price: "$180"
        },
        {
          name: "Luxury Medical Hotel Bangkok",
          features: ["Executive Rooms", "Private Pool", "Fine Dining"],
          rating: 4.9,
          price: "$320"
        }
      ],
      amenities: [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Car, label: "Hospital Transfer" },
        { icon: Utensils, label: "Healthy Dining" },
        { icon: Shield, label: "24/7 Medical Support" }
      ]
    },
    Guide: {
      name: "Professional Tour Guide",
      subtitle: "Expert Local Guides & Interpreters",
      description: "Navigate Thailand with confidence with our medical tourism specialists",
      image: "/img/doctor.png",
      price: "$120-200",
      period: "per day",
      benefits: [
        "Medical tourism expertise",
        "Multi-language interpretation",
        "Cultural insights & local knowledge",
        "Recovery-friendly tour pacing",
        "Emergency medical assistance"
      ],
      options: [
        {
          name: "Dr. Sarah Johnson - Medical Tourism Specialist",
          features: ["10+ years experience", "Medical background", "English/Thai fluent"],
          rating: 5.0,
          price: "$200"
        },
        {
          name: "Mark Thompson - Cultural Expert",
          features: ["Cultural specialist", "Photography skills", "Patient companion experience"],
          rating: 4.9,
          price: "$150"
        },
        {
          name: "Lisa Chen - Wellness Guide",
          features: ["Wellness focus", "Meditation instructor", "Nutritional guidance"],
          rating: 4.8,
          price: "$120"
        }
      ],
      amenities: [
        { icon: Languages, label: "Multi-Language" },
        { icon: User, label: "Personal Assistant" },
        { icon: Camera, label: "Photography Service" },
        { icon: Heart, label: "Medical Support" }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">
          <Heart className="w-5 h-5 mr-2" />
          Additional Services
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Enhance Your Experience</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Optional premium services to make your medical tourism journey even more comfortable and memorable.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {(Object.keys(serviceDetails) as ServiceType[]).map((serviceKey) => {
          const service = serviceDetails[serviceKey];
          const isSelected = selectedServices[serviceKey];
          
          return (
            <div 
              key={serviceKey}
              className={`relative bg-white rounded-3xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? 'border-green-500 ring-4 ring-green-500/20 transform scale-[1.02]' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              {/* Header Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Selection Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-green-500 p-3 rounded-full shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="text-xl font-bold text-gray-900">{service.price}</div>
                    <div className="text-sm text-gray-600">{service.period}</div>
                  </div>
                </div>

                {/* Service Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-white/90 text-sm">{service.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">What's Included:</h4>
                  <div className="space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                    {service.benefits.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{service.benefits.length - 3} more benefits
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <amenity.icon className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => toggleSelection(serviceKey)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                      isSelected
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isSelected ? '✓ Added to Package' : 'Add to Package'}
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(serviceKey)}
                    className="w-full py-2 px-6 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    View Options & Details
                  </button>
                </div>

                {/* Selection Confirmation */}
                {isSelected && (
                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center text-green-800">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span className="font-medium">Added to your package!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      You'll be able to customize details during booking
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowDetails(null)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const service = serviceDetails[showDetails];
              return (
                <>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 p-8 flex items-end">
                      <div className="w-full">
                        <h2 className="text-4xl font-bold text-white mb-3">{service.name}</h2>
                        <p className="text-white/90 text-lg">{service.subtitle}</p>
                      </div>
                      <button 
                        onClick={() => setShowDetails(null)}
                        className="absolute top-8 right-8 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                      >
                        <span className="text-white text-xl">×</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Options</h3>
                      <p className="text-gray-600">Choose the option that best fits your needs and preferences</p>
                    </div>
                    
                    <div className="space-y-6">
                      {service.options.map((option, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h4>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {option.features.map((feature, featureIdx) => (
                                  <span key={featureIdx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="font-bold text-sm">{option.rating}</span>
                                <span className="text-gray-600 text-xs ml-1">(Verified Reviews)</span>
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <div className="text-2xl font-bold text-green-600">{option.price}</div>
                              <div className="text-sm text-gray-500">{service.period}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <button
                        onClick={() => {
                          toggleSelection(showDetails);
                          setShowDetails(null);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        {selectedServices[showDetails] ? 'Update Selection' : 'Add This Service'}
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Summary Section */}
      {(selectedServices.accommodation_booking || selectedServices.Guide) && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">🎉 Additional Services Selected</h3>
            <p className="text-gray-600 mb-4">These premium services have been added to enhance your experience</p>
            <div className="flex justify-center gap-4">
              {selectedServices.accommodation_booking && (
                <div className="bg-white px-4 py-2 rounded-full shadow">
                  <span className="font-semibold">🏨 Premium Accommodation</span>
                </div>
              )}
              {selectedServices.Guide && (
                <div className="bg-white px-4 py-2 rounded-full shadow">
                  <span className="font-semibold">👨‍🎓 Professional Guide</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionService;
