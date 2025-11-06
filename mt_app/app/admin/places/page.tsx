'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { MapPin, TrendingUp, Search, Filter, Edit, Eye, ToggleLeft, Plus } from 'lucide-react';
import '@/app/admin/styles/globals.css';
import { useRouter } from 'next/navigation';

interface Place {
  place_id: string;
  name: string;
  contact_info?: string;
  city?: string;
  image?: string;
  description?: string;
  fee?: number;
  location: location;
}

interface location {
  text: string;
}

const PlacesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [places, setPlaces] = useState<Place[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/services/places");
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Error fetching places");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  const handleView = (id: string) => {
    router.push(`/admin/places/${id}`); // Navigate to detail page
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/places/edit/${id}`); // Navigate to edit page
  };

  const handleAdd = () => {
    router.push(`/admin/places/add`); // Navigate to add page
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.location?.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'all' || place.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const totalPlaces = places.length;
  const uniqueCities = [...new Set(places.map(place => place.city).filter(Boolean))];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Place Management</h1>
            <p className="text-gray-600">Manage tourist destinations and attractions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => handleAdd()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Place
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Places"
            value={totalPlaces}
            icon={MapPin}
            color="blue"
          />
          <StatsCard
            title="Cities"
            value={uniqueCities.length}
            icon={TrendingUp}
            color="green"
          />
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Places Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Place</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-gray-500" colSpan={5}>
                      Loading places...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-red-600" colSpan={5}>
                      {error}
                    </td>
                  </tr>
                ) : filteredPlaces.length === 0 ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-gray-500" colSpan={5}>
                      No places found
                    </td>
                  </tr>
                ) : (
                  filteredPlaces.map((place) => (
                    <tr
                      key={place.place_id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {/* Place Image */}
                          <div className="w-28 h-20 rounded-lg mr-3 bg-gray-200 flex items-center justify-center overflow-hidden">
                            {place.image ? (
                              <img 
                                src={place.image} 
                                alt={place.name || 'Place'} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <MapPin className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {place.name || 'Unnamed Place'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {place.description ? 
                                (place.description.length > 50 ? 
                                  `${place.description.substring(0, 50)}...` : 
                                  place.description
                                ) : 'No description'
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4 text-gray-900">
                        {place.location?.text || 'Not specified'}
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {place.city || 'Not specified'}
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {place.fee ? `$${place.fee}` : 'Free'}
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {/* Eye Button (View) */}
                          <button
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            onClick={() => handleView(place.place_id)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {/* Edit Button */}
                          <button
                            className="text-green-600 hover:text-green-800 cursor-pointer"
                            onClick={() => handleEdit(place.place_id)}
                            title="Edit Place"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PlacesPage;
