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
  hotel_bookings: HotelBookings; // ✅ Added hotel booking reference for check-in date
}

interface Appointments {
  appointment_id: number;
  date: string;
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
  package_name: string;
}

interface MedicalServiceCardProps {
  selectedDay: number | "all"; // ✅ Accepts selectedDay as a prop
}

const MedicalServiceCard: React.FC<MedicalServiceCardProps> = ({ selectedDay }) => {
  const { id } = useParams();
  const [data, setData] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
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
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        {/* Left Side: Image */}
        <img
          src={data.packages.image}
          alt={data.packages.package_name}
          className="w-55 h-40 rounded-[15px] object-cover"
        />

        {/* Right Side: Details */}
        <div className="flex-1 space-y-2">
          <p className="text-md font-bold">
            Package Name: <span className="font-normal">{data.packages.package_name}</span>
          </p>
          <p className="text-md font-bold">
            Appointment Date / Time:{" "}
            <span className="font-normal">
              {formatDate(data.appointments.date)}, {data.appointments.timeslot}
            </span>
          </p>
          <p className="text-md font-bold">
            Attached File:{" "}
            <a href={data.appointments.file_path} className="text-blue-500 underline">
              {data.appointments.file_name}
            </a>
          </p>
          <p className="text-md font-bold">
            Description: <span className="font-normal">{data.appointments.description}.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceCard;
