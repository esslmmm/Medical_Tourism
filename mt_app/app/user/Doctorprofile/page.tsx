"use client";
import Image from "next/image";
import Navbarpro from "../components/Navbarpro";
import DoctorProfile from "./components/DoctorPro"
import EducationSection from "./components/Education"
import CertificateSection from "./components/Certificate"
import DoctorPackage from "./components/DoctorPackage";
import Footer from "../components/Footer";
import "../globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

const HomePage: React.FC = () => {


  return (
    <div>
        <Navbarpro />
        <div className="bg-white min-h-screen">
          <DoctorProfile />
          <EducationSection />
          <CertificateSection />
          <DoctorPackage />
        </div>
        <Footer />
    </div>
  );
};

export default HomePage;
