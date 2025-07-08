"use client";

import AdditionService from "../../../../components/user_components/package_landing_page/AdditionService"
import HospitalCard from "../../../../components/user_components/package_landing_page/HospitalCard"
import OfferService from "../../../../components/user_components/package_landing_page/OfferService"
import ImageCarousel from "../../../../components/user_components/package_landing_page/PackageImage"
import Timeline from "../../../../components/user_components/package_landing_page/Timeline"
import PlaceToVisit from "../../../../components/user_components/package_landing_page/PlaceToVisit"
import { useState } from "react"

type ServiceType = "accommodation_booking" | "Interpreter";

const PackageLandingPage = () => {
  const [selectedServices, setSelectedServices] = useState<Record<ServiceType, boolean>>({
    accommodation_booking: false,
    Interpreter: false,
  });

  
  return (
    <div>
    <ImageCarousel/>
    <OfferService selectedServices={selectedServices}/>
    <HospitalCard />
    <PlaceToVisit />
    <Timeline />
    <AdditionService 
      selectedServices={selectedServices}
      setSelectedServices={setSelectedServices}/>
    </div>
  )
}
export default PackageLandingPage