"use client";
import React from "react";
import HospitalReview from "../../../components/admin_component/service-hospital-detail-review/HospitalReview";

const AdminServiceHospitalDetailReview: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <HospitalReview />
    </div>
  );
};

export default AdminServiceHospitalDetailReview;
