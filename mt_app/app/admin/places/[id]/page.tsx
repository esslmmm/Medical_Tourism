'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Phone, Mail, DollarSign, Calendar } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import '@/app/admin/styles/globals.css';
import ImageModal from '@/components/admin_component/ui/ImageModal';

interface Place {
  place_id: string;
  place_name: string;
  contact_info?: string;
  location?: location;
  city?: string;
  image?: string;
  description?: string;
  fee?: number;
  place_image?: Array<{
    image_id: number;
    url: string;
  }>;
}
interface location {
  text: string;
}

const PlaceDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const placeId = params?.id as string;
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await fetch(`/api/admin/services/places/${placeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch place');
        }
        const data = await response.json();
        setPlace(data);
      } catch (error) {
        console.error('Error fetching place:', error);
        setError('Error fetching place');
      } finally {
        setLoading(false);
      }
    }

    fetchPlace();
  }, [placeId]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleEdit = () => {
    router.push(`/admin/places/edit/${placeId}`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading place details...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !place) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">{error || 'Place not found'}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/places')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{place.place_name}</h1>
            <p className="text-gray-600">Place Details</p>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Edit Place
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Image</h2>
              {place.image ? (
                <img
                  src={place.image}
                  alt={place.place_name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {place.description || 'No description available'}
              </p>
            </div>

            {/* Additional Images */}
            {place.place_image && place.place_image.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  

                  {place.place_image.map((image: any, index: number) => (
                    <div 
                      key={image.image_id} 
                      className="relative group cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image.url}
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
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Place Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Place Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      {place.location?.text || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium text-gray-900">
                      {place.city || 'Not specified'}
                    </p>
                  </div>
                </div>

                {place.fee && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Entry Fee</p>
                      <p className="font-medium text-gray-900">${place.fee}</p>
                    </div>
                  </div>
                )}

                {place.contact_info && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Info</p>
                      <p className="font-medium text-gray-900">{place.contact_info}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit Place
                </button>
                <button
                  onClick={() => router.push('/admin/places')}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Places
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={place.place_image || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </AdminLayout>
  );
};

export default PlaceDetailPage;
