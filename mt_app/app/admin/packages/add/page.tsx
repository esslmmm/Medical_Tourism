'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Plus, Save, Trash2, Package } from 'lucide-react';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';

interface Description {
  text: string;
}

interface PackageImage {
  id: string; 
  url: string; 
  name: string; 
  publicId?: string
}

interface Hospital {
  hospital_id: string;
  name: string;
}

interface Route {
  tour_id: number;
}

const AddPackagePage: React.FC = () => {
  const router = useRouter();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [saving, setSaving] = useState(false);
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
  const [routes, setRoutes] = useState<Route[]>([]);

  // Data from APIs
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [trips, setTrips] = useState<{ tour_id: number; city: string | null; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hRes, tRes] = await Promise.all([
          fetch('/api/admin/services/hospitals'),
          fetch('/api/admin/services/trips'),
        ]);
        
        if (hRes.ok) setHospitals(await hRes.json());
        if (tRes.ok) setTrips(await tRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
        showError('Error fetching data', 'Please refresh the page and try again');
      }
    };

    fetchData();
  }, []);

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

  const addDescription = () => {
    setDescriptions([...descriptions, { text: '' }]);
  };

  const removeDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const removeSelectedTrip = () => {
    setRoutes([]);
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
        showError('Missing feature Texts', 'Please fill Text for all package features');
        setSaving(false);
        return;
      }

      // Clean and filter data
      const cleanedDescriptions = descriptions.filter(desc => 
        desc.text && desc.text.trim() !== ''
      );
      const selectedTourId = routes[0]?.tour_id;

      const payload = {
        package_name: formData.package_name,
        package_type: formData.package_type,
        hospital_id: formData.hospital_id,
        image: image,
        status: formData.status,
        detail: formData.detail,
        expired_date: formData.expired_date,
        tour_id: selectedTourId,
        descriptions: cleanedDescriptions,
        images: packageImages.map(img => ({ images: img.url })),
      };

      const response = await fetch('/api/admin/services/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newPackage = await response.json();
        showSuccess('Package created successfully', `${newPackage.package_name} has been added to the system`);
        setTimeout(() => {
          router.push(`/admin/packages/${newPackage.package_id}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        console.error('Failed to create package:', errorData);
        showError('Failed to create package', errorData.details || errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating package:', error);
      showError('Error creating package', 'Please try again later');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/packages')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Packages
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Package</h1>
                <p className="text-gray-800">Create a new medical tourism package</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/admin/packages')}
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
                {saving ? 'Creating...' : 'Create Package'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Main Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Place Image
                    </label>
                    <SingleImageUpload
                      image={image}
                      onImageChange={handleImageChange}
                      disabled={saving}
                      placeholder="Click to upload main package image or drag and drop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name *
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital *
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expired Date *
                    </label>
                    <input
                      type="date"
                      value={formData.expired_date}
                      onChange={(e) => handleInputChange('expired_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Type
                    </label>
                    <select
                      value={formData.package_type}
                      onChange={(e) => handleInputChange('package_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="Medical_Tourism">Medical_Tourism</option>
                      <option value="Medical_Service_Only">Medical_Service_Only</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
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

              {/* Package Descriptions */}
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text
                          </label>
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

              {/* Routes/Trips */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Tour Routes</h2>
                  <div className="flex items-center gap-3">
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
                          {trip.city || `Trip ${trip.tour_id}`} ({trip.city || ''} )
                        </option>
                      ))}
                    </select>
                    {routes.length > 0 && (
                      <button
                        type="button"
                        onClick={removeSelectedTrip}
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
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
                    <Package className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{formData.package_name || 'Package Name'}</h4>
                  <p className="text-sm text-gray-800 mt-2">{formData.status}</p>
                </div>
              </div>

              {/* Quick Stats */}
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
                    <span className="text-gray-800">Trip Route</span>
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

export default AddPackagePage;