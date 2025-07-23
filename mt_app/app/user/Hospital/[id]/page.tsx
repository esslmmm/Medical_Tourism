"use client";

import Navbarpro from "../../../../components/user_components/Main/Navbarpro";
import HospitalProfile from "../../../../components/user_components/Hospital/HospitalProfile";
import DoctorHos from "../../../../components/user_components/Hospital/DoctorHos";
import MedicalPackage from "../../../../components/user_components/Hospital/MedicalPackage";
import ReviewsSection from "../../../../components/user_components/Hospital/ReviewsSection";
import Footer from "../../../../components/user_components/Main/Footer";
import "../../../../app/globals.css";

const HomePage: React.FC = () => {

  return (
    <div>
      <Navbarpro />
      <HospitalProfile />
      <MedicalPackage />
      <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-3 text-white bg-[#2BB08A] opacity-60">
        DOCTORS
      </h2>
      <DoctorHos />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
