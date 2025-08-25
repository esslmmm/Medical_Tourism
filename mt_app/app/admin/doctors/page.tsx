'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { User, Plus, Search, MapPin, Star, Edit, Trash2, Eye, Stethoscope, GraduationCap } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import ConfirmDialog from '@/components/admin_component/ui/ConfirmDialog';
import '@/app/admin/styles/globals.css';

// Define interfaces based on existing Prisma schema
interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  hospital_id: string;
  experience: string;
  description: string;
  image: string;
  create_at: string;
  // Optional hospital info for display
  hospital?: {
    name: string;
  };
}

const DoctorManagement: React.FC = () => {
  const router = useRouter();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    doctorId: '',
    doctorName: ''
  });

  // Fetch doctors data
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services/doctors');
      
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch doctors:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (doctorId: string, doctorName: string) => {
    setConfirmDialog({
      isOpen: true,
      doctorId,
      doctorName
    });
  };

  const handleDeleteConfirm = async () => {
    const { doctorId, doctorName } = confirmDialog;
    
    try {
      const response = await fetch(`/api/admin/services/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showSuccess('Doctor deleted successfully', `Dr. ${doctorName} has been removed from the system`);
        await fetchDoctors(); // Refresh the list
      } else {
        console.error('Failed to delete doctor');
        showError('Failed to delete doctor', 'Please try again later');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      showError('Error deleting doctor', 'Please try again later');
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.doctor_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique specializations count
  const uniqueSpecializations = new Set(doctors.map(d => d.specialization)).size;

  // Calculate average experience (assuming experience is in years)
  const averageExperience = doctors.length > 0 ? 
    doctors.reduce((sum, d) => sum + parseFloat((d.experience || '').toString().replace(/\D/g, '') || '0'), 0) / doctors.length : 0;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading doctors...</div>
        </div>
      </AdminLayout>
    );
  }


  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, doctorId: '', doctorName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor? This action cannot be undone."
        confirmText="Delete Doctor"
        cancelText="Cancel"
        type="danger"
        doctorName={confirmDialog.doctorName}
      />
      <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-800">Manage doctor profiles and information</p>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => router.push('/admin/doctors/add')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-800">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-800">Specializations</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueSpecializations}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-800">Avg. Experience</p>
                <p className="text-2xl font-bold text-gray-900">{averageExperience.toFixed(1)} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${confirmDialog.isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, specialization, or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.doctor_id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">ID: {doctor.doctor_id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      onClick={() => router.push(`/admin/doctors/${doctor.doctor_id}`)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => router.push(`/admin/doctors/edit/${doctor.doctor_id}`)}
                      title="Edit Doctor"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDeleteClick(doctor.doctor_id, doctor.name)}
                      title="Delete Doctor"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-800">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{doctor.specialization}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-800">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span className="text-sm">{doctor.experience} experience</span>
                  </div>

                  {doctor.hospital && (
                    <div className="flex items-center text-gray-800">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doctor.hospital.name}</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-900 line-clamp-2">{doctor.description}</p>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {doctor.specialization}
                      </span>
                      <span className="text-xs text-gray-800">
                        {new Date(doctor.create_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No doctors found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default DoctorManagement;