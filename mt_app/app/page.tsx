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
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <Navbar />
      <Advertisement />
      <div className="text-center pt-10 pb-8">
        <h1 className="font-semibold text-[#4D4D4D]" style={{ fontSize: 35 }}>
          Select your package <br /> or customize your own package
        </h1>
        <b className="text-[#717171] font-regular" style={{ fontSize: 16 }}>
          Choose the package that's right for you?
        </b>
      </div>
      <PackageList />
      <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-8 text-white bg-[#2BB08A] opacity-60">
        DOCTORS
      </h2>
      <DoctorList />
      <MedicalList />
      <Hospitaltap />
      {/* Show Modal if `showModal` is true */}
        {/* <div className="p-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Leave a Review
        </button> */}

        {/* Pass the ID to the ReviewCard */}
        {/* <MultiStepReviewModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          id={1}
        />
        </div> */}
      <Footer />
      {children} {/* Renders the page content that is passed from the individual page component */}
    </div>
  );
};

export default HomePage;


