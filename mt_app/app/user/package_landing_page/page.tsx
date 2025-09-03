"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, MapPin, Building, Users, Clock, Star, CheckCircle, Calendar, 
  Camera, User, Stethoscope, Plane, Utensils, Wifi, Car, Shield,
  Award, Globe, Phone, Mail, ArrowRight, Eye, Mountain, Waves,
  ImageIcon,
  BookCheck
} from 'lucide-react';
import Navbarpro from '@/components/user_components/Main/Navbarpro';

// Types based on your database schema
interface Package {
  package_id: string;
  package_name: string;
  hospital_id: string;
  image: string;
  detail: string;
  duration: string | null;
  expired_date: string;
  status: 'Active' | 'Inactive';
  create_at: string;
  descriptions: Description[];
  package_images: PackageImage[];
  package_doc: PackageDoc[];
  package_hotels: PackageHotel[];
  package_guides: PackageGuide[];
  hospitals: Hospital;
  routes: Route[];
}

interface Description {
  description_id: number;
  package_id: string;
  details: string;
  title: string;
}

interface PackageImage {
  image_id: string;
  package_id: string;
  image_url: string;
  image_title: string;
}

interface PackageDoc {
  doc_id: string;
  package_id: string;
  doctor_name: string;
  specialization: string;
  image_url: string;
  experience_years: number;
  qualifications: string;
}

interface PackageHotel {
  hotel_id: string;
  package_id: string;
  hotel_name: string;
  rating: number;
  image_url: string;
  amenities: string;
  price_per_night: number;
}

interface PackageGuide {
  guide_id: string;
  package_id: string;
  guide_name: string;
  languages: string;
  image_url: string;
  experience_years: number;
  specialties: string;
  price_per_day: number;
}

interface Hospital {
  hospital_id: string;
  hospital_name: string;
  location: string;
  rating: number;
}

interface Route {
  route_id: string;
  package_id: string;
  route_name: string;
  duration_days: number;
  description: string;
  highlights: string;
  price: number;
  destinations: string[];
  images: string[];
}

interface Selections {
  selectedRoute: string | null;
  selectedHotels: string[];
  selectedGuides: string[];
  includeTourism: boolean;
  includeAccommodation: boolean;
}

