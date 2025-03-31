"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

const BookingTable = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<PackageBooking | null>(null);
  const [actionType, setActionType] = useState<"Approved" | "Rejected" | null>(null);
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

        // Filter only Pending status
        const pendingBookings = data.filter((booking) => booking.status === "Pending");

        setBookings(pendingBookings);
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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className={`mt-5 bg-white p-6 border-t border-[#C5D1E0] ${inter.className}`}>
      {/* Top Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all">
          Filter
        </button>
        <span className="text-gray-600">Showing {bookings.length} items</span>
        <input
          type="text"
          className="border border-[#C5D1E0] px-4 py-2 rounded-[20px] flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Search..."
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No history available.</p>
        ) : (
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="text-gray-700" style={{ fontSize: "20px" }}>
                <th className="py-3 px-4 text-center">Book ID</th>
                <th className="py-3 px-4 text-center">Package Type</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id} className="hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4">{booking.booking_id}</td>
                  <td className="py-3 px-4">{booking.packages.package_type}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      className="bg-[#34C759] text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-all" style={{fontSize: "17px"}}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setActionType("Approved");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-[#FB5626] text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all" style={{fontSize: "17px"}}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setActionType("Rejected");
                      }}
                    >
                      Disapprove
                    </button>
                    <FaSearch
                      className="text-gray-500 cursor-pointer hover:text-blue-500 transition-all text-lg"
                      onClick={() => router.push(`/staff/BookingDetail/${booking.booking_id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedBooking && actionType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to {actionType.toLowerCase()} this booking?
            </h2>
            <p className="text-gray-600 mb-6">Booking ID: {selectedBooking.booking_id}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
                onClick={() => {
                  setSelectedBooking(null);
                  setActionType(null);
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white transition-all ${
                  actionType === "Approved" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={handleStatusUpdate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
