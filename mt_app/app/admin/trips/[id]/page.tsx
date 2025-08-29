'use client';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil } from 'lucide-react';

const TripDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/services/trips/${id}`);
        if (!res.ok) throw new Error('Failed to fetch trip');
        setTrip(await res.json());
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch trip');
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
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : !trip ? (
          <div>Not found</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip</h2>
                <div className="space-y-2">
                  <div className="text-gray-900"><span className="font-medium">ID:</span> {trip.tour_id}</div>
                  <div className="text-gray-900"><span className="font-medium">Description:</span> {trip.description || '-'}</div>
                  <div className="text-gray-900"><span className="font-medium">Duration:</span> {trip.duration ?? '-'}</div>
                  <div className="text-gray-900"><span className="font-medium">Total Price:</span> {trip.total_price ?? '-'}</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Places</h3>
                <div className="space-y-2">
                  {(trip.package_places || []).map((pp: any) => (
                    <div key={pp.packplace_id} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-900">{pp.places?.place_name || pp.place_id}</span>
                    </div>
                  ))}
                  {(!trip.package_places || trip.package_places.length === 0) && (
                    <p className="text-gray-500 text-sm py-2">No places</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Places</span>
                    <span className="font-medium text-gray-900">{trip.package_places?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TripDetailPage;


