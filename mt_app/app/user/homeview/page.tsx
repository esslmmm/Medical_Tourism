"use client";
import Footer from "@/components/user_components/Main/Footer";
import HeroSection from "@/components/user_components/Homeview/HeroSection";
import RecommendedPackage from "@/components/user_components/Homeview/RecommendedPackage";
import Navbar from "@/components/user_components/Homeview/Navbar";
import Reviews from "@/components/user_components/Homeview/Reviews";
import FAQ from "@/components/user_components/Homeview/FAQ";
import Blogs from "@/components/user_components/Homeview/Blogs";
import Destinations from "@/components/user_components/Homeview/Destinations";
import Provider from "@/components/user_components/Homeview/Provider";
import Service from "@/components/user_components/Homeview/Service";

export default function MedicalTourismHome() {


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />


       {/* Hero Section with Search */}
       <HeroSection />


      {/* Recommended Packages */}
      <RecommendedPackage />


      {/* Treatment & Wellness Service */}
      <Service />


      {/* Hospital & Clinic */}
      <Provider />


      {/* Reviews */}
      <Reviews />


      {/* FAQs */}
     <FAQ />


      {/* Blogs */}
      <Blogs />


      {/* Popular Destinations */}
      <Destinations />


      <Footer />
    </div>
  );
}