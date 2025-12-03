import React, { useEffect, useState } from "react";
import { Search, Filter, Eye, Archive, CheckCircle, XCircle, Package, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PackageBooking {
  booking_id: number;
  package_id: number;
  create_at: string;
  status: string;
  packages: {
    package_id: number;
    package_type: string;
  };
}

const History = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [filteredBookings, setFilteredBookings] = useState<PackageBooking[]>([]);
  const router = useRouter();

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
        const processedBookings = data.filter((booking) => booking.status !== "Pending");
        setBookings(processedBookings);
        setFilteredBookings(processedBookings);
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

  // Filter functionality
  useEffect(() => {
    let filtered = bookings;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((booking) =>
        booking.booking_id.toString().includes(searchTerm.toLowerCase()) ||
        booking.packages.package_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusCount = (status: string) => {
    if (status === "All") return bookings.length;
    return bookings.filter((booking) => booking.status === status).length;
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mb-4"></div>
      <p className="text-gray-600 font-medium">Loading history...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-red-600 font-semibold text-lg mb-2">Error Loading Data</p>
      <p className="text-gray-600">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Archive className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-600 font-semibold text-lg mb-2">
        {searchTerm || statusFilter !== "All" ? "No Results Found" : "No Booking History"}
      </p>
      <p className="text-gray-500">
        {searchTerm || statusFilter !== "All" 
          ? "Try adjusting your search terms or filters." 
          : "Processed bookings will appear here."
        }
      </p>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Archive className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Booking History</h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {filteredBookings.length} items
            </div>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="Search by booking ID or package type..."
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4 flex-wrap">


          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2">
            {["All", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors font-medium text-sm ${
                  statusFilter === status
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status !== "All" && getStatusIcon(status)}
                {status}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  statusFilter === status 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredBookings.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Booking Details</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Package Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking, index) => (
                <tr 
                  key={booking.booking_id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        booking.status === "Approved" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-red-100 text-red-600"
                      }`}>
                        {getStatusIcon(booking.status)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">ID: {booking.booking_id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.create_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {booking.packages.package_type}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusClass(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => router.push(`/staff/booking-management/${booking.booking_id}`)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Footer */}
      {filteredBookings.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredBookings.length} of {bookings.length} bookings
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {getStatusCount("Approved")} Approved
              </span>
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                {getStatusCount("Rejected")} Rejected
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;