'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Calendar, User, Package, Hospital, Hotel, MapPin, Phone, Mail, DollarSign, CheckCircle, XCircle, Clock, Edit, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import '@/app/admin/styles/globals.css';

interface BookingDetail {
  booking_id: string;
  user: {
    id: number;
    name: string;
    email: string;
    nationality: string;
    image: string;
  };
  packages: Packages;
  appointments: Appointments[];
  hotel_bookings: Hotels[];
  tourism_bookings: Tourism[];
  guide_bookings: Guides[];
  user_contact_detail?: User_detail;
  payment?: Payment[];
  status: string;
  create_at: string;
}

interface Tourism {
  tourism_id: string;
  status: string;
  trips: {
    tour_id: number;
    duration: number;
    description: string;
  };
}

interface User_detail {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  country: string;
}

interface Payment {
  payment_id: string;
  amount: number;
  payment_status: string;
  payment_method: string;
  payment_date: string;
}

interface Packages {
  package_id: string;
  package_name: string;
  image: string;
  duration: string;
  hospitals: {
    name: string;
    hospital_code: string;
    image: string;
    contact_info: string;
  };
}

interface Hotels {
  booking_id: number;
  check_in_date: string;
  check_out_date: string;
  guest_adult?: number;
  guest_children?: number;
  total_price: number;
  status: string;
  hotels: {
    name: string;
    image: string;
    hotel_code: string;
  };
  room_aggregate?: Array<{
    amount: number;
    hotel_rooms?: {
      room_type?: string;
      capacity?: string;
      description?: string;
    };
  }>;
}

interface Guides {
  booking_id: number;
  start: string;
  end: string;
  status: string;
  guides: {
    name: string;
    image: string;
  };
}

interface Appointments {
  appointment_id: string;
  date: string;
  timeslot: string;
  status: string;
}

