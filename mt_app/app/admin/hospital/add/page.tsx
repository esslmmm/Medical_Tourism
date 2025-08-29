'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import '@/app/admin/styles/globals.css';

interface HospitalImage {
  image_id?: number;
  image: string;
}

interface MedicalService {
  service_id?: number;
  service_name: string;
  description: string;
}

interface Hospital {
  name: string;
  hospital_code: string;
  location: string;
  city: string;
  description: string;
  contact_info: string;
  image: string;
  logo: string;
  hospital_images: HospitalImage[];
  medical_services: MedicalService[];
}

const THAILAND_CITIES = [
  'Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi',
  'Koh Samui', 'Hua Hin', 'Ayutthaya', 'Sukhumvit', 'Silom',
  'Chatuchak', 'Sathorn', 'Thonglor', 'Ekkamai', 'On Nut',
  'Bang Na', 'Lat Krabang', 'Don Mueang', 'Suvarnabhumi', 'Other'
];

const HospitalAddPage: React.FC = () => {
  const router = useRouter();

  const [hospital, setHospital] = useState<Hospital>({
    name: '',
    hospital_code: '',
    location: '',
    city: '',
    description: '',
    contact_info: '',
    image: '',
    logo: '',
    hospital_images: [],
    medical_services: [],
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle hospital image upload (preview only)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: HospitalImage[] = Array.from(files).map(file => ({
        image: URL.createObjectURL(file)
      }));
      setHospital({
        ...hospital,
        hospital_images: [...hospital.hospital_images, ...newImages]
      });
    }
  };

  const removeHospitalImage = (index: number) => {
    const newImages = hospital.hospital_images.filter((_, i) => i !== index);
    setHospital({ ...hospital, hospital_images: newImages });
  };

  const handleMedicalServiceChange = (index: number, field: keyof MedicalService, value: string) => {
    const newServices = [...hospital.medical_services];
    newServices[index] = { ...newServices[index], [field]: value };
    setHospital({ ...hospital, medical_services: newServices });
  };

  const addMedicalService = () => {
    setHospital({
      ...hospital,
      medical_services: [...hospital.medical_services, { service_name: '', description: '' }]
    });
  };

  const removeMedicalService = (index: number) => {
    const newServices = hospital.medical_services.filter((_, i) => i !== index);
    setHospital({ ...hospital, medical_services: newServices });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...hospital,
        logo: logoFile ? logoPreview : '',
        hospital_images: hospital.hospital_images.map(img => img.image),
      };

      const res = await fetch('/api/services/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed to add hospital: ${res.statusText}`);

      const newHospital = await res.json();
      console.log('Added hospital:', newHospital);

      router.push('/admin/hospital');
    } catch (error) {
      console.error(error);
      alert('Failed to add hospital. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/hospital')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hospitals
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Hospital</h1>
              <p className="text-gray-600">Fill out the form to add a new hospital</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hospital Logo</h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Hospital Logo"
                    className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50"
                  />
                )}
                {logoFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Logo
                </label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  value={hospital.name}
                  onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Code *
                </label>
                <input
                  type="text"
                  value={hospital.hospital_code}
                  onChange={(e) => setHospital({ ...hospital, hospital_code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  value={hospital.city}
                  onChange={(e) => setHospital({ ...hospital, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a city</option>
                  {THAILAND_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Address *
                </label>
                <input
                  type="text"
                  value={hospital.location}
                  onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={hospital.description}
                  onChange={(e) => setHospital({ ...hospital, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <textarea
              value={hospital.contact_info}
              onChange={(e) => setHospital({ ...hospital, contact_info: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Medical Services */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Medical Services</h2>
            <div className="space-y-4">
              {hospital.medical_services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      value={service.service_name}
                      onChange={(e) => handleMedicalServiceChange(index, 'service_name', e.target.value)}
                      placeholder="Service Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => handleMedicalServiceChange(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeMedicalService(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addMedicalService}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Medical Service
              </button>
            </div>
          </div>

          {/* Hospital Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hospital Images</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="images-upload"
            />
            <label
              htmlFor="images-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Images
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {hospital.hospital_images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.image}
                    alt={`Hospital image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeHospitalImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/hospital')}
              className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Hospital
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default HospitalAddPage;
