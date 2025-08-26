'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import '@/app/admin/styles/globals.css';

// Define interfaces based on your Prisma schema
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
  hospital_id: string;
  name: string;
  hospital_code: string;
  location: string;
  city: string;
  description: string;
  contact_info: string;
  image: string;
  logo: string;
  create_at: string;
  hospital_images: HospitalImage[];
  medical_services: MedicalService[];
}

// Thailand cities for dropdown
const THAILAND_CITIES = [
  'Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi',
  'Koh Samui', 'Hua Hin', 'Ayutthaya', 'Sukhumvit', 'Silom',
  'Chatuchak', 'Sathorn', 'Thonglor', 'Ekkamai', 'On Nut',
  'Bang Na', 'Lat Krabang', 'Don Mueang', 'Suvarnabhumi', 'Other'
];

const HospitalEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hospitalId = params?.id as string;

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  // ✅ Fetch hospital from API
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`/api/services/hospitals/${hospitalId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch hospital");
        }

        const data = await res.json();

        // Map API response to Hospital interface
        const fetchedHospital: Hospital = {
          hospital_id: hospitalId,
          name: data.name,
          hospital_code: data.hospital_code,
          location: data.location,
          city: data.city,
          description: data.description,
          contact_info: data.contact_info,
          image: data.image,
          logo: data.logo,
          create_at: data.create_at || "",
          hospital_images: data.hospital_images?.map((img: string | { image: string }) => ({
            image: typeof img === "string" ? img : img.image,
          })) || [],
          medical_services: data.medical_services || [],
        };

        setHospital(fetchedHospital);
        setLogoPreview(fetchedHospital.logo);
      } catch (error) {
        console.error("Error fetching hospital:", error);
        setHospital(null);
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchHospital();
    }
  }, [hospitalId]);

  // ✅ Handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle image upload (local preview only)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && hospital) {
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
    if (!hospital) return;
    const newImages = hospital.hospital_images.filter((_, i) => i !== index);
    setHospital({ ...hospital, hospital_images: newImages });
  };

  const handleMedicalServiceChange = (index: number, field: keyof MedicalService, value: string) => {
    if (!hospital) return;
    const newServices = [...hospital.medical_services];
    newServices[index] = { ...newServices[index], [field]: value };
    setHospital({ ...hospital, medical_services: newServices });
  };

  const addMedicalService = () => {
    if (!hospital) return;
    setHospital({
      ...hospital,
      medical_services: [...hospital.medical_services, { service_name: '', description: '' }]
    });
  };

  const removeMedicalService = (index: number) => {
    if (!hospital) return;
    const newServices = hospital.medical_services.filter((_, i) => i !== index);
    setHospital({ ...hospital, medical_services: newServices });
  };

  // ✅ Submit updated hospital to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospital) return;

    setSaving(true);

    try {
      const payload = {
        name: hospital.name,
        hospital_code: hospital.hospital_code,
        location: hospital.location,
        city: hospital.city,
        description: hospital.description,
        contact_info: hospital.contact_info,
        image: hospital.image,
        logo: logoFile ? logoPreview : hospital.logo,
        medical_services: hospital.medical_services.map((s) => ({
          service_name: s.service_name,
          description: s.description,
        })),
        hospital_images: hospital.hospital_images.map((img) => img.image),
      };

      const res = await fetch(`/api/services/hospitals/${hospital.hospital_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed to update hospital: ${res.statusText}`);

      const updatedHospital = await res.json();
      console.log("Updated hospital:", updatedHospital);

      router.push("/admin/hospitals");
    } catch (error) {
      console.error("Error updating hospital:", error);
      alert("Failed to update hospital. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Loading & Error States
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!hospital) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Hospital not found</h2>
          <p className="text-gray-600 mt-2">The hospital you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    );
  }


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/hospitals')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hospitals
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Hospital</h1>
              <p className="text-gray-600">Update hospital information and details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hospital Logo</h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Hospital Logo"
                  className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50"
                />
                {logoFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview(hospital.logo);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Logo
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
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 200x200px, PNG with transparent background
                </p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={100}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={20}
                  placeholder="e.g., BHH001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  value={hospital.city}
                  onChange={(e) => setHospital({ ...hospital, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a city</option>
                  {THAILAND_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={255}
                  placeholder="Street address, district, etc."
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Describe the hospital's services, facilities, and specialties"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information *
                </label>
                <textarea
                  value={hospital.contact_info}
                  onChange={(e) => setHospital({ ...hospital, contact_info: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={255}
                  placeholder="Phone numbers, email addresses, website, etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include phone, email, website, and other contact details
                </p>
              </div>

              
            </div>
          </div>

          {/* Medical Services */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Medical Services</h2>
            <div className="space-y-4">
              {hospital.medical_services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        value={service.service_name}
                        onChange={(e) => handleMedicalServiceChange(index, 'service_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        maxLength={255}
                        placeholder="e.g., Cardiology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => handleMedicalServiceChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={255}
                        placeholder="Brief description of the service"
                      />
                    </div>
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
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Medical Service
              </button>
            </div>
          </div>

          {/* Hospital Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hospital Images</h2>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Images
                </label>
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
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Choose Images
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  You can select multiple images. Recommended: 800x600px, JPG or PNG
                </p>
              </div>

              {/* Current Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/hospitals')}
              className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default HospitalEditPage;
