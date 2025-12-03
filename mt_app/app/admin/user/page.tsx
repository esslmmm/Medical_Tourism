'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { useRouter } from 'next/navigation';
import {
  Users,
  UserPlus,
  UserCheck,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarRange,
} from 'lucide-react';
import '@/app/admin/styles/globals.css';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: 'Staff' | 'User';
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Staff' | 'User'>('All');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const [statsFilter, setStatsFilter] = useState<'all' | 'day' | 'week' | 'month' | 'year' | 'custom'>('all');
  const [showStatsMenu, setShowStatsMenu] = useState(false);
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        const filtered = response.data
          .filter((u: any) => u.role === 'staff' || u.role === 'customer')
          .map((u: any) => ({
            id: u.id.toString(),
            name: u.name,
            email: u.email,
            createdAt: u.createdAt,
            role: u.role === 'staff' ? 'Staff' : 'User',
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

  // Stats Cards filtered by date
  const filteredStats = useMemo(() => {
    const now = new Date();

    const filteredByDate = users.filter((u) => {
      if (!u.createdAt) return false;
      const date = new Date(u.createdAt);

      switch (statsFilter) {
        case 'all':
          return true;

        case 'day':
          return (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );

        case 'week': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7);
          return date >= startOfWeek && date < endOfWeek;
        }

        case 'month':
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

        case 'year':
          return date.getFullYear() === now.getFullYear();

        case 'custom':
          if (!customStart || !customEnd) return true;
          const s = new Date(customStart);
          const e = new Date(customEnd);
          return date >= s && date <= e;

        default:
          return true;
      }
    });

    const staffCount = filteredByDate.filter(u => u.role === 'Staff').length;
    const userCount = filteredByDate.filter(u => u.role === 'User').length;

    return {
      totalUsers: filteredByDate.length,
      staffCount,
      userCount
    };
  }, [users, statsFilter, customStart, customEnd]);

  // Table filtering
  const filteredUsers = useMemo(
    () =>
      users.filter(user => {
        const matchesSearch =
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All' || user.role === roleFilter;
        return matchesSearch && matchesRole;
      }),
    [users, searchTerm, roleFilter]
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const handleViewUser = (user: User) => router.push(`/admin/user/${user.id}`);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          <p className="text-lg font-medium">Loading users...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className='bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 p-6 mb-8'>
            {/* Header */}
            <div className='mb-8 flex justify-between'>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage all user accounts and their details</p>
              </div>

              {/* Stats Filter Controls */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Stats Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatsMenu(!showStatsMenu)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                  >
                    <CalendarRange className="w-5 h-5" /> {statsFilter === 'custom' ? 'Custom Range' : statsFilter.charAt(0).toUpperCase() + statsFilter.slice(1)}
                  </button>

                  {showStatsMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'day', label: 'Today' },
                        { value: 'week', label: 'This Week' },
                        { value: 'month', label: 'This Month' },
                        { value: 'year', label: 'This Year' },
                        { value: 'custom', label: 'Custom Range' }
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setStatsFilter(item.value as any);
                            setShowStatsMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${statsFilter === item.value
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Range Inputs */}
                {statsFilter === 'custom' && (
                  <div className="flex items-center gap-3 text-black">
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700 focus:border-blue-500 focus:ring-0"
                    />
                    <span className="font-semibold">to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700 focus:border-blue-500 focus:ring-0"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Total Users</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{filteredStats.totalUsers}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Staff</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{filteredStats.staffCount}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Users</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{filteredStats.userCount}</p>
              </div>
            </div>
          </div>

          {/* Filters, Table, Pagination (unchanged) */}
          <div className="text-black bg-white rounded-2xl shadow-md border border-gray-300">
            <div className="flex flex-col md:flex-row gap-4 items-center p-6 justify-between">
              {/* Search */}
              <div className="relative flex-1 md:max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                >
                  <Filter className="w-5 h-5" /> {roleFilter}
                </button>
                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                    {['All', 'Staff', 'User'].map(role => (
                      <button
                        key={role}
                        onClick={() => {
                          setRoleFilter(role as 'All' | 'Staff' | 'User');
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                          roleFilter === role ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentUsers.map(user => (
                    <tr
                      key={user.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {user.role === 'Staff' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">Staff</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">User</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{filteredUsers.length}</span> results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
