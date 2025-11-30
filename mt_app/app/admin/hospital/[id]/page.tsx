'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon, Building2, Info, Phone } from 'lucide-react';
import '@/app/admin/styles/globals.css';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageModal from '@/components/admin_component/ui/ImageModal';

const THAILAND_CITIES = [
  'Bangkok','Chiang Rai', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi',
  'Koh Samui', 'Hua Hin', 'Ayutthaya', 'Sukhumvit', 'Silom',
  'Chatuchak', 'Sathorn', 'Thonglor', 'Ekkamai', 'On Nut',
  'Bang Na', 'Lat Krabang', 'Don Mueang', 'Suvarnabhumi', 'Other'
];

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
  medical_services: { service_name: string; description: string | null }[];
  hospital_images: { image_id: number; image: string}[];
}

const HospitalEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hospitalId = params?.id as string;
  const [hospitalImages, setHospitalImages] = useState<{ id: string; url: string; name: string; publicId?: string }[]>([]);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState<{ image_id: number; url: string; name: string; publicId?: string }[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch hospital
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`/api/admin/services/hospitals/${hospitalId}`);
        const data = await res.json();
        setHospital(data);
        // Load existing place_images
        const existingHosImages = (data.hospital_images || []).map((img: any, index: number) => ({
          id: `existing-${img.image_id}`,
          url: img.image,
          name: img.name || `Hospital Image ${index + 1}`,
          publicId: img.image && img.image.includes('cloudinary')
            ? img.image.split('/').pop()?.split('.')[0]
            : undefined
        }));
        const existingImages = (data.hospital_images || []).map((img: any, index: number) => ({
          image_id: `existing-${img.image_id}`,
          url: img.image,
          name: img.name || `Hospital Image ${index + 1}`,
          publicId: img.image && img.image.includes('cloudinary')
            ? img.image.split('/').pop()?.split('.')[0]
            : undefined
        }));
        setImages(existingImages);
        setHospitalImages(existingHosImages);
        setImage(data.image);
        setLogoPreview(data.logo);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (hospitalId) fetchHospital();
  }, [hospitalId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const playload: any = { ...hospital, image: image, logo: logoPreview, hospital_images: hospitalImages.map(img => img.url), };

      const res = await fetch(`/api/admin/services/hospitals/${hospitalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playload),
      });
      if (!res.ok) throw new Error('Failed to update hospital');
      router.push('/admin/hospital');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  const handleLogoChange = (imageUrl: string | null) => {
    setLogoPreview(imageUrl);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-80">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!hospital) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900">Hospital not found</h2>
          <p className="text-gray-500 mt-2">The hospital you’re looking for doesn’t exist.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-10 text-black">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push('/admin/hospital')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-400 hover:bg-gray-200 text-sm font-medium"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="submit"
                form="hospital-form"
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save</span>}
              </button>
            )}
          </div>
        </div>

        <form id="hospital-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Logo */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Building2 className="w-5 h-5" /> Hospital Branding
            </h2>

            <div className="flex items-center gap-8">
              {/* Hospital Logo */}
              {!isEditing && (
              <div className='flex justify-around w-full'>
                <div className="flex flex-col items-center">
                  <img
                    src={logoPreview || ''}
                    alt="Hospital Logo"
                    className="w-32 h-32 rounded-lg border border-gray-200 object-contain bg-gray-50"
                  />
                  <p className="mt-2 text-sm text-gray-600">Logo</p>
                </div>

                {/* Hospital Main Image */}
                <div className="flex flex-col items-center">
                  <img
                    src={hospital.image}     // <-- your hospital main picture
                    alt="Hospital"
                    className="w-40 h-32 rounded-lg border border-gray-200 object-contain bg-gray-50"
                  />
                  <p className="mt-2 text-sm text-gray-600">Hospital Image</p>
                </div>
              </div>
              )}

              {/* File uploader (only when editing) */}
              {isEditing && (
              <div className='flex w-full justify-around'>
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Image
                </label>
                <SingleImageUpload
                  image={logoPreview}
                  onImageChange={handleLogoChange}
                  disabled={saving}
                  placeholder="Click to upload or replace main place image"
                />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Hospital Image
                  </label>
                  <SingleImageUpload
                    image={image}
                    onImageChange={handleImageChange}
                    disabled={saving}
                    placeholder="Click to upload or replace main place image"
                  />
                </div>
              </div>
              )}
              
            </div>
          </div>


          {/* Basic Info */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"><Info className="w-5 h-5" /> Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input disabled={!isEditing} value={hospital.name} onChange={e => setHospital({ ...hospital, name: e.target.value })} placeholder="Hospital Name" className="px-3 py-2 border border-gray-200 rounded-lg w-full" />
              <input disabled={!isEditing} value={hospital.hospital_code} onChange={e => setHospital({ ...hospital, hospital_code: e.target.value })} placeholder="Code" className="px-3 py-2 border border-gray-200 rounded-lg w-full" />
              <select disabled={!isEditing} value={hospital.city} onChange={e => setHospital({ ...hospital, city: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg w-full">
                <option value="">{hospital.city}</option>
                {THAILAND_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <input disabled={!isEditing} value={hospital.location} onChange={e => setHospital({ ...hospital, location: e.target.value })} placeholder="Address" className="px-3 py-2 border border-gray-200 rounded-lg w-full" />
              <textarea disabled={!isEditing} value={hospital.description} onChange={e => setHospital({ ...hospital, description: e.target.value })} placeholder="Description" className="md:col-span-2 px-3 py-2 border border-gray-200 rounded-lg w-full h-28" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"><Phone className="w-5 h-5" /> Contact Information</h2>
            <textarea disabled={!isEditing} value={hospital.contact_info} onChange={e => setHospital({ ...hospital, contact_info: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg h-24" />
          </div>

          {/* Services */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Services</h2>
            <div className="space-y-4">
              {hospital.medical_services?.map((s: any, i: number) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div className="flex-1 space-y-2">
                    <input disabled={!isEditing} value={s.service_name ?? ""} onChange={e => { const ms = [...hospital.medical_services]; ms[i].service_name = e.target.value; setHospital({ ...hospital, medical_services: ms }) }} placeholder="Service Name" className="w-full px-3 py-2 border border-gray-200 font-bold rounded-lg" />
                    <input disabled={!isEditing} value={s.description ?? ""} onChange={e => { const ms = [...hospital.medical_services]; ms[i].description = e.target.value; setHospital({ ...hospital, medical_services: ms }) }} placeholder="Description" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  {isEditing && (
                    <button type="button" onClick={() => setHospital({ ...hospital, medical_services: hospital.medical_services.filter((_: any, idx: number) => idx !== i) })} className="ml-3 text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button type="button" onClick={() => setHospital({ ...hospital, medical_services: [...hospital.medical_services, { service_name: '', description: '' }] })} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hospital Images</h2>
              {!isEditing && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {hospital.hospital_images.map((image: any, index: number) => (
                    <div 
                      key={image.image_id} 
                      className="relative group cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image.image}
                        alt={`Hospital image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                      />
                    </div>
                  ))}
                </div>
              )}
            {isEditing && (
              <ImageUpload
                images={hospitalImages}
                onImagesChange={setHospitalImages}
                maxImages={10}
                disabled={saving}
              />
            )}
          </div>
        </form>
      </div>
      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={images || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </AdminLayout>
  );
};

export default HospitalEditPage;
