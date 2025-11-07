"use client";

import { useState } from 'react';
import { Calendar, Phone, Mail, FileText, MapPin, Briefcase } from 'lucide-react';
import Footer from '@/components/user_components/Main/Footer';
import Navbar from '@/components/user_components/Main/Navbar';

const BookingApp = () => {
  const [activeTab, setActiveTab] = useState('medical');

  const MedicalServiceBooking = () => (
    <div className="flex-1">
      {/* Medical Service Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Medical Service Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop" 
              alt="Medical professionals"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold mb-2">Medical Check-up</h3>
                <button className="text-emerald-500 text-sm hover:underline">View Details →</button>
              </div>
              <p className="text-sm font-semibold mb-1">Services :</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Comprehensive dental examination</li>
                <li>• Professional teeth cleaning</li>
                <li>• Cosmetic dental procedures</li>
                <li>• Follow-up consultations</li>
                <li className="text-emerald-500 cursor-pointer">• Show more</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold ">Appointment Details</h2>
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold mb-2">Appointment Date</p>
          <p className="text-gray-700">Monday, October 5 2025</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300 ">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Contact details</h3>
          <p className="font-semibold mb-3">Ekkarat Thepthong</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} />
              <span>+66 814739090</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} />
              <span>test@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Patient details</h3>
          
          {/* First Patient */}
          <div className="mb-6 pb-6 border-b border-gray-300">
            <p className="font-semibold mb-3">Ekkarath Longbum</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-semibold">Gender : </span>
                <span className="text-sm text-gray-700">Male</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Nationality : </span>
                <span className="text-sm text-gray-700">Thai</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Date of Birth : </span>
                <span className="text-sm text-gray-700">1999-11-2</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Passport ID : </span>
                <span className="text-sm text-gray-700">AZ98726</span>
              </div>
            </div>
            <p className="text-sm font-semibold mb-3">Medical Report File :</p>
            <div className="flex items-center gap-2 text-red-500 mb-4 border border-gray-300 rounded-2xl p-4 w-100">
              <FileText size={16} />
              <span className="text-sm text-black">medical_report.pdf</span>
            </div>
            <p className="text-sm font-semibold mb-2">Symptoms details :</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              The patient has been experiencing a fever for the past two days. The fever occurs intermittently, 
              most noticeably at night, and reaches temperatures as high as 39°C (102°F). It is associated with 
              chills, a sore throat, and body aches. Taking paracetamol temporarily lowers the fever, but 
              physical activity tends to make it worse. The presentation suggests a likely viral infection.
            </p>
          </div>

          {/* Second Patient (duplicate for demo) */}
          <div>
            <p className="font-semibold mb-3">Ekkarath Longbum</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-semibold">Gender : </span>
                <span className="text-sm text-gray-700">Male</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Nationality : </span>
                <span className="text-sm text-gray-700">Thai</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Date of Birth : </span>
                <span className="text-sm text-gray-700">1999-11-2</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Passport ID : </span>
                <span className="text-sm text-gray-700">AZ98726</span>
              </div>
            </div>
            <p className="text-sm font-semibold mb-2">Medical Report File :</p>
            <div className="flex items-center gap-2 text-red-500 mb-4 border border-gray-300 rounded-2xl p-4 w-100">
              <FileText size={16} />
              <span className="text-sm text-black">medical_report.pdf</span>
            </div>
            <p className="text-sm font-semibold mb-2">Symptoms details :</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              The patient has been experiencing a fever for the past two days. The fever occurs intermittently, 
              most noticeably at night, and reaches temperatures as high as 39°C (102°F). It is associated with 
              chills, a sore throat, and body aches. Taking paracetamol temporarily lowers the fever, but 
              physical activity tends to make it worse. The presentation suggests a likely viral infection.
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Policies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Appointment policies</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Cancellation and change policies</span>
            <button className="text-emerald-500 text-sm hover:underline">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  );

  const TripBooking = () => (
    <div className="flex-1">
      {/* Trip Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Trip Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop" 
              alt="Beach scene"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold">Phuket Go Around</h3>
                  <span className="text-emerald-500 text-sm font-semibold">(3 days)</span>
                </div>
                <button className="text-emerald-500 text-sm hover:underline">View Details →</button>
              </div>
              <p className="text-sm font-semibold mb-2">Including :</p>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                <li>• Phi Phi Islands</li>
                <li>• City Tour</li>
                <li>• James Bond Island</li>
              </ul>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full">Summer</span>
                <span className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full">Holiday</span>
                <span className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full">Relax</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Booking Details</h2>
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold mb-2">Trip Booking Date</p>
          <p className="text-gray-700">Monday, October 6 2025 → Tuesday, October 7 2025</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact details</h3>
          <p className="font-semibold mb-3">Ekkarat Thepthong</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} />
              <span>+66 814739090</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} />
              <span>test@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment details</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Adult (ages 16 - 80)</span>
              <span className="font-semibold">฿ 1000 × 1</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Child (ages 4 - 15)</span>
              <span className="font-semibold">฿ 500 × 1</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Guide (Arabic Language)</span>
              <span className="font-semibold">฿ 1,000</span>
            </div>
            <div className="flex justify-between py-2 border-b pb-3">
              <span className="text-gray-700">Car Service</span>
              <span className="font-semibold">฿ 1,000</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">฿ 3,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Policies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Booking policies</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Cancellation and change policies</span>
            <button className="text-emerald-500 text-sm hover:underline">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-white min-h-screen'>
        <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-8 text-black">
      {/* Header */}
      <div className=" px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">My Booking</span>
            <span className="text-gray-400">›</span>
            <span className="text-teal-400">Booking details</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300">
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

        {/* Main Content */}
        {activeTab === 'medical' ? <MedicalServiceBooking /> : <TripBooking />}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default BookingApp;