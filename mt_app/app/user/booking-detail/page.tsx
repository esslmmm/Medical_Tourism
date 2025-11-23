"use client";

import { useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import Footer from '@/components/User/Main/Footer';
import Navbar from '@/components/User/Main/Navbar';
import MedicalServiceBooking from '@/components/User/BookingDetail2/MedicalServiceBooking';
import TourismServiceBooking from '@/components/User/BookingDetail2/TourismServiceBooking';

const BookingApp = () => {
  const [activeTab, setActiveTab] = useState<"medical" | "tourism">("medical");

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 text-black">

        {/* Breadcrumb */}
        <div className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">My Booking</span>
              <span className="text-gray-400">›</span>
              <span className="text-teal-400">Booking details</span>
            </div>
          </div>
        </div>

        {/* ⬇️ NEW SERVICE TAB UI (same as PackageDetail) */}
        <div className="pt-6 border-b border-gray-300">
          <div className="flex items-center gap-8">

            {/* Medical Tab */}
            <div>
              <button
                onClick={() => setActiveTab("medical")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${
                  activeTab === "medical"
                    ? "text-white bg-teal-500"
                    : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  Medical Service
                </div>
              </button>

              <div
                className={`${
                  activeTab === "medical"
                    ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                    : "mt-3"
                }`}
              ></div>
            </div>

            {/* Tourism Tab */}
            <div>
              <button
                onClick={() => setActiveTab("tourism")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${
                  activeTab === "tourism"
                    ? "text-white bg-teal-500"
                    : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  Tourism Service
                </div>
              </button>

              <div
                className={`${
                  activeTab === "tourism"
                    ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                    : "mt-3"
                }`}
              ></div>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="pt-6">
          {activeTab === "medical" ? <MedicalServiceBooking /> : <TourismServiceBooking />}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default BookingApp;
