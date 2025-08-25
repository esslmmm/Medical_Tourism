"use client"
import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Users, Star, Wifi, Car, Utensils, Camera, Phone, Mail, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MedicalTourismPackage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [wantsTourism, setWantsTourism] = useState(null);
  const [selectedTourismRoute, setSelectedTourismRoute] = useState(null);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(null);

  const packageData = {
    name: "Complete Dental Care & Thailand Discovery Package",
    category: "Dental Tourism",
    duration: "7 Days",
    location: "Bangkok, Thailand",
    rating: 4.9,
    reviews: 127,
    basePrice: 2450,
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"
    ],
    medicalServices: [
      "Comprehensive dental examination",
      "Professional teeth cleaning",
      "Dental implants (if required)",
      "Cosmetic dental procedures",
      "Follow-up consultations"
    ],
    travelPlan: [
      {
        day: 1,
        title: "Arrival & Initial Consultation",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Initial dental consultation"]
      },
      {
        day: 2,
        title: "Medical Procedures",
        activities: ["Dental treatments", "Recovery time", "City orientation tour"]
      },
      {
        day: 3,
        title: "Recovery & Sightseeing",
        activities: ["Follow-up appointment", "Grand Palace visit", "Wat Pho Temple", "Thai massage"]
      }
    ]
  };

  const accommodationOptions = [
    {
      id: 1,
      name: "Luxury Medical Hotel",
      type: "5-Star Medical Facility",
      price: 150,
      features: ["24/7 Medical Support", "Luxury Amenities", "Recovery Suites", "Spa Services"],
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Boutique Wellness Resort",
      type: "4-Star Wellness Resort",
      price: 120,
      features: ["Wellness Programs", "Pool & Gym", "Healthy Cuisine", "Meditation Classes"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Modern Business Hotel",
      type: "4-Star Business Hotel",
      price: 80,
      features: ["City Center Location", "Business Center", "Fitness Center", "Restaurant"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"
    }
  ];

  const tourismRoutes = [
    {
      id: 1,
      name: "Cultural Heritage Explorer",
      duration: "3 Days",
      price: 450,
      description: "Immerse yourself in Thailand's rich cultural heritage",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      places: [
        {
          name: "Grand Palace",
          description: "Former royal residence with stunning architecture",
          duration: "2 hours",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          highlights: ["Royal Throne Hall", "Emerald Buddha", "Temple Complex"]
        },
        {
          name: "Wat Pho Temple",
          description: "Home to the famous Reclining Buddha statue",
          duration: "1.5 hours",
          image: "https://images.unsplash.com/photo-1563492065-4333fc26f2a8?w=300&h=200&fit=crop",
          highlights: ["Reclining Buddha", "Traditional Massage School", "Chedis"]
        },
        {
          name: "Wat Arun",
          description: "Temple of Dawn with panoramic city views",
          duration: "1 hour",
          image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
          highlights: ["Dawn Views", "Khmer-style Tower", "Chao Phraya River"]
        },
        {
          name: "Chatuchak Weekend Market",
          description: "One of the world's largest weekend markets",
          duration: "2 hours",
          image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=300&h=200&fit=crop",
          highlights: ["Local Crafts", "Street Food", "Vintage Finds"]
        },
        {
          name: "Jim Thompson House",
          description: "Traditional Thai house museum",
          duration: "1 hour",
          image: "https://images.unsplash.com/photo-1544161513-0179dc49f8ea?w=300&h=200&fit=crop",
          highlights: ["Silk Museum", "Traditional Architecture", "Art Collection"]
        },
        {
          name: "Khao San Road",
          description: "Famous backpacker street with vibrant nightlife",
          duration: "Evening",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
          highlights: ["Street Food", "Night Markets", "Local Bars"]
        }
      ]
    },
    {
      id: 2,
      name: "Nature & Wellness Retreat",
      duration: "3 Days",
      price: 520,
      description: "Rejuvenate with nature and traditional wellness practices",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=250&fit=crop",
      places: [
        {
          name: "Erawan National Park",
          description: "Seven-tiered waterfall in pristine forest",
          duration: "Full Day",
          image: "https://images.unsplash.com/photo-1544161513-0179dc49f8ea?w=300&h=200&fit=crop",
          highlights: ["Erawan Falls", "Natural Pools", "Hiking Trails"]
        },
        {
          name: "Floating Markets",
          description: "Traditional floating market experience",
          duration: "4 hours",
          image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
          highlights: ["Long-tail Boats", "Fresh Produce", "Local Vendors"]
        },
        {
          name: "Traditional Thai Spa",
          description: "Authentic Thai massage and treatments",
          duration: "3 hours",
          image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
          highlights: ["Thai Massage", "Herbal Steam", "Aromatherapy"]
        },
        {
          name: "Cooking Class Experience",
          description: "Learn authentic Thai cuisine",
          duration: "4 hours",
          image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop",
          highlights: ["Market Tour", "Hands-on Cooking", "Recipe Book"]
        },
        {
          name: "Meditation Temple",
          description: "Peaceful meditation and mindfulness session",
          duration: "2 hours",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          highlights: ["Guided Meditation", "Buddhist Teaching", "Temple Grounds"]
        },
        {
          name: "River Cruise Dinner",
          description: "Scenic dinner cruise along Chao Phraya River",
          duration: "3 hours",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
          highlights: ["City Views", "Traditional Dance", "Thai Cuisine"]
        }
      ]
    }
  ];

  const toggleTourismOption = (wants) => {
    setWantsTourism(wants);
    if (!wants) {
      setSelectedTourismRoute(null);
    }
  };

  const selectTourismRoute = (route) => {
    setSelectedTourismRoute(route);
  };

  const calculateTotalPrice = () => {
    let total = packageData.basePrice;
    if (selectedAccommodation) {
      total += selectedAccommodation.price * 7;
    }
    if (selectedTourismRoute) {
      total += selectedTourismRoute.price;
    }
    return total;
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % packageData.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + packageData.images.length) % packageData.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">MediTravel</span>
            </div>
            <div className="flex items-center space-x-6">
              <Phone className="w-5 h-5 text-gray-600" />
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Package Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <span>{packageData.category}</span>
            <span>•</span>
            <MapPin className="w-4 h-4" />
            <span>{packageData.location}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{packageData.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{packageData.rating}</span>
              <span className="text-gray-600">({packageData.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{packageData.duration}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden relative">
                <img
                  src={packageData.images[selectedImageIndex]}
                  alt={`Package image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
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
              </div>
              <div className="flex space-x-2 mt-4">
                {packageData.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-teal-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Medical Services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Services Included</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {packageData.medicalServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

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
                {(showFullItinerary ? packageData.travelPlan : packageData.travelPlan.slice(0, 2)).map((day) => (
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
                    {day.day !== packageData.travelPlan[packageData.travelPlan.length - 1].day && (
                      <div className="absolute left-6 top-12 w-0.5 h-6 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Options */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Accommodation</h2>
              <div className="grid gap-4">
                {accommodationOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedAccommodation?.id === option.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAccommodation(option)}
                  >
                    <div className="flex space-x-4">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-24 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{option.name}</h3>
                          <span className="text-xl font-bold text-teal-600">${option.price}/night</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{option.type}</p>
                        <div className="flex flex-wrap gap-2">
                          {option.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tourism Options */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tourism Experience</h2>
              
              {/* Step 1: Tourism Interest */}
              <div className="mb-8">
                <p className="text-gray-600 mb-4">Would you like to add a tourism experience to your medical journey?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleTourismOption(true)}
                    className={`flex-1 py-3 px-6 rounded-xl border-2 transition-all font-medium ${
                      wantsTourism === true
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    Yes, I'm interested!
                  </button>
                  <button
                    onClick={() => toggleTourismOption(false)}
                    className={`flex-1 py-3 px-6 rounded-xl border-2 transition-all font-medium ${
                      wantsTourism === false
                        ? 'border-gray-400 bg-gray-50 text-gray-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    Medical only, thanks
                  </button>
                </div>
              </div>

              {/* Step 2: Route Selection */}
              {wantsTourism === true && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Adventure</h3>
                    <p className="text-gray-600 mb-6">Select a carefully curated route that matches your interests</p>
                  </div>

                  <div className="grid gap-6">
                    {tourismRoutes.map((route) => (
                      <div key={route.id} className="relative">
                        <div
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                            selectedTourismRoute?.id === route.id
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => selectTourismRoute(route)}
                        >
                          <div className="flex space-x-6">
                            <img
                              src={route.image}
                              alt={route.name}
                              className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{route.name}</h4>
                                  <p className="text-gray-600 mb-3">{route.description}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-2xl font-bold text-teal-600">${route.price}</span>
                                  <p className="text-sm text-gray-600">{route.duration}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-4 text-sm text-gray-600">
                                  <span>{route.places.length} destinations</span>
                                  <span>•</span>
                                  <span>{route.duration}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowRouteModal(route);
                                    }}
                                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                                  >
                                    View Details
                                  </button>
                                  {selectedTourismRoute?.id === route.id && (
                                    <Check className="w-5 h-5 text-teal-600" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Preview of Places */}
                        {selectedTourismRoute?.id === route.id && (
                          <div className="mt-4 bg-teal-50 rounded-xl p-4 border border-teal-200">
                            <h5 className="font-semibold text-teal-900 mb-3">Places you'll visit:</h5>
                            <div className="grid md:grid-cols-2 gap-3">
                              {route.places.slice(0, 4).map((place, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <img
                                    src={place.image}
                                    alt={place.name}
                                    className="w-12 h-8 rounded object-cover"
                                  />
                                  <div>
                                    <p className="font-medium text-teal-900 text-sm">{place.name}</p>
                                    <p className="text-xs text-teal-700">{place.duration}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {route.places.length > 4 && (
                              <button
                                onClick={() => setShowRouteModal(route)}
                                className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
                              >
                                + {route.places.length - 4} more places
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {wantsTourism === false && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Focus on your medical care - we've got you covered!</p>
                </div>
              )}
            </div>

            {/* Route Details Modal */}
            {showRouteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{showRouteModal.name}</h2>
                        <p className="text-gray-600">{showRouteModal.description}</p>
                      </div>
                      <button
                        onClick={() => setShowRouteModal(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span>{showRouteModal.places.length} destinations</span>
                        <span>•</span>
                        <span>{showRouteModal.duration}</span>
                        <span>•</span>
                        <span className="text-2xl font-bold text-teal-600">${showRouteModal.price}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Itinerary</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {showRouteModal.places.map((place, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-32 rounded-lg object-cover mb-3"
                          />
                          <h4 className="font-semibold text-gray-900 mb-1">{place.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                              {place.duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {place.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full border"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                      <button
                        onClick={() => setShowRouteModal(null)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          selectTourismRoute(showRouteModal);
                          setShowRouteModal(null);
                        }}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                      >
                        Select This Route
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">${calculateTotalPrice().toLocaleString()}</span>
                  <span className="text-gray-600">total</span>
                </div>
                <p className="text-sm text-gray-600">Medical package: ${packageData.basePrice}</p>
                {selectedAccommodation && (
                  <p className="text-sm text-gray-600">
                    Accommodation: ${selectedAccommodation.price} × 7 nights
                  </p>
                )}
                {selectedTourismRoute && (
                  <p className="text-sm text-gray-600">
                    Tourism route: ${selectedTourismRoute.price}
                  </p>
                )}
              </div>

              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-4">
                Book Now
              </button>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Free cancellation up to 48 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>24/7 medical support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Airport transfers included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>English-speaking coordinator</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                <h4 className="font-semibold text-teal-900 mb-2">Need Help?</h4>
                <p className="text-sm text-teal-700 mb-3">Our medical tourism specialists are here to assist you.</p>
                <button className="text-sm text-teal-600 font-medium hover:text-teal-700">
                  Contact a Specialist →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}