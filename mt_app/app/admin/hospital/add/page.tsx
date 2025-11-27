'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon, Languages, Globe2 } from 'lucide-react';
import '@/app/admin/styles/globals.css';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';

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
  Thai: boolean;
  Arabic: boolean;
  Myanmar: boolean;
  English: boolean;
  medical_services: MedicalService[];
}

const THAILAND_CITIES = [
  'Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi',
  'Koh Samui', 'Hua Hin', 'Ayutthaya', 'Sukhumvit', 'Silom',
  'Chatuchak', 'Sathorn', 'Thonglor', 'Ekkamai', 'On Nut',
  'Bang Na', 'Lat Krabang', 'Don Mueang', 'Suvarnabhumi', 'Other'
];

const languages = [
  { key: 'Thai', label: 'Thai 🇹🇭', color: 'bg-blue-100 border-blue-300' },
  { key: 'Arabic', label: 'Arabic 🇸🇦', color: 'bg-green-100 border-green-300' },
  { key: 'Myanmar', label: 'Myanmar 🇲🇲', color: 'bg-yellow-100 border-yellow-300' },
  { key: 'English', label: 'English 🇬🇧', color: 'bg-purple-100 border-purple-300' },
] as const;

const HospitalAddPage: React.FC = () => {
  const router = useRouter();
  const [Logoimage, setLogoImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [placeImages, setPlaceImages] = useState<Array<{ id: string; url: string; name: string; publicId?: string }>>([]);
  const [hospital, setHospital] = useState<Hospital>({
    name: '',
    hospital_code: '',
    location: '',
    city: '',
    description: '',
    contact_info: '',
    Thai: false,
    Arabic: false,
    Myanmar: false,
    English: false,
    medical_services: [],
  });

  const [saving, setSaving] = useState(false);

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
        image: image,
        logo: Logoimage,
        hospital_images: placeImages.map(img => img.url),
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

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  const handlelogoChange = (imageUrl: string | null) => {
    setLogoImage(imageUrl);
  };

  const handleCheckboxChange = (language: keyof Hospital) => {
    setHospital(prev => ({
      ...prev,
      [language]: !prev[language],
    }));
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
            <h2 className="text-xl font-semibold mb-4">Hospital's image and Logo</h2>
            <div className="flex justify-center items-start space-x-10">
              {/* Main Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Hospital Image
                    </label>
                    <SingleImageUpload
                      image={image}
                      onImageChange={handleImageChange}
                      disabled={saving}
                      placeholder="Click to upload main package image or drag and drop"
                    />
                  </div>
              {/* Logo Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image
                    </label>
                    <SingleImageUpload
                      image={Logoimage}
                      onImageChange={handlelogoChange}
                      disabled={saving}
                      placeholder="Click to upload main package image or drag and drop"
                    />
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


          <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Supported Languages</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {languages.map(lang => (
                <button
                  key={lang.key}
                  onClick={() => handleCheckboxChange(lang.key)}
                  type="button"
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                    ${
                      hospital[lang.key]
                        ? `${lang.color} scale-105 shadow-md`
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                >
                  <Globe2 className={`w-6 h-6 ${hospital[lang.key] ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className={`font-medium ${hospital[lang.key] ? 'text-blue-800' : 'text-gray-700'}`}>
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
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
          {/* Additional Images Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <ImageUpload
                images={placeImages}
                onImagesChange={setPlaceImages}
                maxImages={10}
                disabled={saving}
              />
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
