'use client';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, MapPin, Clock, DollarSign, Image as ImageIcon, Route, Calendar, Users, Edit, Eye } from 'lucide-react';
import ImageModal from '@/components/admin_component/ui/ImageModal';

const TripDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trip, setTrip] = useState<any>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/services/trips/${id}`);
        if (!res.ok) throw new Error('Failed to fetch trip');
        const t = await res.json();
        // Flatten first route for easier rendering
        const firstRoute = Array.isArray(t?.Trip_Routes) && t.Trip_Routes.length > 0 ? t.Trip_Routes[0].routes : t.routes;
        const normalized = {
          ...t,
          routes: firstRoute || null,
        };
        setTrip(normalized);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch trip');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const handleView = (id: number) => {
    router.push(`/admin/trips/${id}`); // Navigate to detail page
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/trips/edit/${id}`); // Navigate to edit page
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/admin/trips')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Trips
          </button>
          <button
            onClick={() => router.push(`/admin/trips/edit/${id}`)}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading trip details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : !trip ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
            Trip not found
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trip Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Trip #{trip.tour_id}</h1>
                  <p className="text-gray-600">City: {trip.city || 'Not specified'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{trip.trip_images?.length || 0}</div>
                    <div className="text-sm text-gray-600">Images</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{Array.isArray(trip.Trip_Routes) ? trip.Trip_Routes.length : (trip.routes ? 1 : 0)}</div>
                    <div className="text-sm text-gray-600">Routes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Routes Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Route className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Routes</h2>
              </div>
              {Array.isArray(trip.Trip_Routes) && trip.Trip_Routes.length > 0 ? (
                <div className="space-y-3">
                  {trip.Trip_Routes.map((tr: any) => (
                    <div key={tr.trip_route_id} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div>
                        <div className="font-medium text-blue-900">{tr.routes?.route_name || `Route #${tr.routes?.route_id}`}</div>
                        <div className="text-sm text-blue-700">{tr.routes?.description || 'No description'}</div>
                      </div>
                      <div className="text-sm text-gray-700 justify-between">
                        <div>
                        {tr.routes?.duration ? `${tr.routes.duration} days` : ''}
                        {tr.routes?.total_price ? ` • $${tr.routes.total_price}` : ''}
                        </div>

                        <div className="flex space-x-2">
                        {/* Eye Button (View Trip) */}
                        <button
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => handleView(trip.tour_id)}
                          title="View Trip Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {/* Edit Button (Edit Trip) */}
                        <button
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          onClick={() => handleEdit(trip.tour_id)}
                          title="Edit Trip"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Route className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No routes linked to this trip</p>
                </div>
              )}
            </div>

            {/* Trip Images Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <ImageIcon className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Trip Images</h2>
              </div>
              {trip.trip_images && trip.trip_images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {trip.trip_images.map((image: any, index: number) => (
                    <div 
                      key={image.image_id} 
                      className="relative group cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image.image}
                        alt={`Trip image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                            View Full
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No images available for this trip</p>
                </div>
              )}
            </div>
            
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={trip?.trip_images || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </AdminLayout>
  );
};

export default TripDetailPage;


