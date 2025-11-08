"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/user_components/Main/Navbarpro"
import Breadcrumb from "@/components/user_components/ServicePackage/Breadcrumb"
import MedicalPackage from "@/components/user_components/ServicePackage/MedicalService/MedicalService"
import TourismPackage from "@/components/user_components/ServicePackage/TourismService/TourismService"
import Footer from "@/components/user_components/Main/Footer"
import { useParams } from "next/navigation"
import Navbarpro from "@/components/user_components/Main/Navbarpro"
import { Packages } from "@/types/Package"

const ServicePackage = () => {
  const [selectedService, setSelectedService] = useState<"medical" | "tourism">("medical")
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null)
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const handleNextStep = (date: Date) => {
    setAppointmentDate(date)
    setSelectedService("tourism")
  }

  // Fetch Package and then Hospital
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch package
        const packageRes = await fetch(`/api/services/packages/${id}`);
        if (!packageRes.ok) {
          const errorData = await packageRes.json();
          throw new Error(errorData.error || "Failed to fetch package data");
        }
        const packageData = await packageRes.json();
        setData(packageData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);


// Show loading state
if (loading) {
  return (
    <div>
      <Navbarpro />
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb />

        {/* Service Toggle */}
        <div className="p-6">
          <div className="flex items-center gap-8 mb-4">
            <button
              onClick={() => setSelectedService("medical")}
              className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${
                selectedService === "medical"
                  ? "text-white bg-teal-500"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              Medical Service
            </button>

            <button
              onClick={() => setSelectedService("tourism")}
              className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${
                selectedService === "tourism"
                  ? "text-white bg-teal-500"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              Tourism Service
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedService === "medical" ? (
          <MedicalPackage data={data} onNextStep={handleNextStep} />
        ) : (
          <TourismPackage TripData={data} appointmentDate={appointmentDate} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ServicePackage