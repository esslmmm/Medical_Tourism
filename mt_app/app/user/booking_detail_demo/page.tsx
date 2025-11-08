"use client";
import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Stethoscope, 
  Bed, 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  CreditCard,
  Plane,
  Hotel,
  Map,
  Users,
  FileImage,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import Navbarpro from "@/components/User/Main/Navbarpro";
import Footer from "@/components/User/Main/Footer";

// Sample data based on the Prisma schema
const sampleBookingData = {
  booking_id: "BK-2024-001234",
  user_id: 1,
  package_id: "pkg-medical-tourism-001",
  tourism_booking_id: "tourism-001",
  appointment_id: "apt-001",
  contact_id: "contact-001",
  guide_booking_id: 1,
  price: 2850.00,
  create_at: "2024-08-20T10:30:00Z",
  status: "Approved",
  appointments: {
    appointment_id: "apt-001",
    date: "2024-09-15",
    timeslot: "09:00 AM - 11:00 AM",
    description: "Comprehensive health check-up including blood tests, X-ray, and cardiology consultation",
    child: 0,
    adult: 2,
    status: "Approved",
    appointment_files: [
      {
        id: 1,
        appointmentId: "apt-001",
        fileId: "file-001",
        createdAt: "2024-08-20T11:00:00Z",
        files: {
          id: "file-001",
          userId: 1,
          originalName: "medical_report_2024.pdf",
          fileName: "medical_report_2024.pdf",
          fileType: "application/pdf",
          fileSize: 2048576,
          cloudinaryId: "medical_report_2024",
          url: "https://res.cloudinary.com/example/medical_report_2024.pdf",
          uploadedAt: "2024-08-20T11:00:00Z",
          category: "MEDICAL_REPORT",
          description: "Previous medical records"
        }
      },
      {
        id: 2,
        appointmentId: "apt-001",
        fileId: "file-002",
        createdAt: "2024-08-20T11:05:00Z",
        files: {
          id: "file-002",
          userId: 1,
          originalName: "xray_chest.jpg",
          fileName: "xray_chest.jpg",
          fileType: "image/jpeg",
          fileSize: 1024000,
          cloudinaryId: "xray_chest",
          url: "https://res.cloudinary.com/example/xray_chest.jpg",
          uploadedAt: "2024-08-20T11:05:00Z",
          category: "MEDICAL_REPORT",
          description: "Chest X-ray image"
        }
      }
    ],
    patient_details: [
      {
        patient_id: 1,
        appointment_id: "apt-001",
        firstname: "John",
        lastname: "Smith",
        gender: "Male",
        dateofbirth: "1985-03-15",
        nationality: "American",
        passport_number: "A12345678"
      },
      {
        patient_id: 2,
        appointment_id: "apt-001",
        firstname: "Sarah",
        lastname: "Smith",
        gender: "Female",
        dateofbirth: "1988-07-22",
        nationality: "American",
        passport_number: "A87654321"
      }
    ]
  },
  user_contact_detail: {
    id: "contact-001",
    firstname: "John",
    lastname: "Smith",
    email: "john.smith@email.com",
    country: "United States",
    phone: 15551234567
  },
  guide_bookings: {
    booking_id: 1,
    language: "English",
    start: "2024-09-14",
    end: "2024-09-17",
    status: "Approved",
    created_at: "2024-08-20T10:30:00Z",
    updated_at: "2024-08-20T10:30:00Z"
  },
  packages: {
    package_id: "pkg-medical-tourism-001",
    package_name: "Premium Medical Tourism Package",
    hospital_id: "hosp-001",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
    detail: "Comprehensive medical check-up with luxury accommodation and guided city tour",
    duration: "5 days",
    expired_date: "2024-12-31",
    status: "Active",
    create_at: "2024-08-01T00:00:00Z",
    hospitals: {
      hospital_id: "hosp-001",
      name: "Bangkok International Hospital",
      hospital_code: "BIH-001",
      location: "123 Sukhumvit Road, Bangkok 10110",
      city: "Bangkok",
      description: "Leading international hospital with state-of-the-art medical facilities and multilingual staff",
      contact_info: "+66-2-123-4567",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop",
      Thai: true,
      Arabic: true,
      Myanmar: false,
      English: true,
      create_at: "2024-01-01T00:00:00Z"
    }
  },
  tourism_bookings: {
    tourism_id: "tourism-001",
    route_id: 1,
    child: 0,
    adult: 2,
    start: "2024-09-14",
    end: "2024-09-17",
    status: "Approved",
    created_at: "2024-08-20T10:30:00Z",
    updated_at: "2024-08-20T10:30:00Z",
    routes: {
      route_id: 1,
      duration: 4,
      description: "Bangkok cultural and historical tour with temple visits and local market exploration",
      total_price: 800.00,
      created_at: "2024-08-01T00:00:00Z",
      package_places: [
        {
          packplace_id: 1,
          route_id: 1,
          place_id: "place-001",
          places: {
            place_id: "place-001",
            place_name: "Grand Palace",
            contact_info: "+66-2-123-4567",
            location: "Na Phra Lan Road, Phra Nakhon, Bangkok",
            city: "Bangkok",
            image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
            description: "The official residence of the Kings of Siam since 1782",
            fee: 500.00
          }
        },
        {
          packplace_id: 2,
          route_id: 1,
          place_id: "place-002",
          places: {
            place_id: "place-002",
            place_name: "Wat Pho Temple",
            contact_info: "+66-2-123-4568",
            location: "2 Sanam Chai Rd, Phra Borom Maha Ratchawang, Bangkok",
            city: "Bangkok",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Famous for its giant reclining Buddha statue",
            fee: 200.00
          }
        },
        {
          packplace_id: 3,
          route_id: 1,
          place_id: "place-003",
          places: {
            place_id: "place-003",
            place_name: "Chatuchak Weekend Market",
            contact_info: "+66-2-123-4569",
            location: "Kamphaeng Phet 2 Rd, Chatuchak, Bangkok",
            city: "Bangkok",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "One of the world's largest weekend markets",
            fee: 0.00
          }
        }
      ]
    }
  },
  user: {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    nationality: "American",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "customer",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-08-20T10:30:00Z"
  },
  payment: [
    {
      payment_date: "2024-08-20T11:00:00Z",
      payment_method: "Credit Card",
      amount: 1425.00,
      payment_status: "Successful",
      transaction_id: "TXN-001234567",
      booking_id: "BK-2024-001234",
      payment_id: "pay-001",
      user_id: 1
    },
    {
      payment_date: "2024-08-20T11:05:00Z",
      payment_method: "Credit Card",
      amount: 1425.00,
      payment_status: "Successful",
      transaction_id: "TXN-001234568",
      booking_id: "BK-2024-001234",
      payment_id: "pay-002",
      user_id: 1
    }
  ]
};

