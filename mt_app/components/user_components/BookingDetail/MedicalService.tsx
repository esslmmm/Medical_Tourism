import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import { FileText, X, Loader2 } from 'lucide-react';
import ServiceSkeleton from "../skeleton-screen/BookingDetail/BookingSkeleton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
  timeslot: string;
  description: string;
  appointment_files?: AppointmentFile[];
}

interface AppointmentFile {
  id: number;
  appointmentId: number;
  fileId: number;
  createdAt: string;
  files: File;
}

interface File {
  id: number;
  userId: number;
  originalName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryId: string;
  url: string;
  uploadedAt: string;
  category: string;
  description: string | null;
}

interface HotelBookings {
  check_in_date: string;
}

interface Packages {
  package_id: number;
  image: string;
  package_name: string;
}


const MedicalServiceCard = () => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<PackageBooking | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        let validFiles: File[] = [];
        if (result.appointments?.appointment_files && Array.isArray(result.appointments.appointment_files)) {
          validFiles = result.appointments.appointment_files
            .filter((appointmentFile: any) => appointmentFile.files)
            .map((appointmentFile: any) => appointmentFile.files);
        }
        setFiles(validFiles);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageBooking();
  }, [id]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) closeModal();
    };
    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

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

  const handleFileClick = (fileData: File) => {
    if (!fileData || !fileData.url) return;
    setIframeLoading(true);
    setSelectedPDF(fileData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPDF(null);
  };

  const formatUploadDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data.packages || !data.appointments)
    return <p className="text-center text-gray-500">No package booking found.</p>;
  const appointmentDate = new Date(data.appointments.date);

  return (
    <div className={`${inter.className}`}>
      <h2 className="ml-2 text-lg font-bold mb-2" style={{ fontSize: "25px" }}>
        Medical Service
      </h2>
      <div className="border border-[#C5D1E0] p-4 rounded-xl shadow-md bg-white flex gap-4 items-start w-[850px] mx-auto mb-4">
        <img src={data.packages.image} alt={data.packages.package_name} className="w-55 h-40 rounded-[15px] object-cover" />
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
          {files && files.length > 0 && (
            <div className="text-md font-bold">
              Attached File:{" "}
              <div className="space-y-3 mt-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleFileClick(file)}>
                    <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-medium hover:underline">
                        {file.originalName || file.fileName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>Uploaded: {formatUploadDate(file.uploadedAt)}</span>
                        <span>Size: {(file.fileSize / 1024).toFixed(1)} KB</span>
                        <span>Type: {file.fileType.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-md font-bold">
            Description: <span className="font-normal">{data.appointments.description}</span>
          </p>
        </div>
      </div>

      {showModal && selectedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col">
          <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText className="text-red-400" size={20} />
              <span className="text-sm">{selectedPDF.originalName || selectedPDF.fileName}</span>
            </div>
            <button onClick={closeModal} className="hover:bg-gray-800 p-2 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 relative bg-black">
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <Loader2 className="animate-spin text-white" size={48} />
              </div>
            )}
            <iframe
              src={selectedPDF.url}
              title="PDF Preview"
              className="w-full h-full"
              onLoad={() => setIframeLoading(false)}
            ></iframe>
            <div className="absolute bottom-4 right-4 z-20">
              <a href={selectedPDF.url} target="_blank" rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Open file in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalServiceCard;
