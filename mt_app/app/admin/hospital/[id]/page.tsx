'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon, Building2, Info, Phone } from 'lucide-react';
import '@/app/admin/styles/globals.css';

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

  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch hospital
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`/api/services/hospitals/${hospitalId}`);
        const data = await res.json();
        setHospital(data);
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
      const res = await fetch(`/api/services/hospitals/${hospital.hospital_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospital),
      });
      if (!res.ok) throw new Error('Failed to update hospital');
      router.push('/admin/hospital');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
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
                {saving ? 'Saving...' : <span className="flex items-center gap-2"><Save className="w-4 h-4"/> Save</span>}
              </button>
            )}
          </div>
        </div>

        <form id="hospital-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Logo */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"><Building2 className="w-5 h-5"/> Hospital Logo</h2>
            <div className="flex items-center gap-6">
              <img src={logoPreview} alt="Logo" className="w-32 h-32 rounded-lg border border-gray-200 object-contain bg-gray-50" />
              {isEditing && (
                <div>
                  <label htmlFor="logo-upload" className="flex items-center gap-2 px-4 py-2  bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4"/> Change Logo
                  </label>
                  <input id="logo-upload" type="file" accept="image/*" className="hidden"/>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"><Info className="w-5 h-5"/> Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input disabled={!isEditing} value={hospital.name} onChange={e=>setHospital({...hospital,name:e.target.value})} placeholder="Hospital Name" className="px-3 py-2 border border-gray-200 rounded-lg w-full"/>
              <input disabled={!isEditing} value={hospital.hospital_code} onChange={e=>setHospital({...hospital,hospital_code:e.target.value})} placeholder="Code" className="px-3 py-2 border border-gray-200 rounded-lg w-full"/>
              <select disabled={!isEditing} value={hospital.city} onChange={e=>setHospital({...hospital,city:e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg w-full">
                <option value="">Select City</option>
                {THAILAND_CITIES.map(c=><option key={c}>{c}</option>)}
              </select>
              <input disabled={!isEditing} value={hospital.location} onChange={e=>setHospital({...hospital,location:e.target.value})} placeholder="Address" className="px-3 py-2 border border-gray-200 rounded-lg w-full"/>
              <textarea disabled={!isEditing} value={hospital.description} onChange={e=>setHospital({...hospital,description:e.target.value})} placeholder="Description" className="md:col-span-2 px-3 py-2 border border-gray-200 rounded-lg w-full h-28"/>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"><Phone className="w-5 h-5"/> Contact Information</h2>
            <textarea disabled={!isEditing} value={hospital.contact_info} onChange={e=>setHospital({...hospital,contact_info:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg h-24"/>
          </div>

          {/* Services */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Services</h2>
            <div className="space-y-4">
              {hospital.medical_services?.map((s:any,i:number)=>(
                <div key={i} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div className="flex-1 space-y-2">
                    <input disabled={!isEditing} value={s.service_name} onChange={e=>{const ms=[...hospital.medical_services];ms[i].service_name=e.target.value;setHospital({...hospital,medical_services:ms})}} placeholder="Service Name" className="w-full px-3 py-2 border border-gray-200 font-bold rounded-lg"/>
                    <input disabled={!isEditing} value={s.description} onChange={e=>{const ms=[...hospital.medical_services];ms[i].description=e.target.value;setHospital({...hospital,medical_services:ms})}} placeholder="Description" className="w-full px-3 py-2 border border-gray-200 rounded-lg"/>
                  </div>
                  {isEditing && (
                    <button type="button" onClick={()=>setHospital({...hospital,medical_services:hospital.medical_services.filter((_:any,idx:number)=>idx!==i)})} className="ml-3 text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5"/>
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button type="button" onClick={()=>setHospital({...hospital,medical_services:[...hospital.medical_services,{service_name:'',description:''}]})} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Plus className="w-4 h-4"/> Add Service
                </button>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hospital Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hospital.hospital_images?.map((img:any,i:number)=>(
                <div key={i} className="relative group">
                  <img src={img.image} className="w-full h-32 rounded-lg border border-gray-200 object-cover"/>
                  {isEditing && (
                    <button type="button" onClick={()=>setHospital({...hospital,hospital_images:hospital.hospital_images.filter((_:any,idx:number)=>idx!==i)})} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                      <X className="w-4 h-4"/>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <label htmlFor="images-upload" className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <ImageIcon className="w-4 h-4"/> Add Images
                <input id="images-upload" type="file" multiple className="hidden"/>
              </label>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default HospitalEditPage;
