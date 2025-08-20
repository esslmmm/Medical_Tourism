'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Building, Plus, Search, MapPin, Star, Edit, Trash2, Phone } from 'lucide-react';
import '@/app/admin/styles/globals.css';

// Define interfaces based on your Prisma schema
interface HospitalImage {
  image_id?: number;
  image: string;
}

interface MedicalService {
  service_id?: number;
  service_name: string;
  description: string;
}

interface Hospital {
  hospital_id: string;
  name: string;
  hospital_code: string;
  location: string;
  city: string;
  description: string;
  contact_info: string;
  rating: number;
  image: string;
  logo: string;
  create_at: string;
  hospital_images: HospitalImage[];
  medical_services: MedicalService[];
}

const HospitalManagement: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const hospitals: Hospital[] = [
    {
      hospital_id: '1',
      name: 'Bangkok Heart Hospital',
      hospital_code: 'BHH001',
      location: '2 Soi Soonvijai 7, New Petchburi Road',
      city: 'Bangkok',
      description: 'Leading cardiac care center in Southeast Asia',
      contact_info: '+66-2-310-3000, info@bangkokheart.com',
      rating: 4.8,
      image: '/hospital1.jpg',
      logo: '/logo1.png',
      create_at: '2023-01-15',
      hospital_images: [
        { image: '/hospital1.jpg' },
        { image: '/hospital2.jpg' }
      ],
      medical_services: [
        { service_name: 'Cardiology', description: 'Heart and cardiovascular care' },
        { service_name: 'Cardiac Surgery', description: 'Surgical heart procedures' }
      ]
    },
    {
      hospital_id: '2',
      name: 'Bumrungrad International Hospital',
      hospital_code: 'BIH002',
      location: '33 Sukhumvit 3, Wattana',
      city: 'Bangkok',
      description: 'World-class international hospital with JCI accreditation',
      contact_info: '+66-2-066-8888, info@bumrungrad.com',
      rating: 4.9,
      image: '/hospital2.jpg',
      logo: '/logo2.png',
      create_at: '2023-01-10',
      hospital_images: [
        { image: '/hospital2.jpg' },
        { image: '/hospital3.jpg' }
      ],
      medical_services: [
        { service_name: 'General Surgery', description: 'Comprehensive surgical services' },
        { service_name: 'Oncology', description: 'Cancer treatment and care' }
      ]
    },
    {
      hospital_id: '3',
      name: 'Chiang Mai Ram Hospital',
      hospital_code: 'CMR003',
      location: '8 Boonruangrit Road, Phra Sing',
      city: 'Chiang Mai',
      description: 'Premium healthcare services in Northern Thailand',
      contact_info: '+66-53-920-300, info@chiangmairam.com',
      rating: 4.6,
      image: '/hospital3.jpg',
      logo: '/logo3.png',
      create_at: '2023-02-01',
      hospital_images: [
        { image: '/hospital3.jpg' }
      ],
      medical_services: [
        { service_name: 'Orthopedics', description: 'Bone and joint care' },
        { service_name: 'Plastic Surgery', description: 'Cosmetic and reconstructive surgery' }
      ]
    }
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.hospital_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique cities count
  const uniqueCities = new Set(hospitals.map(h => h.city)).size;

  // Calculate average rating
  const averageRating = hospitals.reduce((sum, h) => sum + h.rating, 0) / hospitals.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hospital Management</h1>
            <p className="text-gray-600">Manage hospital details and information</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{hospitals.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Cities Covered</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueCities}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals by name, city, or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Hospitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <div key={hospital.hospital_id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{hospital.hospital_code}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => router.push(`/admin/hospitals/edit/${hospital.hospital_id}`)}
                      title="Edit Hospital"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      onClick={() => router.push(`/admin/hospitals/${hospital.hospital_id}`)}
                      title="View Details"
                    >
                      <Building className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete Hospital"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{hospital.city}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{hospital.rating}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{hospital.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {hospital.medical_services.slice(0, 2).map((service) => (
                      <span key={service.service_name} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {service.service_name}
                      </span>
                    ))}
                    {hospital.medical_services.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{hospital.medical_services.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-32">
                          {hospital.contact_info.split(',')[0]}
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {hospital.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HospitalManagement;