const BookingDetailPage: React.FC = () => {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const params = useParams();
  const BookingId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingService, setUpdatingService] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`/api/admin/booking/packages/${BookingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        console.log('Booking data received:', data);
        console.log('Appointments:', data.appointments);
        console.log('Hotel bookings:', data.hotel_bookings);
        console.log('Tourism bookings:', data.tourism_bookings);
        console.log('Guide bookings:', data.guide_bookings);
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError('Error fetching booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [BookingId]);

  // Handle service status update
  const handleServiceStatusUpdate = async (serviceType: string, serviceId: string, newStatus: string) => {
    try {
      setUpdatingService(`${serviceType}-${serviceId}`);
      const response = await fetch('/api/admin/booking/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType,
          serviceId,
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service status');
      }

      // Refresh booking data
      const bookingResponse = await fetch(`/api/admin/booking/packages/${BookingId}`);
      if (bookingResponse.ok) {
        const updatedBooking = await bookingResponse.json();
        setBooking(updatedBooking);
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      setError('Failed to update service status');
    } finally {
      setUpdatingService(null);
    }
  };

  // Handle main booking status update
  const handleBookingStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch('/api/admin/booking/packages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: BookingId,
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Refresh booking data
      const bookingResponse = await fetch(`/api/admin/booking/packages/${BookingId}`);
      if (bookingResponse.ok) {
        const updatedBooking = await bookingResponse.json();
        setBooking(updatedBooking);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('Failed to update booking status');
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async () => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/booking/packages/${BookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      // Redirect to bookings list
      router.push('/admin/booking');
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to delete booking');
    } finally {
      setDeleting(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'approved':
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
        case 'in_progress':
          return 'bg-yellow-100 text-yellow-800';
        case 'rejected':
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  // Service status dropdown component
  const ServiceStatusDropdown = ({ serviceType, serviceId, currentStatus }: { serviceType: string, serviceId: string, currentStatus: string }) => {
    const isUpdating = updatingService === `${serviceType}-${serviceId}`;
    
    // Define available statuses based on service type
    const getAvailableStatuses = (type: string) => {
      switch (type) {
        case 'appointment':
          return ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];
        case 'hotel':
          return ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
        case 'tourism':
          return ['In_Progress', 'Pending', 'Approved', 'Rejected'];
        case 'guide':
          return ['In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
        default:
          return ['Pending', 'Approved', 'Rejected', 'Completed'];
      }
    };

    const availableStatuses = getAvailableStatuses(serviceType);

    return (
      <div className="flex items-center gap-2">
        <select
          value={currentStatus}
          onChange={(e) => handleServiceStatusUpdate(serviceType, serviceId, e.target.value)}
          disabled={isUpdating}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white disabled:opacity-50"
        >
          {availableStatuses.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
        {isUpdating && (
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading booking details...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !booking) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">{error || 'Booking not found'}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
            <p className="text-gray-600">Booking ID: #{booking.booking_id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
              booking.status === 'Pending' || booking.status === 'In_Progress' ? 'bg-yellow-100 text-yellow-800' :
              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {booking.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{booking.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{booking.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium text-gray-900">{booking.user.nationality || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium text-gray-900">#{booking.user.id}</p>
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Package Information
              </h2>
              <div className="flex items-start gap-4">
                {booking.packages.image && (
                  <img
                    src={booking.packages.image}
                    alt={booking.packages.package_name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{booking.packages.package_name}</h3>
                  <p className="text-sm text-gray-500">Package ID: {booking.packages.package_id}</p>
                  {booking.packages.duration && (
                    <p className="text-sm text-gray-500">Duration: {booking.packages.duration}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hospital className="h-5 w-5" />
                Hospital Information
              </h2>
              <div className="flex items-start gap-4">
                {booking.packages.hospitals.image && (
                  <img
                    src={booking.packages.hospitals.image}
                    alt={booking.packages.hospitals.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{booking.packages.hospitals.name}</h3>
                  <p className="text-sm text-gray-500">Hospital Code: {booking.packages.hospitals.hospital_code}</p>
                  {booking.packages.hospitals.contact_info && (
                    <p className="text-sm text-gray-500">Contact: {booking.packages.hospitals.contact_info}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Medical Appointments
              </h2>
              {booking.appointments && booking.appointments.length > 0 ? (
                <div className="space-y-3">
                  {booking.appointments.map((appointment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Appointment #{appointment.appointment_id}</p>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Time: {appointment.timeslot}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={appointment.status} />
                          <ServiceStatusDropdown 
                            serviceType="appointment" 
                            serviceId={appointment.appointment_id} 
                            currentStatus={appointment.status} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments found for this booking.</p>
              )}
            </div>

            {/* Hotel Bookings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Hotel Bookings
              </h2>
              {booking.hotel_bookings && booking.hotel_bookings.length > 0 ? (
                <div className="space-y-3">
                  {booking.hotel_bookings.map((hotel, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{hotel.hotels.name}</p>
                          <p className="text-sm text-gray-500">
                            Check-in: {new Date(hotel.check_in_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Check-out: {new Date(hotel.check_out_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ฿{hotel.total_price?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={hotel.status} />
                          <ServiceStatusDropdown 
                            serviceType="hotel" 
                            serviceId={hotel.booking_id.toString()} 
                            currentStatus={hotel.status} 
                          />
                        </div>
                      </div>
                      
                      {/* Guest Information */}
                      <div className="mb-3 p-3 bg-white rounded border">
                        <h4 className="font-medium text-gray-900 mb-2">Guest Information</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Adults:</span>
                            <span className="ml-2 font-medium">{hotel.guest_adult || 0}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Children:</span>
                            <span className="ml-2 font-medium">{hotel.guest_children || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Room Details */}
                      {hotel.room_aggregate && hotel.room_aggregate.length > 0 ? (
                        <div className="p-3 bg-white rounded border">
                          <h4 className="font-medium text-gray-900 mb-2">Room Details</h4>
                          <div className="space-y-2">
                            {hotel.room_aggregate.map((room, roomIndex) => (
                              <div key={roomIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {room.hotel_rooms?.room_type || 'Standard Room'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Capacity: {room.hotel_rooms?.capacity || 'N/A'}
                                  </p>
                                  {room.hotel_rooms?.description && (
                                    <p className="text-sm text-gray-500">
                                      {room.hotel_rooms.description}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">
                                    {room.amount?.toLocaleString()} room
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-white rounded border">
                          <p className="text-gray-500 text-sm">No room details available</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hotel bookings found for this booking.</p>
              )}
            </div>

            {/* Tourism Bookings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tourism Bookings
              </h2>
              {booking.tourism_bookings && booking.tourism_bookings.length > 0 ? (
                <div className="space-y-3">
                  {booking.tourism_bookings.map((tourism, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Tour #{tourism.trips.tour_id}</p>
                          <p className="text-sm text-gray-500">{tourism.trips.description}</p>
                          <p className="text-sm text-gray-500">
                            Duration: {tourism.trips.duration} days
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={tourism.status} />
                          <ServiceStatusDropdown 
                            serviceType="tourism" 
                            serviceId={tourism.tourism_id} 
                            currentStatus={tourism.status} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No tourism bookings found for this booking.</p>
              )}
            </div>

            {/* Guide Bookings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Guide Bookings
              </h2>
              {booking.guide_bookings && booking.guide_bookings.length > 0 ? (
                <div className="space-y-3">
                  {booking.guide_bookings.map((guide, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{guide.guides.name}</p>
                          <p className="text-sm text-gray-500">
                            Start: {new Date(guide.start).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            End: {new Date(guide.end).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={guide.status} />
                          <ServiceStatusDropdown 
                            serviceType="guide" 
                            serviceId={guide.booking_id.toString()} 
                            currentStatus={guide.status} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No guide bookings found for this booking.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="font-medium">{new Date(booking.create_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' || booking.status === 'In_Progress' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                {booking.payment?.[0] && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-medium">฿{booking.payment[0].amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="font-medium">{booking.payment[0].payment_status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">{booking.payment[0].payment_method}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contact Details */}
            {booking.user_contact_detail && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {booking.user_contact_detail.firstname} {booking.user_contact_detail.lastname}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{booking.user_contact_detail.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{booking.user_contact_detail.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-900">{booking.user_contact_detail.country}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Status Management */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <StatusBadge status={booking.status} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Change Status
                  </label>
                  <select
                    value={booking.status}
                    onChange={(e) => handleBookingStatusUpdate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="In_Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/admin/booking')}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Bookings
                </button>
                <button
                  onClick={handleDeleteBooking}
                  disabled={deleting}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleting ? 'Deleting...' : 'Delete Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingDetailPage;
