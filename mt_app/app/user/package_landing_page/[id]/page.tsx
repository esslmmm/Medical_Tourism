"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Heart, Compass, MapPin, Clock, Shield, Users, ChevronRight, Check, Star, Plane, Hotel, UserCheck } from "lucide-react";
import AdditionService from "@/components/user_components/package_landing_page/AdditionService";
import Navbarpro from "@/components/user_components/Main/Navbarpro";
import PackageLandingSkeleton from "@/components/user_components/skeleton-screen/package_landing_page/PackageLandingSkeleton";
import PackageImages from "@/components/user_components/package_landing_page/PackageImages";
import HeaderPackage from "@/components/user_components/package_landing_page/HeaderPackage";
import BookingCard from "@/components/user_components/package_landing_page/BookingCard";
import RouteSelecting from "@/components/user_components/package_landing_page/RouteSelecting";
import HotelSelecting from "@/components/user_components/package_landing_page/HotelSelecting";
import './animations.css';

interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  duration: number;
  routes: routes[];
  description: description[];
  package_image: package_image[];
}

interface routes {
  route_id: number;
  tour_id: number;
  trips: trips;
}

interface trips {
  tour_id: number;
  package_id: number;
  total_price: number;
  package_places: package_places[];
}

interface package_places {
  packplace_id: number;
  tour_id: number;
  place_id: number;
  places: places;
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
  detail: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  city: string;
  reviews: number;
  image: string;
  description: string;
}

type ServiceType = "accommodation_booking" | "Guide";

const PackageLandingPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<Packages | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [includeAccommodation, setIncludeAccommodation] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Record<ServiceType, boolean>>({
    accommodation_booking: false,
    Guide: false,
  });
  const [selectedTourismRoute, setSelectedTourismRoute] = useState<routes | null>(null);
  
  // Simplified realistic flow
  const [currentView, setCurrentView] = useState<'overview' | 'customize' | 'book'>('overview');
  const [selectedOptions, setSelectedOptions] = useState({
    includeActivities: false,
    includeAccommodation: false,
    includeGuide: false,
    tourismRoute: null as routes | null
  });

  // Fetch Package and then Hospital
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch package
        const packageRes = await fetch(`/api/services/packages/${id}`);
        if (!packageRes.ok) {
          const errorData = await packageRes.json();
          throw new Error(errorData.error || "Failed to fetch package data");
        }
        const packageData = await packageRes.json();
        setData(packageData);

        // Fetch hospital using hospital_id from package
        const hospitalRes = await fetch(`/api/services/hospitals/${packageData.hospital_id}`);
        if (!hospitalRes.ok) throw new Error("Failed to fetch hospital details");

        const hospitalData = await hospitalRes.json();
        setHospital(hospitalData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div>
        <Navbarpro />
        <PackageLandingSkeleton />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <Navbarpro />
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    let total = 3200; // Base medical package
    if (selectedOptions.includeActivities && selectedOptions.tourismRoute) {
      total += selectedOptions.tourismRoute.trips.total_price;
    }
    if (selectedOptions.includeAccommodation) {
      total += 200 * (data?.duration || 7); // $200/night
    }
    if (selectedOptions.includeGuide) {
      total += 150 * (data?.duration || 7); // $150/day
    }
    return total;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarpro />
      
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{data?.package_name || "Medical Package"}</h1>
                <p className="text-sm text-gray-600">{hospital?.name || "Premium Hospital"} • {hospital?.city || "Bangkok"}</p>
              </div>
            </div>
            
            {/* View Navigation */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  currentView === 'overview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentView('customize')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  currentView === 'customize'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customize
              </button>
              <button
                onClick={() => setCurrentView('book')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  currentView === 'book'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Book Now
              </button>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${calculateTotal().toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Estimate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Overview Section */}
        {currentView === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Package Image */}
                <div className="lg:col-span-1 relative h-80 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                  <img 
                    src="/img/bangkok_logo.png" 
                    alt="Bangkok Medical Tourism"
                    className="absolute inset-0 w-full h-full object-contain p-8 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/90 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-900">Starting ${data?.duration || 7} days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Package Info */}
                <div className="lg:col-span-2 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{data?.package_name || "General Health Checkup"}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{hospital?.city || "Bangkok, Thailand"}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{data?.duration || 7} days</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                          <span>4.8 (2,847 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">$3,200</div>
                      <div className="text-sm text-gray-600">Base package</div>
                    </div>
                  </div>
                  
                  {/* What's Included */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Medical Services Included:</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>Comprehensive health screening</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>Specialist consultations</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>All diagnostic tests</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>Medical reports & records</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>Airport transfers</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Hospital Credentials:</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Shield className="w-4 h-4 text-blue-600 mr-2" />
                          <span>JCI Accredited Hospital</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <UserCheck className="w-4 h-4 text-blue-600 mr-2" />
                          <span>Board-certified specialists</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 text-blue-600 mr-2" />
                          <span>English-speaking staff</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Heart className="w-4 h-4 text-blue-600 mr-2" />
                          <span>15+ years medical tourism</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <button
                      onClick={() => setCurrentView('customize')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                    >
                      <span>Customize Package</span>
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                    <button
                      onClick={() => setCurrentView('book')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Book Now - $3,200
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Package Gallery */}
            <PackageImages data={data} />
          </div>
        )}
        
        {/* Customize Section */}
        {currentView === 'customize' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Customize Your Experience</h2>
              <p className="text-gray-600">Add optional services to enhance your medical tourism experience</p>
            </div>
            
            <div className="grid gap-6">
              {/* Tourism Activities */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Plane className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Wellness Tourism Activities</h3>
                      <p className="text-gray-600">Recovery-friendly cultural experiences and wellness activities</p>
                      <div className="mt-2 text-sm text-gray-500">Duration: 3-4 days • Recovery-focused activities</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">+$1,850</div>
                    <div className="text-sm text-gray-600">Per person</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      Includes: Temple visits, Thai massage, cultural workshops, local guide
                    </div>
                  </div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includeActivities}
                      onChange={(e) => setSelectedOptions(prev => ({ 
                        ...prev, 
                        includeActivities: e.target.checked 
                      }))}
                      className="w-5 h-5 text-orange-600 rounded"
                    />
                    <span className="font-medium text-gray-900">Add to package</span>
                  </label>
                </div>
                
                {/* Route Selection */}
                {selectedOptions.includeActivities && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <RouteSelecting 
                      data={data}
                      selectedTourismRoute={selectedOptions.tourismRoute}
                      setSelectedTourismRoute={(route) => setSelectedOptions(prev => ({ 
                        ...prev, 
                        tourismRoute: route 
                      }))}
                    />
                  </div>
                )}
              </div>
              
              {/* Accommodation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Hotel className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Hotel Accommodation</h3>
                      <p className="text-gray-600">Premium hotels near medical facilities with medical support</p>
                      <div className="mt-2 text-sm text-gray-500">4-5 star hotels • Medical concierge • 24/7 support</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">+$200</div>
                    <div className="text-sm text-gray-600">Per night</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Total for {data?.duration || 7} nights: ${200 * (data?.duration || 7)}
                  </div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includeAccommodation}
                      onChange={(e) => setSelectedOptions(prev => ({ 
                        ...prev, 
                        includeAccommodation: e.target.checked 
                      }))}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="font-medium text-gray-900">Add to package</span>
                  </label>
                </div>
                
                {/* Hotel Selection */}
                {selectedOptions.includeAccommodation && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <HotelSelecting 
                      includeAccommodation={selectedOptions.includeAccommodation}
                      setIncludeAccommodation={(value) => setSelectedOptions(prev => ({ 
                        ...prev, 
                        includeAccommodation: value 
                      }))}
                    />
                  </div>
                )}
              </div>
              
              {/* Guide Service */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Personal Guide Service</h3>
                      <p className="text-gray-600">Dedicated English-speaking guide for all activities and assistance</p>
                      <div className="mt-2 text-sm text-gray-500">Medical tourism specialist • Cultural expert • Emergency support</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">+$150</div>
                    <div className="text-sm text-gray-600">Per day</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Total for {data?.duration || 7} days: ${150 * (data?.duration || 7)}
                  </div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includeGuide}
                      onChange={(e) => setSelectedOptions(prev => ({ 
                        ...prev, 
                        includeGuide: e.target.checked 
                      }))}
                      className="w-5 h-5 text-purple-600 rounded"
                    />
                    <span className="font-medium text-gray-900">Add to package</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your Customized Package</h3>
                  <p className="text-gray-600">Ready to proceed with your selections</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">${calculateTotal().toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total estimate</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setCurrentView('book')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center"
                >
                  <span>Proceed to Booking</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Booking Section */}
        {currentView === 'book' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h2>
              <p className="text-gray-600">Review your package and start your consultation</p>
            </div>
            
            <BookingCard 
              data={data} 
              selectedTourismRoute={selectedOptions.tourismRoute} 
              includeAccommodation={selectedOptions.includeAccommodation}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default PackageLandingPage;