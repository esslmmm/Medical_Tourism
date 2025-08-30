"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter, Eye, Check, X, Clock, Package, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PackageBooking {
  booking_id: number;
  package_id: number;
  create_at: string;
  status: string;
  packages: {
    package_id: number;
    package_name: string;
    duration: string;
  };
  appointments?: { status: string; };
  hotel_bookings?: { status: string; };
  tourism_bookings?: { status: string; };
  guide_bookings?: { status: string; };
}

const BookingTable = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<PackageBooking | null>(null);
  const [actionType, setActionType] = useState<"Approved" | "Rejected" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<PackageBooking[]>([]);
  const router = useRouter();

  // Check if all sub-bookings are approved
  const areAllBookingsApproved = (booking: PackageBooking): boolean => {
    // Check if main booking is pending
    if (booking.status !== "Pending") return false;
    
    // Get all sub-booking statuses (only consider existing bookings)
    const subBookingStatuses = [
      booking.appointments?.status,
      booking.hotel_bookings?.status,
      booking.tourism_bookings?.status,
      booking.guide_bookings?.status,
    ].filter(status => status !== undefined); // Filter out undefined (non-existing bookings)
    
    // If no sub-bookings exist, return false
    if (subBookingStatuses.length === 0) return false;
    
    // All existing sub-bookings must be "Approved"
    return subBookingStatuses.every(status => status === "Approved");
  };

  // Check if all sub-bookings are rejected
  const areAllBookingsRejected = (booking: PackageBooking): boolean => {
    // Check if main booking is pending
    if (booking.status !== "Pending") return false;
    
    // Get all sub-booking statuses (only consider existing bookings)
    const subBookingStatuses = [
      booking.appointments?.status,
      booking.hotel_bookings?.status,
      booking.tourism_bookings?.status,
      booking.guide_bookings?.status,
    ].filter(status => status !== undefined); // Filter out undefined (non-existing bookings)
    
    // If no sub-bookings exist, return false
    if (subBookingStatuses.length === 0) return false;
    
    // All existing sub-bookings must be "Rejected"
    return subBookingStatuses.every(status => status === "Rejected");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data: PackageBooking[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        // Filter only Pending status
        const pendingBookings = data.filter((booking) => booking.status === "Pending");
        setBookings(pendingBookings);
        setFilteredBookings(pendingBookings);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = bookings.filter((booking) =>
      booking.booking_id.toString().includes(searchTerm.toLowerCase()) ||
      booking.packages.duration.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const handleStatusUpdate = async () => {
    if (!selectedBooking || !actionType) return;

    try {
      const response = await fetch(`/api/booking/packages/${selectedBooking.booking_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking_id: selectedBooking.booking_id, status: actionType }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update UI by removing the booking after approval/disapproval
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.booking_id !== selectedBooking.booking_id)
      );

      // Reset modal state
      setSelectedBooking(null);
      setActionType(null);
    } catch (err: unknown) {
      console.error("Error updating booking status:", err);
    }
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p className="text-gray-600 font-medium">Loading bookings...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-red-600 font-semibold text-lg mb-2">Error Loading Data</p>
      <p className="text-gray-600">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Clock className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-600 font-semibold text-lg mb-2">No Pending Bookings</p>
      <p className="text-gray-500">All bookings have been processed.</p>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {filteredBookings.length} items
            </div>
          </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Search by booking ID or package type..."
            />
          </div>
          <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredBookings.length === 0 ? (
          searchTerm ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 font-semibold text-lg mb-2">No Results Found</p>
              <p className="text-gray-500">Try adjusting your search terms.</p>
            </div>
          ) : (
            <EmptyState />
          )
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Booking ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Package Duration</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking, index) => {
                const canApprove = areAllBookingsApproved(booking);
                const canReject = areAllBookingsRejected(booking);
                
                return (
                  <tr 
                    key={booking.booking_id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">ID: {booking.booking_id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.create_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex text-center gap-2">
                        <span className="font-medium text-center text-gray-900">
                          {booking.packages.duration} Days
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setActionType("Approved");
                          }}
                          disabled={!canApprove}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md ${
                            canApprove
                              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                          title={
                            canApprove
                              ? "Approve this booking"
                              : "All sub-bookings (medical, accommodation, tourism, guide) must be approved first"
                          }
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setActionType("Rejected");
                          }}
                          disabled={!canReject}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md ${
                            canReject
                              ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                          title={
                            canReject
                              ? "Reject this booking"
                              : "All sub-bookings (medical, accommodation, tourism, guide) must be rejected first"
                          }
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => router.push(`/staff/BookingDetail/${booking.booking_id}`)}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedBooking && actionType && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                actionType === "Approved" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
              }`}>
                {actionType === "Approved" ? (
                  <Check className="w-8 h-8" />
                ) : (
                  <X className="w-8 h-8" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {actionType === "Approved" ? "Approve Booking" : "Reject Booking"}
              </h2>
              <p className="text-gray-600">
                Are you sure you want to {actionType.toLowerCase()} booking #{selectedBooking.booking_id}?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-600">Package: {selectedBooking.packages.package_name}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  setActionType(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className={`flex-1 text-white py-3 px-4 rounded-xl transition-colors font-medium ${
                  actionType === "Approved" 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {actionType === "Approved" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;