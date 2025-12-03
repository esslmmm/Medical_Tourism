"use client";
import React, { useState } from "react";
import DashboardCards from "@/components/staff_component/booking-management/DashboardCards";
import BookingTabs from "@/components/staff_component/booking-management/BookingTabs";
import AdminLayout from "@/components/admin_component/Layout/AdminLayout";


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"process" | "history">("process");

  return (
    <div>
      <AdminLayout>
        <div className="flex-1 p-8">
        <DashboardCards />
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      </AdminLayout>
    </div>
  );
};

export default Dashboard;
