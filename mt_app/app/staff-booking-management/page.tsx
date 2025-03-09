"use client";
import React, { useState } from "react";
<<<<<<< HEAD:mt_app/app/staff-booking-management/page.tsx
import Sidebar from "../../components/staff-booking-management/Sidebar";
import ProfileHeader from "../../components/staff-booking-management/ProfileHeader";
import DashboardCards from "../../components/staff-booking-management/DashboardCards";
import BookingTabs from "../../components/staff-booking-management/BookingTabs";
=======
import Sidebar from "../../../components/staff-booking-management/Sidebar";
import ProfileHeader from "../../../components/staff-booking-management/ProfileHeader";
import DashboardCards from "../../../components/staff-booking-management/DashboardCards";
import BookingTabs from "../../../components/staff-booking-management/BookingTabs";
>>>>>>> 45e1973f296fbaa0d583fb8d0646799dc1b3210b:mt_app/src/app/staff-booking-management/page.tsx

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
