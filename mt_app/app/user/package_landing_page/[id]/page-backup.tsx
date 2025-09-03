"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Heart, Compass, MapPin, Clock, Shield, Users, ChevronRight, Check, Star, Plane, Hotel, UserCheck, X, Plus, Minus } from "lucide-react";
import AdditionService from "@/components/user_components/package_landing_page/AdditionService";
import Navbarpro from "@/components/user_components/Main/Navbarpro";
import PackageLandingSkeleton from "@/components/user_components/skeleton-screen/package_landing_page/PackageLandingSkeleton";
import PackageImages from "@/components/user_components/package_landing_page/PackageImages";
import HeaderPackage from "@/components/user_components/package_landing_page/HeaderPackage";
import BookingCard from "@/components/user_components/package_landing_page/BookingCard";
import RouteSelecting from "@/components/user_components/package_landing_page/RouteSelecting";
import HotelSelecting from "@/components/user_components/package_landing_page/HotelSelecting";
import Image from "next/image";
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
  
  // Simplified state - just track what's added
  const [addedServices, setAddedServices] = useState({
    activities: false,
    accommodation: false,
    guide: false,
    selectedRoute: null as routes | null
  });

  const [showCustomizePanel, setShowCustomizePanel] = useState(false);

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

  const basePrice = 3200;
  const calculateTotal = () => {
    let total = basePrice;
    if (addedServices.activities && addedServices.selectedRoute) {
      total += addedServices.selectedRoute.trips.total_price;
    }
    if (addedServices.accommodation) {
      total += 200 * (data?.duration || 7);
    }
    if (addedServices.guide) {
      total += 150 * (data?.duration || 7);
    }
    return total;
  };

  const toggleService = (service: 'activities' | 'accommodation' | 'guide') => {
    setAddedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarpro />
      
      {/* Enhanced Header with Progress */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-green-600">Choose Package</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-blue-600">Customize Options</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-500">Book & Confirm</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{data?.package_name || "Medical Package"}</h1>
              <p className="text-sm text-gray-700">{hospital?.name || "Premium Hospital"} • {hospital?.city || "Bangkok"}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${calculateTotal().toLocaleString()}</div>
              <div className="text-sm text-gray-700">Total Price</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Main Package Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Package Hero */}
          <div className="relative h-64 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="relative w-48 h-24">
              <img 
                src="/img/bangkok_logo.png" 
                alt="Bangkok Medical Tourism"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg">
                <div className="text-xs font-medium text-gray-900">JCI Certified</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm font-medium text-gray-900">
                  {data?.duration || 7} Day Medical Package
                </div>
              </div>
            </div>
          </div>
          
          {/* Package Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hospital?.city || "Bangkok, Thailand"}</span>
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  <span>{data?.duration || 7} days</span>
                  <Star className="w-4 h-4 ml-4 mr-1 fill-current text-yellow-500" />
                  <span>4.8 (2,847 reviews)</span>
                </div>
              </div>
            </div>
            
            {/* What's Always Included */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-green-900 mb-3">✅ Always Included (Base Package - $3,200)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2" />
                    <span>Complete health screening</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2" />
                    <span>Specialist consultations</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2" />
                    <span>All diagnostic tests</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2" />
                    <span>Medical reports & records</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2" />
                    <span>Airport transfers</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>JCI Accredited Hospital</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Optional Add-Ons */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">🛍️ Customize Your Experience</h3>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">Step 2 of 3</div>
                  <span className="text-xs text-gray-700">Add what you need</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Activities Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                  addedServices.activities ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                }`} onClick={() => toggleService('activities')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Plane className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Wellness Tourism Activities</div>
                        <div className="text-sm text-gray-700">Temple visits, cultural experiences, Thai massage</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">+$1,850</div>
                      <button className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                        addedServices.activities 
                          ? 'bg-orange-200 text-orange-800' 
                          : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                      }`}>
                        {addedServices.activities ? '✓ Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Route Selection */}
                  {addedServices.activities && (
                    <div className="mt-4 pt-4 border-t border-orange-200">
                      <RouteSelecting 
                        data={data}
                        selectedTourismRoute={addedServices.selectedRoute}
                        setSelectedTourismRoute={(route) => setAddedServices(prev => ({ 
                          ...prev, 
                          selectedRoute: route 
                        }))}
                      />
                    </div>
                  )}
                </div>
                
                {/* Hotel Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                  addedServices.accommodation ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`} onClick={() => toggleService('accommodation')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Hotel className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Premium Hotel Stay</div>
                        <div className="text-sm text-gray-700">4-5 star hotels near medical facilities</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">+${200 * (data?.duration || 7)}</div>
                      <div className="text-xs text-gray-700">${200}/night x {data?.duration || 7} nights</div>
                      <button className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                        addedServices.accommodation 
                          ? 'bg-blue-200 text-blue-800' 
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}>
                        {addedServices.accommodation ? '✓ Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Hotel Selection */}
                  {addedServices.accommodation && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <HotelSelecting 
                        includeAccommodation={addedServices.accommodation}
                        setIncludeAccommodation={(value) => setAddedServices(prev => ({ 
                          ...prev, 
                          accommodation: value 
                        }))}
                      />
                    </div>
                  )}
                </div>
                
                {/* Guide Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                  addedServices.guide ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`} onClick={() => toggleService('guide')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Personal Guide Service</div>
                        <div className="text-sm text-gray-700">English-speaking medical tourism specialist</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">+${150 * (data?.duration || 7)}</div>
                      <div className="text-xs text-gray-700">${150}/day x {data?.duration || 7} days</div>
                      <button className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                        addedServices.guide 
                          ? 'bg-purple-200 text-purple-800' 
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                      }`}>
                        {addedServices.guide ? '✓ Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Base Medical Package</span>
                <span className="font-semibold text-gray-900">${basePrice.toLocaleString()}</span>
              </div>
              
              {addedServices.activities && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-800">+ Wellness Activities</span>
                  <span className="text-orange-800">+${addedServices.selectedRoute?.trips.total_price || 1850}</span>
                </div>
              )}
              
              {addedServices.accommodation && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-800">+ Hotel Accommodation</span>
                  <span className="text-blue-800">+${200 * (data?.duration || 7)}</span>
                </div>
              )}
              
              {addedServices.guide && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-800">+ Personal Guide</span>
                  <span className="text-purple-800">+${150 * (data?.duration || 7)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-blue-800">Ready to proceed to Step 3</span>
                </div>
                <p className="text-xs text-blue-700">You can still modify your selections above</p>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-colors shadow-lg">
                Continue to Booking - ${calculateTotal().toLocaleString()}
              </button>
              <p className="text-sm text-gray-700 mt-2">Free consultation • No payment required to start</p>
            </div>
          </div>
        </div>
        
        {/* Package Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📸 See What's Included</h3>
            <PackageImages data={data} />
          </div>
        </div>

      </div>
      
      {/* Booking Modal */}
      {showCustomizePanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
                <button 
                  onClick={() => setShowCustomizePanel(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <BookingCard 
                data={data} 
                selectedTourismRoute={addedServices.selectedRoute} 
                includeAccommodation={addedServices.accommodation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageLandingPage;