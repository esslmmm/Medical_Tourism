"use client";
import React from "react";
import { FaHeart, FaRibbon, FaTooth, FaUser, FaChild, FaEye, FaUserMd, FaAmbulance, FaBriefcaseMedical, FaEllipsisH, FaEdit } from "react-icons/fa";

const services = [
  { icon: <FaHeart />, name: "Heart" },
  { icon: <FaRibbon />, name: "Cancer" },
  { icon: <FaBriefcaseMedical />, name: "Brain" },
  { icon: <FaAmbulance />, name: "Trauma" },
  { icon: <FaUserMd />, name: "Check-up" },
  { icon: <FaEllipsisH />, name: "Surgery" },
  { icon: <FaTooth />, name: "Dental" },
  { icon: <FaUser />, name: "Female" },
  { icon: <FaChild />, name: "Male" },
  { icon: <FaEye />, name: "Eye & ENT" },
  { icon: <FaEllipsisH />, name: "Others" },
];

const doctors = [
  { name: "Dr. Name", specialty: "Specialty", img: "/img/doctor.png" },
  { name: "Dr. Name", specialty: "Specialty", img: "/img/doctor.png" },
  { name: "Dr. Name", specialty: "Specialty", img: "/img/doctor.png" },
];

const certificates = [
  { img: "/img/cert1.png", name: "Certificate 1" },
  { img: "/img/cert2.png", name: "Certificate 2" },
  { img: "/img/cert3.png", name: "Certificate 3" },
];

const PackageDetails: React.FC = () => {
  return (
    <div className="p-8">
      {/* Main Card */}
      <div className="bg-white shadow-lg p-6 rounded-lg relative">
        {/* Images */}
        <div className="flex gap-2 overflow-hidden">
          <img src="/img/hospital.png" alt="Hospital" className="w-1/3 h-40 object-cover rounded-lg" />
          <img src="/img/hospital.png" alt="Hospital" className="w-1/3 h-40 object-cover rounded-lg" />
          <img src="/img/hospital.png" alt="Hospital" className="w-1/3 h-40 object-cover rounded-lg" />
        </div>

        {/* Edit Image Button */}
        <button className="absolute top-4 right-4 bg-gray-200 px-4 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-gray-300">
          <FaEdit /> Edit Image
        </button>

        {/* Details */}
        <h2 className="text-2xl font-bold mt-4">Mae Fah Luang Hospital Center</h2>
        <p className="text-gray-600">Contact Number: +66 814208490</p>
        <p className="text-gray-600">Code: AZ8490</p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> 365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100
        </p>
        <p className="mt-2 text-gray-700">
          <span className="font-bold">Description:</span> <span className="font-semibold">MAE FAH LUANG MEDICAL CENTER HOSPITAL</span> was established in 1972 as one of the first private hospitals in Thailand...
        </p>

        {/* Rating */}
        <p className="mt-2">
          <span className="font-bold">Rating:</span> ⭐⭐⭐⭐⭐ (10)
        </p>

        {/* Services Section */}
        <h3 className="text-lg font-semibold mt-4">Service:</h3>
        <div className="grid grid-cols-6 gap-4 mt-2">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-blue-500 text-lg">
              {service.icon}
              <span className="text-sm text-gray-600">{service.name}</span>
            </div>
          ))}
        </div>

        {/* Packages */}
        <h3 className="text-lg font-semibold mt-6">Package:</h3>
        <div className="flex gap-4 mt-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <img src="/img/package.png" alt="Package" className="w-full h-40 object-cover rounded-lg" />
              <p className="mt-2 font-semibold">Package's Name</p>
              <p className="text-gray-500 text-sm">Package description</p>
              <p className="text-red-500 text-sm">Expired Date</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md">View More</button>
            </div>
          ))}
        </div>

        {/* Doctors */}
        <h3 className="text-lg font-semibold mt-6">Doctor:</h3>
        <div className="flex gap-4 mt-2">
          {doctors.map((doctor, index) => (
            <div key={index} className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <img src={doctor.img} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto border border-gray-300" />
              <p className="mt-2 text-center font-semibold">{doctor.name}</p>
              <p className="text-gray-500 text-sm text-center">{doctor.specialty}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="bg-green-500 text-white px-4 py-1 rounded-md">Add</button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">View More</button>
        </div>

        {/* Certificates */}
        <h3 className="text-lg font-semibold mt-6">Certificates and Awards:</h3>
        <div className="flex gap-4 mt-2">
          {certificates.map((cert, index) => (
            <div key={index} className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <img src="/img/certificate.png" alt={cert.name} className="w-full h-24 object-cover rounded-lg" />
              <p className="text-center font-semibold mt-2">{cert.name}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <h3 className="text-lg font-semibold mt-6">Review:</h3>
        <div className="flex gap-4 mt-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <p className="font-semibold">Steve Brown</p>
              <p className="text-yellow-500">⭐⭐⭐⭐</p>
              <p className="text-gray-500 text-sm">I had an amazing experience at MFU...</p>
            </div>
          ))}
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-1 rounded-md">View More</button>
      </div>
    </div>
  );
};

export default PackageDetails;
