import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  package_id: number;
}

interface PackageData {
  package_id: number;
  package_type: string;
}

const PackageType = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<PackageBooking | null>(null);
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Function to format package_type
  const formatPackageType = (type: string) => {
    if (type === "Medical_Tourism") return "Medical & Tourism";
    if (type === "Medical_Service_Only") return "Medical Service Only";
    return type.replace(/_/g, " "); // Default: Replace underscores with spaces
  };

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const bookingResponse = await fetch(`/api/booking/packages/${id}`);
        if (!bookingResponse.ok) throw new Error("Failed to fetch booking data");
        const bookingResult = await bookingResponse.json();

        setBookingData(bookingResult);

        const createdAt = new Date(bookingResult.create_at);
        const now = new Date();
        const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
        setCanEdit(diffInMinutes <= 30); // Can be edited if within 30 minutes

        const packageResponse = await fetch(`/api/services/packages/${bookingResult.package_id}`);
        if (!packageResponse.ok) throw new Error("Failed to fetch package data");
        const packageResult = await packageResponse.json();
        setPackageData(packageResult);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);

  // Function to show warning modal
  const handleShowWarning = () => {
    setShowWarning(true);
  };

  // Function to confirm and cancel booking
  const handleCancelBooking = async () => {
    if (!bookingData) return;

    setIsCanceling(true);
    setShowWarning(false);

    try {
      const response = await fetch(`/api/booking/packages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          status: "Cancelled",
        }),
      });

      if (!response.ok) throw new Error("Failed to cancel booking");

      const updatedData = await response.json();
      setBookingData(updatedData);
    } catch (error: any) {
      console.error("Error canceling booking:", error);
      setError("Failed to cancel the booking.");
    } finally {
      setIsCanceling(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!bookingData || !packageData) return <p className="text-center text-gray-500">No data found.</p>;

  return (
    <div className="bg-white p-6 rounded-[20px] shadow-md mb-4 flex justify-between border border-[#C5D1E0]">
      <span className="font-bold text-lg">
        Package Type: {formatPackageType(packageData.package_type)}
      </span>
      <div className="flex gap-2">
        {bookingData.status === "Cancelled" ? (
          <span className="bg-gray-500 text-white px-4 py-1 rounded-[20px] shadow-lg cursor-not-allowed">
            Status: Cancelled
          </span>
        ) : (
          <>
            {/* ✅ Hide the "Cancel the Booking" button if status is "Approved" */}
            {bookingData.status !== "Approved"  && (
              <button
                onClick={handleShowWarning}
                className="bg-[#FF0707] text-white px-4 py-1 rounded-[20px] shadow-lg"
                disabled={isCanceling}
              >
                Cancel the Booking
              </button>
            )}

            <button
              className={`px-4 py-1 rounded-[20px] shadow-lg ${
                canEdit ? "bg-[#639755]" : "bg-[#FFCC00]"
              } text-white`}
            >
              {canEdit ? "Can be edited" : "Can not be edited"}
            </button>
          </>
        )}
      </div>


      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Cancel Booking?</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelBooking}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageType;
