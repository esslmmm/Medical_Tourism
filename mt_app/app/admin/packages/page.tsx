'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { Package, Search, Edit, Eye, ToggleLeft, Plus } from 'lucide-react';
import { Package as PackageType } from '@/types/admin';
import '@/app/admin/styles/globals.css';
import { useRouter } from 'next/navigation';

const PackageManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [packages, setPackages] = useState<PackageType[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchPackages() {
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
    router.push(`/admin/packages/${id}`); // Navigate to detail page
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/packages/edit/${id}`); // Navigate to edit page
  };

  const handleAdd = () => {
    router.push(`/admin/packages/add`); // Navigate to add page
  };


  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.hospitals.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPackages = packages.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
            <p className="text-gray-600">Manage medical tourism packages and pricing</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => handleAdd()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Packages"
            value={totalPackages}
            icon={Package}
            color="blue"
          />
        </div>
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dental">Dental</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cosmetic Surgery">Cosmetic Surgery</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          {/* Packages Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hospital</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredPackages.map((pkg) => (
                <tr
                  key={pkg.package_id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {/* Package Image instead of gray box */}
                      <img
                        src={pkg.image || "/img/default.png"} // fallback if no image
                        alt={pkg.package_name}
                        className="w-28 h-20 rounded-lg mr-3 object-cover"
                      />

                      <div>
                        <div className="font-medium text-gray-900">{pkg.package_name}</div>
                        <div className="text-sm text-gray-500">{pkg.category}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-900">{pkg.hospitals.name}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        pkg.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {/* Eye Button (View) */}
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleView(pkg.package_id)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleEdit(pkg.package_id)}
                        title="Edit Package"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      {/* Toggle Button (you can add logic here later) */}
                      <button className="text-orange-600 hover:text-orange-800 cursor-pointer">
                        <ToggleLeft className="h-4 w-4" />
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

export default PackageManagement;