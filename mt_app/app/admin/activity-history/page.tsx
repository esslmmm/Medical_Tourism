"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import ActivityHistory from "../../../components/admin_component/activity-history/ActivityHistory";
import "../../../app/globals.css";

const ActivityHistoryPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <ActivityHistory />
      </div>
    </div>
  );
};

export default ActivityHistoryPage;
