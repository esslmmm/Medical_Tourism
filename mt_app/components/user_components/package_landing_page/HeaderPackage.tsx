"use client"
import React from 'react';
import { Heart, MapPin, Calendar, Users, Star, Wifi, Car, Utensils, Camera, Phone, Mail, Check, ChevronLeft, ChevronRight } from 'lucide-react';

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
    name: "Complete Dental Care & Thailand Discovery Package",
    category: "Dental Tourism",
    duration: "7 Days",
    location: "Bangkok, Thailand",
    rating: 4.9,
    reviews: 127,
    basePrice: 2450,
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
  return (
    <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
        <span>{hospital?.name}</span>
        <span>•</span>
        <MapPin className="w-4 h-4" />
        <span>{hospital?.city}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{data?.package_name}</h1>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">{packageData.rating}</span>
            <span className="text-gray-600">({packageData.reviews} reviews)</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{data?.duration} Days</span>
        </div>
        </div>
    </div>
  )
}

export default HeaderPackage;
