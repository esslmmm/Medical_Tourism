'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, UserCheck, Search, Filter, Eye } from 'lucide-react';
import '@/app/admin/styles/globals.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Staff' | 'User'>('All');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const router = useRouter();

  type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: 'Staff' | 'User';
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user'); // Fetch all users
        // Filter only staff and customer
        const filtered = response.data
          .filter((u: any) => u.role === 'staff' || u.role === 'customer')
          .map((u: any) => ({
            id: u.id.toString(),
            name: u.name,
            email: u.email,
            createdAt: u.createdAt,
            role: u.role === 'staff' ? 'Staff' : 'User', // map roles to UI-friendly labels
          }));
        setUsers(filtered);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleViewUser = (user: User) => {
    router.push(`/admin/user/${user.id}`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage all user accounts and their details</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                {roleFilter}
              </button>
              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {['All', 'Staff', 'User'].map(role => (
                    <div
                      key={role}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setRoleFilter(role as 'All' | 'Staff' | 'User');
                        setShowRoleDropdown(false);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-medium">{user.name}</td>
                    <td className="py-4 px-4 text-gray-700">{user.email}</td>
                    <td className="py-4 px-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{user.role}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
