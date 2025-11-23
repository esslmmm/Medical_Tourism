"use client";

import { useState } from 'react';
import { Phone, Mail, FileText, MapPin, Briefcase } from 'lucide-react';


const MedicalServiceBooking = () => {

    const [activeTab, setActiveTab] = useState('medical');
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});

  const toggleShowMore = (id : number) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle for specific booking
    }));
  };

  const medicalBookings = [
  {
    id: 1,
    serviceName: "Medical Check-up",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop",
    services: [
      "Comprehensive dental examination",
      "Professional teeth cleaning",
      "Cosmetic dental procedures",
      "Follow-up consultations",
      "Comprehensive dental examination",
      "Professional teeth cleaning",
      "Cosmetic dental procedures",
      "Follow-up consultations",
    ],
    appointmentDate: "Monday, October 5 2025",
    contact: {
      name: "Ekkarat Thepthong",
      phone: "+66 814739090",
      email: "test@gmail.com",
    },
    patients: [
      {
        name: "Ekkarath Longbum",
        gender: "Male",
        nationality: "Thai",
        dob: "1999-11-2",
        passportId: "AZ98726",
        reportFile: "medical_report.pdf",
        symptoms:
          "The patient has been experiencing a fever for the past two days. The fever occurs intermittently..., The patient has been experiencing a fever for the past two days. The fever occurs intermittently...",
      },
      {
        name: "Ekkarath Test",
        gender: "Female",
        nationality: "Thai",
        dob: "1999-11-2",
        passportId: "AZ98726",
        reportFile: "medical_report.pdf",
        symptoms:
          "The patient has been experiencing a fever for the past two days. The fever occurs intermittently..., The patient has been experiencing a fever for the past two days. The fever occurs intermittently...",
      },
    ],
    policy: "Cancellation and change policies",
  },
];

    
  return (
   <div className="flex-1">
      {medicalBookings.map((booking) => {
        const isExpanded = expandedServices[booking.id] || false;
        const displayedServices = isExpanded
          ? booking.services
          : booking.services.slice(0, 6);

        return (
          <div key={booking.id}>
            {/* Medical Service Details */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
                <h2 className="text-2xl font-semibold">Medical Service Details</h2>
              </div>
              <div className="p-6 flex items-start gap-4">
                <img
                  src={booking.image}
                  alt={booking.serviceName}
                  className="w-32 h-48 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">{booking.serviceName}</h3>
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

                  <p className=" font-semibold mb-3">Services :</p>
                  <ul className=" text-gray-600 space-y-3 grid-cols-2 grid">
                    {displayedServices.map((srv, i) => (
                      <li key={i}>• {srv}</li>
                    ))}

                    {booking.services.length > 4 && (
                      <li
                        className="text-emerald-500 cursor-pointer font-medium"
                        onClick={() => toggleShowMore(booking.id)}
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
              <div className="p-6">
                <p className=" font-semibold mb-2">Appointment Date</p>
                <p className="text-gray-700">{booking.appointmentDate}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300">
                  Contact details
                </h3>
                <p className="font-semibold mb-4 text-lg">{booking.contact.name}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span>{booking.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} />
                    <span>{booking.contact.email}</span>
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

                {booking.patients.map((p, i) => (
                  <div
                    key={i}
                    className={`mb-5 pb-4 border-b border-gray-300 ${
                      i === booking.patients.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                    }`}
                  >
                    <p className="font-semibold text-lg mb-5">{p.name}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className=" font-semibold">Gender : </span>
                        <span className=" text-gray-700">{p.gender}</span>
                      </div>
                      <div>
                        <span className=" font-semibold">Nationality : </span>
                        <span className=" text-gray-700">{p.nationality}</span>
                      </div>
                      <div>
                        <span className=" font-semibold">Date of Birth : </span>
                        <span className=" text-gray-700">{p.dob}</span>
                      </div>
                      <div>
                        <span className=" font-semibold">Passport ID : </span>
                        <span className=" text-gray-700">{p.passportId}</span>
                      </div>
                    </div>
                    <p className=" font-semibold mb-3">Medical Report File :</p>
                    <div className="flex items-center gap-2 text-red-500 mb-4 border border-gray-300 rounded-2xl p-4 w-100">
                      <FileText size={16} />
                      <span className=" text-black">{p.reportFile}</span>
                    </div>
                    <p className=" font-semibold mb-2">Symptoms details :</p>
                    <p className=" text-gray-600 leading-relaxed">{p.symptoms}</p>
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
                  <span className="text-gray-700">Cancellation and change policies</span>
                  <button className="cursor-pointer text-teal-400 hover:text-teal-500  font-medium flex items-center gap-1">
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
      })}
    </div>
  )
}
export default MedicalServiceBooking