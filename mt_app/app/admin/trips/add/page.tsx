'use client';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';

interface RouteItem { route_id: number; route_name: string | null; }

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  publicId?: string;
}

const AddTripPage: React.FC = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [selectedRouteIds, setSelectedRouteIds] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const [formData, setFormData] = useState({
    city: '',
    duration: '',
    total_price: '',
  });

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const res = await fetch('/api/admin/services/trips/routes');
        if (res.ok) setRoutes(await res.json());
      } catch (e) {
        console.error('Failed to load routes', e);
      }
    };
    loadRoutes();
  }, []);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      if (!formData.city) {
        throw new Error('City is required');
      }

      // Create the trip and associate selected routes
      const tripRes = await fetch('/api/admin/services/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city: formData.city, 
          route_ids: selectedRouteIds,
          images: uploadedImages.map(img => ({ url: img.url, publicId: img.publicId }))
        }),
      });
      if (!tripRes.ok) {
        const err = await tripRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create trip');
      }
      const createdTrip = await tripRes.json();
      router.push(`/admin/trips/${createdTrip.tour_id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to create trip');
    } finally {
      setSaving(false);
    }
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
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Create Trip'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Bangkok"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Routes</h3>
                <select
                  value=""
                  onChange={(e) => {
                    const rid = Number(e.target.value);
                    if (rid && !selectedRouteIds.includes(rid)) {
                      setSelectedRouteIds([...selectedRouteIds, rid]);
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                >
                  <option value="">Select Route</option>
                  {routes
                    .filter(r => r.route_id && !selectedRouteIds.includes(r.route_id))
                    .map((r) => (
                      <option key={r.route_id} value={r.route_id}>
                        {r.route_name || `Route #${r.route_id}`}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                {selectedRouteIds.map((rid) => {
                  const r = routes.find(x => x.route_id === rid);
                  return (
                    <div key={rid} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-900">{r?.route_name || `Route #${rid}`}</span>
                      <button
                        onClick={() => setSelectedRouteIds(selectedRouteIds.filter(id => id !== rid))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
                {selectedRouteIds.length === 0 && (
                  <p className="text-gray-500 text-sm py-2">No routes selected</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-gray-900">Trip Images</h3>
              <ImageUpload
                images={uploadedImages}
                onImagesChange={setUploadedImages}
                maxImages={10}
                disabled={saving}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-800">Routes</span>
                  <span className="font-medium text-gray-900">{selectedRouteIds.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddTripPage;


