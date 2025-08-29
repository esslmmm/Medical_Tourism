'use client';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

interface Trip {
  tour_id: number;
  description: string | null;
  duration: number | null;
}

const TripsPage: React.FC = () => {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/services/trips');
        if (!res.ok) throw new Error('Failed to fetch trips');
        const data = await res.json();
        setTrips(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch trips');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trips</h1>
            <p className="text-gray-800">Manage tour routes</p>
          </div>
          <button
            onClick={() => router.push('/admin/trips/add')}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" /> New Trip
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trips.map(t => (
                  <tr key={t.tour_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{t.tour_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{t.description || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{t.duration ?? '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => router.push(`/admin/trips/${t.tour_id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {trips.length === 0 && (
                  <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No trips found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TripsPage;


