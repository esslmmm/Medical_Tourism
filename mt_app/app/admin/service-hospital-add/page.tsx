"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import HospitalAddForm from "../../../components/admin_component/service-hospital-add/HospitalAddForm";

const AdminServiceHospitalAdd: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <HospitalAddForm />
      </div>
    </div>
  );
};

export default AdminServiceHospitalAdd;
