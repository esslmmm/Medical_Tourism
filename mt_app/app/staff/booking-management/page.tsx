"use client";
import React, { useState } from "react";


import ProfileHeader from "../../../components/staff_component/booking-management/ProfileHeader";
import DashboardCards from "../../../components/staff_component/booking-management/DashboardCards";
import BookingTabs from "../../../components/staff_component/booking-management/BookingTabs";


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"process" | "history">("process");

  return (
      <div className="flex-1 p-8">
        <DashboardCards />
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
  );
};

export default Dashboard;
