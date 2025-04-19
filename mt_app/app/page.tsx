'use client'

import Navbar from "../components/user_components/Main/Navbar";
import PackageList from "../components/user_components/Homepage/PackageList";
import MedicalList from "../components/user_components/Homepage/MedicalList";
import DoctorList from "../components/user_components/Homepage/DoctorList";
import Hospitaltap from "../components/user_components/Homepage/Hospitaltap";
import Footer from "../components/user_components/Main/Footer";
import "./globals.css";
import Advertisement from "../components/user_components/Homepage/Advertisement";
import { useState } from "react";
import MultiStepReviewModal from "./user/ReviewPopUp/[id]/page";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  
  return (
    <div>
      <Advertisement />
      <div className="text-center pt-10 pb-8">
        <h1 className="font-semibold text-[#4D4D4D]" style={{ fontSize: 35 }}>
          Select your package <br /> 
        </h1>
        <b className="text-[#717171] font-regular" style={{ fontSize: 16 }}>
          Choose the package that's right for you?
        </b>
      </div>
      <MedicalList/>
      <Hospitaltap/>
      <Footer />
      {children} {/* Renders the page content that is passed from the individual page component */}
    </div>
  );
};

export default HomePage;


