// import Navbar from "@/components/user_components/ServicePackage/Navbar"
// import Breadcrumb from "@/components/user_components/ServicePackage/Breadcrumb"
// import MedicalPackage from "@/components/user_components/ServicePackage/MedicalPackage/MedicalPackage"
// import TourismPackage from "@/components/user_components/ServicePackage/TourismPackage/TourismPackage"

// const ServicePackage = () => {
//   return (
//     <div className="min-h-screen bg-white ">
      
//     <Navbar/>
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <Breadcrumb />

//                  {/* Service Toggle */}
//             <div className="p-6">
//               <div className="flex items-center gap-8 mb-4">
//                 <div className="text-center">
//                   <span className="text-base font-bold text-white bg-teal-500 px-4 py-2 rounded">Medical Service</span>
//                   <div className="w-8 h-1 bg-teal-500 mx-auto mt-2"></div>
//                 </div>
//                 <div className="text-center">
//                   <span className="text-base text-gray-500">Tourism Service</span>
//                 </div>
//               </div>
//             </div>
//       <MedicalPackage/>
//       <TourismPackage />
//     </div>
//     </div>
//   )
// }
// export default ServicePackage

"use client"

import { useState } from "react"
import Navbar from "@/components/user_components/ServicePackage/Navbar"
import Breadcrumb from "@/components/user_components/ServicePackage/Breadcrumb"
import MedicalPackage from "@/components/user_components/ServicePackage/MedicalPackage/MedicalPackage"
import TourismPackage from "@/components/user_components/ServicePackage/TourismPackage/TourismPackage"
import Footer from "@/components/user_components/Main/Footer"

const ServicePackage = () => {
  const [selectedService, setSelectedService] = useState<"medical" | "tourism">("medical")

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
              className={`text-base font-bold px-4 py-2 rounded ${
                selectedService === "medical"
                  ? "text-white bg-teal-500"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              Medical Service
            </button>

            <button
              onClick={() => setSelectedService("tourism")}
              className={`text-base font-bold px-4 py-2 rounded ${
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
        {selectedService === "medical" ? <MedicalPackage /> : <TourismPackage />}
      </div>
      <Footer />
    </div>
  )
}

export default ServicePackage