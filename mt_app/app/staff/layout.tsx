"use client";
import React from "react";
import Sidebar from "@/components/staff_component/Main/Sidebar";
import ProfileHeader from "@/components/staff_component/Main/ProfileHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-white "> {/* full viewport height */}
      <ProfileHeader />
      <div className="flex flex-1 overflow-hidden"> {/* take remaining space */}
        <Sidebar />
        {/* Main content area */}
        <main className="flex-1 overflow-auto ">{children}</main> {/* fill remaining width and scroll if needed */}
      </div>
    </div>
  );
};

export default Layout;
