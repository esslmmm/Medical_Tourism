"use client";
import React, { useState } from "react";

import Sidebar from "../../../components/staff_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/staff_component/booking-management/ProfileHeader";
import DashboardCards from "../../../components/staff_component/booking-management/DashboardCards";
import BookingTabs from "../../../components/staff_component/booking-management/BookingTabs";


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"process" | "history">("process");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <DashboardCards />
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Dashboard;
