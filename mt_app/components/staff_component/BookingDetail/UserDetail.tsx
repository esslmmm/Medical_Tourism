import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PackageBooking {
  booking_id: number;
  user_id: number;
  status: string;
  create_at: string;
  appointment_id: number;
  package_id: number;
  packages: Packages;
  appointments: Appointments;
}

interface User {
  id: number;
  name: string;
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
  package_type: string;
  image: string;
  hospital_id: number;
  package_name: string;
}

const UserDetail: React.FC = () => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<PackageBooking | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/admin/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);

        if (result.user_id) {
          const userResponse = await fetch(`/api/admin/profile/${result.user_id}`);
          if (!userResponse.ok) throw new Error("Failed to fetch user data");
          const userData: User = await userResponse.json();
          setUser(userData);
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

  const formatPackageType = (type: string) => {
    if (type === "Medical_Tourism") return "Medical & Tourism";
    if (type === "Medical_Service_Only") return "Medical Service Only";
    return type.replace(/_/g, " ");
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading package booking details...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className={`${inter.className} mb-2`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>
        Booking Detail
      </h2>
      <div className="border border-[#C5D1E0] w-[850px] p-4 rounded-xl shadow-md bg-white">
          <div className='pl-2 flex gap-40'>
            <div className='space-y-5'>
            <p className="text-md font-bold">
            Customer Name: <span className="font-normal">{user?.name || "N/A"}</span>
          </p>
          <p className="text-md font-bold">
            Appointment Date:{" "}
            <span className="font-normal">
              {data?.appointments ? formatDate(data.appointments.date) : "N/A"}
            </span>
          </p>
          <p className="text-md font-bold">
            Booking ID: <span className="font-normal">{data?.booking_id ?? "N/A"}</span>
          </p>
            </div>
          <div className='flex-1 space-y-5'>
          <p className="text-md font-bold">
            Package Type:{" "}
            <span className="font-normal">
              {data?.packages ? formatPackageType(data.packages.package_type) : "N/A"}
            </span>
          </p>
          <p className="text-md font-bold">
            Appointment Time:{" "}
            <span className="font-normal">{data?.appointments?.timeslot || "N/A"}</span>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
