'use client';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter, useParams } from 'next/navigation';
import '@/app/admin/styles/globals.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User as UserIcon,
  Mail,
  Globe,
  Shield,
  Calendar,
  Edit,
  Save,
  X,
  ArrowLeft,
} from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  nationality: string;
  password: string | null;
  image: string;
  role: 'staff' | 'customer';
  createdAt: string;
  updatedAt: string;
};

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        const u = response.data;

        // Ensure role is either 'staff' or 'customer'
        if (u.role === 'staff' || u.role === 'customer') {
          setUser(u);
          setEditedUser(u);
        } else {
          console.error('Invalid role from API:', u.role);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user ? { ...user } : null);
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      // Send PUT request to update user
      const response = await axios.put(`/api/user/${userId}`, {
        name: editedUser.name,
        nationality: editedUser.nationality,
        role: editedUser.role,
      });

      // Update state with response data
      setUser(response.data);
      setEditedUser(response.data);
      setIsEditing(false);

      console.log("User updated successfully:", response.data);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user ? { ...user } : null);
  };

  const handleInputChange = (
    field: keyof User,
    value: string | null
  ) => {
    if (!editedUser) return;
    setEditedUser((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  const getRoleBadge = (role: 'staff' | 'customer') => {
    const roleConfig: Record<
      'staff' | 'customer',
      { color: string; icon: React.ElementType }
    > = {
      staff: { color: 'bg-red-100 text-red-800', icon: Shield },
      customer: { color: 'bg-blue-100 text-blue-800', icon: UserIcon },
    };

    const config = roleConfig[role];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="w-3 h-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-red-500">User not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                User Details
              </h1>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white border"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-6">
                <img
                  className="h-20 w-20 rounded-full object-cover border"
                  src={user.image || 'https://via.placeholder.com/80'}
                  alt={user.name}
                />
                <div className="text-black">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser?.name || ''}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className="text-2xl font-bold border-b border-blue-500 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                  )}
                  <p className="text-sm text-gray-500">User ID: #{user.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 text-black">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <dl className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <select
  name="nationality"
  value={editedUser?.nationality || ''}
  onChange={(e) => handleInputChange('nationality', e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
>
  <option value="">Select your nationality</option>
  {countries.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ))}
</select>
                  ) : (
                    <span>
  {user.nationality && user.nationality.trim() !== ''
    ? user.nationality
    : <span className="italic text-gray-400">No nationality provided</span>}
</span>
                  )}
                </div>
              </dl>
            </div>

            {/* Account Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <select
                    value={editedUser?.role || 'customer'}
                    onChange={(e) =>
                      handleInputChange(
                        'role',
                        e.target.value as 'staff' | 'customer'
                      )
                    }
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                  </select>
                ) : (
                  getRoleBadge(user.role)
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 bg-white shadow rounded-lg p-6 text-black">
            <h3 className="text-lg font-medium mb-4">Account Timeline</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>Created: {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>Updated: {formatDate(user.updatedAt)}</span>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetailPage;
