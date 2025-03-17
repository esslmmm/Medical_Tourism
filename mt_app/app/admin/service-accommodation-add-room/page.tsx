"use client";

import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import RoomForm from "../../../components/admin_component/service-accommodation-add-room/RoomForm";

const AdminServiceAccommodationAddRoom: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <RoomForm />
        </div>
      </div>
    </div>
  );
};

export default AdminServiceAccommodationAddRoom;
