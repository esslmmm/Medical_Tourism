"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import PackageDetails from "../../../components/admin_component/package-management/PackageDetails";

const PackageManagement: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <PackageDetails />
      </div>
    </div>
  );
};

export default PackageManagement;
