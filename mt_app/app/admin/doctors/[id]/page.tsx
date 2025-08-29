'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Star, Phone, Mail, Clock, User, GraduationCap, Award, Languages } from 'lucide-react';
import { Doctor as DoctorType } from '@/types/admin';
import '@/app/admin/styles/globals.css';


const DoctorDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const doctorId = params?.id as string;

  const [doctor, setDoctor] = useState<DoctorType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        console.log('Fetching doctor with ID:', doctorId);
        const response = await fetch(`/api/admin/services/doctors/${doctorId}`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch doctor details:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

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
          <p className="text-gray-600 mt-2">The doctor you're looking for doesn't exist.</p>
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
              onClick={() => router.push('/admin/doctors')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Doctors
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-gray-800">Doctor Details & Information</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/admin/doctors/edit/${doctor.doctor_id}`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Doctor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Profile */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-6 mb-4">
                {doctor.image && (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 object-cover rounded-full border border-gray-200"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Doctor ID: {doctor.doctor_id}</h3>
                  <p className="text-sm text-gray-800">Created: {new Date(doctor.create_at).toLocaleDateString()}</p>
                  <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About Doctor</h2>
              <p className="text-gray-900 leading-relaxed">{doctor.description}</p>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </h2>
              {doctor.doc_education.length > 0 ? (
                <div className="space-y-4">
                  {doctor.doc_education.map((education, index) => (
                    <div key={education.education_id || `edu-${index}`} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{education.field_of_study}</h4>
                      <p className="text-sm text-gray-800 mb-1">{education.institution}</p>
                      <p className="text-sm text-blue-600 font-medium">Year: {education.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No education records available.</p>
              )}
            </div>

            {/* Certificates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <Award className="h-5 w-5 mr-2" />
                Certificates
              </h2>
              {doctor.doc_certificate.length > 0 ? (
                <div className="space-y-4">
                  {doctor.doc_certificate.map((certificate, index) => (
                    <div key={certificate.certificate_id || `cert-${index}`} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{certificate.field_of_study}</h4>
                      <p className="text-sm text-gray-800 mb-1">{certificate.institution}</p>
                      <p className="text-sm text-green-600 font-medium">Year: {certificate.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No certificate records available.</p>
              )}
            </div>

            {/* Languages */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <Languages className="h-5 w-5 mr-2" />
                Languages
              </h2>
              {doctor.doc_language.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {doctor.doc_language.map((language, index) => (
                    <span
                      key={language.language_id || `lang-${index}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {language.languages}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No language information available.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Experience</span>
                  <span className="font-semibold text-gray-900">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Specialization</span>
                  <span className="font-medium text-gray-900">{doctor.specialization}</span>
                </div>
                {doctor.hospital && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">Hospital</span>
                    <span className="font-medium text-sm text-gray-900">{doctor.hospital.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Doctor ID</span>
                  <span className="font-medium font-mono text-sm text-gray-900">{doctor.doctor_id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Created</span>
                  <span className="font-medium text-gray-900">{new Date(doctor.create_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Education</span>
                  <span className="font-medium text-gray-900">{doctor.doc_education.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Certificates</span>
                  <span className="font-medium text-gray-900">{doctor.doc_certificate.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Languages</span>
                  <span className="font-medium text-gray-900">{doctor.doc_language.length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/admin/doctors/edit/${doctor.doctor_id}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Doctor
                </button>
                {doctor.hospital && (
                  <button 
                    onClick={() => router.push(`/admin/hospitals/${doctor.hospital_id}`)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View Hospital
                  </button>
                )}
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Clock className="h-4 w-4 mr-2" />
                  View Schedule
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <User className="h-4 w-4 mr-2" />
                  View Patients
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DoctorDetailPage;