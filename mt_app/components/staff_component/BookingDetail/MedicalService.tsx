import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Interface Definitions
interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  appointment_id: number;
  package_id: number;
  packages: Packages;
  appointments: Appointments;
  hotel_bookings: HotelBookings;
}

interface Appointments {
  appointment_id: number;
  date: string;
  status: string;
  timeslot: string;
  description: string;
  file_name: string;
  file_path: string;
}

interface HotelBookings {
  check_in_date: string;
}

interface Packages {
  package_id: number;
  image: string;
  hospital_id: number;
  package_name: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  hospital_code: string;
  contact_info: string;
  image: string;
}

interface MedicalServiceCardProps {
  selectedDay: number | "all"; // ✅ Accepts selectedDay as a prop
}

const MedicalServiceCard: React.FC<MedicalServiceCardProps> = ({ selectedDay }) => {
  const { id } = useParams();
  const [data, setData] = useState<PackageBooking | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);

        if (result.packages.hospital_id) {
          const hospitalResponse = await fetch(`/api/services/hospitals/${result.packages.hospital_id}`);
          if (!hospitalResponse.ok) throw new Error("Failed to fetch hospital data");
          const hospitalData: Hospital = await hospitalResponse.json();
          setHospital(hospitalData);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!data) return;
  
    try {
      const response = await fetch(`/api/booking/appointments/${data.appointment_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
  
      const updated = await response.json();
  
      // Update local state
      setData((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              appointments: {
                ...prev.appointments,
                status: newStatus,
              },
            }
          : prev
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Could not update status");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading package booking details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data.packages || !data.appointments || !data.hotel_bookings)
    return <p className="text-center text-gray-500">No package booking found.</p>;

  // ✅ Convert `check_in_date` and `appointments.date` into Date objects
  const checkInDate = new Date(data.hotel_bookings.check_in_date);
  const appointmentDate = new Date(data.appointments.date);

  if (isNaN(checkInDate.getTime()) || isNaN(appointmentDate.getTime())) return null; // Prevents errors
  // ✅ Calculate expected date based on check-in date and selectedDay
  let showMedicalService = false;

  if (selectedDay === "all") {
    showMedicalService = true; // Show all if selectedDay is "all"
  } else {
    // ✅ Expected date should match the check-in date plus (selectedDay - 1)
    const expectedDate = new Date(checkInDate);
    expectedDate.setDate(checkInDate.getDate() + (selectedDay - 1));
    // ✅ Compare the formatted dates
    showMedicalService = appointmentDate.toDateString() === expectedDate.toDateString();
  }

  if (!showMedicalService) return null; // ✅ Hide component if not in selected day

  return (
    <div className={`${inter.className}`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>
        Medical Service
      </h2>
      <div className="border border-[#C5D1E0] w-[850px] p-4 rounded-xl shadow-md bg-white relative">
        {/* Status Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <select
          id="status"
          value={data?.appointments.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-[18px] px-2 py-1 text-sm focus:outline-none focus:ring-2
            ${data?.appointments.status === 'Pending' ? 'text-white bg-[#FFCC00] border-[#C5D1E0] focus:ring-yellow-300' : ''}
            ${data?.appointments.status === 'Approved' ? 'text-white bg-[#28A83D] border-[#C5D1E0] focus:ring-green-300' : ''}
            ${data?.appointments.status === 'Rejected' ? 'text-white bg-[#FB5626] border-[#C5D1E0] focus:ring-red-300' : ''}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

        {/* Top Section - Package Details */}
        <div className="flex gap-4 items-start mx-auto mb-4 border-b border-[#C5D1E0] pb-4">
          {/* Left Side: Image */}
          <img
            src={data?.packages.image}
            alt={data?.packages.package_name}
            className="w-55 h-40 rounded-[15px] object-cover"
          />

          {/* Right Side: Details */}
          <div className="flex-1 space-y-2">
            <p className="text-md font-bold">
              Package Name: <span className="font-normal">{data?.packages.package_name}</span>
            </p>
            <p className="text-md font-bold">
              Appointment Date / Time:{" "}
              <span className="font-normal">
                {formatDate(data?.appointments.date)}, {data?.appointments.timeslot}
              </span>
            </p>
            <p className="text-md font-bold">
              Attached File:{" "}
              <a href={data?.appointments.file_path} className="text-blue-500 underline">
                {data?.appointments.file_name}
              </a>
            </p>
            <p className="text-md font-bold">
              Description: <span className="font-normal">{data?.appointments.description}.</span>
            </p>
          </div>
        </div>

        {/* Hospital Section */}
        <div className="flex gap-4 items-start mx-auto">
          <img
            src={hospital?.image}
            alt={hospital?.name}
            className="w-55 h-40 rounded-[15px] object-cover"
          />
          <div className="flex-1 space-y-2">
            <p className="text-md font-bold">
              Hospital Name: <span className="font-normal">{hospital?.name}</span>
            </p>
            <p className="text-md font-bold">
              Contact number: <span className="font-normal">{hospital?.contact_info}</span>
            </p>
            <p className="text-md font-bold">
              Code: <span className="font-normal">{hospital?.hospital_code}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceCard;
