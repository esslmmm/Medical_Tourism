"use client";
import React from "react";
import Footer from "../../../components/user_components/Main/Footer";
import Navbarprogress from "../../../components/user_components/medical_appointment/Navbarprogress";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
        <Navbarprogress />
      {/* Main content area */}
      <main>{children}</main>
        <Footer />
    </div>
  );
};

export default Layout;
