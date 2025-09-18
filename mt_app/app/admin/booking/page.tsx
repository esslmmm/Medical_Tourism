'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { Calendar, Clock, CheckCircle, Search, Filter, Eye } from 'lucide-react';
import { Booking } from '@/types/admin';
import '@/app/admin/styles/globals.css';
import { useRouter } from 'next/navigation';

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_progress' | 'pending' | 'approved' | 'completed' | 'rejected' | 'cancelled'>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch bookings from API
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filterStatus !== 'all') {
          params.append('status', filterStatus);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }

        const response = await fetch(`/api/admin/booking/packages?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [filterStatus, searchTerm]);


  // Handle view booking details
  const handleViewBooking = (bookingId: string) => {
    router.push(`/admin/booking/${bookingId}`);
  };

  // Since we're now filtering on the backend, we don't need client-side filtering
  const filteredBookings = bookings;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'in_progress').length;
  const confirmedBookings = bookings.filter(b => b.status === 'approved').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600">Monitor and manage all bookings and their status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Pending Bookings"
            value={pendingBookings}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Confirmed Bookings"
            value={confirmedBookings}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Total Bookings"
            value={totalBookings}
            icon={Calendar}
            color="blue"
          />
          <StatsCard
            title="This Month"
            value="+23%"
            icon={Calendar}
            color="purple"
          />
        </div>

        {/* Booking Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">{pendingBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Confirmed</span>
                <span className="font-semibold text-green-600">{confirmedBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-blue-600">{completedBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cancelled</span>
                <span className="font-semibold text-red-600">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">January 2024</span>
                <span className="font-semibold">145 bookings</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">February 2024</span>
                <span className="font-semibold">178 bookings</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth Rate</span>
                <span className="font-semibold text-green-600">+23%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings by user or package..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Booking ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-gray-500" colSpan={7}>
                      Loading bookings...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-red-600" colSpan={7}>
                      {error}
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td className="py-8 px-4 text-center text-gray-500" colSpan={7}>
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">#{booking.id}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{booking.userName}</div>
                      <div className="text-sm text-gray-500">ID: {booking.userId}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{booking.packageTitle}</div>
                      <div className="text-sm text-gray-500">{booking.hospitalName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ฿{booking.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' || booking.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                                          <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {/* View Button */}
                          <button
                            onClick={() => handleViewBooking(booking.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingManagement;