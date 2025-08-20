"use client"
import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Users, Star, Wifi, Car, Utensils, Camera, Phone, Mail, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MedicalTourismPackage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedTourismOptions, setSelectedTourismOptions] = useState([]);
  const [showFullItinerary, setShowFullItinerary] = useState(false);

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

  const tourismOptions = [
    {
      id: 1,
      name: "Cultural Heritage Tour",
      price: 180,
      duration: "Full Day",
      highlights: ["Grand Palace", "Wat Pho Temple", "Wat Arun", "Local Markets"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Floating Markets Experience",
      price: 120,
      duration: "Half Day",
      highlights: ["Damnoen Saduak", "Long-tail boat ride", "Local vendors", "Traditional food"],
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Thai Cooking Class",
      price: 85,
      duration: "3 Hours",
      highlights: ["Market tour", "Hands-on cooking", "Recipe book", "Certificate"],
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Spa & Wellness Day",
      price: 200,
      duration: "Full Day",
      highlights: ["Traditional Thai massage", "Herbal treatments", "Meditation session", "Healthy lunch"],
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop"
    }
  ];

  const toggleTourismOption = (optionId: any) => {
    setSelectedTourismOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateTotalPrice = () => {
    let total = packageData.basePrice;
    if (selectedAccommodation) {
      total += selectedAccommodation.price * 7;
    }
    selectedTourismOptions.forEach(optionId => {
      const option = tourismOptions.find(opt => opt.id === optionId);
      if (option) total += option.price;
    });
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enhance Your Experience</h2>
              <p className="text-gray-600 mb-6">Select optional tourism activities to make your medical journey memorable</p>
              <div className="grid md:grid-cols-2 gap-4">
                {tourismOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedTourismOptions.includes(option.id)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleTourismOption(option.id)}
                  >
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-32 rounded-lg object-cover mb-3"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{option.name}</h3>
                      {selectedTourismOptions.includes(option.id) && (
                        <Check className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">{option.duration}</span>
                      <span className="text-lg font-bold text-teal-600">${option.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {option.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                {selectedTourismOptions.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Tourism activities: ${selectedTourismOptions.reduce((total, optionId) => {
                      const option = tourismOptions.find(opt => opt.id === optionId);
                      return total + (option ? option.price : 0);
                    }, 0)}
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