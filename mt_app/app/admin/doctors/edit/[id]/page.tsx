'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, User } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import '@/app/admin/styles/globals.css';

// Define interfaces based on existing Prisma schema
interface DocEducation {
  education_id?: string;
  field_of_study: string;
  institution: string;
  year: string;
}

interface DocCertificate {
  certificate_id?: string;
  field_of_study: string;
  institution: string;
  year: string;
}

interface DocLanguage {
  language_id?: string;
  languages: string;
}

interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  hospital_id: string;
  experience: string;
  description: string;
  image: string;
  create_at: string;
  doc_education: DocEducation[];
  doc_certificate: DocCertificate[];
  doc_language: DocLanguage[];
}

const DoctorEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const doctorId = params?.id as string;
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hospitals, setHospitals] = useState<any[]>([]);

  // Fetch doctor data and hospitals
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch doctor details
        const doctorResponse = await fetch(`/api/admin/services/doctors/${doctorId}`);
        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json();
          setDoctor(doctorData);
        }
        
        // Fetch hospitals for dropdown
        const hospitalsResponse = await fetch('/api/services/hospitals');
        if (hospitalsResponse.ok) {
          const hospitalsData = await hospitalsResponse.json();
          setHospitals(hospitalsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchData();
    }
  }, [doctorId]);

  const handleInputChange = (field: keyof Doctor, value: any) => {
    if (doctor) {
      setDoctor({ ...doctor, [field]: value });
    }
  };

  const handleEducationChange = (index: number, field: keyof DocEducation, value: string) => {
    if (doctor) {
      const updatedEducation = [...doctor.doc_education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      setDoctor({ ...doctor, doc_education: updatedEducation });
    }
  };

  const handleCertificateChange = (index: number, field: keyof DocCertificate, value: string) => {
    if (doctor) {
      const updatedCertificates = [...doctor.doc_certificate];
      updatedCertificates[index] = { ...updatedCertificates[index], [field]: value };
      setDoctor({ ...doctor, doc_certificate: updatedCertificates });
    }
  };

  const handleLanguageChange = (index: number, value: string) => {
    if (doctor) {
      const updatedLanguages = [...doctor.doc_language];
      updatedLanguages[index] = { ...updatedLanguages[index], languages: value };
      setDoctor({ ...doctor, doc_language: updatedLanguages });
    }
  };

  const addEducation = () => {
    if (doctor) {
      setDoctor({
        ...doctor,
        doc_education: [...doctor.doc_education, { field_of_study: '', institution: '', year: '' }]
      });
    }
  };

  const removeEducation = (index: number) => {
    if (doctor) {
      const updatedEducation = doctor.doc_education.filter((_, i) => i !== index);
      setDoctor({ ...doctor, doc_education: updatedEducation });
    }
  };

  const addCertificate = () => {
    if (doctor) {
      setDoctor({
        ...doctor,
        doc_certificate: [...doctor.doc_certificate, { field_of_study: '', institution: '', year: '' }]
      });
    }
  };

  const removeCertificate = (index: number) => {
    if (doctor) {
      const updatedCertificates = doctor.doc_certificate.filter((_, i) => i !== index);
      setDoctor({ ...doctor, doc_certificate: updatedCertificates });
    }
  };

  const addLanguage = () => {
    if (doctor) {
      setDoctor({
        ...doctor,
        doc_language: [...doctor.doc_language, { languages: '' }]
      });
    }
  };

  const removeLanguage = (index: number) => {
    if (doctor) {
      const updatedLanguages = doctor.doc_language.filter((_, i) => i !== index);
      setDoctor({ ...doctor, doc_language: updatedLanguages });
    }
  };

  const handleSave = async () => {
    if (!doctor) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/services/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctor),
      });

      if (response.ok) {
        showSuccess('Doctor updated successfully', `Dr. ${formData.name} has been updated`);
        setTimeout(() => {
          router.push(`/admin/doctors/${doctorId}`);
        }, 1500);
      } else {
        console.error('Failed to update doctor');
        showError('Failed to update doctor', 'Please check your input and try again');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      showError('Error updating doctor', 'Please try again later');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!doctor) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Doctor not found</h2>
          <p className="text-gray-600 mt-2">The doctor you're trying to edit doesn't exist.</p>
        </div>
      </AdminLayout>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Edit Doctor</h1>
              <p className="text-gray-800">Update doctor information and details</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push(`/admin/doctors/${doctorId}`)}
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter doctor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <input
                    type="text"
                    value={doctor.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Cardiology, Neurology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital
                  </label>
                  <select
                    value={doctor.hospital_id}
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
                    value={doctor.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 10 years"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={doctor.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://example.com/doctor-photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={doctor.description}
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
                {doctor.doc_education.map((education, index) => (
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
                {doctor.doc_education.length === 0 && (
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
                {doctor.doc_certificate.map((certificate, index) => (
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
                {doctor.doc_certificate.length === 0 && (
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
                {doctor.doc_language.map((language, index) => (
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
                {doctor.doc_language.length === 0 && (
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
                {doctor.image && (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border border-gray-200"
                  />
                )}
                <h4 className="font-semibold text-gray-900">{doctor.name || 'Doctor Name'}</h4>
                <p className="text-sm text-blue-600 font-medium">{doctor.specialization || 'Specialization'}</p>
                <p className="text-sm text-gray-800 mt-2">{doctor.experience || 'Experience'}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-800">Education Records</span>
                  <span className="font-medium text-gray-900">{doctor.doc_education.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Certificates</span>
                  <span className="font-medium text-gray-900">{doctor.doc_certificate.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Languages</span>
                  <span className="font-medium text-gray-900">{doctor.doc_language.length}</span>
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

export default DoctorEditPage;