const PackageDetails: React.FC = () => {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selections, setSelections] = useState<Selections>({
    selectedRoute: null,
    selectedHotels: [],
    selectedGuides: [],
    includeTourism: false,
    includeAccommodation: false
  });

  // Enhanced mock data
  useEffect(() => {
    const mockPackageData: Package = {
      package_id: "pkg_001",
      package_name: "Premium Cardiac Care Package",
      hospital_id: "hosp_001",
      image: "/img/Packages/medical3.png",
      detail: "World-class cardiac treatment with comprehensive care in Thailand's leading medical facility",
      duration: "3-5 days",
      expired_date: "2025-12-31",
      status: "Active",
      create_at: "2024-01-15T00:00:00Z",
      descriptions: [
        {
          description_id: 1,
          package_id: "pkg_001",
          title: "Pre-Treatment Assessment",
          details: "Comprehensive cardiac evaluation including advanced imaging, blood work, ECG, echocardiogram, and specialist consultations to develop your personalized treatment plan."
        },
        {
          description_id: 2,
          package_id: "pkg_001",
          title: "Advanced Treatment Procedures",
          details: "State-of-the-art cardiac interventions including minimally invasive procedures, angioplasty, stent placement, or surgical options using the latest medical technology."
        },
        {
          description_id: 3,
          package_id: "pkg_001",
          title: "Recovery & Rehabilitation",
          details: "Supervised recovery program with 24/7 medical monitoring, cardiac rehabilitation, medication management, and comprehensive discharge planning."
        },
        {
          description_id: 4,
          package_id: "pkg_001",
          title: "Follow-up Care",
          details: "Post-treatment support including telemedicine consultations, medical report coordination with your home physician, and long-term care recommendations."
        }
      ],
      package_images: [
        { image_id: "img_001", package_id: "pkg_001", image_url: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg", image_title:"Hospital hallway" },
        { image_id: "img_002", package_id: "pkg_001", image_url: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg", image_title:"Hospital bed" },
        { image_id: "img_003", package_id: "pkg_001", image_url: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg", image_title:"Stethoscope" },
        { image_id: "img_005", package_id: "pkg_001", image_url: "https://images.pexels.com/photos/3845727/pexels-photo-3845727.jpeg", image_title:"Operating room" },
        { image_id: "img_006", package_id: "pkg_001", image_url: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg", image_title:"Heart monitoring" },
      ],
      package_doc: [
        {
          doc_id: "doc_001",
          package_id: "pkg_001",
          doctor_name: "Dr. Sarah Johnson",
          specialization: "Interventional Cardiology",
          image_url: "/img/DoctorList/doctor4.png",
          experience_years: 15,
          qualifications: "MD, FACC, Harvard Medical School"
        },
        {
          doc_id: "doc_002",
          package_id: "pkg_001",
          doctor_name: "Dr. Michael Chen",
          specialization: "Cardiac Surgery",
          image_url: "/img/DoctorList/doctor2.png",
          experience_years: 20,
          qualifications: "MD, PhD, Johns Hopkins University"
        }
      ],
      package_hotels: [
        {
          hotel_id: "hotel_001",
          package_id: "pkg_001",
          hotel_name: "Luxury Medical Suites",
          rating: 5,
          image_url: "/img/room1.png",
          amenities: "24/7 Medical Support, Spa & Wellness Center, Fine Dining, Concierge Service",
          price_per_night: 280
        },
        {
          hotel_id: "hotel_002",
          package_id: "pkg_001",
          hotel_name: "Comfort Medical Hotel",
          rating: 4,
          image_url: "/img/hotels/k02.png",
          amenities: "Medical Support, Fitness Center, Room Service, Airport Transfer",
          price_per_night: 180
        },
        {
          hotel_id: "hotel_003",
          package_id: "pkg_001",
          hotel_name: "Executive Medical Residences",
          rating: 5,
          image_url: "/img/hotels/k00.png",
          amenities: "Private Nursing, Kitchenette, Business Center, Physiotherapy Access",
          price_per_night: 220
        }
      ],
      package_guides: [
        {
          guide_id: "guide_001",
          package_id: "pkg_001",
          guide_name: "Anna Thompson",
          languages: "English, Thai, Mandarin",
          image_url: "/img/guide/guide1.png",
          experience_years: 8,
          specialties: "Cultural Heritage & Wellness Tourism",
          price_per_day: 120
        },
        {
          guide_id: "guide_002",
          package_id: "pkg_001",
          guide_name: "James Wilson",
          languages: "English, Thai, Japanese",
          image_url: "/img/guide/guide2.png",
          experience_years: 12,
          specialties: "Nature & Adventure Tours",
          price_per_day: 150
        }
      ],
      hospitals: {
        hospital_id: "hosp_001",
        hospital_name: "Bangkok International Medical Center",
        location: "Bangkok, Thailand",
        rating: 5
      },
      routes: [
        {
          route_id: "route_001",
          package_id: "pkg_001",
          route_name: "Cultural Heritage & Temple Discovery",
          duration_days: 3,
          description: "Immerse yourself in Thailand's rich cultural heritage while allowing time for gentle recovery",
          highlights: "Grand Palace, Wat Pho Temple, Traditional Markets, Thai Cooking Experience",
          price: 650,
          destinations: ["Grand Palace", "Wat Pho", "Chatuchak Market", "Jim Thompson House"],
          images: ["/img/Places/lalita-image-2-1.jpg", "/img/Places/The Blue Temple.jpg", "/img/Places/Wat-Huay-Pla-Kang-Chiang-Rai.jpg"]
        },
        {
          route_id: "route_002",
          package_id: "pkg_001",
          route_name: "Wellness & Nature Retreat",
          duration_days: 4,
          description: "Rejuvenate in serene natural settings perfect for post-treatment recovery",
          highlights: "Hot Springs, Organic Gardens, Meditation Centers, Scenic Mountain Views",
          price: 780,
          destinations: ["Khao Yai National Park", "Natural Hot Springs", "Organic Farm Resort", "Mountain Temple"],
          images: ["/img/Places/Wat_Rong_Khun.jpg", "/img/Places/khunkorn.png", "/img/Places/singha-park.jpg"]
        },
        {
          route_id: "route_003",
          package_id: "pkg_001",
          route_name: "Coastal Relaxation & Island Serenity",
          duration_days: 5,
          description: "Peaceful coastal recovery with gentle activities and therapeutic sea air",
          highlights: "Private Beach Access, Sunset Cruises, Seaside Spa, Fresh Seafood",
          price: 920,
          destinations: ["Hua Hin Beach", "Koh Samui", "Floating Restaurant", "Seaside Temples"],
          images: ["/img/Places/ppisland.jpg", "/img/Places/The Blue Temple.jpg", "/img/Places/chiang-rai-clock-tower-01.jpg"]
        }
      ]
    };

    setTimeout(() => {
      setPackageData(mockPackageData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRouteSelection = (routeId: string) => {
    setSelections(prev => ({
      ...prev,
      selectedRoute: prev.selectedRoute === routeId ? null : routeId,
      includeTourism: prev.selectedRoute === routeId ? false : true
    }));
  };

  const handleAccommodationToggle = () => {
    setSelections(prev => ({
      ...prev,
      includeAccommodation: !prev.includeAccommodation,
      selectedHotels: prev.includeAccommodation ? [] : prev.selectedHotels
    }));
  };

  const handleHotelToggle = (hotelId: string) => {
    setSelections(prev => ({
      ...prev,
      selectedHotels: prev.selectedHotels.includes(hotelId)
        ? prev.selectedHotels.filter(id => id !== hotelId)
        : [hotelId] // Single selection for hotels
    }));
  };

  const calculateTotalPrice = () => {
    if (!packageData) return 0;
    
    let total = 4500; // Base medical package price
    
    if (selections.selectedRoute) {
      const route = packageData.routes.find(r => r.route_id === selections.selectedRoute);
      if (route) total += route.price;
    }
    
    if (selections.selectedHotels.length > 0) {
      const hotel = packageData.package_hotels.find(h => h.hotel_id === selections.selectedHotels[0]);
      if (hotel && packageData.duration) {
        const nights = parseInt(packageData.duration.split('-')[1]) || 10;
        total += hotel.price_per_night * nights;
      }
    }
    
    return total;
  };

  const proceedToBooking = () => {
    const bookingData = {
      package_id: packageData?.package_id,
      selections,
      total_price: calculateTotalPrice()
    };
    console.log('Booking data:', bookingData);
    alert('Proceeding to booking confirmation...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading your medical package...</p>
        </div>
      </div>
    );
  }

  if (!packageData) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Package not found</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <Navbarpro />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="relative h-96 md:h-[500px]">
            <img 
              src={packageData.image} 
              alt={packageData.package_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-2xl text-white">
                  <div className="inline-flex items-center bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Shield className="w-4 h-4 mr-2" />
                    JCI Accredited Hospital
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {packageData.package_name}
                  </h1>
                  <p className="text-xl md:text-2xl mb-6 font-light leading-relaxed">
                    {packageData.detail}
                  </p>
                  <div className="flex flex-wrap gap-6 text-lg">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                      {packageData.hospitals.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-400" />
                      {packageData.duration}
                    </div>
                    <div className="flex items-center">
                      {[...Array(packageData.hospitals.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <PackageImages data={packageData} /> */}

        {/* Medical Treatment Section */}
        

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-50 text-red-700 px-6 py-3 rounded-full text-lg font-semibold mb-4">
              <Stethoscope className="w-6 h-6 mr-3" />
              Your Medical Care Plan
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comprehensive Cardiac Treatment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class medical care with internationally trained specialists using cutting-edge technology
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {packageData.descriptions.map((desc, index) => (
                <div key={desc.description_id} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{desc.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc.details}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Medical Team</h3>
              <div className="space-y-6">
                {packageData.package_doc.map((doctor) => (
                  <div key={doctor.doc_id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <img 
                        src={doctor.image_url} 
                        alt={doctor.doctor_name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{doctor.doctor_name}</h4>
                        <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-2 text-yellow-500" />
                        {doctor.experience_years} years experience
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="w-4 h-4 mr-2 text-green-500" />
                        {doctor.qualifications}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tourism Experience Section - Enhanced Attraction */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold mb-4">
                <MapPin className="w-6 h-6 mr-3" />
                Optional Tourism Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Discover Thailand While You Recover</h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                Transform your medical journey into an unforgettable experience. Explore breathtaking destinations 
                carefully selected for gentle recovery and cultural enrichment.
              </p>
            </div>

            {/* Routes List */}
            <div className="space-y-6">
              {packageData.routes.map((route) => (
                <div key={route.route_id} className="relative group">
                  {/* Main Route Card */}
                  <div
                    className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                      selections.selectedRoute === route.route_id
                        ? 'ring-2 ring-yellow-400 shadow-xl'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleRouteSelection(route.route_id)}
                  >
                    {/* Background Image with Overlay */}
                    <div className="relative h-64">
                      <img
                        src={route.images[0] || '/api/placeholder/800/300'}
                        alt={`Route ${route.route_name}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-2xl font-bold mb-2">{route.route_name}</h4>
                            <p className="text-white/90 text-lg mb-4">{route.description}</p>
                            <div className="flex space-x-4 text-sm">
                              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                                {route.duration_days} Days
                              </span>
                              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                                {route.destinations.length} destinations
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold">${route.price}</div>
                            <div className="text-white/80">total</div>
                          </div>
                        </div>

                        {/* Quick Preview Icons */}
                        <div className="flex space-x-2">
                          {route.images.slice(0, 4).map((image, index) => (
                            <div key={index} className="w-12 h-8 rounded overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                              <img 
                                src={image} 
                                alt={`Destination ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ))}
                          {route.destinations.length > 4 && (
                            <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center text-xs backdrop-blur">
                              +{route.destinations.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selections.selectedRoute === route.route_id && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details for Selected Route */}
                  {selections.selectedRoute === route.route_id && (
                    <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-900">Your Complete Journey</h5>
                        <div className="text-yellow-600 font-medium text-sm flex items-center space-x-1">
                          <span>Full itinerary details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Timeline Preview */}
                      <div className="space-y-3">
                        {route.destinations.slice(0, 3).map((destination, index) => (
                          <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-sm">
                            <img
                              src={route.images[index] || '/api/placeholder/100/80'}
                              alt={destination}
                              className="w-16 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{destination}</h6>
                              <p className="text-sm text-gray-600">
                                {index === 0 && "Historic temples and cultural landmarks"}
                                {index === 1 && "Traditional markets and local experiences"}
                                {index === 2 && "Scenic viewpoints and relaxation spots"}
                              </p>
                            </div>
                          </div>
                        ))}
                        {route.destinations.length > 3 && (
                          <div className="text-center py-2">
                            <span className="text-sm text-yellow-700 font-medium cursor-pointer hover:text-yellow-800">
                              + {route.destinations.length - 3} more amazing places to explore
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Guide Selection for Selected Route */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h6 className="font-semibold text-gray-900 mb-4">Choose Your Expert Guide (Optional)</h6>
                        <div className="grid md:grid-cols-2 gap-4">
                          {packageData.package_guides.map((guide) => (
                            <div
                              key={guide.guide_id}
                              onClick={() => setSelections(prev => ({
                                ...prev,
                                selectedGuides: prev.selectedGuides.includes(guide.guide_id)
                                  ? prev.selectedGuides.filter(id => id !== guide.guide_id)
                                  : [...prev.selectedGuides, guide.guide_id]
                              }))}
                              className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 ${
                                selections.selectedGuides.includes(guide.guide_id) 
                                  ? 'border-yellow-400 shadow-md' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center mb-3">
                                <img 
                                  src={guide.image_url} 
                                  alt={guide.guide_name}
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-800 text-sm">{guide.guide_name}</h4>
                                  <p className="text-xs text-gray-600">{guide.specialties}</p>
                                </div>
                                {selections.selectedGuides.includes(guide.guide_id) && (
                                  <CheckCircle className="text-yellow-500 w-5 h-5" />
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                                <div>Languages: {guide.languages.split(', ').slice(0, 2).join(', ')}</div>
                                <div>{guide.experience_years} years exp.</div>
                              </div>
                              <div className="text-sm font-bold text-green-600">${guide.price_per_day}/day</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accommodation Section - Professional & Appealing */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-orange-50 text-orange-700 px-6 py-3 rounded-full text-lg font-semibold mb-4">
              <Building className="w-6 h-6 mr-3" />
              Premium Accommodation Options
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comfort & Care During Recovery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay in medically-supervised accommodations designed for patient comfort and quick access to healthcare
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={handleAccommodationToggle}
                className={`flex items-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  selections.includeAccommodation 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Building className="w-6 h-6 mr-3" />
                {selections.includeAccommodation ? 'Accommodation Added' : 'Add Accommodation Package'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {selections.includeAccommodation && (
            <div className="grid lg:grid-cols-3 gap-8">
              {packageData.package_hotels.map((hotel) => (
                <div
                  key={hotel.hotel_id}
                  onClick={() => handleHotelToggle(hotel.hotel_id)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
                    selections.selectedHotels.includes(hotel.hotel_id)
                      ? 'ring-4 ring-orange-400 shadow-2xl scale-105'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="relative h-48">
                    <img 
                      src={hotel.image_url} 
                      alt={hotel.hotel_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    {selections.selectedHotels.includes(hotel.hotel_id) && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                      {hotel.hotel_name}
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.split(', ').slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Wifi className="w-4 h-4 mr-2 text-blue-500" />
                          Free WiFi
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-2 text-green-500" />
                          Airport Transfer
                        </div>
                        <div className="flex items-center">
                          <Utensils className="w-4 h-4 mr-2 text-purple-500" />
                          Room Service
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-red-500" />
                          24/7 Support
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-2xl font-bold text-green-600">${hotel.price_per_night}</div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        selections.selectedHotels.includes(hotel.hotel_id)
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-600 text-white hover:bg-orange-700'
                      }`}>
                        {selections.selectedHotels.includes(hotel.hotel_id) ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Summary & CTA */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Package Summary</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Selected Services */}
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-6">Selected Services</h3>
              <div className="space-y-4">
                {/* Medical Treatment - Always Included */}
                <div className="flex items-center p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <Heart className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">Medical Treatment Package</div>
                    <div className="text-sm text-gray-600">{packageData.package_name}</div>
                    <div className="text-sm text-gray-500">Duration: {packageData.duration}</div>
                  </div>
                  <div className="text-green-600 font-bold">Included</div>
                </div>
                
                {/* Tourism Package */}
                {selections.selectedRoute ? (
                  <div className="flex items-center p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-500">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">Tourism Experience</div>
                      <div className="text-sm text-gray-600">
                        {packageData.routes.find(r => r.route_id === selections.selectedRoute)?.route_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {packageData.routes.find(r => r.route_id === selections.selectedRoute)?.duration_days} days
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">
                      +${packageData.routes.find(r => r.route_id === selections.selectedRoute)?.price}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-gray-300 opacity-60">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-600">Tourism Experience</div>
                      <div className="text-sm text-gray-500">Not selected</div>
                    </div>
                    <div className="text-gray-500">Optional</div>
                  </div>
                )}
                
                {/* Accommodation */}
                {selections.selectedHotels.length > 0 ? (
                  <div className="flex items-center p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                      <Building className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">Premium Accommodation</div>
                      <div className="text-sm text-gray-600">
                        {packageData.package_hotels.find(h => h.hotel_id === selections.selectedHotels[0])?.hotel_name}
                      </div>
                      <div className="text-sm text-gray-500">Medical support included</div>
                    </div>
                    <div className="text-green-600 font-bold">
                      +${packageData.package_hotels.find(h => h.hotel_id === selections.selectedHotels[0])?.price_per_night}/night
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-gray-300 opacity-60">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mr-4">
                      <Building className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-600">Premium Accommodation</div>
                      <div className="text-sm text-gray-500">Not selected</div>
                    </div>
                    <div className="text-gray-500">Optional</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Pricing */}
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-6">Package Pricing</h3>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Base Medical Package</span>
                    <span className="font-semibold text-gray-800">$4,500</span>
                  </div>
                  
                  {selections.selectedRoute && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Tourism Experience</span>
                      <span className="font-semibold text-gray-800">
                        +${packageData.routes.find(r => r.route_id === selections.selectedRoute)?.price}
                      </span>
                    </div>
                  )}
                  
                  {selections.selectedHotels.length > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Accommodation (est. 10 nights)</span>
                      <span className="font-semibold text-gray-800">
                        +${(packageData.package_hotels.find(h => h.hotel_id === selections.selectedHotels[0])?.price_per_night || 0) * 10}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                  <span className="text-2xl font-bold text-gray-800">Total Package Price</span>
                  <span className="text-3xl font-bold text-green-600">${calculateTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center text-blue-700 mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Package Validity</span>
                  </div>
                  <div className="text-sm text-blue-600">
                    Valid until: {new Date(packageData.expired_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <button
              onClick={proceedToBooking}
              className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[300px]"
            >
              <div className="flex items-center justify-center">
                <Heart className="w-6 h-6 mr-3" />
                Book Your Treatment
                <ArrowRight className="w-6 h-6 ml-3" />
              </div>
            </button>
          
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <Car className="w-8 h-8 text-green-500 mb-2" />
                <span className="font-semibold">Hospital Transfers</span>
              </div>
              <div className="flex flex-col items-center">
                <BookCheck className="w-8 h-8 text-yellow-500 mb-2" />
                <span className="font-semibold">Flexible Booking</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 text-blue-500 mb-2" />
                <span className="font-semibold">International Standards</span>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-purple-500 mb-2" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;