"use client";
import React from "react";
import Sidebar from "@/components/User/Main/Sidebar";
import Navbarpro from "@/components/User/Main/Navbarpro";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbarpro />
        <div className="flex flex-1">
          <Sidebar />
          {/* Main content area */}
          <main className="w-5/6 ">{children}</main>
        </div>
    {/* <Footer /> */}
    </div>
  );
};

export default Layout;
