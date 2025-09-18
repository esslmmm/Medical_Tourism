'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Phone, Mail, DollarSign, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/app/admin/styles/globals.css';

interface Place {
  place_id: string;
  place_name: string;
  contact_info?: string;
  location?: string;
  city?: string;
  image?: string;
  description?: string;
  fee?: number;
  place_image?: Array<{
    image_id: number;
    image: string;
  }>;
}

const PlaceDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await fetch(`/api/admin/services/places/${params.id}`);
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
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/admin/places/edit/${params.id}`);
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
            onClick={() => router.back()}
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
                  {place.place_image.map((img) => (
                    <img
                      key={img.image_id}
                      src={img.image}
                      alt={`${place.place_name} image`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
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
                      {place.location || 'Not specified'}
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
    </AdminLayout>
  );
};

export default PlaceDetailPage;
