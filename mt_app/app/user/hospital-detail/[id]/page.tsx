"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  BriefcaseMedical,
} from "lucide-react";

import RecommendPackage from "@/components/User/Hospital/RecommendedPackage";
import Facilities from "@/components/User/Hospital/Facilities";
import FAQ from "@/components/User/Hospital/FAQ";
import DoctorList from "@/components/User/Hospital/DoctorList";
import Footer from "@/components/User/Main/Footer";
import AuthenticatedNavbar from "@/components/User/Main/AuthenticatedNavbar";


import { ShareIcon } from "@heroicons/react/24/solid";
import HospitalSkeleton from "@/components/User/skeleton-screen/HospitalProfile/HospitalSkeleton";
import Navbarpro from "@/components/User/Main/Navbarpro";
import { useParams } from "next/navigation";
import Languages from "@/components/User/Hospital/Languages";
import Services from "@/components/User/Hospital/Services";


interface Hospital {
  name: string;
  url: string;
  location: string;
  city: string;
  description: string;
  rating: number;
  logo: string;
  Thai: boolean;
  Arabic: boolean;
  Myanmar: boolean;
  English: boolean;
  doctors: Doctor[];
}

interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  experience: number;
  description: string;
  image: string;
}

interface Services {
  service_name: string;
}


const HospitalDetail = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("about");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/services/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");
        const data = await response.json();
        console.log("Hospital Data:", data);
        setHospital(data);
        setDoctors(data.doctors || []);
        setServices(data.medical_services || []);
        const imageUrls = data.hospital_images
          ? data.hospital_images.map((img: any) => img.image)
          : [];
          console.log("Image URLs:", imageUrls);
        setImages(imageUrls);
        setPackages(data.packages || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHospital();
  }, [id]);

  useEffect(() => {
    const ref = tabsContainerRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
      const ref = tabsContainerRef.current;
      if (!ref) return;
      ref.addEventListener('scroll', handleScroll);
      handleScroll(); // initialize
      return () => ref.removeEventListener('scroll', handleScroll);
    }, []);

  // Show loading state
  if (loading) {
    return (
      <div>
        <Navbarpro />
        <HospitalSkeleton />
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <Navbarpro />
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const tabs = [
    "about",
    "languages",
    "services",
    "facilities",
    "doctors",
    "packages",
    "FAQs",
    "location",
  ];

  const handleTabClick = (tab: string) => {
    const id = tab.toLowerCase();
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveTab(tab);
  };

  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // ---------- SHARE ----------
  const handleShareClick = () => {
    const pageUrl = window.location.href;
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  // ---------- IMAGE SLIDER ----------
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
        <AuthenticatedNavbar />
      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-900">
        <img 
          src={images[currentImageIndex]} 
          alt="Hospital" 
          className="w-full h-full object-cover opacity-90"
        />
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hospital Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
          <div className="flex items-start gap-6">
            <img 
              src={hospital.logo} 
              alt={hospital.name}
              className="w-24 h-24 rounded-lg object-contain border-gray-200 bg-white p-1"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{hospital.name}</h1>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 text-gray-600">
                  <MapPin className="w-6 h-6" />
                  <span className='text-md font-semibold'>{hospital.location}, {hospital.city}</span>
                </div>
                {/* <div className="flex items-center gap-4 text-gray-600">
                  <Phone className="w-6 h-6" />
                  <span className='text-md font-semibold'>{hospital.contact_info}</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="ml-auto flex gap-4 relative">
          <div className="relative">
            <button
              className="flex items-center gap-4 text-teal-500 cursor-pointer"
              onClick={handleShareClick}
            >
              <ShareIcon className="w-7 h-7" />
              <span className="text-lg font-bold">Share</span>
            </button>
            {/* Tooltip */}
            {(copied) && (
              <div className="absolute -down-7 right-0 bg-green-500 text-white text-xs mt-2 px-2 py-1 rounded">
                Link copied!
              </div>
            )}
          </div>
        </div>
        </div>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-4 flex items-center">

          <div
            ref={tabsContainerRef}
            className="flex gap-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-4 px-2 font-medium capitalize transition ${
                  activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-500 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12  text-black">

        {/* About */}
          <section className="mb-8" id='about'>
            <h2 className="text-3xl font-bold mb-8">About {hospital.name}</h2>
            <p className="text-gray-700 leading-relaxed">{hospital.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{doctors.length}+</p>
                  <p className="text-gray-600">Expert Doctors</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{services.length}+</p>
                  <p className="text-gray-600">Medical Services</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <BriefcaseMedical className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{packages.length}+</p>
                  <p className="text-gray-600">Package Options</p>
                </div>
              </div>
            </div>
          </section>

          {/* Languages */}
          <div className="mb-8" id='languages'>
            <Languages hospital={hospital}/>
          </div>

          {/* Treatment & Wellness Service */}
          <div id='services'>
         <Services services={services} />
          </div>

          {/* Facilites */}
          <section className='facilities'>
          <Facilities />
          </section>

          {/* Doctor List */}
          <section id='doctors'>
          <DoctorList doctors={hospital.doctors}/>
          </section>

          {/* Recommended Packages */}
          <section id='packages'>
          <RecommendPackage packages={packages}/>
          </section>

          <section id='FAQs'>
          <FAQ />
          </section>

          {/* Location */}
          <section id='location'>
            <h4 className="text-3xl font-bold text-gray-900 mb-8">Location</h4>
            <div className="bg-gray-100 rounded-xl h-52 flex items-center justify-center mb-3 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.4580420156376!2d99.87758677527451!3d20.031248381380045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d701da2100c2cf%3A0xf07e732c92d398c9!2sMae%20Fah%20Luang%20University%20Medical%20Center%20Hospital!5e0!3m2!1sen!2sth!4v1764325499024!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              />
            </div>
          </section>
      </div>

      <div className='mt-20'>
        <Footer />
      </div>
    </div>
  );
};

export default HospitalDetail;