const BookingDetailDemo = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'customer', 'medical', 'tourism', 'guide', 'payment', 'package']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'successful':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'pending':
      case 'in_progress':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rejected':
      case 'cancelled':
      case 'failed':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'successful':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'in_progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'rejected':
      case 'cancelled':
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbarpro />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Booking Details
                </h1>
                <p className="text-xl text-blue-200 mb-4">Booking ID: {sampleBookingData.booking_id}</p>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(sampleBookingData.status)}`}>
                    {getStatusIcon(sampleBookingData.status)}
                    <span className="capitalize">{sampleBookingData.status.replace('_', ' ')}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${sampleBookingData.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <button className="flex items-center space-x-3 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download Invoice</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-blue-200 mb-1">Booking Date</p>
                <p className="text-lg font-semibold text-white">{formatDate(sampleBookingData.create_at)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-blue-200 mb-1">Package</p>
                <p className="text-lg font-semibold text-white">{sampleBookingData.packages.package_name}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-blue-200 mb-1">Hospital</p>
                <p className="text-lg font-semibold text-white">{sampleBookingData.packages.hospitals.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
            </div>
            <button
              onClick={() => toggleSection('customer')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expandedSections.has('customer') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
          
          {expandedSections.has('customer') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Primary Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="text-gray-900">{sampleBookingData.user.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-900">{sampleBookingData.user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-700">Nationality:</span>
                    <span className="text-gray-900">{sampleBookingData.user.nationality}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Booking Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="text-gray-900">{sampleBookingData.user_contact_detail.firstname} {sampleBookingData.user_contact_detail.lastname}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-900">{sampleBookingData.user_contact_detail.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-900">+{sampleBookingData.user_contact_detail.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="text-gray-900">{sampleBookingData.user_contact_detail.country}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Medical Appointment Section */}
        {sampleBookingData.appointments && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Medical Appointment</h2>
              </div>
              <button
                onClick={() => toggleSection('medical')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {expandedSections.has('medical') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
            
            {expandedSections.has('medical') && (
              <div className="space-y-8">
                {/* Appointment Details */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    Appointment Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">Date:</span>
                        <span className="text-gray-900">{formatDate(sampleBookingData.appointments.date)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">Time:</span>
                        <span className="text-gray-900">{sampleBookingData.appointments.timeslot}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sampleBookingData.appointments.status)}`}>
                          {sampleBookingData.appointments.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">Adults:</span>
                        <span className="text-gray-900">{sampleBookingData.appointments.adult}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">Children:</span>
                        <span className="text-gray-900">{sampleBookingData.appointments.child}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-red-600 mt-1" />
                        <div>
                          <span className="font-semibold text-gray-700">Description:</span>
                          <p className="text-gray-900 mt-1">{sampleBookingData.appointments.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Details */}
                {sampleBookingData.appointments.patient_details && sampleBookingData.appointments.patient_details.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      Patient Details
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {sampleBookingData.appointments.patient_details.map((patient, index) => (
                        <div key={patient.patient_id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-200 shadow-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {index + 1}
                            </div>
                            Patient {index + 1}
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <User className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-gray-700">Name:</span>
                              <span className="text-gray-900">{patient.firstname} {patient.lastname}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              </div>
                              <span className="font-semibold text-gray-700">Gender:</span>
                              <span className="text-gray-900">{patient.gender}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-gray-700">Date of Birth:</span>
                              <span className="text-gray-900">{formatDate(patient.dateofbirth)}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-gray-700">Nationality:</span>
                              <span className="text-gray-900">{patient.nationality}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-gray-700">Passport:</span>
                              <span className="text-gray-900 font-mono">{patient.passport_number}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appointment Files */}
                {sampleBookingData.appointments.appointment_files && sampleBookingData.appointments.appointment_files.length > 0 && (
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      Attached Files
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sampleBookingData.appointments.appointment_files.map((file) => (
                        <div key={file.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-all duration-300 group">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                              <FileImage className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">{file.files.originalName}</p>
                              <p className="text-xs text-gray-600 font-medium">{file.files.fileType}</p>
                              <p className="text-xs text-gray-500">{(file.files.fileSize / 1024).toFixed(1)} KB</p>
                            </div>
                            <a
                              href={file.files.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-lg transition-all duration-200"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tourism Booking Section */}
        {sampleBookingData.tourism_bookings && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tourism & Places</h2>
              </div>
              <button
                onClick={() => toggleSection('tourism')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {expandedSections.has('tourism') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
            
            {expandedSections.has('tourism') && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Trip Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Start Date:</span>
                        <span className="text-gray-900">{formatDate(sampleBookingData.tourism_bookings.start)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">End Date:</span>
                        <span className="text-gray-900">{formatDate(sampleBookingData.tourism_bookings.end)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sampleBookingData.tourism_bookings.status || '')}`}>
                          {sampleBookingData.tourism_bookings.status?.replace('_', ' ') || 'Not specified'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Adults:</span>
                        <span className="text-gray-900">{sampleBookingData.tourism_bookings.adult}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Children:</span>
                        <span className="text-gray-900">{sampleBookingData.tourism_bookings.child}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Duration:</span>
                        <span className="text-gray-900">{sampleBookingData.tourism_bookings.routes.duration ? `${sampleBookingData.tourism_bookings.routes.duration} days` : 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/50 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <span className="font-semibold text-gray-700">Description:</span>
                        <p className="text-gray-900 mt-1">{sampleBookingData.tourism_bookings.routes.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Places to Visit */}
                {sampleBookingData.tourism_bookings.routes.package_places && sampleBookingData.tourism_bookings.routes.package_places.length > 0 && (
                  <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                      Places to Visit
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sampleBookingData.tourism_bookings.routes.package_places.map((place) => (
                        <div key={place.packplace_id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 group">
                          {place.places?.image && (
                            <div className="relative overflow-hidden rounded-lg mb-4">
                              <img
                                src={place.places.image}
                                alt={place.places.place_name || 'Place image'}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                          )}
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{place.places?.place_name || 'Unknown Place'}</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <p className="text-sm text-gray-600">{place.places?.location}</p>
                          </div>
                          {place.places?.description && (
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{place.places.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            {place.places?.fee && place.places.fee > 0 && (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
                                ${place.places.fee}
                              </span>
                            )}
                            {place.places?.fee === 0 && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                Free Entry
                              </span>
                            )}
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Guide Booking Section */}
        {sampleBookingData.guide_bookings && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Guide Service</h2>
              </div>
              <button
                onClick={() => toggleSection('guide')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {expandedSections.has('guide') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
            
            {expandedSections.has('guide') && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-gray-700">Start Date:</span>
                      <span className="text-gray-900">{formatDate(sampleBookingData.guide_bookings.start)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-gray-700">End Date:</span>
                      <span className="text-gray-900">{formatDate(sampleBookingData.guide_bookings.end)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">Language:</span>
                      <span className="text-gray-900">{sampleBookingData.guide_bookings.language}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sampleBookingData.guide_bookings.status || '')}`}>
                        {sampleBookingData.guide_bookings.status?.replace('_', ' ') || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Information */}
        {sampleBookingData.payment && sampleBookingData.payment.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
              </div>
              <button
                onClick={() => toggleSection('payment')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {expandedSections.has('payment') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
            
            {expandedSections.has('payment') && (
              <div className="space-y-6">
                {sampleBookingData.payment.map((payment, index) => (
                  <div key={payment.payment_id} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      Payment {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          </div>
                          <span className="font-semibold text-gray-700">Amount:</span>
                          <span className="text-2xl font-bold text-gray-900">${payment.amount}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-gray-700">Method:</span>
                          <span className="text-gray-900">{payment.payment_method}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-gray-700">Transaction ID:</span>
                          <span className="text-gray-900 font-mono text-sm">{payment.transaction_id}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-gray-700">Date:</span>
                          <span className="text-gray-900">{formatDateTime(payment.payment_date)}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          </div>
                          <span className="font-semibold text-gray-700">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.payment_status)}`}>
                            {payment.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Package Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Package Details</h2>
            </div>
            <button
              onClick={() => toggleSection('package')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expandedSections.has('package') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
          
          {expandedSections.has('package') && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-slate-500 rounded-full mr-3"></div>
                  Package Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-gray-700">Package Name:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.package_name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-gray-700">Duration:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sampleBookingData.packages.status)}`}>
                        {sampleBookingData.packages.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">Price:</span>
                      <span className="text-2xl font-bold text-gray-900">${sampleBookingData.price}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-gray-700">Expires:</span>
                      <span className="text-gray-900">{formatDate(sampleBookingData.packages.expired_date)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-slate-600 mt-1" />
                    <div>
                      <span className="font-semibold text-gray-700">Description:</span>
                      <p className="text-gray-900 mt-1">{sampleBookingData.packages.detail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Hospital Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">Hospital Name:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.hospitals.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Location:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.hospitals.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">City:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.hospitals.city}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Contact:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.hospitals.contact_info}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Rating:</span>
                      <span className="text-gray-900">{sampleBookingData.packages.hospitals.rating ? `${sampleBookingData.packages.hospitals.rating}/5` : 'Not rated'}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Languages:</span>
                        <p className="text-gray-900 mt-1">
                          {[
                            sampleBookingData.packages.hospitals.English && 'English',
                            sampleBookingData.packages.hospitals.Thai && 'Thai',
                            sampleBookingData.packages.hospitals.Arabic && 'Arabic',
                            sampleBookingData.packages.hospitals.Myanmar && 'Myanmar'
                          ].filter(Boolean).join(', ') || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <span className="font-semibold text-gray-700">Description:</span>
                      <p className="text-gray-900 mt-1">{sampleBookingData.packages.hospitals.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingDetailDemo;
