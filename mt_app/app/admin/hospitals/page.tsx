'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Building, Plus, Search, MapPin, Star, Edit, Trash2, Phone } from 'lucide-react';
import '@/app/admin/styles/globals.css';

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
}

const HospitalManagement: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>('http://localhost:3000/api/services/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const uniqueCities = Array.from(new Set(hospitals.map(h => h.city)));

  // Filter hospitals by search, city, and rating
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.hospital_code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = selectedCity ? hospital.city === selectedCity : true;
    const matchesRating = selectedRating ? hospital.rating >= parseInt(selectedRating) : true;

    return matchesSearch && matchesCity && matchesRating;
  });

  const averageRating = hospitals.length > 0
    ? hospitals.reduce((sum, h) => sum + h.rating, 0) / hospitals.length
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hospital Management</h1>
            <p className="text-gray-600">Manage hospital details and information</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => router.push('/admin/hospitals/add')}>
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
                <p className="text-2xl font-bold text-gray-900">{uniqueCities.length}</p>
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

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
{/* Filters + Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
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

          {/* Filters */}
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="1">1 Star & Up</option>
            </select>
          </div>
        </div>

        {/* Hospitals Grid */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading hospitals...</p>
        ) : filteredHospitals.length === 0 ? (
          <p className="text-gray-500 text-center">No hospitals found.</p>
        ) : (
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
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-32">
                          {hospital.contact_info.split('|')[0].trim()}
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
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default HospitalManagement;
