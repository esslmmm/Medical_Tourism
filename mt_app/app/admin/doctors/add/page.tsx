'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Plus, Trash2, User } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import '@/app/admin/styles/globals.css';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';

// Define interfaces
interface DocEducation {
  field_of_study: string;
  institution: string;
  year: string;
}

interface DocCertificate {
  field_of_study: string;
  institution: string;
  year: string;
}

interface DocLanguage {
  languages: string;
}

const AddDoctorPage: React.FC = () => {
  const router = useRouter();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [saving, setSaving] = useState(false);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [image, setImage] = useState<string | null>(null);
  

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    hospital_id: '',
    experience: '',
    description: '',
    image: '',
  });

  const [docEducation, setDocEducation] = useState<DocEducation[]>([]);
  const [docCertificate, setDocCertificate] = useState<DocCertificate[]>([]);
  const [docLanguage, setDocLanguage] = useState<DocLanguage[]>([]);

  // Fetch hospitals for dropdown
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('/api/services/hospitals');
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error('Failed to fetch hospitals:', response.status);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEducationChange = (index: number, field: keyof DocEducation, value: string) => {
    const updated = [...docEducation];
    updated[index] = { ...updated[index], [field]: value };
    setDocEducation(updated);
  };

  const handleCertificateChange = (index: number, field: keyof DocCertificate, value: string) => {
    const updated = [...docCertificate];
    updated[index] = { ...updated[index], [field]: value };
    setDocCertificate(updated);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const updated = [...docLanguage];
    updated[index] = { ...updated[index], languages: value };
    setDocLanguage(updated);
  };

  const addEducation = () => {
    setDocEducation([...docEducation, { field_of_study: '', institution: '', year: '' }]);
  };

  const removeEducation = (index: number) => {
    setDocEducation(docEducation.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    setDocCertificate([...docCertificate, { field_of_study: '', institution: '', year: '' }]);
  };

  const removeCertificate = (index: number) => {
    setDocCertificate(docCertificate.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    setDocLanguage([...docLanguage, { languages: '' }]);
  };

  const removeLanguage = (index: number) => {
    setDocLanguage(docLanguage.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Filter and clean the data
      const cleanedEducation = docEducation.filter(edu => 
        edu.field_of_study && edu.field_of_study.trim() !== ''
      );
      const cleanedCertificates = docCertificate.filter(cert => 
        cert.field_of_study && cert.field_of_study.trim() !== ''
      );
      const cleanedLanguages = docLanguage.filter(lang => 
        lang.languages && lang.languages.trim() !== ''
      );

      const payload = {
        ...formData,
        doc_education: cleanedEducation,
        doc_certificate: cleanedCertificates,
        doc_language: cleanedLanguages,
      };

      const response = await fetch('/api/admin/services/doctors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newDoctor = await response.json();
        showSuccess('Doctor created successfully', `Dr. ${newDoctor.name} has been added to the system`);
        setTimeout(() => {
          router.push(`/admin/doctors/${newDoctor.doctor_id}`);
        }, 1500);
      } else {
        console.error('Response status:', response.status);
        console.error('Response headers:', response.headers);
        const responseText = await response.text();
        console.error('Response body:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: 'Invalid JSON response', body: responseText };
        }
        
        console.error('Failed to create doctor:', errorData);
        showError('Failed to create doctor', errorData.details || errorData.error || responseText || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
      showError('Error creating doctor', 'Please try again later');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
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
              onClick={() => router.push('/admin/doctors')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Doctors
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
              <p className="text-gray-800">Create a new doctor profile</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/admin/doctors')}
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
              {saving ? 'Creating...' : 'Create Doctor'}
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
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter doctor name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Cardiology, Neurology"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital
                  </label>
                  <select
                    value={formData.hospital_id}
                    onChange={(e) => handleInputChange('hospital_id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 10 years"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Brief description about the doctor"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <button
                  onClick={addEducation}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Education
                </button>
              </div>
              <div className="space-y-4">
                {docEducation.map((education, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={education.field_of_study}
                          onChange={(e) => handleEducationChange(index, 'field_of_study', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., Medicine"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={education.institution}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., Harvard Medical School"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={education.year}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., 2015"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {docEducation.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No education records. Click "Add Education" to add one.</p>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Certificates</h2>
                <button
                  onClick={addCertificate}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Certificate
                </button>
              </div>
              <div className="space-y-4">
                {docCertificate.map((certificate, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Certificate {index + 1}</h4>
                      <button
                        onClick={() => removeCertificate(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={certificate.field_of_study}
                          onChange={(e) => handleCertificateChange(index, 'field_of_study', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., Cardiology"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={certificate.institution}
                          onChange={(e) => handleCertificateChange(index, 'institution', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., American Board of Cardiology"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={certificate.year}
                          onChange={(e) => handleCertificateChange(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., 2018"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {docCertificate.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No certificates. Click "Add Certificate" to add one.</p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
                <button
                  onClick={addLanguage}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Language
                </button>
              </div>
              <div className="space-y-3">
                {docLanguage.map((language, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={language.languages}
                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="e.g., English, Thai, Chinese"
                    />
                    <button
                      onClick={() => removeLanguage(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {docLanguage.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No languages. Click "Add Language" to add one.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Doctor Preview</h3>
              <div className="text-center">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border border-gray-200"
                  />
                )}
                <h4 className="font-semibold text-gray-900">{formData.name || 'Doctor Name'}</h4>
                <p className="text-sm text-blue-600 font-medium">{formData.specialization || 'Specialization'}</p>
                <p className="text-sm text-gray-800 mt-2">{formData.experience || 'Experience'}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-800">Education Records</span>
                  <span className="font-medium text-gray-900">{docEducation.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Certificates</span>
                  <span className="font-medium text-gray-900">{docCertificate.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Languages</span>
                  <span className="font-medium text-gray-900">{docLanguage.length}</span>
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

export default AddDoctorPage;