import { Inter } from "next/font/google";
import React from 'react'
import Image from "next/image";
const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const MedicalService = () => {
  return (
    <div className="bg-white p-6 pt-20 pb-10 border-b border-[#E0E0E0]">
    {/* Header */}
    <h3 className="text-xl font-bold text-black-800 mb-4">Medical Service</h3>
  
    {/* Details row */}
    <div className="flex gap-4 items-start">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src="/img/Booking_details/MFU_Logo.png"
          alt=""
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
  
      {/* Text Details */}
      <div className='space-y-1'>
        <p className="text-sm text-black font-bold">Appointment - Sat, Feb 8, 2025</p>
        <p className="text-sm text-black">Time - 9:00 - 12:00</p>
        <p className="text-sm text-black">Service: Medical check-up</p>
      </div>
    </div>
  </div>
  
  )
}

export default MedicalService