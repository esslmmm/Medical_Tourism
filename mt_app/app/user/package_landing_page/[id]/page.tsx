"use client";

import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import AdditionService from "@/components/user_components/package_landing_page/AdditionService"
import Navbarpro from "@/components/user_components/Main/Navbarpro";
import PackageLandingSkeleton from "@/components/user_components/skeleton-screen/package_landing_page/PackageLandingSkeleton";
import PackageImages from "@/components/user_components/package_landing_page/PackageImages";
import HeaderPackage from "@/components/user_components/package_landing_page/HeaderPackage";
import BookingCard from "@/components/user_components/package_landing_page/BookingCard";
import RouteSelecting from "@/components/user_components/package_landing_page/RouteSelecting";
import HotelSelecting from "@/components/user_components/package_landing_page/HotelSelecting";


interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  duration: number;
  routes: routes[]
  description: description[];
  package_image: package_image[]
}

interface routes{
  route_id: number;
  tour_id: number;
  trips: trips
}

interface trips {
  tour_id: number;
  package_id: number;
  total_price: number;
  package_places: package_places[]
}

interface package_places {
  packplace_id: number;
  tour_id: number;
  place_id: number;
  places: places
}

interface places {
  place_id: String;
  place_name: string;
  image: string;
  description: string;
}

interface description {
  description_id: number;
  title: string;
  details: string;
}

interface package_image {
  image_id: number;
  images: string;
  title: string;
  detail: string
}

interface Hospital {
  hospital_id: number;
  name: string;
  rating: number;
  location: string;
  city: string;
  reviews: number;
  image: string;
  description: string;
}


type ServiceType = "accommodation_booking" | "Guide";

const PackageLandingPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [includeAccommodation, setIncludeAccommodation] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Record<ServiceType, boolean>>({
    accommodation_booking: false,
    Guide: false,
  });
  const [selectedTourismRoute, setSelectedTourismRoute] = useState<routes | null>(null);
  
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
    <div className="bg-gradient-to-br from-blue-50 to-teal-50">
      <Navbarpro />
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <HeaderPackage data={data} hospital={hospital}/>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PackageImages data={data}/>
             <RouteSelecting data={data}
             selectedTourismRoute={selectedTourismRoute}
             setSelectedTourismRoute={setSelectedTourismRoute}/>
             <HotelSelecting includeAccommodation={includeAccommodation}
              setIncludeAccommodation={setIncludeAccommodation}/>
          </div>
          <BookingCard data={data} selectedTourismRoute={selectedTourismRoute} includeAccommodation={includeAccommodation}/>
        </div>
          
      </div>
    </div>
  )
}
export default PackageLandingPage