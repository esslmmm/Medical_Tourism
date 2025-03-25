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
}

interface Appointments {
  appointment_id: number;
  date: string;
  timeslot: string;
  description: string;
  file_name: string;
  file_path: string;
}

interface Packages {
  package_id: number;
  image: string;
  package_name: string;
}

const MedicalServiceCard = () => {
  const { id } = useParams();
  const [data, setData] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/packages/${id}`);
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

  const formatDate = (timestamp: string | number | Date) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return `${date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading package booking details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data.packages || !data.appointments)
    return <p className="text-center text-gray-500">No package booking found.</p>;

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

        {/* Edit Icon */}
        {/* <FaEdit className="text-gray-500 cursor-pointer self-start" /> */}
      </div>
    </div>
  );
};

export default MedicalServiceCard;
