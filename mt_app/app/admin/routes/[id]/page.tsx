'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, MapPin, Clock, DollarSign, Route, Calendar, Users } from 'lucide-react';
import { Route as RouteType } from '@/types/admin';


const RouteDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<RouteType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/services/trips/routes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch route');
        setRoute(await res.json());
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch route');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(`/admin/trips`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Routes
          </button>
          <button
            onClick={() => router.push(`/admin/routes/edit/${id}`)}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading route details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : !route ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
            Route not found
          </div>
        ) : (
          <div className="space-y-6">
            {/* Route Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {route.title || `Route #${route.route_id}`}
                  </h1>
                  <p className="text-gray-600">
                    Created: {new Date(route.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {route.attractions?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Places</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {route.duration || 0}
                    </div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Route className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Route Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Route className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Car Service Price</span>
                  </div>
                  <p className="text-sm text-blue-700">{route.car_service_price} THB</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Route className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Guide Service Price</span>
                  </div>
                  <p className="text-sm text-blue-700">{route.guide_price} THB</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Route className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Child Service Price</span>
                  </div>
                  <p className="text-sm text-blue-700">{route.child_price} THB</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Price</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    {route.adult_price ? `$${route.adult_price}` : 'Not specified'}
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Duration</span>
                  </div>
                  <p className="text-sm text-green-700">
                    {route.duration ? `${route.duration} days` : 'Not specified'}
                  </p>
                </div>
              </div>

              {route.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {route.description}
                  </p>
                </div>
              )}
            </div>

            {/* Places Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Places in this Route</h2>
              </div>
              
              {route.attractions && route.attractions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {route.attractions.map((pp: any) => (
                    <div key={pp.attraction_id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {pp.places?.name || 'Unnamed Place'}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {pp.places?.location?.text || 'Location not specified'}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {pp.places?.city || 'City not specified'}
                          </div>
                          {pp.places?.fee && (
                            <div className="flex items-center text-xs text-green-600 mt-1">
                              <DollarSign className="h-3 w-3 mr-1" />
                              Entry: ${pp.places.fee}
                            </div>
                          )}
                        </div>
                      </div>
                      {pp.places?.description && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {pp.places.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No places found in this route</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RouteDetailPage;
