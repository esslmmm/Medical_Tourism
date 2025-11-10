"use client";
import Footer from "@/components/User/Main/Footer";
import HeroSection from "@/components/User/Homeview/HeroSection";
import RecommendedPackage from "@/components/User/Homeview/RecommendedPackage";
import Navbar from "@/components/User/Homeview/Navbar";
import Reviews from "@/components/User/Homeview/Reviews";
import FAQ from "@/components/User/Homeview/FAQ";
import Blogs from "@/components/User/Homeview/Blogs";
import Destinations from "@/components/User/Homeview/Destinations";
import Provider from "@/components/User/Homeview/Provider";
import Service from "@/components/User/Homeview/Service";

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