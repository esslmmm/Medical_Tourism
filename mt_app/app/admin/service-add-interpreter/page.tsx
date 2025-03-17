"use client";
import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import InterpreterAddForm from "../../../components/admin_component/service-add-interpreter/InterpreterAddForm";

const AdminServiceAddInterpreter: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <ProfileHeader />
        <div className="mt-6">
          <InterpreterAddForm />
        </div>
      </div>
    </div>
  );
};

export default AdminServiceAddInterpreter;
