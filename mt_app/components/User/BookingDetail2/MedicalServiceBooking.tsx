
import { useState } from 'react';
import { Phone, Mail, FileText, MapPin, Loader2, X } from 'lucide-react';
import { PackageBooking, File } from '@/types/Booking';
import { formatDate } from '@/components/Reuseable-Function/FormateDate';

interface MedicalServiceBookingProps {
  bookingData: PackageBooking | null;
}

const MedicalServiceBooking: React.FC<MedicalServiceBookingProps> = ({ bookingData }) => {
  if (!bookingData) return;
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);

  const toggleShowMore = (id: number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle for specific booking
    }));
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


  return (
    <div className="flex-1">
      {bookingData && (() => {
        const booking = bookingData; // shortcut for readability

        const isExpanded = expandedServices[booking.booking_id] || false;
        const allServices = booking.packages.description.map(desc => desc.text);
        const displayedServices = isExpanded
          ? allServices
          : allServices.slice(0, 6);

        return (
          <div key={booking.booking_id}>

            {/* Medical Service Details */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
                <h2 className="text-2xl font-semibold">Medical Service Details</h2>
              </div>
              <div className="p-6 flex items-start gap-4">
                <img
                  src={booking.packages.image}
                  alt={booking.packages.package_name}
                  className="w-32 h-48 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">
                      {booking.packages.package_name}
                    </h3>
                    <button className="cursor-pointer text-teal-400 hover:text-teal-500 font-medium flex items-center gap-1">
                      View details
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="font-semibold mb-3">Services :</p>
                  <ul className="text-gray-600 space-y-3 grid-cols-2 grid">
                    {displayedServices.map((srv, i) => (
                      <li key={i}>• {srv}</li>
                    ))}

                    {allServices.length > 6 && (
                      <li
                        className="text-emerald-500 cursor-pointer font-medium"
                        onClick={() => toggleShowMore(booking.booking_id)}
                      >
                        • {isExpanded ? "Show less" : "Show more"}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-semibold">Appointment Details</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 gap-x-6 p-6">
              <div>
                  <span className="font-semibold">Appointment Date : </span>
                  <span className="text-gray-700">{formatDate(booking?.appointments.date)}</span>
                </div>
                <div>
                  <span className="font-semibold">Time Slot : </span>
                  <span className="text-gray-700">{booking?.appointments.timeslot}</span>
                </div>
                <div>
                  <span className="font-semibold">Adult : </span>
                  <span className="text-gray-700">{booking?.appointments.adult}</span>
                </div>
                <div>
                  <span className="font-semibold">Child : </span>
                  <span className="text-gray-700">{booking?.appointments.child}</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300">
                  Contact details
                </h3>
                <p className="font-semibold mb-4 text-lg">
                  {booking.user_contact_detail.firstname} {booking.user_contact_detail.lastname}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span>{booking.user_contact_detail.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} />
                    <span>{booking.user_contact_detail.email}</span>
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

                {booking.appointments.patient_details.map((p, i) => (
                  <div
                    key={i}
                    className={`mb-5 pb-4 border-b border-gray-300 ${i === booking.appointments.patient_details.length - 1 ? "border-b-0 mb-0 pb-0" : ""
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

            {/* Appointment Policies */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold pb-4">
                  Appointment policies
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Cancellation and change policies
                  </span>
                  <button className="cursor-pointer text-teal-400 hover:text-teal-500 font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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
  )
}
export default MedicalServiceBooking