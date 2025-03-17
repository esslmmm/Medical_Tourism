 "use client";

import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import AccommodationForm from "../../../components/admin_component/service-accommodation-add/AccommodationForm";

const AdminServiceAccommodationAdd: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />
        <AccommodationForm />
      </div>
    </div>
  );
};

export default AdminServiceAccommodationAdd;
