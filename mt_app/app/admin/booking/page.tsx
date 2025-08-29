'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { Calendar, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { Booking } from '@/types/admin';
import '@/app/admin/styles/globals.css';

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  // Mock data - replace with actual API calls
  const bookings: Booking[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      packageId: '1',
      packageTitle: 'Complete Heart Surgery Package',
      hospitalName: 'Bangkok Heart Hospital',
      status: 'confirmed',
      bookingDate: '2024-02-01',
      travelDate: '2024-03-15',
      totalAmount: 150000,
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      packageId: '2',
      packageTitle: 'Premium Dental Care Package',
      hospitalName: 'Bumrungrad International Hospital',
      status: 'pending',
      bookingDate: '2024-02-05',
      travelDate: '2024-02-20',
      totalAmount: 45000,
      createdAt: '2024-02-05'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      packageId: '3',
      packageTitle: 'Orthopedic Surgery Package',
      hospitalName: 'Chiang Mai Ram Hospital',
      status: 'completed',
      bookingDate: '2024-01-20',
      travelDate: '2024-01-25',
      totalAmount: 75000,
      createdAt: '2024-01-20'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Wilson',
      packageId: '1',
      packageTitle: 'Complete Heart Surgery Package',
      hospitalName: 'Bangkok Heart Hospital',
      status: 'cancelled',
      bookingDate: '2024-01-15',
      travelDate: '2024-02-01',
      totalAmount: 150000,
      createdAt: '2024-01-15'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.packageTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Travel Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
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
                    <td className="py-4 px-4 text-gray-900">
                      {new Date(booking.travelDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ฿{booking.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-800">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
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

export default BookingManagement;