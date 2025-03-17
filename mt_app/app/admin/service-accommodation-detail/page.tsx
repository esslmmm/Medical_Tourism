"use client";

import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import ImageGallery from "../../../components/admin_component/service-accommodation-detail/ImageGallery";
import AccommodationInfo from "../../../components/admin_component/service-accommodation-detail/AccommodationInfo";
import FacilityList from "../../../components/admin_component/service-accommodation-detail/FacilityList";
import PackageRoomReview from "../../../components/admin_component/service-accommodation-detail/PackageRoomReview";

const AdminServiceAccommodationDetail: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />
        <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
          <ImageGallery />
          <AccommodationInfo />
          <FacilityList />
          <PackageRoomReview />
        </div>
      </div>
    </div>
  );
};

export default AdminServiceAccommodationDetail;
