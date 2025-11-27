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
import Services from "@/components/User/Hospital/Services";
import Facilities from "@/components/User/Hospital/Facilities";
import FAQ from "@/components/User/Hospital/FAQ";
import DoctorList from "@/components/User/Hospital/DoctorList";
import Footer from "@/components/User/Main/Footer";
import AuthenticatedNavbar from "@/components/User/Main/AuthenticatedNavbar";
import Languages from "@/components/User/Hospital/Languages";

import { ShareIcon } from "@heroicons/react/24/solid";

interface Hospital {
  hospital_id: string;
  name: string;
  hospital_code: string;
  url: string;
  location: string;
  city: string;
  description: string;
  contact_info: string;
  rating: number;
  image: string;
  logo: string;
  Thai: boolean;
  Arabic: boolean;
  Myanmar: boolean;
  English: boolean;
}

interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  experience: number;
  description: string;
  image: string;
}

interface Service {
  service_id: number;
  service_name: string;
  description: string;
}


const HospitalDetail = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleScrollLeft = () => {
    tabsContainerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    tabsContainerRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  useEffect(() => {
    const ref = tabsContainerRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

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

  const packages = [
    {
      name: "Metal Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    },
    {
      name: "Dental Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "33% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop",
    },
    {
      name: "Physical Therapy Package",
      rating: 4.8,
      reviews: 160,
      bookings: 150,
      tag: "Medical Tourism Package",
      discount: "33% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    },
    {
      name: "Mental Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    },
    {
      name: "Metal Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    },
  ];

  useEffect(() => {
      const ref = tabsContainerRef.current;
      if (!ref) return;
      ref.addEventListener('scroll', handleScroll);
      handleScroll(); // initialize
      return () => ref.removeEventListener('scroll', handleScroll);
    }, []);

  useEffect(() => {
    setTimeout(() => {
      setHospital({
        hospital_id: "1",
        name: "Bangkok International Hospital",
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        hospital_code: "BIH001",
        location: "2 Soi Soonvijai 7, New Petchburi Rd",
        city: "Bangkok",
        description:
          "Bangkok International Hospital is a leading healthcare facility...",
        contact_info: "+66 2 310 3000",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
        logo:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200",
        Thai: true,
        Arabic: true,
        Myanmar: false,
        English: true,
      });

      setImages([
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
      ]);

      setDoctors([
        {
          doctor_id: "1",
          name: "Dr. Sarah Johnson",
          specialization: "Cardiology",
          experience: 15,
          description:
            "Board-certified cardiologist specializing in interventional procedures",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
        },
      ]);

      setServices([
        {
          service_id: 1,
          service_name: "Emergency Care",
          description: "24/7 emergency services",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // ---------- IMAGE SLIDER ----------
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  if (loading || !hospital) {
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
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
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
                <div className="flex items-center gap-4 text-gray-600">
                  <Phone className="w-6 h-6" />
                  <span className='text-md font-semibold'>{hospital.contact_info}</span>
                </div>
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
        <div className="max-w-7xl mx-auto px-4 border-b flex items-center">

          <div
            ref={tabsContainerRef}
            className="flex gap-8 border-b"
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
            <Languages />
          </div>

          {/* Treatment & Wellness Service */}
          <div id='services'>
         <Services />
          </div>

          {/* Facilites */}
          <section className='facilities'>
          <Facilities />
          </section>

          {/* Doctor List */}
          <section id='doctors'>
          <DoctorList />
          </section>

          {/* Recommended Packages */}
          <section id='packages'>
          <RecommendPackage />
          </section>

          <section id='FAQs'>
          <FAQ />
          </section>

          {/* Location */}
          <section id='location'>
                              <h4 className="text-3xl font-bold text-gray-900 mb-8">Location</h4>
                              <div className="bg-gray-100 rounded-xl h-52 flex items-center justify-center mb-3 overflow-hidden">
                                <iframe
                                  src={hospital.url}
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