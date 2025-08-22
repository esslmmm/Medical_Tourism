'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { MessageSquare, Mail, Phone, Globe, Search, Check, X, AlertCircle, Clock } from 'lucide-react';
import '@/app/admin/styles/globals.css';
import axios from 'axios';

interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  type: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'In_Progress' | 'Resolved' | 'Rejected';
}

const ContactUsManagement: React.FC = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Fetch contact messages from API
  useEffect(() => {
    fetchContactMessages();
  }, []);

  const fetchContactMessages = async () => {
    try {
      const response = await axios.get('/api/contact_us');
      const data = response.data;
      const messagesWithStatus = data.map((msg: any) => ({
        ...msg,
        status: msg.contact_us_status || 'Pending'
      }));
      setContactMessages(messagesWithStatus);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update status API call
  const updateStatus = async (id: number, newStatus: ContactMessage['status']) => {
    try {
      await axios.put(`/api/contact_us/${id}`, {
        contact_us_status: newStatus,
      });

      // Update state immediately
      setContactMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Filter logic
  const filteredMessages = contactMessages.filter((message) => {
    const fullName = `${message.firstName} ${message.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || message.type === filterType;
    const matchesCountry =
      filterCountry === 'all' ||
      message.country.toLowerCase() === filterCountry.toLowerCase();
    const matchesStatus =
      filterStatus === 'all'
        ? message.status !== 'Resolved' && message.status !== 'Rejected'// hide resolved by default
        : message.status === filterStatus;

    return matchesSearch && matchesType && matchesCountry && matchesStatus;
  });

  // Statistics
  const totalMessages = contactMessages.length;
  const pendingMessages = contactMessages.filter((m) => m.status === 'Pending').length;
  const inProgressMessages = contactMessages.filter((m) => m.status === 'In_Progress').length;
  const resolvedMessages = contactMessages.filter((m) => m.status === 'Resolved').length;
  const rejectedMessages = contactMessages.filter((m) => m.status === 'Rejected').length;
  const supportRequests = contactMessages.filter((m) => m.type === 'support').length;
  const bookingRequests = contactMessages.filter((m) => m.type === 'booking').length;

  const uniqueCountries = [...new Set(contactMessages.map((m) => m.country))];
  const uniqueTypes = [...new Set(contactMessages.map((m) => m.type))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In_Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'support':
        return 'bg-blue-100 text-blue-800';
      case 'booking':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading contact messages...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us Management</h1>
          <p className="text-gray-600">
            Monitor and manage customer inquiries and messages
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard title="Total Messages" value={totalMessages} icon={MessageSquare} color="blue" />
          <StatsCard title="Pending" value={pendingMessages} icon={Clock} color="yellow" />
          <StatsCard title="In Progress" value={inProgressMessages} icon={AlertCircle} color="blue" />
          <StatsCard title="Resolved" value={resolvedMessages} icon={Check} color="green" />
          <StatsCard title="Rejected" value={rejectedMessages} icon={X} color="red" />
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-gray-600">Pending</span><span className="font-semibold text-yellow-600">{pendingMessages}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600">In Progress</span><span className="font-semibold text-blue-600">{inProgressMessages}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600">Resolved</span><span className="font-semibold text-green-600">{resolvedMessages}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600">Rejected</span><span className="font-semibold text-red-600">{rejectedMessages}</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Types</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-gray-600">Support</span><span className="font-semibold text-blue-600">{supportRequests}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600">Booking</span><span className="font-semibold text-purple-600">{bookingRequests}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600">Other</span><span className="font-semibold text-gray-600">{totalMessages - supportRequests - bookingRequests}</span></div>
            </div>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or message content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All (Except Resolved)</option>
              <option value="Pending">Pending</option>
              <option value="In_Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No contact messages found matching your criteria.
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="font-medium text-gray-900 mr-3">
                        {message.firstName} {message.lastName}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                            message.type
                          )}`}
                        >
                          {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2 space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {message.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {message.phoneNumber}
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        {message.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(message.createdAt)}</div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-300">
                    {message.message}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div></div>
                  <div>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={message.status}
                      onChange={(e) => updateStatus(message.id, e.target.value as ContactMessage['status'])}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In_Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactUsManagement;
