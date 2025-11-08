"use client";
import DoctorCardSkeleton from "@/components/User/skeleton-screen/DoctorProfile/DoctorCardSkeleton";
import Navbarpro from "@/components/User/Main/Navbarpro";
import DoctorProfile from "@/components/User/Doctorprofile/DoctorPro"
import EducationSection from "@/components/User/Doctorprofile/Education"
import CertificateSection from "@/components/User/Doctorprofile/Certificate"
import DoctorPackage from "@/components/User/Doctorprofile/DoctorPackage";
import Footer from "@/components/User/Main/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "@/app/globals.css";

interface Hospital {
  logo: string;
}

interface Language {
  language_id: number;
  languages: string;
}

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  hospital_id: number;
  description: string;
  image: string;
  doc_language: Language[];
  hospital: Hospital[];
  doc_education: Education[];
  doc_certificate: Certificate[];
  package_doc: PackageDoc[];
}

interface PackageDoc {
  package_id: string;
  packages: Package;
}

interface Package {
  package_id: number;
  image: string;
  package_name: string;
  detail: string;
  expired_date: string;
}

interface Certificate {
  certificate_id: number;
  field_of_study: string;
  institution: string;
  year: number;
}

interface Education {
  education_id: number;
  field_of_study: string;
  institution: string;
  year: number;
}

const HomePage: React.FC = () => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const response = await fetch(`/api/services/doctors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");

        const doctorData = await response.json();
        setDoctor(doctorData);

        // Fetch hospital details using doctor.hospital_id
        if (doctorData.hospital_id) {
          const hospitalResponse = await fetch(`/api/services/hospitals/${doctorData.hospital_id}`);
          if (!hospitalResponse.ok) throw new Error("Failed to fetch hospital details");

          const hospitalData = await hospitalResponse.json();
          setHospital(hospitalData);
        }
      } catch (error) {
        setError("Error fetching details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDoctor();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div>
        <Navbarpro />
        <DoctorCardSkeleton />
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
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbarpro />
      <div className="bg-white min-h-screen">
        <DoctorProfile doctor={doctor} hospital={hospital} />
        <EducationSection doctor={doctor} />
        <CertificateSection doctor={doctor} />
        <DoctorPackage doctor={doctor} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;