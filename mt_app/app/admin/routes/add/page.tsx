'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';

interface Place {
  place_id: string;
  place_name: string | null;
  city?: string | null;
}

const AddRoutePage: React.FC = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    route_name: '',
    description: '',
    duration: '',
    total_price: '',
  });

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const res = await fetch('/api/services/places');
        if (res.ok) setPlaces(await res.json());
      } catch (e) {
        console.error('Failed to load places', e);
      }
    };
    loadPlaces();
  }, []);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const payload = {
        route_name: formData.route_name || null,
        description: formData.description || null,
        duration: formData.duration ? Number(formData.duration) : null,
        total_price: formData.total_price ? Number(formData.total_price) : null,
        place_ids: selectedPlaceIds,
      };

      const res = await fetch('/api/admin/services/trips/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create route');
      }
      const created = await res.json();
      router.push(`/admin/routes/${created.route_id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to create route');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Routes
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Create Route'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Route Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route Name</label>
                  <input
                    type="text"
                    value={formData.route_name}
                    onChange={(e) => setFormData({ ...formData, route_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Bangkok City Tour"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Route description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                  <input
                    type="number"
                    value={formData.total_price}
                    onChange={(e) => setFormData({ ...formData, total_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Places</h3>
                <select
                  value=""
                  onChange={(e) => {
                    const pid = e.target.value;
                    if (pid && !selectedPlaceIds.includes(pid)) {
                      setSelectedPlaceIds([...selectedPlaceIds, pid]);
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                >
                  <option value="">Select Place</option>
                  {places
                    .filter(p => p.place_id && !selectedPlaceIds.includes(p.place_id))
                    .map((p) => (
                      <option key={p.place_id} value={p.place_id}>
                        {p.place_name || 'Unnamed Place'}
                        {p.city ? `, ${p.city}` : ''}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                {selectedPlaceIds.map((pid) => {
                  const p = places.find(x => x.place_id === pid);
                  return (
                    <div key={pid} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-900">{p?.place_name || pid}</span>
                      <button
                        onClick={() => setSelectedPlaceIds(selectedPlaceIds.filter(id => id !== pid))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
                {selectedPlaceIds.length === 0 && (
                  <p className="text-gray-500 text-sm py-2">No places selected</p>
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
                  <span className="font-medium text-gray-900">{selectedPlaceIds.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Duration</span>
                  <span className="font-medium text-gray-900">
                    {formData.duration ? `${formData.duration} days` : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Price</span>
                  <span className="font-medium text-gray-900">
                    {formData.total_price ? `$${formData.total_price}` : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddRoutePage;
