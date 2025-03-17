"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import CarAndGuideForm from "../../../components/admin_component/service-add-CarAndGuide/CarAndGuideForm";

const AdminServiceAddCarAndGuide: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <CarAndGuideForm />
      </div>
    </div>
  );
};

export default AdminServiceAddCarAndGuide;
