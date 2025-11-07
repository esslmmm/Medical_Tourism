"use client";

import { useState } from 'react';
import { Phone, Mail, FileText, MapPin, Briefcase } from 'lucide-react';
import Footer from '@/components/user_components/Main/Footer';
import Navbar from '@/components/user_components/Main/Navbar';

// mockData.js (or top of the same file)


const BookingApp = () => {
  const [activeTab, setActiveTab] = useState('medical');
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});

  const toggleShowMore = (id : number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle for specific booking
    }));
  };

  const medicalBookings = [
  {
    id: 1,
    serviceName: "Medical Check-up",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop",
    services: [
      "Comprehensive dental examination",
      "Professional teeth cleaning",
      "Cosmetic dental procedures",
      "Follow-up consultations",
      "Comprehensive dental examination",
      "Professional teeth cleaning",
      "Cosmetic dental procedures",
      "Follow-up consultations",
    ],
    appointmentDate: "Monday, October 5 2025",
    contact: {
      name: "Ekkarat Thepthong",
      phone: "+66 814739090",
      email: "test@gmail.com",
    },
    patients: [
      {
        name: "Ekkarath Longbum",
        gender: "Male",
        nationality: "Thai",
        dob: "1999-11-2",
        passportId: "AZ98726",
        reportFile: "medical_report.pdf",
        symptoms:
          "The patient has been experiencing a fever for the past two days. The fever occurs intermittently..., The patient has been experiencing a fever for the past two days. The fever occurs intermittently...",
      },
      {
        name: "Ekkarath Longbum",
        gender: "Male",
        nationality: "Thai",
        dob: "1999-11-2",
        passportId: "AZ98726",
        reportFile: "medical_report.pdf",
        symptoms:
          "The patient has been experiencing a fever for the past two days. The fever occurs intermittently..., The patient has been experiencing a fever for the past two days. The fever occurs intermittently...",
      },
    ],
    policy: "Cancellation and change policies",
  },
];

  const tripBookings = [
  {
    id: 1,
    tripName: "Phuket Go Around",
    duration: "3 days",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop",
    includes: ["Phi Phi Islands", "City Tour", "James Bond Island"],
    tags: ["Summer", "Holiday", "Relax"],
    bookingDate: "Monday, October 6 2025 → Tuesday, October 7 2025",
    contact: {
      name: "Ekkarat Thepthong",
      phone: "+66 814739090",
      email: "test@gmail.com",
    },
    payments: [
      { label: "Adult (ages 16 - 80)", price: "฿ 1000 × 1" },
      { label: "Child (ages 4 - 15)", price: "฿ 500 × 1" },
      { label: "Guide (Arabic Language)", price: "฿ 1,000" },
      { label: "Car Service", price: "฿ 1,000" },
    ],
    total: "฿ 3,500",
    policy: "Cancellation and change policies",
  },
];

  const MedicalServiceBooking = () => {
    const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});


  const toggleShowMore = (id:number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle for specific booking
    }));
  };

  return (
    <div className="flex-1">
      {medicalBookings.map((booking) => {
        const isExpanded = expandedServices[booking.id] || false;
        const displayedServices = isExpanded
          ? booking.services
          : booking.services.slice(0, 6);

        return (
          <div key={booking.id}>
            {/* Medical Service Details */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Medical Service Details</h2>
              </div>
              <div className="p-6 flex items-start gap-4">
                <img
                  src={booking.image}
                  alt={booking.serviceName}
                  className="w-32 h-48 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold mb-2">{booking.serviceName}</h3>
                    <button className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
                      View details
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm font-semibold mb-1">Services :</p>
                  <ul className="text-sm text-gray-600 space-y-1 grid-cols-2 grid">
                    {displayedServices.map((srv, i) => (
                      <li key={i}>• {srv}</li>
                    ))}

                    {booking.services.length > 4 && (
                      <li
                        className="text-emerald-500 cursor-pointer font-medium"
                        onClick={() => toggleShowMore(booking.id)}
                      >
                        • {isExpanded ? "Show less" : "Show more"}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Appointment Details</h2>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold mb-2">Appointment Date</p>
                <p className="text-gray-700">{booking.appointmentDate}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">
                  Contact details
                </h3>
                <p className="font-semibold mb-3">{booking.contact.name}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span>{booking.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} />
                    <span>{booking.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
              <div className="px-6 pt-6">
                <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">
                  Patient details
                </h3>

                {booking.patients.map((p, i) => (
                  <div
                    key={i}
                    className={`mb-3 pb-4 border-b border-gray-300 ${
                      i === booking.patients.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                    }`}
                  >
                    <p className="font-semibold mb-3">{p.name}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-semibold">Gender : </span>
                        <span className="text-sm text-gray-700">{p.gender}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold">Nationality : </span>
                        <span className="text-sm text-gray-700">{p.nationality}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold">Date of Birth : </span>
                        <span className="text-sm text-gray-700">{p.dob}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold">Passport ID : </span>
                        <span className="text-sm text-gray-700">{p.passportId}</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold mb-3">Medical Report File :</p>
                    <div className="flex items-center gap-2 text-red-500 mb-4 border border-gray-300 rounded-2xl p-4 w-100">
                      <FileText size={16} />
                      <span className="text-sm text-black">{p.reportFile}</span>
                    </div>
                    <p className="text-sm font-semibold mb-2">Symptoms details :</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.symptoms}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Policies */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold pb-4">
                  Appointment policies
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cancellation and change policies</span>
                  <button className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};



  const TripBooking = () => (
  <div className="flex-1">
    {tripBookings.map((trip) => (
      <div key={trip.id}>
        {/* Trip Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Trip Details</h2>
          </div>
          <div className="p-6 flex items-start gap-4">
            <img src={trip.image} alt={trip.tripName} className="w-32 h-48 object-cover rounded-2xl" />
            <div className="flex-1">
                <div className='flex justify-between items-start'>
              <h3 className="text-lg font-semibold">{trip.tripName} <span className="text-yellow-500 text-sm font-semibold">({trip.duration})</span></h3>
              <button className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              <p className="text-sm font-semibold mb-2 mt-2">Including :</p>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                {trip.includes.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                {trip.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full">{tag}</span>
                ))}
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
            <p className="text-gray-700">{trip.bookingDate}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Contact details</h3>
            <p className="font-semibold mb-3">{trip.contact.name}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                <span>{trip.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <span>{trip.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-300">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Payment details</h3>
            {trip.payments.map((pay, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{pay.label}</span>
                <span className="font-semibold">{pay.price}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 mt-2 border-t border-gray-300">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{trip.total}</span>
            </div>
          </div>
        </div>

        {/* Booking Policies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold pb-4">
                  Booking policies
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cancellation and change policies</span>
                  <button className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
      </div>
    ))}
  </div>
);


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
        {activeTab === 'medical' ? <MedicalServiceBooking /> : <TripBooking />}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default BookingApp;