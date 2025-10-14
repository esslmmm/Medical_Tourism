'use client';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';

interface RouteItem { route_id: number; route_name: string | null }

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  publicId?: string;
}

const EditTripPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [selectedRouteIds, setSelectedRouteIds] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({ city: '', description: '', duration: '', total_price: '' });

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [tripRes, routesRes] = await Promise.all([
          fetch(`/api/admin/services/trips/${id}`),
          fetch('/api/admin/services/trips/routes'),
        ]);
        if (!tripRes.ok) throw new Error('Failed to fetch trip');
        const t = await tripRes.json();
        const linkedRoutes = Array.isArray(t?.Trip_Routes) ? t.Trip_Routes.map((tr: any) => tr.routes).filter(Boolean) : (t.routes ? [t.routes] : []);
        setFormData({
          city: t.city || '',
          description: '',
          duration: '',
          total_price: '',
        });
        setSelectedRouteIds(linkedRoutes.map((r: any) => r.route_id));
        
        const existingImages: UploadedImage[] = Array.isArray(t.trip_images) 
          ? t.trip_images.map((img: any, index: number) => ({
              id: `existing-${img.image_id}`,
              url: img.image,
              name: `Trip Image ${index + 1}`,
              publicId: img.image && img.image.includes('cloudinary') 
                ? img.image.split('/').pop()?.split('.')[0] 
                : undefined // Extract public ID from Cloudinary URL
            }))
          : [];
        setUploadedImages(existingImages);
        
        if (routesRes.ok) setRoutes(await routesRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadAll();
  }, [id]);

  const refreshImages = async () => {
    try {
      const tripRes = await fetch(`/api/admin/services/trips/${id}`);
      if (tripRes.ok) {
        const t = await tripRes.json();
        const existingImages: UploadedImage[] = Array.isArray(t.trip_images) 
          ? t.trip_images.map((img: any, index: number) => ({
              id: `existing-${img.image_id}`,
              url: img.image,
              name: `Trip Image ${index + 1}`,
              publicId: img.image && img.image.includes('cloudinary') 
                ? img.image.split('/').pop()?.split('.')[0] 
                : undefined
            }))
          : [];
        setUploadedImages(existingImages);
        console.log('Images refreshed:', existingImages);
      }
    } catch (e) {
      console.error('Failed to refresh images:', e);
    }
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const payload = {
        city: formData.city || undefined,
        route_ids: selectedRouteIds,
        images: uploadedImages.map(img => ({ url: img.url, publicId: img.publicId }))
      };
      const res = await fetch(`/api/admin/services/trips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update trip');
      }
      router.push(`/admin/trips/${id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to update trip');
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
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Trip
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Trip Images</h3>
                <button
                  onClick={refreshImages}
                  className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-300 rounded hover:bg-blue-50"
                >
                  Reset Images
                </button>
              </div>
              
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
                <div className="flex justify-between">
                  <span className="text-gray-800">Images</span>
                  <span className="font-medium text-gray-900">{uploadedImages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditTripPage;


