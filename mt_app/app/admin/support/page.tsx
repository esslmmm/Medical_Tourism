'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import StatsCard from '@/components/admin_component/Common/StatsCard';
import { HeadphonesIcon, Clock, CheckCircle, AlertTriangle, Search, Filter, Eye, MessageSquare } from 'lucide-react';
import { SupportTicket } from '@/types/admin';
import '@/app/admin/styles/globals.css';

const SupportManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Mock data - replace with actual API calls
  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      subject: 'Payment Issue with Booking',
      description: 'I am having trouble with the payment process for my heart surgery package booking.',
      status: 'open',
      priority: 'high',
      assignedTo: 'Support Agent 1',
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      subject: 'Question about Travel Documents',
      description: 'What documents do I need to bring for my dental care package in Thailand?',
      status: 'resolved',
      priority: 'medium',
      assignedTo: 'Support Agent 2',
      createdAt: '2024-01-28',
      resolvedAt: '2024-01-29'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      subject: 'Request for Package Modification',
      description: 'I would like to change my travel dates for the booked package.',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Support Agent 1',
      createdAt: '2024-02-03'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Wilson',
      subject: 'General Information Request',
      description: 'Can you provide more information about post-surgery care services?',
      status: 'open',
      priority: 'low',
      createdAt: '2024-02-05'
    }
  ];

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTickets = supportTickets.length;
  const openTickets = supportTickets.filter(t => t.status === 'open').length;
  const resolvedTickets = supportTickets.filter(t => t.status === 'resolved').length;
  const inProgressTickets = supportTickets.filter(t => t.status === 'in-progress').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          <p className="text-gray-600">Manage customer support tickets and inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Open Tickets"
            value={openTickets}
            icon={AlertTriangle}
            color="yellow"
          />
          <StatsCard
            title="In Progress"
            value={inProgressTickets}
            icon={Clock}
            color="blue"
          />
          <StatsCard
            title="Resolved Tickets"
            value={resolvedTickets}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Total Tickets"
            value={totalTickets}
            icon={HeadphonesIcon}
            color="purple"
          />
        </div>

        {/* Support Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Open</span>
                <span className="font-semibold text-yellow-600">{openTickets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold text-blue-600">{inProgressTickets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Resolved</span>
                <span className="font-semibold text-green-600">{resolvedTickets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Closed</span>
                <span className="font-semibold text-gray-600">
                  {supportTickets.filter(t => t.status === 'closed').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Priority</span>
                <span className="font-semibold text-red-600">
                  {supportTickets.filter(t => t.priority === 'high').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medium Priority</span>
                <span className="font-semibold text-yellow-600">
                  {supportTickets.filter(t => t.priority === 'medium').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Low Priority</span>
                <span className="font-semibold text-green-600">
                  {supportTickets.filter(t => t.priority === 'low').length}
                </span>
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
                  placeholder="Search tickets by customer or subject..."
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
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Support Tickets Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Ticket ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Assigned To</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">#{ticket.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{ticket.userName}</div>
                      <div className="text-sm text-gray-500">ID: {ticket.userId}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{ticket.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {ticket.description}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {ticket.assignedTo || 'Unassigned'}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <MessageSquare className="h-4 w-4" />
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

export default SupportManagement;