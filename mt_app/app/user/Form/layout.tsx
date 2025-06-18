import React from "react";
import Footer from "../../../components/user_components/Main/Footer";
import Navbarprogress from "../../../components/user_components/medical_appointment/Navbarprogress";
import MedicalService from "../../../components/user_components/BookingDetails/MedicalService";
import Interpreter from "../../../components/user_components/BookingDetails/Interpreter";
import Accommodation from "../../../components/user_components/BookingDetails/Accommodation";
import PlaceToVisit from "../../../components/user_components/BookingDetails/PlaceToVisit";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen ">
        <Navbarprogress />
      {/* Main content area */}
      <main className="flex bg-green-100">{children}
        <div className="w-1/3 bg-white border-l border-[#E0E0E0]">
          <MedicalService />
          <PlaceToVisit />
          <Accommodation />
          <Interpreter />
            <div className="mt-4 text-right">
              <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
            </div>
        </div>
      </main>
        <Footer />
    </div>
  );
};

export default Layout;
