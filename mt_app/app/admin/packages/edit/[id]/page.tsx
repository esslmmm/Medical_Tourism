"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Save, Trash2, ArrowLeft, Package as PackageIcon, Plus } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';

interface Description {
  id?: number;
  text: string;
}

interface PackageImage {
  id: string;
  url: string;
  name: string;
  publicId?: string;
}

interface RouteItem {
  tour_id: number;
}

interface HospitalDoctor {
  doctor_id: string;
  name: string;
  specialization: string;
}

interface Hospital {
  hospital_id: string;
  name: string;
  doctors: HospitalDoctor[];
}

const EditPackagePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    package_name: '',
    package_type: 'Medical_Tourism',
    hospital_id: '',
    detail: '',
    expired_date: '',
    status: 'Active',
  });

  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [packageImages, setPackageImages] = useState<PackageImage[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>([]);

  // Data from APIs
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [trips, setTrips] = useState<{ tour_id: number; city: string | null; }[]>([]);

  // Prefill data
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [pkgRes, hRes, tRes] = await Promise.all([
          fetch(`/api/admin/services/packages/${id}`),
          fetch('/api/admin/services/hospitals'),
          fetch('/api/admin/services/trips'),
        ]);

        if (!pkgRes.ok) throw new Error('Failed to load package');
        const pkg = await pkgRes.json();

        setFormData({
          package_name: pkg.package_name || '',
          package_type: pkg.package_type || 'Medical_Tourism',
          hospital_id: pkg.hospital_id || '',
          detail: pkg.detail || '',
          expired_date: pkg.expired_date ? String(pkg.expired_date).slice(0, 10) : '',
          status: pkg.status || 'Active',
        });

        setImage(pkg.image || null);
        setDescriptions(
          (pkg.description || []).map((d: any) => ({ id: d.description_id, text: d.text || '' }))
        );

        const existingImages: PackageImage[] = Array.isArray(pkg.package_image) 
          ? pkg.package_image.map((img: any, index: number) => ({
              id: `existing-${img.image_id}`,
              url: img.url,
              name: img.name || `Package's image ${index + 1}`,
              publicId: img.image && img.image.includes('cloudinary') 
                ? img.image.split('/').pop()?.split('.')[0] 
                : undefined
            }))
          : [];
        setPackageImages(existingImages);

        const initialTourId = pkg.tour_id ?? (Array.isArray(pkg.trips) ? pkg.trips[0]?.tour_id : pkg.trips?.tour_id);
        setRoutes(initialTourId ? [{ tour_id: initialTourId }] : []);

        if (hRes.ok) setHospitals(await hRes.json());
        if (tRes.ok) setTrips(await tRes.json());
      } catch (err) {
        console.error(err);
        showError('Failed to load data', 'Please refresh and try again');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadAll();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDescriptionChange = (index: number, field: keyof Description, value: string) => {
    const updated = [...descriptions];
    updated[index] = { ...updated[index], [field]: value };
    setDescriptions(updated);
  };

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  const addDescription = () => setDescriptions([...descriptions, { text: '' }]);
  const removeDescription = (index: number) => setDescriptions(descriptions.filter((_, i) => i !== index));

  const refreshImages = async () => {
    try {
      const tripRes = await fetch(`/api/admin/services/packages/${id}`);
      if (tripRes.ok) {
        const t = await tripRes.json();
        const existingImages: PackageImage[] = Array.isArray(t.package_image) 
          ? t.package_image.map((img: any, index: number) => ({
              id: `existing-${img.image_id}`,
              url: img.url,
              name: img.name || `Package's image ${index + 1}`,
              publicId: img.image && img.image.includes('cloudinary') 
                ? img.image.split('/').pop()?.split('.')[0] 
                : undefined
            }))
          : [];
        setPackageImages(existingImages);
      }
    } catch (e) {
      console.error('Failed to refresh images:', e);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate required fields
      if (!formData.package_name.trim()) {
        showError('Missing package name', 'Package name is required');
        setSaving(false);
        return;
      }
      if (!formData.hospital_id) {
        showError('Missing hospital', 'Please select a hospital');
        setSaving(false);
        return;
      }
      if (!formData.detail.trim()) {
        showError('Missing description', 'Package description is required');
        setSaving(false);
        return;
      }
      if (!formData.expired_date) {
        showError('Missing expired date', 'Expired date is required');
        setSaving(false);
        return;
      }
      if (!routes[0]?.tour_id) {
        showError('Missing tour route', 'Please select a tour route');
        setSaving(false);
        return;
      }

      // Validate: all feature rows must have a title
      if (descriptions.some(desc => (desc.text || '').trim() === '')) {
        showError('Missing feature titles', 'Please fill Title for all package features');
        setSaving(false);
        return;
      }

      const cleanedDescriptions = descriptions.filter(d => d.text && d.text.trim() !== '');

      const payload: any = {
        package_name: formData.package_name.trim(),
        package_type: formData.package_type,
        hospital_id: formData.hospital_id,
        image: image,
        status: formData.status,
        detail: formData.detail.trim(),
        expired_date: formData.expired_date,
        tour_id: routes[0]?.tour_id,
        descriptions: cleanedDescriptions.map(d => ({ id: d.id, text: d.text.trim() })),
        images: packageImages.map(img => ({ url: img.url, publicId: img.publicId, alt: img.name })),
      };

      const response = await fetch(`/api/admin/services/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to update package:', errorData);
        showError('Failed to update package', errorData.details || errorData.error || 'Unknown error');
        setSaving(false);
        return;
      }

      const result = await response.json();
      showSuccess('Package updated successfully', `${result.updatedPackage?.package_name || 'Package'} has been updated`);
      setTimeout(() => router.push(`/admin/packages/${id}`), 1500);
    } catch (error) {
      console.error('Error updating package:', error);
      showError('Error updating package', 'Please try again later');
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
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Package
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
                <p className="text-gray-800">Update medical tourism package</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push(`/admin/packages/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Name *</label>
                    <input
                      type="text"
                      value={formData.package_name}
                      onChange={(e) => handleInputChange('package_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter package name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital *</label>
                    <select
                      value={formData.hospital_id}
                      onChange={(e) => handleInputChange('hospital_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    >
                      <option value="">Select Hospital</option>
                      {hospitals.map((hospital) => (
                        <option key={hospital.hospital_id} value={hospital.hospital_id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expired Date *</label>
                    <input
                      type="date"
                      value={formData.expired_date}
                      onChange={(e) => handleInputChange('expired_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                    <select
                      value={formData.package_type}
                      onChange={(e) => handleInputChange('package_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="Medical_Tourism">Medical_Tourism</option>
                      <option value="Medical_Service_Only">Medical_Service_Only</option>
                    </select>
                  </div>
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={formData.detail}
                      onChange={(e) => handleInputChange('detail', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Detailed description of the package"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Package Features</h2>
                  <button
                    onClick={addDescription}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {descriptions.map((description, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
                        <button
                          onClick={() => removeDescription(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={description.text}
                            onChange={(e) => handleDescriptionChange(index, 'text', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Medical Consultation"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {descriptions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No package features. Click "Add Feature" to add one.</p>
                  )}
                </div>
              </div>

              {/* Package Images */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Gallery Images</h2>
                  <button
                      onClick={refreshImages}
                      className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-300 rounded hover:bg-blue-50"
                    >
                      Reset Images
                    </button>
                </div>
                {/* Additional Images Upload */}
                <div className="md:col-span-2">
                  <ImageUpload
                    images={packageImages}
                    onImagesChange={setPackageImages}
                    maxImages={10}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Tour Routes</h2>
                  <div className="flex items-center gap-3">
                    {routes[0]?.tour_id ? (
                      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                        <span>
                          {trips.find(t => t.tour_id === routes[0]?.tour_id)?.city || `Trip ${routes[0]?.tour_id}`}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No trip selected</span>
                    )}
                    <select
                      value={routes[0]?.tour_id ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) {
                          setRoutes([]);
                          return;
                        }
                        const tourId = Number(value);
                        setRoutes([{ tour_id: tourId }]);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    >
                      <option value="">Select Trip</option>
                      {trips.map((trip) => (
                        <option key={trip.tour_id} value={trip.tour_id}>
                          {trip.city || `Trip ${trip.tour_id}`} ({trip.city || ''})
                        </option>
                      ))}
                    </select>
                    {routes.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setRoutes([])}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Package Preview</h3>
                <div className="text-center">
                  {image && (
                    <img
                      src={image}
                      alt={formData.package_name}
                      className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-200"
                    />
                  )}
                  <div className="text-center">
                    <PackageIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{formData.package_name || 'Package Name'}</h4>
                  <p className="text-sm text-gray-800 mt-2">{formData.status}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Features</span>
                    <span className="font-medium text-gray-900">{descriptions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Gallery Images</span>
                    <span className="font-medium text-gray-900">{packageImages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Tour Routes</span>
                    <span className="font-medium text-gray-900">{routes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditPackagePage;
