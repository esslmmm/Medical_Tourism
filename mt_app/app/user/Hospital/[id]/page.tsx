"use client";
import { useParams } from "next/navigation";
import Navbarpro from "@/components/User/Main/Navbarpro";
import HospitalProfile from "@/components/User/Hospital/HospitalProfile";
import DoctorHos from "@/components/User/Hospital/DoctorHos";
import MedicalPackage from "@/components/User/Hospital/MedicalPackage";
import ReviewsSection from "@/components/User/Hospital/ReviewsSection";
import Footer from "@/components/User/Main/Footer";
import HospitalSkeleton from "@/components/User/skeleton-screen/HospitalProfile/HospitalSkeleton";
import { useEffect, useState } from "react";
import "@/app/globals.css";

interface HospitalImage {
  image_id: number;
  image: string;
}

interface MedicalService {
  service_id: number;
  service_name: string;
}

interface Package {
  package_id: string;
  package_name: string;
  image: string;
  detail: string;
  expired_date: string;
}

interface Review {
  review_id: number;
  user_id: number;
  reviewer_name: string;
  rating: number;
  title_review: string;
  comment: string;
  user: User;
}

interface User{
  id: number;
  name: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  reviews: number;
  image: string;
  description: string;
  hospital_images: HospitalImage[];
  medical_services: MedicalService[];
  packages: Package[];
  review_hospital: Review[];
  doctors: Doctor[];
}

interface Doctor {
  doctor_id: string;
  name: string;
  specialization: string;
  image: string;
}

const HomePage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const response = await fetch(`/api/services/hospitals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hospital details");

        const data = await response.json();
        console.log("Hospital Data:", data);
        setHospital(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHospital();
  }, [id]);

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

  return (
    <div>
      <Navbarpro />
      <HospitalProfile hospital={hospital}/>
      <MedicalPackage hospital={hospital}/>
      <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-3 text-white bg-[#2BB08A] opacity-60">
        DOCTORS
      </h2>
      <DoctorHos hospital={hospital}/>
      <ReviewsSection hospital={hospital}/>
      <Footer />
    </div>
  );
};

export default HomePage;
