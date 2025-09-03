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
  
  // Step-by-step wizard state
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [addedServices, setAddedServices] = useState({
    activities: false,
    accommodation: false,
    guide: false,
    selectedRoute: null as routes | null,
    selectedHotel: 0
  });
  const [skipCustomization, setSkipCustomization] = useState(false);

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

  const proceedToNextStep = () => {
    if (currentWizardStep < 3) {
      setCurrentWizardStep(currentWizardStep + 1);
    }
  };

  const goBackStep = () => {
    if (currentWizardStep > 1) {
      if (currentWizardStep === 3 && skipCustomization) {
        // If user skipped customization, go back to step 1
        setCurrentWizardStep(1);
        setSkipCustomization(false);
      } else {
        setCurrentWizardStep(currentWizardStep - 1);
      }
    }
  };

  const proceedWithoutCustomization = () => {
    setSkipCustomization(true);
    setCurrentWizardStep(3); // Go directly to booking
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarpro />
      
      {/* Enhanced Header with Progress */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* Step-by-Step Progress */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentWizardStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {currentWizardStep > 1 ? '✓' : '1'}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentWizardStep >= 1 ? 'text-green-600' : 'text-gray-500'
                }`}>Package Details</span>
              </div>
              <div className={`w-8 h-px ${
                currentWizardStep >= 2 ? 'bg-blue-400' : 'bg-gray-300'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentWizardStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {currentWizardStep > 2 ? '✓' : '2'}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentWizardStep >= 2 ? 'text-blue-600' : 'text-gray-500'
                }`}>Customize (Optional)</span>
              </div>
              <div className={`w-8 h-px ${
                currentWizardStep >= 3 ? 'bg-purple-400' : 'bg-gray-300'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentWizardStep >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentWizardStep >= 3 ? 'text-purple-600' : 'text-gray-500'
                }`}>Book & Confirm</span>
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Layout: Sidebar + Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* LEFT SIDEBAR - Always Included (Persistent) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="text-lg font-bold text-green-900 mb-3 text-center">✅ Always Included</h3>
                <div className="text-center mb-4">
                  <span className="text-xl font-bold text-green-600">${basePrice.toLocaleString()}</span>
                  <div className="text-sm text-gray-600">Base Package</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Complete health screening</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Specialist consultations</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>All diagnostic tests</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Medical reports</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Airport transfers</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>JCI Accredited</span>
                  </div>
                </div>
                
                {/* Current Total */}
                <div className="border-t border-green-200 mt-4 pt-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Current Total</div>
                    <div className="text-2xl font-bold text-green-600">${calculateTotal().toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3">
            
            {/* STEP 1: Package Details */}
            {currentWizardStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                {/* Package Hero */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="relative w-40 h-20">
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
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">
                        {data?.duration || 7} Day Package
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Package Info */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{data?.package_name || "General Health Checkup"}</h2>
                    <div className="flex items-center justify-center text-gray-700 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="mr-6">{hospital?.city || "Bangkok, Thailand"}</span>
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="mr-6">{data?.duration || 7} days</span>
                      <Star className="w-5 h-5 mr-2 fill-current text-yellow-500" />
                      <span>4.8 (2,847 reviews)</span>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Comprehensive medical checkup package at a world-class JCI-certified hospital in Bangkok.
                      Perfect for health screening and medical tourism.
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <button 
                      onClick={proceedWithoutCustomization}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                    >
                      Book Base Package - ${basePrice.toLocaleString()}
                    </button>
                    <button 
                      onClick={proceedToNextStep}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                    >
                      Add Hotels & Activities →
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-3">Add hotels, wellness activities, and personal guide in the next step</p>
                </div>
              </div>
            )}
            
            {/* STEP 2: Customization Options */}
            {currentWizardStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                {/* Step Header with Back Button */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={goBackStep}
                      className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      ← Back to Package Details
                    </button>
                    <div className="text-sm text-gray-600">
                      Step 2 of 3: Optional Add-ons
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🛍️ Enhance Your Experience</h2>
                    <p className="text-gray-600">Add optional services to make your medical journey even better</p>
                  </div>
              
              <div className="space-y-6">
                {/* Activities Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all ${
                  addedServices.activities ? 'border-orange-400 bg-orange-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Wellness Tourism Activities</div>
                        <div className="text-sm text-gray-700">Temple visits, cultural experiences, Thai massage</div>
                        <div className="text-lg font-bold text-orange-600 mt-1">+$1,850</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService('activities');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          addedServices.activities 
                            ? 'bg-orange-500 text-white hover:bg-orange-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                      >
                        {addedServices.activities ? '✓ Added' : 'Add Activities'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Route Selection */}
                  {addedServices.activities && (
                    <div className="mt-6 p-4 bg-orange-25 rounded-lg border border-orange-200" onClick={(e) => e.stopPropagation()}>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">🎯 Choose Your Activities Route:</h4>
                        {addedServices.selectedRoute ? (
                          <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-orange-800 font-medium">Route Selected ✓</span>
                                <div className="text-sm text-orange-700">Price: ${addedServices.selectedRoute.trips.total_price}</div>
                              </div>
                              <Check className="w-5 h-5 text-orange-600" />
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-orange-700 bg-orange-50 p-3 rounded border border-orange-200">
                            👇 Please select an activities route below
                          </div>
                        )}
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <RouteSelecting 
                          data={data}
                          selectedTourismRoute={addedServices.selectedRoute}
                          setSelectedTourismRoute={(route) => {
                            setAddedServices(prev => ({ 
                              ...prev, 
                              selectedRoute: route 
                            }));
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Hotel Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all ${
                  addedServices.accommodation ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Hotel className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Premium Hotel Stay</div>
                        <div className="text-sm text-gray-700">4-5 star hotels near medical facilities</div>
                        <div className="text-lg font-bold text-blue-600 mt-1">
                          +${200 * (data?.duration || 7)} <span className="text-sm font-normal text-blue-500">(${200}/night)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService('accommodation');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          addedServices.accommodation 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                      >
                        {addedServices.accommodation ? '✓ Added' : 'Add Hotels'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Hotel Selection */}
                  {addedServices.accommodation && (
                    <div className="mt-6 p-4 bg-blue-25 rounded-lg border border-blue-200" onClick={(e) => e.stopPropagation()}>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-blue-800 mb-3">🏨 Choose Your Hotel:</h4>
                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-blue-800 font-medium">Premium Hotels Available ✓</span>
                              <div className="text-sm text-blue-700">Select from our partner hotels below</div>
                            </div>
                            <Check className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <HotelSelecting 
                          includeAccommodation={addedServices.accommodation}
                          setIncludeAccommodation={(value) => setAddedServices(prev => ({ 
                            ...prev, 
                            accommodation: value 
                          }))}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Guide Add-On */}
                <div className={`border-2 rounded-xl p-4 transition-all ${
                  addedServices.guide ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                }`}>
                {/* Guide Add-On */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Personal Guide Service</div>
                        <div className="text-sm text-gray-700">English-speaking medical tourism specialist</div>
                        <div className="text-lg font-bold text-purple-600 mt-1">
                          +${150 * (data?.duration || 7)} <span className="text-sm font-normal text-purple-500">(${150}/day)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService('guide');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          addedServices.guide 
                            ? 'bg-purple-500 text-white hover:bg-purple-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                        }`}
                      >
                        {addedServices.guide ? '✓ Added' : 'Add Guide'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

                  {/* Step 2 Navigation */}
                  <div className="flex justify-between items-center mt-8">
                    <button 
                      onClick={goBackStep}
                      className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      ← Back to Package
                    </button>
                    <div className="flex gap-3">
                      <button 
                        onClick={proceedWithoutCustomization}
                        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        Skip - ${basePrice.toLocaleString()}
                      </button>
                      <button 
                        onClick={proceedToNextStep}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        Continue - ${calculateTotal().toLocaleString()}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* STEP 3: Booking Confirmation */}
            {currentWizardStep === 3 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                {/* Step Header with Back Button */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={goBackStep}
                      className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      ← Back to {skipCustomization ? 'Package Details' : 'Customization'}
                    </button>
                    <div className="text-sm text-gray-600">
                      Step 3 of 3: Ready to Book
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Ready to Book!</h2>
                    <p className="text-gray-600">Review your package and proceed to booking</p>
                  </div>
              
              {/* Price Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Package Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Base Medical Package</span>
                    <span className="font-semibold text-gray-900">${basePrice.toLocaleString()}</span>
                  </div>
                  
                  {addedServices.activities && (
                    <div className="flex items-center justify-between">
                      <span className="text-orange-800">+ Wellness Activities</span>
                      <span className="text-orange-800">+${addedServices.selectedRoute?.trips.total_price || 1850}</span>
                    </div>
                  )}
                  
                  {addedServices.accommodation && (
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">+ Hotel Accommodation ({data?.duration || 7} nights)</span>
                      <span className="text-blue-800">+${200 * (data?.duration || 7)}</span>
                    </div>
                  )}
                  
                  {addedServices.guide && (
                    <div className="flex items-center justify-between">
                      <span className="text-purple-800">+ Personal Guide ({data?.duration || 7} days)</span>
                      <span className="text-purple-800">+${150 * (data?.duration || 7)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-300 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">Total Package Price</span>
                      <span className="text-3xl font-bold text-green-600">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={goBackStep}
                      className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      ← Back to {skipCustomization ? 'Package Details' : 'Customization'}
                    </button>
                    <button 
                      onClick={() => setShowCustomizePanel(true)}
                      className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
                    >
                      Complete Booking - ${calculateTotal().toLocaleString()}
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-3">Free consultation • No payment required to start</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
            {/* Package Gallery - Only on Step 1 (Package Details) */}
            {currentWizardStep === 1 && (
              <div className="max-w-7xl mx-auto px-4 mt-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📸 See What's Included in Detail</h3>
                    <PackageImages data={data} />
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info - Only on Step 3 (Final Review) */}
            {currentWizardStep === 3 && (
              <div className="max-w-7xl mx-auto px-4 mt-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Your Complete Itinerary</h3>
                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">What to Expect:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                        <div className="space-y-2">
                          <div>📋 Day 1-2: Medical consultations & tests</div>
                          <div>🏥 Day 3: Results review & treatment planning</div>
                        </div>
                        <div className="space-y-2">
                          {addedServices.activities && <div>🎯 Day 4-5: Wellness activities & recovery</div>}
                          {addedServices.accommodation && <div>🏨 All days: Premium hotel accommodation</div>}
                          {addedServices.guide && <div>👨‍💼 All days: Personal guide assistance</div>}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-center">
                      Your complete medical tourism package is ready. Next step: consultation and booking confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

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