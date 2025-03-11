"use client";

import Navbarpro from "../components/Navbarpro";
import HospitalProfile from "./components/HospitalProfile";
import DoctorHos from "./components/DoctorHos";
import MedicalPackage from "./components/MedicalPackage";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "../components/Footer";
import "../globals.css";

const HomePage: React.FC = () => {
  
  const hospitalData = {
    name: "MAE FAH LUANG MEDICAL CENTER HOSPITAL",
    location: "365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100",
    description:
      "MAE FAH LUANG MEDICAL CENTER HOSPITAL was established in 1972 as one of the first private hospitals in Thailand. Over the past 50 years, we have expanded our operations to become a tertiary care facility with dedicated hospitals for cancer and cardiology.",
    rating: 5,
    reviews: 400,
    images: ["/Mfu.jpg", "/Mfu2.jpg", "/Mfu3.jpg"],
    services: [
      { icon: "❤️", name: "Heart" },
      { icon: "🎗", name: "Cancer" },
      { icon: "🦴", name: "Bone" },
      { icon: "🧠", name: "Brain" },
      { icon: "🚑", name: "Trauma" },
      { icon: "✅", name: "Check-up" },
      { icon: "🔪", name: "Surgery" },
      { icon: "🦷", name: "Dental" },
      { icon: "👶", name: "Child" },
      { icon: "💆", name: "Aesthetic" },
      { icon: "👁️", name: "Eye & ENT" },
      { icon: "➕", name: "Others" },
    ],
  };

  return (
    <div>
      <Navbarpro />
      <HospitalProfile hospitalData={hospitalData} />
      <MedicalPackage />
      <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-8 text-white bg-[#2BB08A] opacity-60">
        DOCTORS
      </h2>
      <DoctorHos />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
