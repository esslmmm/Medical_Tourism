import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, Download, Star, Wifi, Car, Utensils, Stethoscope, Bed, Camera, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const BookingDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample booking data
  const bookingData = {
    bookingId: "BK-2024-001234",
    status: "confirmed",
    totalAmount: 2850.00,
    currency: "USD",
    bookingDate: "2024-08-20",
    customerInfo: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      emergencyContact: "+1 (555) 987-6543"
    },
    components: [
      {
        type: "medical",
        title: "Health Check-up Package",
        provider: "Bangkok International Hospital",
        date: "2024-09-15",
        time: "09:00 AM",
        location: "Bangkok, Thailand",
        duration: "Full Day",
        services: ["Complete Blood Count", "X-Ray Examination", "Cardiology Consultation", "General Health Assessment"],
        doctor: "Dr. Sarah Johnson",
        department: "General Medicine",
        price: 850.00,
        status: "confirmed",
        notes: "Please fast for 12 hours before the appointment"
      },
      {
        type: "accommodation",
        title: "Luxury Hotel Suite",
        provider: "Grand Palace Hotel",
        checkIn: "2024-09-14",
        checkOut: "2024-09-17",
        duration: "3 nights",
        location: "Bangkok, Thailand",
        roomType: "Deluxe Suite",
        guests: 2,
        amenities: ["Free WiFi", "Airport Transfer", "Breakfast Included", "Spa Access"],
        price: 1200.00,
        status: "confirmed"
      },
      {
        type: "tourism",
        title: "Bangkok City Tour",
        provider: "Amazing Thailand Tours",
        date: "2024-09-16",
        time: "08:00 AM",
        duration: "8 hours",
        location: "Bangkok, Thailand",
        activities: ["Grand Palace Visit", "Wat Pho Temple", "Floating Market", "Traditional Thai Lunch"],
        groupSize: "Small Group (max 12)",
        price: 800.00,
        status: "confirmed"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const renderMedicalComponent = (component) => (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{component.title}</h3>
            <p className="text-blue-600 font-medium">{component.provider}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(component.status)}`}>
          {getStatusIcon(component.status)}
          <span className="capitalize">{component.status}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{component.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{component.time} ({component.duration})</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{component.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>{component.doctor} - {component.department}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Services Included:</h4>
        <div className="flex flex-wrap gap-2">
          {component.services.map((service, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {service}
            </span>
          ))}
        </div>
      </div>

      {component.notes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 text-sm">{component.notes}</p>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-blue-200">
        <span className="text-lg font-semibold text-gray-900">
          ${component.price.toFixed(2)}
        </span>
      </div>
    </div>
  );

  const renderAccommodationComponent = (component) => (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Bed className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{component.title}</h3>
            <p className="text-purple-600 font-medium">{component.provider}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(component.status)}`}>
          {getStatusIcon(component.status)}
          <span className="capitalize">{component.status}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Check-in: {component.checkIn}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Check-out: {component.checkOut}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{component.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>{component.guests} guests</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{component.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Bed className="w-4 h-4" />
          <span>{component.roomType}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Amenities:</h4>
        <div className="flex flex-wrap gap-2">
          {component.amenities.map((amenity, index) => (
            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-purple-200">
        <span className="text-lg font-semibold text-gray-900">
          ${component.price.toFixed(2)}
        </span>
      </div>
    </div>
  );

  const renderTourismComponent = (component) => (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Camera className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{component.title}</h3>
            <p className="text-emerald-600 font-medium">{component.provider}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(component.status)}`}>
          {getStatusIcon(component.status)}
          <span className="capitalize">{component.status}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{component.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{component.time} ({component.duration})</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{component.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>{component.groupSize}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Activities:</h4>
        <div className="flex flex-wrap gap-2">
          {component.activities.map((activity, index) => (
            <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
              {activity}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-emerald-200">
        <span className="text-lg font-semibold text-gray-900">
          ${component.price.toFixed(2)}
        </span>
      </div>
    </div>
  );

  const renderComponent = (component) => {
    switch (component.type) {
      case 'medical':
        return renderMedicalComponent(component);
      case 'accommodation':
        return renderAccommodationComponent(component);
      case 'tourism':
        return renderTourismComponent(component);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {bookingData.bookingId}</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className={`flex items-center space-x-1 px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(bookingData.status)}`}>
                {getStatusIcon(bookingData.status)}
                <span className="capitalize">{bookingData.status}</span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500">Booking Date</p>
              <p className="font-medium text-gray-900">{bookingData.bookingDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium text-gray-900">${bookingData.totalAmount.toFixed(2)} {bookingData.currency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Components</p>
              <p className="font-medium text-gray-900">{bookingData.components.length} services</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{bookingData.customerInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{bookingData.customerInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{bookingData.customerInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Emergency Contact</p>
                <p className="font-medium text-gray-900">{bookingData.customerInfo.emergencyContact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Components */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Booked Services</h2>
          {bookingData.components.map((component, index) => (
            <div key={index}>
              {renderComponent(component)}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
          <div className="space-y-3">
            {bookingData.components.map((component, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-gray-600">{component.title}</span>
                <span className="font-medium text-gray-900">${component.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-gray-900">${bookingData.totalAmount.toFixed(2)} {bookingData.currency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-4 h-4" />
            <span>View Terms</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Modify Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;