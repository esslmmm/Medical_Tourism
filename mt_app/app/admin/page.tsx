"use client";
import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, Users, CheckCircle, Clock, ChartPie, Wallet } from 'lucide-react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';

interface Payment {
  id: string;
  amount: string;
  method?: string;
  dateTime?: string;
  name: string;
  email: string;
  status: 'waiting' | 'successful';
}

const PaymentDashboard: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'waiting' | 'successful'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const itemsPerPage = 5;

  const [statsFilter, setStatsFilter] = useState<'day' | 'week' | 'month' | 'year' | 'custom'>('month');
const [customStart, setCustomStart] = useState<string>('');
const [customEnd, setCustomEnd] = useState<string>('');

  // ✅ Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payment');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        // Transform API data → UI-friendly format
        const formatted = data.map((p: any) => ({
          id: p.payment_id,
          amount: `${p.amount} THB`,
          method: p.payment_method || '-',
          dateTime: new Date(p.payment_date).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          name: p.user?.name || 'Unknown',
          email: p.user?.email || 'N/A',
          status:
            p.payment_status.toLowerCase() === 'successful'
              ? 'successful'
              : 'waiting',
        }));

        setPayments(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const stats = useMemo(() => {
  const now = new Date();

  const filteredByDate = payments.filter((p) => {
    if (!p.dateTime) return false;

    const date = new Date(p.dateTime);

    switch (statsFilter) {
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
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

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

  const successfulPayments = filteredByDate.filter((p) => p.status === 'successful');

  // Total transactions
  const totalPayments = filteredByDate.length;

  // Total income (gross, before fees)
  const totalIncome = successfulPayments.reduce(
    (sum, p) => sum + parseFloat(p.amount.replace(/[^\d.-]/g, '')),
    0
  );

  // Stripe fee per transaction
  const STRIPE_PERCENT = 0.0475; // 4.75% for international cards
  const STRIPE_FIXED = 10; // 10 THB per transaction

  // Net income (after fee)
  const netIncome = successfulPayments.reduce((sum, p) => {
    const amount = parseFloat(p.amount.replace(/[^\d.-]/g, ''));
    const fee = amount * STRIPE_PERCENT + STRIPE_FIXED;
    return sum + (amount - fee);
  }, 0);

  // Average order value
  const averageOrderValue =
    successfulPayments.length > 0
      ? totalIncome / successfulPayments.length
      : 0;

  return {
    totalPayments,
    totalIncome,
    netIncome,
    averageOrderValue,
    successful: successfulPayments.length,
    waiting: filteredByDate.filter((p) => p.status === 'waiting').length,
  };
}, [payments, statsFilter, customStart, customEnd]);



  // ✅ Filtering & searching
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [payments, searchTerm, filterStatus]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // ✅ Loading & error state
  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          <p className="text-lg font-medium">Loading payments...</p>
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

  // ✅ Render UI
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between">
            <div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Dashboard</h1>
            <p className="text-gray-600">Monitor and manage all payment transactions</p>
            </div>
            {/* Stats Filter Controls */}
<div className="flex flex-wrap items-center gap-4 mb-6">

  <select
    value={statsFilter}
    onChange={(e) => setStatsFilter(e.target.value as any)}
    className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white text-gray-800"
  >
    <option value="day">Today</option>
    <option value="week">This Week</option>
    <option value="month">This Month</option>
    <option value="year">This Year</option>
    <option value="custom">Custom Range</option>
  </select>

  {statsFilter === 'custom' && (
    <div className="flex items-center gap-3">
      <input
        type="date"
        value={customStart}
        onChange={(e) => setCustomStart(e.target.value)}
        className="px-3 py-2 border-2 border-gray-300 rounded-xl"
      />
      <span className="font-semibold">to</span>
      <input
        type="date"
        value={customEnd}
        onChange={(e) => setCustomEnd(e.target.value)}
        className="px-3 py-2 border-2 border-gray-300 rounded-xl"
      />
    </div>
  )}
</div>
          </div>

          {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  {/* Total Income */}
  <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <CheckCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold">Total Income</h3>
    </div>
    <p className="text-4xl font-bold mt-4">{stats.totalIncome.toLocaleString()} THB</p>
  </div>

  {/* Net Income */}
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <Wallet className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold">Net Income</h3>
    </div>
    <p className="text-4xl font-bold mt-4">
  {stats.netIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })} THB
</p>

  </div>

  {/* Average Order Value */}
  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <ChartPie className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold">Average Order Value</h3>
    </div>
    <p className="text-4xl font-bold mt-4">
  {stats.averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} THB
</p>

  </div>

  {/* Total Transaction */}
  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <Users className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold">Total Transactions</h3>
    </div>
    <p className="text-5xl font-bold mt-4">{stats.totalPayments}</p>
  </div>
            </div>


          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-black">
            {/* Search + Filter */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                {/* Filter Menu */}
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
                      {['all', 'successful', 'waiting'].map((status) => (
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
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{payment.dateTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{payment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{payment.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {payment.status === 'successful' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Successful
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                            <Clock className="w-4 h-4" />
                            Waiting
                          </span>
                        )}
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
                  <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredPayments.length)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{filteredPayments.length}</span> results
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

export default PaymentDashboard;