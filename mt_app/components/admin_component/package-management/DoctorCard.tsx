import React from "react";

const DoctorCard: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition hover:scale-105">
      <img src="/img/doctor.png" alt="Doctor" className="w-full h-40 object-cover rounded-md" />
      <h4 className="text-lg font-bold mt-2 text-center">Dr. John Doe</h4>
      <p className="text-gray-600 text-sm text-center">Specialization</p>
    </div>
  );
};

export default DoctorCard;
