"use client";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { AppointmentFormData } from "@/app/user/Form/form";
const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

interface BookingDetailsProps {
  date: Date | null;
  form: AppointmentFormData | null;
}

const MedicalService: React.FC<BookingDetailsProps> = ({ date, form }) => {

const formattedDate =
  date instanceof Date && !isNaN(date.getTime())
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    : '';



  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-md sm:p-6">
    {/* Header */}
    <h3 className="text-xl font-bold text-black-800 mb-4 text-black">Medical Service</h3>

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
        <p className="text-sm text-black font-bold">Appointment - {formattedDate}</p>
        <p className="text-sm text-black">Time : {form?.selectedTime}</p>
        <p className="text-sm text-black">Service:Medical check-up*</p>
      </div>
    </div>
  </div>

  )
}

export default MedicalService