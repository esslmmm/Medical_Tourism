'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Star, Phone, Mail, Clock, Building, Image as ImageIcon } from 'lucide-react';
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

const HospitalDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hospitalId = params?.id as string;

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchHospital = async () => {
      // Simulate API call
      const mockHospital: Hospital = {
        hospital_id: hospitalId,
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
          { image: '/hospital2.jpg' },
          { image: '/hospital3.jpg' }
        ],
        medical_services: [
          { service_name: 'Cardiology', description: 'Heart and cardiovascular care' },
          { service_name: 'Cardiac Surgery', description: 'Surgical heart procedures' },
          { service_name: 'Interventional Cardiology', description: 'Minimally invasive heart treatments' }
        ]
      };
      
      setHospital(mockHospital);
      setLoading(false);
    };

    fetchHospital();
  }, [hospitalId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!hospital) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Hospital not found</h2>
          <p className="text-gray-600 mt-2">The hospital you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    );
  }

  // Parse contact info to extract phone and email
  const contactInfo = hospital.contact_info;
  const phoneMatch = contactInfo.match(/\+?[\d\s\-\(\)]+/);
  const emailMatch = contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  
  const phone = phoneMatch ? phoneMatch[0] : 'N/A';
  const email = emailMatch ? emailMatch[0] : 'N/A';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/hospitals')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hospitals
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hospital.name}</h1>
              <p className="text-gray-600">Hospital Details & Information</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/admin/hospitals/edit/${hospital.hospital_id}`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Hospital
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hospital Logo and Main Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-6 mb-4">
                <img
                  src={hospital.logo}
                  alt="Hospital Logo"
                  className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-gray-50"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hospital Code: {hospital.hospital_code}</h3>
                  <p className="text-sm text-gray-600">Created: {hospital.create_at}</p>
                </div>
              </div>
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{hospital.description}</p>
            </div>

            {/* Medical Services */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Medical Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hospital.medical_services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.service_name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital Images Gallery */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Hospital Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.hospital_images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.image}
                      alt={`Hospital image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-700 font-medium">{hospital.city}</span>
                    <p className="text-gray-600 text-sm">{hospital.location}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Full Contact Info:</strong> {hospital.contact_info}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{hospital.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">City</span>
                  <span className="font-medium">{hospital.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hospital Code</span>
                  <span className="font-medium font-mono text-sm">{hospital.hospital_code}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{hospital.create_at}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Services</span>
                  <span className="font-medium">{hospital.medical_services.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Images</span>
                  <span className="font-medium">{hospital.hospital_images.length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/admin/hospitals/edit/${hospital.hospital_id}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Hospital
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Building className="h-4 w-4 mr-2" />
                  View Packages
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Clock className="h-4 w-4 mr-2" />
                  View Bookings
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Manage Images
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HospitalDetailPage;
