"use client"
import React, { useState } from 'react';
import {
  Calendar, Clock, Users, MapPin, Phone, Mail, Check, ArrowLeft,
  Edit3, Hospital, User, FileText, Heart,
  Star, Navigation, Building, UserCheck, Activity, Settings, Download, Share
} from 'lucide-react';

const MedicalBookingOverview = () => {
  const [bookingData] = useState({
    // Hospital Information
    hospital: {
      name: "Bangkok International Hospital",
      type: "Private Hospital",
      rating: 4.8,
      reviews: 1247,
      image: "/api/placeholder/400/200",
      address: "2 Soi Soonvijai 7, New Petchburi Rd, Bangkok 10310",
      phone: "+66 2 310 3000",
      email: "info@bih.co.th",
      website: "www.bangkokhospital.com",
      accreditation: "JCI Accredited"
    },
    
    // Medical Information
    medical: {
      department: "Cardiology Department",
      appointmentType: "Consultation",
      serviceType: "Regular Checkup"
    },
    
    // Date & Time Information
    dateTime: {
      date: "Friday, October 6, 2025",
      time: "8:00 AM",
      duration: "30 minutes",
      appointmentRef: "BIH-20251006-CD-001",
      timezone: "UTC+7 (Bangkok Time)"
    },
    
    // Patient Information
    patients: {
      adults: 1,
      children: 0,
      primaryPatient: {
        name: "John Smith",
        age: 45,
        gender: "Male",
        patientId: "P-2025-001847"
      }
    },
    
    // Services & Tests
    selectedServices: [
      { name: "Cardiology Consultation", price: 1500, duration: "30 min", code: "CARD-001" },
      { name: "ECG Test", price: 800, duration: "15 min", code: "ECG-001" },
      { name: "Blood Pressure Monitoring", price: 300, duration: "10 min", code: "BP-001" }
    ],
    
    // Hospital Facilities
    facilities: [
      "Free WiFi",
      "Free Parking",
      "Pharmacy",
      "Laboratory",
      "Emergency Room",
      "Cafeteria",
      "Prayer Room",
      "Wheelchair Access"
    ],
    
    
    // Contact Information
    contact: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+66 987 654 321",
      emergencyContact: {
        name: "Jane Smith",
        relation: "Spouse",
        phone: "+66 987 654 322"
      }
    },
    
    // Price Breakdown
    pricing: {
      consultation: 1500,
      tests: 1100,
      subtotal: 2600,
      total: 2600
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSection, setEditingSection] = useState('');
  const [editableData, setEditableData] = useState(bookingData);
  const [tempEditData, setTempEditData] = useState({});

  const handleConfirmAppointment = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Appointment confirmed successfully!');
    }, 2000);
  };


  const handleEditSection = (section: string) => {
    setEditingSection(section);
    setTempEditData(editableData[section]);
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    setEditableData(prev => ({
      ...prev,
      [editingSection]: tempEditData
    }));
    setShowEditModal(false);
    setEditingSection('');
    setTempEditData({});
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingSection('');
    setTempEditData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setTempEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header with Status Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="group p-3 hover:bg-blue-50 rounded-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-md">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Appointment Overview
                  </h1>
                  <div className="hidden lg:block w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-600 font-medium">Review and manage your medical appointment details</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium mb-1">Appointment ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-lg font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                    {bookingData.dateTime.appointmentRef}
                  </p>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FileText className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-700">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content - Takes 3 columns */}
          <div className="xl:col-span-3 space-y-6">

            {/* Hospital Information - Enhanced Card */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                      <Hospital className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{editableData.hospital.name}</h2>
                      <p className="text-blue-100 font-semibold text-lg">{editableData.hospital.type}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold">{editableData.hospital.rating}</span>
                          <span className="text-xs text-blue-200">({editableData.hospital.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-semibold text-blue-100">{editableData.hospital.accreditation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditSection('hospital')}
                    className="group/edit text-white/70 hover:text-white p-3 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  >
                    <Edit3 className="w-5 h-5 group-hover/edit:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">Hospital Address</p>
                      <p className="text-gray-800 font-medium leading-relaxed">{editableData.hospital.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">Contact Number</p>
                      <p className="text-gray-800 font-medium">{editableData.hospital.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Available Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {bookingData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information - Modernized */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  Medical Details
                </h2>
                <button
                  onClick={() => handleEditSection('medical')}
                  className="group text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:shadow-md"
                >
                  <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">Department</p>
                      <p className="font-bold text-gray-800 text-lg">{editableData.medical.department}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-600 mb-1">Appointment Type</p>
                      <p className="font-bold text-gray-800 text-lg">{editableData.medical.appointmentType}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-600 mb-1">Service Type</p>
                      <p className="font-bold text-gray-800 text-lg">{editableData.medical.serviceType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Schedule - Enhanced */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  Appointment Schedule
                </h2>
                <button
                  onClick={() => handleEditSection('dateTime')}
                  className="group text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:shadow-md"
                >
                  <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">Appointment Date</p>
                      <p className="font-bold text-gray-800 text-lg leading-tight">{bookingData.dateTime.date}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">Time & Zone</p>
                      <p className="font-bold text-gray-800 text-lg">{bookingData.dateTime.time}</p>
                      <p className="text-xs text-green-600 font-medium">{bookingData.dateTime.timezone}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-600 mb-1">Duration</p>
                      <p className="font-bold text-gray-800 text-lg">{bookingData.dateTime.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information - Enhanced */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Patient Information
                </h2>
                <button
                  onClick={() => handleEditSection('patients')}
                  className="group text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:shadow-md"
                >
                  <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 rounded-3xl p-8 border border-indigo-200 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{bookingData.patients.primaryPatient.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-200">
                        <p className="text-sm font-semibold text-indigo-600 mb-1">Age</p>
                        <p className="text-lg font-bold text-gray-800">{bookingData.patients.primaryPatient.age} years</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-purple-200">
                        <p className="text-sm font-semibold text-purple-600 mb-1">Gender</p>
                        <p className="text-lg font-bold text-gray-800">{bookingData.patients.primaryPatient.gender}</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-200">
                        <p className="text-sm font-semibold text-indigo-600 mb-1">Patient ID</p>
                        <p className="font-mono text-lg font-bold text-blue-600">{bookingData.patients.primaryPatient.patientId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Services - Enhanced */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  Medical Services
                </h2>
                <button
                  onClick={() => handleEditSection('selectedServices')}
                  className="group text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:shadow-md"
                >
                  <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="space-y-6">
                {bookingData.selectedServices.map((service, index) => (
                  <div key={index} className="group relative bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-xl mb-2">{service.name}</h3>
                          <div className="flex flex-wrap gap-3">
                            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-600 border border-blue-200">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {service.duration}
                            </span>
                            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-600 border border-gray-200">
                              <FileText className="w-4 h-4 inline mr-1" />
                              {service.code}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right lg:text-left">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-lg">
                          <p className="text-sm font-medium opacity-90 mb-1">Price</p>
                          <p className="font-bold text-2xl">฿{service.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">

            {/* Contact Information - Enhanced */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                Contact Details
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-white">
                        {bookingData.contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{bookingData.contact.name}</p>
                      <p className="text-sm font-semibold text-blue-600">Primary Contact</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{bookingData.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{bookingData.contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <Phone className="w-3 h-3 text-red-600" />
                    </div>
                    Emergency Contact
                  </h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">{bookingData.contact.emergencyContact.name}</p>
                    <p className="text-sm font-medium text-orange-600 bg-white/70 px-3 py-1 rounded-full inline-block">
                      {bookingData.contact.emergencyContact.relation}
                    </p>
                    <p className="text-sm font-medium text-gray-700">{bookingData.contact.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary - Enhanced */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                Payment Summary
              </h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Consultation</span>
                    <span className="font-bold text-gray-800">฿{bookingData.pricing.consultation.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Medical Tests</span>
                    <span className="font-bold text-gray-800">฿{bookingData.pricing.tests.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-semibold">Subtotal</span>
                      <span className="font-bold text-gray-800">฿{bookingData.pricing.subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold">฿{bookingData.pricing.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Enhanced */}
            <div className="space-y-4">
              <button
                onClick={handleConfirmAppointment}
                disabled={isLoading}
                className={`group relative w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-5 rounded-2xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Processing...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-lg">Confirm Appointment</span>
                    </>
                  )}
                </div>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.print()}
                  className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-2">
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Save PDF</span>
                  </div>
                </button>
                <button
                  onClick={() => alert('Share functionality would be implemented here')}
                  className="group relative w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-2">
                    <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Share</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Important Information - Enhanced */}
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-amber-800 mb-4 text-lg flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                Before Your Visit
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-amber-800 font-medium">Arrive 15 minutes early for check-in</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-amber-800 font-medium">Bring valid ID and medical records</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-amber-800 font-medium">Fasting may be required for blood tests</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-amber-800 font-medium">Free cancellation up to 2 hours before</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Edit3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Edit {editingSection === 'hospital' ? 'Hospital Information' :
                           editingSection === 'medical' ? 'Medical Details' :
                           editingSection === 'dateTime' ? 'Appointment Schedule' :
                           editingSection === 'patients' ? 'Patient Information' :
                           editingSection === 'selectedServices' ? 'Medical Services' :
                           'Information'}
                    </h2>
                    <p className="text-blue-100 text-sm">Update the information below</p>
                  </div>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {editingSection === 'hospital' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                    <input
                      type="text"
                      value={tempEditData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter hospital name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type</label>
                    <input
                      type="text"
                      value={tempEditData.type || ''}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Private Hospital"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={tempEditData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter hospital address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={tempEditData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation</label>
                    <input
                      type="text"
                      value={tempEditData.accreditation || ''}
                      onChange={(e) => handleInputChange('accreditation', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., JCI Accredited"
                    />
                  </div>
                </div>
              )}

              {editingSection === 'medical' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={tempEditData.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Cardiology Department"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                    <select
                      value={tempEditData.appointmentType || ''}
                      onChange={(e) => handleInputChange('appointmentType', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select appointment type</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <select
                      value={tempEditData.serviceType || ''}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select service type</option>
                      <option value="Regular Checkup">Regular Checkup</option>
                      <option value="Specialist Consultation">Specialist Consultation</option>
                      <option value="Diagnostic Test">Diagnostic Test</option>
                      <option value="Treatment">Treatment</option>
                    </select>
                  </div>
                </div>
              )}

              {editingSection === 'dateTime' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
                    <input
                      type="text"
                      value={tempEditData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Friday, October 6, 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="text"
                      value={tempEditData.time || ''}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 8:00 AM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select
                      value={tempEditData.duration || ''}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select duration</option>
                      <option value="15 minutes">15 minutes</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                    </select>
                  </div>
                </div>
              )}

              {editingSection === 'patients' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      value={tempEditData.primaryPatient?.name || ''}
                      onChange={(e) => handleInputChange('primaryPatient', {...tempEditData.primaryPatient, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={tempEditData.primaryPatient?.age || ''}
                      onChange={(e) => handleInputChange('primaryPatient', {...tempEditData.primaryPatient, age: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={tempEditData.primaryPatient?.gender || ''}
                      onChange={(e) => handleInputChange('primaryPatient', {...tempEditData.primaryPatient, gender: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                    <input
                      type="text"
                      value={tempEditData.primaryPatient?.patientId || ''}
                      onChange={(e) => handleInputChange('primaryPatient', {...tempEditData.primaryPatient, patientId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter patient ID"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                      <input
                        type="number"
                        value={tempEditData.adults || ''}
                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Number of adults"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                      <input
                        type="number"
                        value={tempEditData.children || ''}
                        onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Number of children"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {editingSection === 'selectedServices' && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm mb-4">Edit medical services and their prices</p>

                  {(tempEditData || []).map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                        <input
                          type="text"
                          value={service.name || ''}
                          onChange={(e) => {
                            const updatedServices = [...(tempEditData || [])];
                            updatedServices[index] = {...service, name: e.target.value};
                            handleInputChange('services', updatedServices);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter service name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <input
                            type="text"
                            value={service.duration || ''}
                            onChange={(e) => {
                              const updatedServices = [...(tempEditData || [])];
                              updatedServices[index] = {...service, duration: e.target.value};
                              handleInputChange('services', updatedServices);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 30 min"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (฿)</label>
                          <input
                            type="number"
                            value={service.price || ''}
                            onChange={(e) => {
                              const updatedServices = [...(tempEditData || [])];
                              updatedServices[index] = {...service, price: parseInt(e.target.value)};
                              handleInputChange('services', updatedServices);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter price"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Code</label>
                        <input
                          type="text"
                          value={service.code || ''}
                          onChange={(e) => {
                            const updatedServices = [...(tempEditData || [])];
                            updatedServices[index] = {...service, code: e.target.value};
                            handleInputChange('services', updatedServices);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., CARD-001"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalBookingOverview;