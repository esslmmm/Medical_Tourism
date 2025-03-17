"use client";

import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import RoomImageGallery from "../../../components/admin_component/service-accommodation-room-detail/RoomImageGallery";
import RoomInfo from "../../../components/admin_component/service-accommodation-room-detail/RoomInfo";
import RoomFacilities from "../../../components/admin_component/service-accommodation-room-detail/RoomFacilities";
import RoomDetails from "../../../components/admin_component/service-accommodation-room-detail/RoomDetails";

const AdminServiceAccommodationRoomDetail: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Room Image Gallery */}
          <RoomImageGallery />

          {/* Room Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RoomInfo />
            <RoomDetails />
          </div>

          {/* Facilities Section */}
          <RoomFacilities />
        </div>
      </div>
    </div>
  );
};

export default AdminServiceAccommodationRoomDetail;
