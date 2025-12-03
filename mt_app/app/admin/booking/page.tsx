'use client';

import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import {
  Search,
  Filter,
  Eye,
  Package,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Booking } from '@/types/admin';
import '@/app/admin/styles/globals.css';
import { useRouter } from 'next/navigation';


const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'in_progress' | 'pending' | 'approved' | 'completed' | 'rejected' | 'cancelled'
  >('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [statsFilter, setStatsFilter] = useState<'all' | 'day' | 'week' | 'month' | 'year' | 'custom'>('all');
  const [showStatsMenu, setShowStatsMenu] = useState(false);
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  const router = useRouter();

  // ✅ Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filterStatus !== 'all') params.append('status', filterStatus);
        if (searchTerm) params.append('search', searchTerm);

        const response = await fetch(`/api/admin/booking/packages`);
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filterStatus, searchTerm]);

  const handleViewBooking = (id: string) => {
    router.push(`/admin/booking/${id}`);
  };

  // ✅ Stats filtering by date
  const bookingsByDate = useMemo(() => {
    const now = new Date();

    return bookings.filter((b) => {
      const bookingDate = new Date(b.bookingDate);

      switch (statsFilter) {
        case 'all':
          return true;
        case 'day':
          return (
            bookingDate.getDate() === now.getDate() &&
            bookingDate.getMonth() === now.getMonth() &&
            bookingDate.getFullYear() === now.getFullYear()
          );
        case 'week': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7);
          return bookingDate >= startOfWeek && bookingDate < endOfWeek;
        }
        case 'month':
          return (
            bookingDate.getMonth() === now.getMonth() &&
            bookingDate.getFullYear() === now.getFullYear()
          );
        case 'year':
          return bookingDate.getFullYear() === now.getFullYear();
        case 'custom':
          if (!customStart || !customEnd) return true;
          const s = new Date(customStart);
          const e = new Date(customEnd);
          return bookingDate >= s && bookingDate <= e;
        default:
          return true;
      }
    });
  }, [bookings, statsFilter, customStart, customEnd]);

  // ✅ Table filtering by status + search
  const filteredBookings = useMemo(() => {
    return bookingsByDate.filter((b) => {
      const matchesSearch =
        b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bookingDate.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || b.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bookingsByDate, searchTerm, filterStatus]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooking = filteredBookings.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // ✅ Stats counts
  const totalBookings = bookingsByDate.length;
  const pendingBookings = bookingsByDate.filter(
    (b) => b.status === 'pending' || b.status === 'in_progress'
  ).length;
  const approvedBookings = bookingsByDate.filter((b) => b.status === 'approved').length;
  const completedBookings = bookingsByDate.filter((b) => b.status === 'completed').length;
  const rejectedBookings = bookingsByDate.filter((b) => b.status === 'rejected').length;
  const cancelledBookings = bookingsByDate.filter((b) => b.status === 'cancelled').length;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br p-6 md:p-8">
        <div className="max-w-7xl mx-auto text-black">

          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 mb-8">
            <div className="mb-8 flex justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Management</h1>
                <p className="text-gray-600">Monitor and manage all bookings</p>
              </div>

              {/* Stats Filter Controls */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="relative">
                  <button
                    onClick={() => setShowStatsMenu(!showStatsMenu)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl 
                 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                  >
                    <CalendarRange className="w-5 h-5" /> {statsFilter === 'custom' ? 'Custom Range' : statsFilter.charAt(0).toUpperCase() + statsFilter.slice(1)}
                  </button>

                  {showStatsMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                      {['all','day','week','month','year','custom'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setStatsFilter(item as any);
                            setShowStatsMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${statsFilter === item
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : 'text-gray-700'
                            }`}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {statsFilter === 'custom' && (
                  <div className="flex items-center gap-3 text-black">
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl 
                   hover:border-blue-500 hover:bg-blue-50 transition-all 
                   font-medium text-gray-700 focus:border-blue-500 focus:ring-0"
                    />
                    <span className="font-semibold">to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl 
                   hover:border-blue-500 hover:bg-blue-50 transition-all 
                   font-medium text-gray-700 focus:border-blue-500 focus:ring-0"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Total Bookings</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{totalBookings}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Pending / In Progress</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{pendingBookings}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Approved</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{approvedBookings}</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Completed</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{completedBookings}</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Rejected</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{rejectedBookings}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Cancelled</h3>
                </div>
                <p className="text-4xl font-bold mt-4">{cancelledBookings}</p>
              </div>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-300 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, package, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Filter Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200
                             rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
                >
                  <Filter className="w-5 h-5" />
                  Filter
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200">
                    {['all','pending','in_progress','approved','completed','rejected','cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status as any);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                          filterStatus === status
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700'
                        }`}
                      >
                        {status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
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
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-red-600">{error}</td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-600">No bookings found</td>
                    </tr>
                  ) : (
                    currentBooking.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          #{booking.id}
                          <div className="text-xs text-gray-500">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{booking.userName}</div>
                          <div className="text-sm text-gray-500">ID: {booking.userId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{booking.packageTitle}</div>
                          <div className="text-sm text-gray-500">{booking.hospitalName}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">฿{booking.totalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-semibold
                              ${booking.status === 'approved' ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending' || booking.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700'
                              : booking.status === 'completed' ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'}
                            `}
                          >
                            {booking.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewBooking(booking.id)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

               {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredBookings.length)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{filteredBookings.length}</span> results
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
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === i + 1
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
      </div>
    </AdminLayout>
  );
};

export default BookingManagement;
