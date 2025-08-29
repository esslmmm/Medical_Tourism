'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Building, Plus, Search, MapPin, Phone } from 'lucide-react';
import '@/app/admin/styles/globals.css';

interface Hospital {
  hospital_id: string;
  name: string;
  hospital_code: string;
  location: string;
  city: string;
  description: string;
  contact_info: string;
  image: string;
  logo: string;
  create_at: string;
}

const HospitalManagement: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>('/api/services/hospitals');
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

  // Filter hospitals
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.hospital_code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = selectedCity ? hospital.city === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-white">Hospital Management</h1>
            <p className="text-indigo-100">Manage hospital details and information</p>
          </div>
          <button
            className="bg-white text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center shadow-md"
            onClick={() => router.push('/admin/hospital/add')}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Hospital
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{hospitals.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Cities Covered</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueCities.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search hospitals by name, city, or code..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* City Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
          </div>

          {/* Hospitals Grid */}
          {loading ? (
            <p className="text-gray-500 text-center">Loading hospitals...</p>
          ) : filteredHospitals.length === 0 ? (
            <p className="text-gray-500 text-center">No hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.hospital_id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{hospital.hospital_code}</p>
                    </div>
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => router.push(`/admin/hospital/${hospital.hospital_id}`)}
                      title="View Details"
                    >
                      <Building className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{hospital.city}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{hospital.description}</p>
                    <div className="border-t pt-3 mt-3 flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="truncate max-w-36">{hospital.contact_info.split('|')[0].trim()}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
                        {hospital.city}
                      </span>
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
