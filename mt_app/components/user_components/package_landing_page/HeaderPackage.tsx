"use client"
import React from 'react';
import { MapPin, Calendar, Star, Award, Clock, Users, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

interface Packages {
    package_id: number;
    package_name: string;
    duration: number;
    package_image: package_image[]
  }
  
  interface package_image {
    image_id: number;
    images: string;
    title: string;
    detail: string
  }

  
interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  city: string;
  location: string;
  reviews: number;
  image: string;
  description: string;
}
  
  interface PackageDetailProps {
    data: Packages | null;
    hospital: Hospital | null;
  }

const HeaderPackage: React.FC<PackageDetailProps> = ({ data, hospital }) => {
  const packageData = {
    name: data?.package_name || "Premium Medical Tourism Package",
    category: "Medical Tourism",
    duration: `${data?.duration || 7} Days`,
    location: hospital?.city || "Bangkok, Thailand",
    rating: 4.8,
    reviews: 2847,
    basePrice: 3200,
    medicalServices: [
      "Initial consultation & medical assessment",
      "Comprehensive diagnostic tests",
      "Specialist treatment procedures",
      "Post-treatment monitoring",
      "Medical documentation & reports"
    ]
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl p-8 shadow-lg border border-gray-100">
      {/* Header Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        
        {/* Left Content - Streamlined */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {/* Hospital Badge */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm">
            <div className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
              <Shield className="w-4 h-4 mr-2" />
              <span>{hospital?.name || "Premium Hospital"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hospital?.city || "Bangkok, Thailand"}</span>
            </div>
          </div>

          {/* Package Title - More Prominent */}
          <div className="space-y-4">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              Complete Medical Tourism Package
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {data?.package_name || "Premium Medical Package"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              World-class medical treatment combined with personalized care coordination. 
              Your health journey made simple, safe, and comfortable.
            </p>
          </div>

          {/* Key Stats - Simplified */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center bg-yellow-50 text-yellow-800 px-4 py-3 rounded-xl">
              <Star className="w-5 h-5 text-yellow-500 fill-current mr-2" />
              <div>
                <span className="font-bold text-lg">{packageData.rating}</span>
                <div className="text-xs text-yellow-600">{packageData.reviews} reviews</div>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 text-blue-800 px-4 py-3 rounded-xl">
              <Calendar className="w-5 h-5 mr-2" />
              <div>
                <span className="font-bold text-lg">{data?.duration || 7}</span>
                <div className="text-xs text-blue-600">Days Program</div>
              </div>
            </div>
            <div className="flex items-center bg-green-50 text-green-800 px-4 py-3 rounded-xl">
              <Shield className="w-5 h-5 mr-2" />
              <div>
                <span className="font-bold text-lg">JCI</span>
                <div className="text-xs text-green-600">Accredited</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Hero Image */}
        <div className="lg:w-96 w-full">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/img/medical.png"
              alt={data?.package_name || "Medical Package"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Price Badge - More Prominent */}
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                <div className="text-sm font-medium">Starting from</div>
                <div className="text-2xl font-bold">${packageData.basePrice}</div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="text-green-600">
                    <div className="font-bold text-lg">15K+</div>
                    <div className="text-xs text-gray-600">Patients Served</div>
                  </div>
                  <div className="text-blue-600">
                    <div className="font-bold text-lg">24/7</div>
                    <div className="text-xs text-gray-600">Care Support</div>
                  </div>
                  <div className="text-purple-600">
                    <div className="font-bold text-lg">98%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Hint - Simplified */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 px-6 py-3 rounded-full">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></span>
          <span className="font-medium">👇 Choose your experience below to see personalized options</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderPackage;
