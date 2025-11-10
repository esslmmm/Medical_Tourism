"use client"
import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Check, ChevronRight } from 'lucide-react';

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
    selectedTourismRoute: routes | null;
    setSelectedTourismRoute: React.Dispatch<React.SetStateAction<routes | null>>;
  }


const RouteSelecting: React.FC<PackageDetailProps> = ({ data, setSelectedTourismRoute, selectedTourismRoute }) => {
    const [wantsTourism, setWantsTourism] = useState<boolean | null>(null);
    const [showRouteModal, setShowRouteModal] = useState<routes | null>(null);

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

    const toggleTourismOption = (wants: boolean) => {
        setWantsTourism(wants);
        if (!wants) {
          setSelectedTourismRoute(null);
        }
      };
    
      const selectTourismRoute = (route: routes) => {
        setSelectedTourismRoute(route);
      };

  return (
    <div className='my-8'>
      {/* Tourism Experience */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Make It More Than Just Medical</h2>
            <p className="text-gray-600 text-lg">You're already traveling - why not explore while you heal?</p>
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Perfect Timing</h3>
                <p className="text-sm text-gray-600">Recovery days are perfect for gentle sightseeing</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Stress-Free Healing</h3>
                <p className="text-sm text-gray-600">Beautiful experiences aid in faster recovery</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Already Here</h3>
                <p className="text-sm text-gray-600">Maximize your trip with curated experiences</p>
              </div>
            </div>
          </div>

          {/* Tourism Toggle */}
          <div className="mb-8">
            <div className="bg-gray-50 p-1 rounded-xl flex">
              <button
                onClick={() => toggleTourismOption(true)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all cursor-pointer ${
                  wantsTourism === true
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ✨ Yes, let's explore Thailand!
              </button>
              <button
                onClick={() => toggleTourismOption(false)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all cursor-pointer ${
                  wantsTourism === false
                    ? 'bg-white text-gray-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Just medical care for now
              </button>
            </div>
          </div>

          {/* Tourism Routes */}
          {wantsTourism === true && data?.routes && data.routes.length > 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Recovery Journey</h3>
                <p className="text-gray-600">Carefully designed around your medical schedule</p>
              </div>

              <div className="space-y-6">
                {data.routes.map((route) => (
                  <div key={route.route_id} className="relative group">
                    {/* Main Route Card */}
                    <div
                      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedTourismRoute?.route_id === route.route_id
                          ? 'ring-2 ring-teal-400 shadow-xl'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => selectTourismRoute(route)}
                    >
                      {/* Background Image with Overlay */}
                      <div className="relative h-64">
                        <img
                          src={route.trips.package_places[0]?.places.image || '/placeholder-image.jpg'}
                          alt={`Route ${route.route_id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-2xl font-bold mb-2">Route {route.route_id}</h4>
                              <p className="text-white/90 text-lg mb-4">Explore amazing destinations</p>
                              <div className="flex space-x-4 text-sm">
                                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                                  {data.duration} Days
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                                  {route.trips.package_places.length} destinations
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold">${route.trips.total_price}</div>
                              <div className="text-white/80">total</div>
                            </div>
                          </div>

                          {/* Quick Preview Icons */}
                          <div className="flex space-x-2">
                            {route.trips.package_places.slice(0, 4).map((packagePlace, index) => (
                              <div key={index} className="w-12 h-8 rounded overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                                <img 
                                  src={packagePlace.places.image} 
                                  alt={packagePlace.places.place_name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                            ))}
                            {route.trips.package_places.length > 4 && (
                              <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center text-xs backdrop-blur">
                                +{route.trips.package_places.length - 4}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {selectedTourismRoute?.route_id === route.route_id && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details for Selected Route */}
                    {selectedTourismRoute?.route_id === route.route_id && (
                      <div className="mt-4 bg-teal-50 rounded-xl p-6 border border-teal-200">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-semibold text-teal-900">Your Complete Journey</h5>
                          <button
                            onClick={() => setShowRouteModal(route)}
                            className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center space-x-1"
                          >
                            <span>View Full Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Timeline Preview */}
                        <div className="space-y-3">
                          {route.trips.package_places.slice(0, 3).map((packagePlace, index) => (
                            <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-3">
                              <img
                                src={packagePlace.places.image}
                                alt={packagePlace.places.place_name}
                                className="w-16 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h6 className="font-medium text-teal-900">{packagePlace.places.place_name}</h6>
                                <p className="text-sm text-teal-700">{packagePlace.places.description}</p>
                              </div>
                            </div>
                          ))}
                          {route.trips.package_places.length > 3 && (
                            <button className="justify-items-center py-2 cursor-pointer">
                              <span className="text-sm text-teal-600" onClick={() => setShowRouteModal(route)}>+ {route.trips.package_places.length - 3} more amazing places</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Benefits Section */}
              <div className="bg-blue-50 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">What's Included in Every Journey:</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Comfortable transportation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>English-speaking guide</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Flexible timing around treatments</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Small group or private tour</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical-Only Confirmation */}
          {wantsTourism === false && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect Choice!</h3>
              <p className="text-gray-600 mb-4">Focus on your health and recovery. We'll take excellent care of you.</p>
              <div className="inline-flex items-center space-x-2 text-sm text-teal-600">
                <Check className="w-4 h-4" />
                <span>You can always add tourism options later</span>
              </div>
            </div>
          )}

          {/* No Routes Available */}
          {wantsTourism === true && (!data.routes || data.routes.length === 0) && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tourism Routes Available</h3>
              <p className="text-gray-600">Tourism options will be available soon.</p>
            </div>
          )}
        </div>

        {/* Travel Route Modal */}
        {showRouteModal && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowRouteModal(null)}>
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Header with gradient background */}
              <div className="relative h-50 text-white p-8 bg-cover bg-center bg-no-repeat" 
                style={{backgroundImage: `url('${selectedTourismRoute?.trips.package_places[0]?.places.image || 'default-image.jpg'}')`}}>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30"></div>
                <div className="absolute inset-0 bg-blue bg-opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 backdrop-blur-sm">
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-3xl font-bold">Route {showRouteModal.route_id} Details</h2>
                        </div>
                        <p className="text-blue-100 text-lg mb-4">Complete itinerary overview</p>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{showRouteModal.trips.package_places.length} destinations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{data.duration} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowRouteModal(null)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
                    >
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-280px)]">
                <div className="p-8">
                  {/* Price and booking section */}
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 mb-8 border border-teal-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-3xl font-bold text-teal-600">${showRouteModal.trips.total_price}</span>
                          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                            Private trip
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">All-inclusive package • Free cancellation up to 48h</p>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 rounded-full p-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Complete Itinerary</h3>
                      <p className="text-gray-600">Carefully curated destinations for an unforgettable journey</p>
                    </div>
                  </div>

                  {/* Destinations grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {showRouteModal.trips.package_places.map((packagePlace, index) => (
                      <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="relative overflow-hidden">
                          <img
                            src={packagePlace.places.image}
                            alt={packagePlace.places.place_name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {packagePlace.places.place_name}
                            </h4>
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm text-gray-600">4.8</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {packagePlace.places.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span>2-3 hours</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                </svg>
                                <span>Photo stops</span>
                              </span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional features */}
                  <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">What's Included</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Professional guide</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Inter-island transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Flexible timing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Comfortable transportation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Selected activities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>24/7 support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>🔒 Secure booking • ⚡ Instant confirmation • 📞 24/7 customer support</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowRouteModal(null)}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                    >
                      Compare Routes
                    </button>
                    <button
                      onClick={() => {
                        selectTourismRoute(showRouteModal);
                        setShowRouteModal(null);
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Select This Route
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default RouteSelecting
