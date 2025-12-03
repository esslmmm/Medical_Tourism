import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { PackageBooking } from "@/types/Booking";


interface MedicalServiceCardProps {
  packageBooking: PackageBooking | null;
  setPackageBooking: (arg: any) => void;
}

const MedicalServiceCard = ({ packageBooking, setPackageBooking }: MedicalServiceCardProps) => {
  if (!packageBooking) return null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    if (!packageBooking) return;

    try {
      const response = await fetch(`/api/booking/appointments/${packageBooking.appointment_id}`, {
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

      setPackageBooking((prev: any) =>
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

  return (
    <div>
      {/* Appointment Details */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-semibold">Appointment Details</h2>
         </div>
          
          <div className="p-6 relative">
            {/* Status Dropdown - Top Right */}
          <div className="absolute top-6 right-6">
            <select
              id="status"
              value={packageBooking?.appointments.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm border transition-all
            ${packageBooking?.appointments.status === "Pending" && "bg-yellow-500 text-white"}
            ${packageBooking?.appointments.status === "Approved" && "bg-green-600 text-white"}
            ${packageBooking?.appointments.status === "Rejected" && "bg-red-500 text-white"}
          `}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

            {/* Medical Service Booking */}
            <div className="flex gap-4 items-start mx-auto border-b border-gray-300 pb-4 mb-4">
              {/* Left Side: Image */}
            <img
              src={packageBooking?.packages.image}
              alt={packageBooking?.packages.package_name}
              className="w-55 h-40 rounded-[15px] object-cover"
            />

            <div>
              <div className="mb-4">
            <span className="font-semibold mb-2">Medical Package Name : </span>
            <span className="text-gray-700">{packageBooking?.packages.package_name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 gap-x-6">
              <div>
                  <span className="font-semibold">Appointment Date : </span>
                  <span className="text-gray-700">{formatDate(packageBooking?.appointments.date)}</span>
                </div>
                <div>
                  <span className="font-semibold">Time Slot : </span>
                  <span className="text-gray-700">{packageBooking?.appointments.timeslot}</span>
                </div>
                <div>
                  <span className="font-semibold">Adult : </span>
                  <span className="text-gray-700">{packageBooking?.appointments.adult}</span>
                </div>
                <div>
                  <span className="font-semibold">Child : </span>
                  <span className="text-gray-700">{packageBooking?.appointments.child}</span>
                </div>
              </div>
            </div>
            </div>

            {/* Hospital Details */}
            <div className="flex gap-4 items-start mx-auto">
            <img
              src={packageBooking.packages.hospitals?.image}
              alt={packageBooking.packages.hospitals?.name}
              className="w-55 h-40 rounded-[15px] object-cover"
            />
            <div className="flex-1 space-y-4">
              <p className="text-md font-bold">
                Hospital Name: <span className="font-normal">{packageBooking.packages.hospitals?.name}</span>
              </p>
              <p className="text-md font-bold">
                Contact number: <span className="font-normal">{packageBooking.packages.hospitals?.contact_info}</span>
              </p>
              <p className="text-md font-bold">
                Code: <span className="font-normal">{packageBooking.packages.hospitals?.hospital_code}</span>
              </p>
            </div>
          </div>
          </div>
        </div>

      {/* Patient Details */}
      <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
        <div className="px-6 pt-6">
          <h3 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300">
            Patient details
          </h3>

          {packageBooking.appointments.patient_details.map((p, i) => (
            <div
              key={i}
              className={`mb-5 pb-4 border-b border-gray-300 ${i === packageBooking.appointments.patient_details.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                }`}
            >
              <p className="font-semibold text-lg mb-5">{p.firstname} {p.lastname}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold">Gender : </span>
                  <span className="text-gray-700">{p.gender}</span>
                </div>
                <div>
                  <span className="font-semibold">Nationality : </span>
                  <span className="text-gray-700">{p.nationality}</span>
                </div>
                <div>
                  <span className="font-semibold">Date of Birth : </span>
                  <span className="text-gray-700">{formatDate(p.dateofbirth)}</span>
                </div>
                <div>
                  <span className="font-semibold">Passport ID : </span>
                  <span className="text-gray-700">{p.passport_number}</span>
                </div>
                <div>
                </div>
              </div>

              <p className="font-semibold mb-3">Medical Report File :</p>
              {p.appointment_files?.files ? (
                <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mb-4 bg-gray-50">
                  <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                    <FileText className="text-red-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-600 font-medium hover:underline">
                      {p.appointment_files.files.originalName || p.appointment_files.files.fileName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>Uploaded: {formatDate(p.appointment_files.files.uploadedAt)}</span>
                      <span>Size: {(p.appointment_files.files.fileSize / 1024).toFixed(1)} KB</span>
                      <span>Type: {p.appointment_files.files.fileType.toUpperCase()}</span>
                    </div>
                  </div>
                  <a
                    href={p.appointment_files.files.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
                  >
                    View File
                  </a>
                </div>
              ) : (
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-4">
                  <p className="text-gray-500">No medical report file attached</p>
                </div>
              )}

              <p className="font-semibold mb-2">Symptoms details :</p>
              <p className="text-gray-600 leading-relaxed">{p.symptoms}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceCard;
