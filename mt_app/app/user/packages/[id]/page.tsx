"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/User/Main/Navbarpro"
import Breadcrumb from "@/components/User/Packages/Breadcrumb"
import MedicalPackage from "@/components/User/Packages/MedicalService/MedicalService"
import TourismPackage from "@/components/User/Packages/TourismService/TourismService"
import Footer from "@/components/User/Main/Footer"
import { useParams } from "next/navigation"
import Navbarpro from "@/components/User/Main/Navbarpro"
import { Packages } from "@/types/Package"
import PackageDetailSkeleton from "@/components/User/skeleton-screen/packages/Medical_package"

const PackageDetail = () => {
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <PackageDetailSkeleton />
        </div>
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

  const handleGoBack = () => {
    setSelectedService("medical");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb />

        {/* Service Tabs */}
        <div className="pt-3 border-b border-gray-300">
          <div className="flex items-center gap-8 ">
            <div>
              <button
                onClick={() => setSelectedService("medical")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${selectedService === "medical"
                  ? "text-white bg-teal-500"
                  : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  }`}
              >
                Medical Service
              </button>
              <div className={`${selectedService === "medical"
                ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                : "mt-3"}`}></div>
            </div>

            <div>
              <button
                onClick={() => setSelectedService("tourism")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${selectedService === "tourism"
                  ? "text-white bg-teal-500"
                  : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  }`}
              >
                Tourism Service
              </button>
              <div className={`${selectedService === "tourism"
                ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                : "mt-3"}`}></div>
            </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedService === "medical" ? (
          <MedicalPackage data={data} onNextStep={handleNextStep} />
        ) : (
          <TourismPackage TripData={data} appointmentDate={appointmentDate} onGoBack={handleGoBack} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default PackageDetail