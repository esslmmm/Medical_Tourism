import React from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import '@/app/admin/styles/globals.css';

import { 
  Users, 
  Package, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Star
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your medical tourism platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="2,847"
            icon={Users}
            trend="+12% from last month"
            trendUp={true}
            color="blue"
          />
          <StatsCard
            title="Active Packages"
            value="156"
            icon={Package}
            trend="+8% from last month"
            trendUp={true}
            color="green"
          />
          <StatsCard
            title="Total Bookings"
            value="1,234"
            icon={Calendar}
            trend="+15% from last month"
            trendUp={true}
            color="purple"
          />
          <StatsCard
            title="Customer Feedback"
            value="892"
            icon={MessageSquare}
            trend="-3% from last month"
            trendUp={false}
            color="yellow"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">New Users (This Month)</span>
                <span className="font-semibold">312</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="font-semibold">2,535</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold">2,847</span>
              </div>
            </div>
          </div>

          {/* Package Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Popular Packages</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trending Packages</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Packages</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">New user registration</p>
                <p className="text-sm text-gray-600">John Doe registered 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="font-medium">New booking confirmed</p>
                <p className="text-sm text-gray-600">Heart Surgery Package booked 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
              <Star className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="font-medium">New review received</p>
                <p className="text-sm text-gray-600">5-star review for Dental Care Package</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;