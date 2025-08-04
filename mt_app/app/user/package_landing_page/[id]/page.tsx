"use client";

import AdditionService from "@/components/user_components/package_landing_page/AdditionService"
import HospitalCard from "@/components/user_components/package_landing_page/HospitalCard"
import OfferService from "@/components/user_components/package_landing_page/OfferService"
import ImageCarousel from "@/components/user_components/package_landing_page/PackageImage"
import Timeline from "@/components/user_components/package_landing_page/Timeline"
import Navbarpro from "@/components/user_components/Main/Navbarpro";
import PlaceToVisit from "@/components/user_components/package_landing_page/PlaceToVisit"
import PackageLandingSkeleton from "@/components/user_components/skeleton-screen/package_landing_page/PackageLandingSkeleton";
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";


interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  description: description[];
  trips: trips[]
  package_image: package_image[]
}

interface trips {
  tour_id: number;
  package_id: number;
  package_places: package_places[]
}

interface package_places {
  packplace_id: number;
  tour_id: number;
  place_id: number;
  date: string;
  start: string;
  end: string;
  places: places
}

interface places {
  place_id: number;
  place_name: string;
  image: string;
  description: string;
}

interface description {
  description_id: number;
  title: string;
  details: string;
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  reviews: number;
  image: string;
  description: string;
}

interface package_image {
  image_id: number;
  images: string;
  title: string;
  detail: string
}

type ServiceType = "accommodation_booking" | "Interpreter";

const PackageLandingPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<Record<ServiceType, boolean>>({
    accommodation_booking: false,
    Interpreter: false,
  });
  
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

          // Fetch hospital using hospital_id from package
          const hospitalRes = await fetch(`/api/services/hospitals/${packageData.hospital_id}`);
          if (!hospitalRes.ok) throw new Error("Failed to fetch hospital details");

          const hospitalData = await hospitalRes.json();
          setHospital(hospitalData);
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
        <PackageLandingSkeleton />
        <AdditionService 
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}/>
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
        <ImageCarousel data={data} />
        <OfferService selectedServices={selectedServices} data={data} />
        <HospitalCard hospital={hospital} />
        <PlaceToVisit data={data} />
        <Timeline data={data}/>
        <AdditionService 
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}/>
        </div>
  )
}
export default PackageLandingPage