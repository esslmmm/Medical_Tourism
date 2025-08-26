'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import '@/app/admin/styles/globals.css';

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    email: '',
    nationality: '',
    image: null as File | null,
    imagePreview: ''
  });
  const [originalProfile, setOriginalProfile] = useState<typeof profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();

        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          nationality: data.nationality,
          image: null,
          imagePreview: data.image || ''
        });
        setOriginalProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          nationality: data.nationality,
          image: null,
          imagePreview: data.image || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({
          ...prev,
          image: file,
          imagePreview: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profile.name,
        nationality: profile.nationality,
      }),
    });

    if (!res.ok) throw new Error("Failed to update profile");

    const updatedProfile = await res.json();

    setProfile(prev => ({
      ...prev,
      name: updatedProfile.name,
      nationality: updatedProfile.nationality,
      image: null,
      imagePreview: updatedProfile.image || prev.imagePreview,
    }));

    setOriginalProfile(updatedProfile);
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditing(false);
  };

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark',
    'Egypt', 'Finland', 'France', 'Germany', 'India', 'Indonesia',
    'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Pakistan',
    'Philippines', 'Poland', 'Russia', 'Saudi Arabia', 'South Africa',
    'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
    'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam'
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg">
                    {profile.imagePreview ? (
                      <img
                        src={profile.imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white text-2xl font-bold">
                        {profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {isEditing && (
                  <p className="mt-2 text-sm text-gray-500">Click the camera icon to change your photo</p>
                )}
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-400 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {profile.name || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Email Field */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
    {profile.email || 'Not set'}
  </div>
</div>


                {/* Nationality Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  {isEditing ? (
                    <select
                      name="nationality"
                      value={profile.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select your nationality</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {profile.nationality || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {loading && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;