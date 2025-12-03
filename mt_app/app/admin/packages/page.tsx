'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Package, Search, Edit, Eye, ToggleLeft, Plus, CheckCircle, Clock, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { Package as PackageType } from '@/types/admin';
import '@/app/admin/styles/globals.css';
import { useRouter } from 'next/navigation';

const PackageManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/services/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Error fetching packages");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const handleView = (id: string) => {
    router.push(`/admin/packages/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/packages/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`/admin/packages/add`);
  };

  // Filtered Packages based on search and status
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch =
      pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.hospitals.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPackages = filteredPackages.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <AdminLayout>
      <div className='min-h-screen bg-gradient-to-br p-4 md:p-8'>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 p-6 mb-8">
            <div className='mb-8 flex justify-between'>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Package Management</h1>
                <p className="text-gray-600">Manage medical tourism packages and pricing</p>
              </div>
              <div className='flex flex-wrap items-center gap-4 mb-6'>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl 
                    hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                >
                  <Plus className="w-5 h-5" /> Add Package
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Packages */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <ToggleLeft className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Total Packages</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{packages.length}</p>
              </div>

              {/* Active Packages */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <ToggleLeft className="w-6 h-6 rotate-180" />
                  </div>
                  <h3 className="text-lg font-semibold">Active</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{packages.filter(p => p.status === "Active").length}</p>
              </div>

              {/* Inactive Packages */}
              <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-md font-semibold">Inactive</h3>
                </div>
                <p className="text-3xl font-bold mt-4">{packages.filter(p => p.status === "Inactive").length}</p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 text-black">
            <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50'>
              <div className="flex justify-between flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1 w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to page 1 when searching
                    }}
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
                      {['all', 'Active', 'Inactive'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status as 'all' | 'Active' | 'Inactive');
                            setShowFilterMenu(false);
                            setCurrentPage(1); // Reset page on filter change
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                            filterStatus === status ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Hospital</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedPackages.map(pkg => (
                    <tr key={pkg.package_id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={pkg.image || "/img/default.png"}
                            alt={pkg.package_name}
                            className="w-28 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{pkg.package_name}</div>
                            <div className="text-sm text-gray-500">{pkg.category}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{pkg.hospitals.name}</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold ${pkg.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {pkg.status === 'Active' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {pkg.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            onClick={() => handleView(pkg.package_id)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800 cursor-pointer"
                            onClick={() => handleEdit(pkg.package_id)}
                            title="Edit Package"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginatedPackages.length === 0 && (
                <div className="text-center py-6 text-gray-500">No packages found</div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredPackages.length)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{filteredPackages.length}</span> results
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
    </AdminLayout>
  );
};

export default PackageManagement;
