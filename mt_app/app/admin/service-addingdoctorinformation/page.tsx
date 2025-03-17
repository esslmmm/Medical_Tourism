"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import DoctorForm from "../../../components/admin_component/service-addingdoctorinformation/DoctorForm";

const AdminServiceAddingDoctor: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <DoctorForm />
      </div>
    </div>
  );
};

export default AdminServiceAddingDoctor;
