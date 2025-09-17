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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-3 hover:bg-white/80 rounded-full shadow-sm border">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Appointment Overview</h1>
              <p className="text-gray-600 mt-1">Review your medical appointment details</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Appointment ID</p>
            <p className="font-mono text-lg font-semibold text-blue-600">{bookingData.dateTime.appointmentRef}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Hospital Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <Hospital className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{editableData.hospital.name}</h2>
                      <p className="text-blue-100 font-medium">{editableData.hospital.type}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{editableData.hospital.rating}</span>
                          <span className="text-xs text-blue-200">({editableData.hospital.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-blue-200">{editableData.hospital.accreditation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditSection('hospital')}
                    className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800">{editableData.hospital.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Hospital Phone</p>
                      <p className="text-gray-800">{editableData.hospital.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-3">Available Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {bookingData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  Medical Details
                </h2>
                <button
                  onClick={() => handleEditSection('medical')}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <Building className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-semibold text-gray-800">{editableData.medical.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <Activity className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Appointment Type</p>
                    <p className="font-semibold text-gray-800">{editableData.medical.appointmentType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <FileText className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-semibold text-gray-800">{editableData.medical.serviceType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Schedule */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Appointment Schedule</h2>
                <button
                  onClick={() => handleEditSection('dateTime')}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-800">{bookingData.dateTime.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-800">{bookingData.dateTime.time}</p>
                    <p className="text-xs text-gray-500">{bookingData.dateTime.timezone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-800">{bookingData.dateTime.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
                <button
                  onClick={() => handleEditSection('patients')}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{bookingData.patients.primaryPatient.name}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-gray-500">Age: </span>
                        <span className="font-medium">{bookingData.patients.primaryPatient.age}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Gender: </span>
                        <span className="font-medium">{bookingData.patients.primaryPatient.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Patient ID: </span>
                        <span className="font-mono text-blue-600">{bookingData.patients.primaryPatient.patientId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Services */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Medical Services</h2>
                <button
                  onClick={() => handleEditSection('selectedServices')}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {bookingData.selectedServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">{service.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="bg-white px-2 py-1 rounded-full">Duration: {service.duration}</span>
                          <span className="bg-white px-2 py-1 rounded-full">Code: {service.code}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-blue-600">฿{service.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            

            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {bookingData.contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{bookingData.contact.name}</p>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{bookingData.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{bookingData.contact.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Emergency Contact</h3>
                  <p className="text-sm text-gray-700">{bookingData.contact.emergencyContact.name}</p>
                  <p className="text-xs text-gray-500">{bookingData.contact.emergencyContact.relation}</p>
                  <p className="text-sm text-gray-700">{bookingData.contact.emergencyContact.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation</span>
                  <span className="font-medium">฿{bookingData.pricing.consultation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medical Tests</span>
                  <span className="font-medium">฿{bookingData.pricing.tests.toLocaleString()}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">฿{bookingData.pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total Amount</span>
                  <span className="text-blue-600">฿{bookingData.pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleConfirmAppointment}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    Confirm Appointment
                  </>
                )}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  Save PDF
                </button>
                <button
                  onClick={() => alert('Share functionality would be implemented here')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Before Your Visit
              </h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <span>Arrive 15 minutes early for check-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <span>Bring valid ID and medical records</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <span>Fasting may be required for blood tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <span>Free cancellation up to 2 hours before</span>
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