'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { Package, TrendingUp, Star, Search, Filter, Edit, Eye, ToggleLeft, Plus } from 'lucide-react';
import { Package as PackageType } from '@/types/admin';
import '@/app/admin/styles/globals.css';

const PackageManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock data - replace with actual API calls
  const packages: PackageType[] = [
    {
      id: '1',
      title: 'Complete Heart Surgery Package',
      hospitalId: '1',
      hospitalName: 'Bangkok Heart Hospital',
      category: 'Cardiology',
      price: 150000,
      duration: 10,
      description: 'Comprehensive cardiac surgery package including pre-op, surgery, and recovery',
      services: ['Consultation', 'Surgery', 'ICU Care', 'Recovery', 'Follow-up'],
      rating: 4.8,
      reviewCount: 124,
      status: 'active',
      isPopular: true,
      isTrending: true,
      imageUrl: '/package1.jpg',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Premium Dental Care Package',
      hospitalId: '2',
      hospitalName: 'Bumrungrad International Hospital',
      category: 'Dental',
      price: 45000,
      duration: 5,
      description: 'Complete dental restoration and cosmetic treatment package',
      services: ['Consultation', 'X-Ray', 'Treatment', 'Follow-up'],
      rating: 4.6,
      reviewCount: 89,
      status: 'active',
      isPopular: false,
      isTrending: true,
      imageUrl: '/package2.jpg',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Orthopedic Surgery Package',
      hospitalId: '3',
      hospitalName: 'Chiang Mai Ram Hospital',
      category: 'Orthopedics',
      price: 75000,
      duration: 7,
      description: 'Joint replacement and orthopedic surgery with rehabilitation',
      services: ['Consultation', 'Surgery', 'Physical Therapy', 'Recovery'],
      rating: 4.7,
      reviewCount: 67,
      status: 'active',
      isPopular: true,
      isTrending: false,
      imageUrl: '/package3.jpg',
      createdAt: '2024-01-10'
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPackages = packages.length;
  const popularPackages = packages.filter(pkg => pkg.isPopular).length;
  const trendingPackages = packages.filter(pkg => pkg.isTrending).length;
  const averageRating = packages.reduce((acc, pkg) => acc + pkg.rating, 0) / packages.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
            <p className="text-gray-600">Manage medical tourism packages and pricing</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Popular Packages"
            value={popularPackages}
            icon={Star}
            color="yellow"
          />
          <StatsCard
            title="Trending Packages"
            value={trendingPackages}
            icon={TrendingUp}
            color="green"
          />
          <StatsCard
            title="Total Packages"
            value={totalPackages}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Avg Rating"
            value={averageRating.toFixed(1)}
            icon={Star}
            color="purple"
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                        <div>
                          <div className="font-medium text-gray-900">{pkg.title}</div>
                          <div className="text-sm text-gray-500">{pkg.category}</div>
                          <div className="flex space-x-1 mt-1">
                            {pkg.isPopular && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Popular
                              </span>
                            )}
                            {pkg.isTrending && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Trending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{pkg.hospitalName}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ฿{pkg.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{pkg.duration} days</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{pkg.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({pkg.reviewCount})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-800">
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