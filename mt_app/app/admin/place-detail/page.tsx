"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import PlaceDetail from "../../../components/admin_component/place-detail/PlaceDetail";

const AdminPlaceDetail: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />
        <div className="mt-6">
          <PlaceDetail />
        </div>
      </div>
    </div>
  );
};

export default AdminPlaceDetail;
