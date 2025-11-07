"use client";

import { useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import Footer from '@/components/user_components/Main/Footer';
import Navbar from '@/components/user_components/Main/Navbar';
import MedicalServiceBooking from '@/components/user_components/BookingDetail2/MedicalServiceBooking';
import TourismServiceBooking from '@/components/user_components/BookingDetail2/TourismServiceBooking';

// mockData.js (or top of the same file)


const BookingApp = () => {
  const [activeTab, setActiveTab] = useState('medical');

  return (
    <div className='bg-white min-h-screen'>
        <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-8 text-black">
      {/* Header */}
      <div className=" px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">My Booking</span>
            <span className="text-gray-400">›</span>
            <span className="text-teal-400">Booking details</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto  flex gap-6 p-6">
        {/* Sidebar */}
        <div className='lg:col-span-1 '>
            <div className='sticky top-5'>
<div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300 min-h-170">
            <h2 className="text-xl font-semibold mb-4 px-2">Booking Details</h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('medical')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'medical'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase size={20} />
                <span className="font-medium">Medical Service</span>
              </button>
              <button
                onClick={() => setActiveTab('trip')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'trip'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin size={20} />
                <span className="font-medium">Trip</span>
              </button>
            </div>
          </div>
        </div>
            </div>
        </div>

        {/* Main Content */}
        {activeTab === 'medical' ? <MedicalServiceBooking/> : <TourismServiceBooking />}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default BookingApp;