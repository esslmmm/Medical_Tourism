"use client";
import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  CheckCircle,
  Clock,
  CalendarRange,
} from 'lucide-react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  type: 'Support' | 'Partner';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  message: string;
  createdAt: string;
}

const ContactUsManagement: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Support' | 'Partner'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved' | 'rejected'>('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [statsFilter, setStatsFilter] = useState<'all' | 'day' | 'week' | 'month' | 'year' | 'custom'>('all');
  const [showStatsMenu, setShowStatsMenu] = useState(false);
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  // Fetch contact data
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact_us');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const formatted = data.map((c: any) => ({
          id: c.id,
          firstName: c.firstName || 'Unknown',
          lastName: c.lastName || 'Unknown',
          email: c.email || 'N/A',
          phone: c.phoneNumber || '-',
          country: c.country || '-',
          type: c.type || 'Support',
          status: c.status || 'pending',
          message: c.message || '-',
          createdAt: new Date(c.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }));

        setContacts(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Stats computation
  const stats = useMemo(() => {
    const now = new Date();

    const filteredByDate = contacts.filter((c) => {
      if (!c.createdAt) return false;
      const date = new Date(c.createdAt);

      switch (statsFilter) {
        case 'all':
          return true;
        case 'day':
          return date.toDateString() === now.toDateString();
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

    return {
      total: filteredByDate.length,
      pending: filteredByDate.filter((c) => c.status === 'pending').length,
      inProgress: filteredByDate.filter((c) => c.status === 'in-progress').length,
      resolved: filteredByDate.filter((c) => c.status === 'resolved').length,
      rejected: filteredByDate.filter((c) => c.status === 'rejected').length,
      support: filteredByDate.filter((c) => c.type === 'Support').length,
      partner: filteredByDate.filter((c) => c.type === 'Partner').length,
    };
  }, [contacts, statsFilter, customStart, customEnd]);

  // Filter & search
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || c.type === filterType;
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [contacts, searchTerm, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          <p className="text-lg font-medium">Loading contacts...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center text-red-600">
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 p-6 mb-8">
            {/* Header */}
            <div className="mb-8 flex justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us Management</h1>
                <p className="text-gray-600">Monitor and manage customer inquiries and messages</p>
              </div>
              {/* Stats Filter */}
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
                      {[
                        { value: 'all', label: 'All'},
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
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                            statsFilter === item.value
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

                {statsFilter === 'custom' && (
                  <div className="flex items-center gap-3 text-black">
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="px-6 py-3 border rounded-xl"/>
                    <span className="font-semibold">to</span>
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="px-6 py-3 border rounded-xl"/>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Pending</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.pending}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">In Progress</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.inProgress}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Resolved</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.resolved}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Rejected</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.rejected}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Support</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.support}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Partner</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{stats.partner}</p>
              </div>
            </div>
            

            {/* Search & Filter */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                >
                  <Filter className="w-5 h-5" />
                  Filter
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                    <div className="px-4 py-2 font-semibold">Type</div>
                    {['all', 'Support', 'Partner'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t as any)}
                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                          filterType === t ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {t}
                      </button>
                    ))}

                    <div className="px-4 py-2 font-semibold border-t border-gray-200">Status</div>
                    {['all', 'pending', 'in-progress', 'resolved', 'rejected'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s as any)}
                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                          filterStatus === s ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-300 text-black">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentContacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{c.firstName} {c.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                            c.type === 'Support' ? 'bg-purple-500' : 'bg-pink-500'
                          }`}
                        >
                          {c.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                            c.status === 'pending'
                              ? 'bg-amber-500'
                              : c.status === 'in-progress'
                              ? 'bg-blue-500'
                              : c.status === 'resolved'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        >
                          {c.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-end items-center gap-2 p-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-blue-50 disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <span className="px-3 py-2">{currentPage} / {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-blue-50 disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactUsManagement;
