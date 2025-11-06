'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { MapPin, Search, Edit, Eye, Plus, Route, List } from 'lucide-react';
import { Trip, Route as RouteType } from '@/types/admin';
import { useRouter } from 'next/navigation';
import '@/app/admin/styles/globals.css';


const TripsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'trips' | 'routes'>('trips');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch trips
        const tripsResponse = await fetch("/api/admin/services/trips");
        if (!tripsResponse.ok) {
          throw new Error("Failed to fetch trips");
        }
        const tripsData = await tripsResponse.json();
        setTrips(tripsData);

        // Fetch routes
        const routesResponse = await fetch("/api/admin/services/trips/routes");
        if (!routesResponse.ok) {
          throw new Error("Failed to fetch routes");
        }
        const routesData = await routesResponse.json();
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleView = (id: number, list: string) => {
    router.push(`/admin/${list}/${id}`); // Navigate to detail page
  };

  const handleEdit = (id: number, list: string) => {
    router.push(`/admin/${list}/edit/${id}`); // Navigate to edit page
  };

  const handleAdd = (list: string) => {
    router.push(`/admin/${list}/add`); // Navigate to add page
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'all' || trip.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get unique cities for filter dropdown (only for trips)
  const uniqueCities = Array.from(new Set(trips.map(trip => trip.city).filter(Boolean)));

  const totalTrips = trips.length;
  const totalRoutes = routes.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trip & Route Management</h1>
            <p className="text-gray-600">Manage tour routes and destinations</p>
          </div>
          
          {activeTab === 'trips' ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => handleAdd("trips")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Trip
          </button>
          ) : (
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => handleAdd("routes")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Route
            </button>
          </>
          ) }
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('trips')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'trips'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                Trips ({totalTrips})
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'routes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Route className="h-4 w-4 mr-2" />
                Routes ({totalRoutes})
              </button>
            </nav>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Trips"
            value={totalTrips}
            icon={MapPin}
            color="blue"
          />
          <StatsCard
            title="Total Routes"
            value={trips.length}
            icon={Route}
            color="green"
          />
          <StatsCard
            title="Cities Covered"
            value={uniqueCities.length}
            icon={MapPin}
            color="purple"
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
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {activeTab === 'trips' && (
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                >
                  <option value="all">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city || ''}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {/* Content Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {activeTab === 'trips' ? (
                    <>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Trip</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Route Count</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Route</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Places</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-gray-500" colSpan={activeTab === 'trips' ? 4 : 6}>
                      Loading {activeTab}...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-red-600" colSpan={activeTab === 'trips' ? 4 : 6}>
                      {error}
                    </td>
                  </tr>
                ) : activeTab === 'trips' ? (
                  filteredTrips.length === 0 ? (
                    <tr>
                      <td className="py-8 px-4 text-center text-gray-500" colSpan={4}>
                        No trips found
                      </td>
                    </tr>
                  ) : (
                    filteredTrips.map((trip) => (
                    <tr
                      key={trip.tour_id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {/* Trip Image placeholder */}
                          <div className="w-28 h-20 rounded-lg mr-3 bg-gray-200 flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Trip #{trip.tour_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4 text-gray-900">
                        {trip.city || 'Not specified'}
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {Array.isArray(trip.Trip_Routes) ? trip.Trip_Routes.length : 0} {Array.isArray(trip.Trip_Routes) && trip.Trip_Routes.length === 1 ? 'route' : 'routes'}
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {/* Eye Button (View Trip) */}
                          <button
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            onClick={() => handleView(trip.tour_id, "trips")}
                            title="View Trip Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {/* Edit Button (Edit Trip) */}
                          <button
                            className="text-green-600 hover:text-green-800 cursor-pointer"
                            onClick={() => handleEdit(trip.tour_id, "trips")}
                            title="Edit Trip"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                  )
                ) : (
                  filteredRoutes.length === 0 ? (
                    <tr>
                      <td className="py-8 px-4 text-center text-gray-500" colSpan={6}>
                        No routes found
                      </td>
                    </tr>
                  ) : (
                    filteredRoutes.map((route) => (
                      <tr
                        key={route.route_id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-28 h-20 rounded-lg mr-3 bg-gray-200 flex items-center justify-center overflow-hidden">
                              {route.image ? (
                                <img 
                                  src={route.image} 
                                  alt={route.title || 'Place'} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <MapPin className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {route.title || `Route #${route.route_id}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-4 px-4 text-gray-900 max-w-xs truncate">
                          {route.description || 'No description available'}
                        </td>
                        <td className="py-4 px-4 text-gray-900">
                          {route.duration ? `${route.duration} day(s)` : 'Not specified'}
                        </td>
                        <td className="py-4 px-4 text-gray-900">
                          {route.attractions.length} place(s)
                        </td>
                        
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => handleView(route.route_id, "routes")}
                              title="View Route Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            
                            <button
                              className="text-green-600 hover:text-green-800 cursor-pointer"
                              onClick={() => handleEdit(route.route_id, "routes")}
                              title="Edit Route"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TripsPage;


