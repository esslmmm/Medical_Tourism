'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';

interface Place {
  place_id: string;
  name: string | null;
  city?: string | null;
}

const EditRoutePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    adult_price: '',
    child_price: '',
    guide_price: '',
    car_service_price: '',
  });

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [routeRes, placesRes] = await Promise.all([
          fetch(`/api/admin/services/trips/routes/${id}`),
          fetch('/api/services/places'),
        ]);
        if (!routeRes.ok) throw new Error('Failed to fetch route');
        const route = await routeRes.json();
        setFormData({
          title: route.title || '',
          description: route.description || '',
          duration: route.duration ?? '',
          adult_price: route.adult_price ?? '',
          child_price: route.child_price ?? '',
          guide_price: route.guide_price ?? '',
          car_service_price: route.car_service_price ?? '',
        });
        setImage(route.image);
        setSelectedPlaceIds((route.attractions || []).map((pp: any) => pp.place_id).filter((x: any) => !!x));
        if (placesRes.ok) setPlaces(await placesRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadAll();
  }, [id]);

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const payload = {
        title: formData.title || null,
        image: image,
        description: formData.description || null,
        duration: formData.duration ? Number(formData.duration) : null,
        adult_price: formData.adult_price ? Number(formData.adult_price) : null,
        child_price: formData.child_price ? Number(formData.child_price) : null,
        guide_price: formData.guide_price ? Number(formData.guide_price) : null,
        car_service_price: formData.car_service_price ? Number(formData.car_service_price) : null,
        place_ids: selectedPlaceIds,
      };
      const res = await fetch(`/api/admin/services/trips/routes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update route');
      }
      router.push(`/admin/routes/${id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to update route');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Route
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Route Details</h2>
              {/* Main Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Package Image
                    </label>
                    <SingleImageUpload
                      image={image}
                      onImageChange={handleImageChange}
                      disabled={saving}
                      placeholder="Click to upload main package image or drag and drop"
                    />
                  </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route Name</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Bangkok City Tour"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Child Price</label>
                  <input
                    type="number"
                    value={formData.child_price}
                    onChange={(e) => setFormData({ ...formData, child_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 500THB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adult Price</label>
                  <input
                    type="number"
                    value={formData.adult_price}
                    onChange={(e) => setFormData({ ...formData, adult_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 500THB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Service Price</label>
                  <input
                    type="number"
                    value={formData.car_service_price}
                    onChange={(e) => setFormData({ ...formData, car_service_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 500THB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guide Service Price</label>
                  <input
                    type="number"
                    value={formData.guide_price}
                    onChange={(e) => setFormData({ ...formData, guide_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 500THB"
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
                        {p.name || 'Unnamed Place'}
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
                      <span className="text-sm text-gray-900">{p?.name || pid}</span>
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
                  <span className="text-gray-800">Child Price</span>
                  <span className="font-medium text-gray-900">
                    {formData.child_price ? `$${formData.child_price}` : 'Not set'}
                  </span>
                </div><div className="flex justify-between">
                  <span className="text-gray-800">Adult Price</span>
                  <span className="font-medium text-gray-900">
                    {formData.child_price ? `$${formData.adult_price}` : 'Not set'}
                  </span>
                </div><div className="flex justify-between">
                  <span className="text-gray-800">Car Service Price</span>
                  <span className="font-medium text-gray-900">
                    {formData.child_price ? `$${formData.car_service_price}` : 'Not set'}
                  </span>
                </div><div className="flex justify-between">
                  <span className="text-gray-800">Guide Sercive Price</span>
                  <span className="font-medium text-gray-900">
                    {formData.child_price ? `$${formData.guide_price}` : 'Not set'}
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

export default EditRoutePage;
