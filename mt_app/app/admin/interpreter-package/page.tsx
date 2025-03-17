"use client";

import React from "react";
import Sidebar from "../../../components/admin_component/booking-management/Sidebar";
import ProfileHeader from "../../../components/admin_component/booking-management/ProfileHeader";
import InterpreterList from "../../../components/admin_component/interpreter-package/InterpreterList";
import InterpreterDetails from "../../../components/admin_component/interpreter-package/InterpreterDetails";
import InterpreterReview from "../../../components/admin_component/interpreter-package/InterpreterReview";
import InterpreterIntro from "../../../components/admin_component/interpreter-package/InterpreterIntro";
import "../../../app/globals.css";

const AdminInterpreterPackage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfileHeader />

        {/* Select Interpreter Section */}
        <div className="w-full">
          <InterpreterList />
        </div>

        {/* Grid Layout for Details, Intro, and Review */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Interpreter Details */}
          <div className="col-span-1">
            <InterpreterDetails />
          </div>

          {/* Interpreter Intro & Reviews (2 Columns) */}
          <div className="col-span-2 flex flex-col gap-6">
            <div>
              <InterpreterIntro />
            </div>
            <div>
              <InterpreterReview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInterpreterPackage;
