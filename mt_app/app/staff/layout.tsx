"use client";
import React from "react";
import Sidebar from "../../components/staff_component/Main/Sidebar";
import ProfileHeader from "../../components/staff_component/Main/ProfileHeader";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <ProfileHeader />
    <div className="flex flex-1">
        <Sidebar />
      {/* Main content area */}
      <main className="w-5/6">{children}</main>
    </div>
    </div>
  );
};

export default Layout;
