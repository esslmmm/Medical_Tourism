'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { MessageSquare, Star, ThumbsUp, AlertCircle, Search, Filter, Eye, Check, X } from 'lucide-react';
import { Feedback } from '@/types/admin';
import '@/app/admin/styles/globals.css';

const FeedbackManagement: React.FC = () => {    
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock data - replace with actual API calls
  const feedbacks: Feedback[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      packageId: '1',
      packageTitle: 'Complete Heart Surgery Package',
      rating: 5,
      comment: 'Excellent service and professional staff. The surgery went smoothly and recovery was comfortable.',
      status: 'approved',
      category: 'overall',
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      packageId: '2',
      packageTitle: 'Premium Dental Care Package',
      rating: 4,
      comment: 'Good dental care but waiting time was a bit long. Overall satisfied with the results.',
      status: 'pending',
      category: 'service',
      createdAt: '2024-02-05'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      packageId: '1',
      packageTitle: 'Complete Heart Surgery Package',
      rating: 2,
      comment: 'Had some issues with the accommodation and communication could be better.',
      status: 'pending',
      category: 'facility',
      createdAt: '2024-02-03'
    }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.packageTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || feedback.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalFeedback = feedbacks.length;
  const pendingFeedback = feedbacks.filter(f => f.status === 'pending').length;
  const averageRating = feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length;
  const positiveReviews = feedbacks.filter(f => f.rating >= 4).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600">Monitor and manage customer reviews and feedback</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Feedback"
            value={totalFeedback}
            icon={MessageSquare}
            color="blue"
          />
          <StatsCard
            title="Pending Reviews"
            value={pendingFeedback}
            icon={AlertCircle}
            color="yellow"
          />
          <StatsCard
            title="Average Rating"
            value={averageRating.toFixed(1)}
            icon={Star}
            color="green"
          />
          <StatsCard
            title="Positive Reviews"
            value={`${Math.round((positiveReviews / totalFeedback) * 100)}%`}
            icon={ThumbsUp}
            color="purple"
          />
        </div>

        {/* Feedback Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">{pendingFeedback}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved</span>
                <span className="font-semibold text-green-600">
                  {feedbacks.filter(f => f.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rejected</span>
                <span className="font-semibold text-red-600">
                  {feedbacks.filter(f => f.status === 'rejected').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = feedbacks.filter(f => f.rating === rating).length;
                const percentage = (count / totalFeedback) * 100;
                return (
                  <div key={rating} className="flex items-center">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 ml-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback by customer or package..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="overall">Overall</option>
              <option value="service">Service</option>
              <option value="facility">Facility</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="font-medium text-gray-900 mr-3">{feedback.userName}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({feedback.rating}/5)</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Package: {feedback.packageTitle}
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      feedback.status === 'approved' ? 'bg-green-100 text-green-800' :
                      feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {feedback.category}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">{feedback.comment}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Feedback ID: {feedback.id}
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                  {feedback.status === 'pending' && (
                    <>
                      <button className="text-green-600 hover:text-green-800">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeedbackManagement;
