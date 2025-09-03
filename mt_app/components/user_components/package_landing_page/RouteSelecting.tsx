"use client"
import React, { useState } from 'react';
import { Heart, MapPin, Check, Clock, Eye, X, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
    fee?: number;
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
    setSelectedTourismRoute: (route: routes | null) => void;
    selectedTourismRoute: routes | null;
}

const RouteSelecting: React.FC<PackageDetailProps> = ({ data, setSelectedTourismRoute, selectedTourismRoute }) => {
    const [showRouteModal, setShowRouteModal] = useState<routes | null>(null);

    if (!data) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Package data not available</p>
                </div>
            </div>
        );
    }

    const selectTourismRoute = (route: routes) => {
        setSelectedTourismRoute(route);
    };

    // Enhanced fake tourism routes for better UX
    const enhancedRoutes = data.routes && data.routes.length > 0 ? data.routes : [
        {
            route_id: 1,
            tour_id: 101,
            trips: {
                tour_id: 101,
                package_id: 1,
                total_price: 1850,
                package_places: []
            }
        },
        {
            route_id: 2,
            tour_id: 102,
            trips: {
                tour_id: 102,
                package_id: 1,
                total_price: 2250,
                package_places: []
            }
        },
        {
            route_id: 3,
            tour_id: 103,
            trips: {
                tour_id: 103,
                package_id: 1,
                total_price: 1650,
                package_places: []
            }
        }
    ];

    const routeDetails = [
        {
            name: "Cultural Wellness",
            description: "Temple visits & traditional healing",
            image: "/img/Places/wat-pho.jpg",
            highlights: ["Temple Meditation", "Thai Massage", "Cultural Workshops", "Garden Walks"],
            difficulty: "Light",
            duration: "3 days",
            icon: "🏛️"
        },
        {
            name: "Premium Spa & Wellness",
            description: "Luxury spa treatments & recovery",
            image: "/img/Hotels/wanasom01.jpg",
            highlights: ["Medical Spa", "Wellness Consultations", "Healing Cuisine", "Private Relaxation"],
            difficulty: "Minimal",
            duration: "4 days",
            icon: "🧘"
        },
        {
            name: "Urban Comfort",
            description: "City exploration at your pace",
            image: "/img/place.png",
            highlights: ["Comfortable Tours", "Medical District", "Healthy Dining", "Cultural Learning"],
            difficulty: "Light",
            duration: "3 days",
            icon: "🏙️"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Simplified Header */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Wellness Experience</h3>
                <p className="text-gray-600">Choose activities that complement your recovery journey</p>
            </div>

            {/* Modern Card Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {enhancedRoutes.map((route, index) => {
                    const routeInfo = routeDetails[index] || routeDetails[0];
                    const isSelected = selectedTourismRoute?.route_id === route.route_id;
                    
                    return (
                        <div
                            key={route.route_id}
                            className={`relative cursor-pointer group transition-all duration-300 ${
                                isSelected
                                    ? 'transform scale-105 z-10'
                                    : 'hover:transform hover:scale-102'
                            }`}
                            onClick={() => selectTourismRoute(route)}
                        >
                            {/* Card */}
                            <div className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                                isSelected 
                                    ? 'border-green-500 shadow-2xl' 
                                    : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'
                            }`}>
                                {/* Image Header */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={routeInfo.image}
                                        alt={routeInfo.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    
                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
                                            <span className="text-sm font-bold text-gray-900">
                                                ${route.trips.total_price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="absolute bottom-4 left-4">
                                        <div className="text-4xl">{routeInfo.icon}</div>
                                    </div>

                                    {/* Selected Indicator */}
                                    {isSelected && (
                                        <div className="absolute top-4 left-4 bg-green-500 p-2 rounded-full shadow-lg animate-pulse">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            {routeInfo.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm">{routeInfo.description}</p>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="flex items-center justify-between mb-4 text-sm">
                                        <div className="flex items-center text-blue-600">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>{routeInfo.duration}</span>
                                        </div>
                                        <div className="flex items-center text-green-600">
                                            <Heart className="w-4 h-4 mr-1" />
                                            <span>{routeInfo.difficulty}</span>
                                        </div>
                                    </div>

                                    {/* Key Activities */}
                                    <div className="space-y-2 mb-6">
                                        {routeInfo.highlights.slice(0, 3).map((highlight, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowRouteModal(route);
                                            }}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium transition-colors"
                                        >
                                            View Details
                                        </button>
                                        {!isSelected && (
                                            <button
                                                onClick={() => selectTourismRoute(route)}
                                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center"
                                            >
                                                <span>Select</span>
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Selected State */}
                                    {isSelected && (
                                        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center text-green-800">
                                                <Check className="w-4 h-4 mr-2" />
                                                <span className="text-sm font-medium">Selected for your journey</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Route Details Modal */}
            {showRouteModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowRouteModal(null)}>
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {(() => {
                            const modalIndex = enhancedRoutes.findIndex(r => r.route_id === showRouteModal.route_id);
                            const modalRouteInfo = routeDetails[modalIndex] || routeDetails[0];
                            
                            return (
                                <>
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={modalRouteInfo.image}
                                            alt={modalRouteInfo.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute inset-0 p-8 flex items-end">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-6xl mb-4">{modalRouteInfo.icon}</div>
                                                        <h2 className="text-4xl font-bold text-white mb-3">
                                                            {modalRouteInfo.name}
                                                        </h2>
                                                        <p className="text-white/90 text-lg">{modalRouteInfo.description}</p>
                                                        <div className="flex items-center space-x-6 text-white/90 mt-4">
                                                            <div className="flex items-center">
                                                                <Clock className="w-5 h-5 mr-2" />
                                                                <span className="text-lg">{modalRouteInfo.duration}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Heart className="w-5 h-5 mr-2" />
                                                                <span className="text-lg">{modalRouteInfo.difficulty} activity</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="text-2xl font-bold text-green-300">${showRouteModal.trips.total_price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => setShowRouteModal(null)}
                                                        className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Experience Details</h3>
                                            <p className="text-gray-600">All activities are designed around your recovery needs</p>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                                            {modalRouteInfo.highlights.map((activity, idx) => (
                                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{activity}</h4>
                                                    <p className="text-gray-600 mb-4">Carefully designed for your comfort and recovery needs</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm text-gray-500">Recovery-friendly pacing</div>
                                                        <div className="text-lg font-bold text-green-600">Included</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="flex justify-center space-x-4">
                                            <button 
                                                onClick={() => setShowRouteModal(null)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors"
                                            >
                                                Close
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    selectTourismRoute(showRouteModal);
                                                    setShowRouteModal(null);
                                                }}
                                                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                            >
                                                Select This Experience
                                            </button>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RouteSelecting;