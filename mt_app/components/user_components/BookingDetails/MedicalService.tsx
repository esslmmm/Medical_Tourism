"use client";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { AppointmentFormData } from "../../../app/user/Form/form";
const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const MedicalService = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<AppointmentFormData | null>(null);
  const rawDate = form?.selectedDate;
const date = rawDate ? new Date(rawDate) : null;

const formattedDate =
  date instanceof Date && !isNaN(date.getTime())
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    : '';

  useEffect(() => {
          const savedForm = localStorage.getItem('appointmentFormData');
          if (savedForm) {
            setForm(JSON.parse(savedForm));
          } else {
            router.push(`/user/Form/medical_appointment/${id}`); // fallback if user lands directly
          }
        }, []);
      
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
        <p className="text-sm text-black font-bold">Appointment - {formattedDate}</p>
        <p className="text-sm text-black">Time : {form?.selectedTime}</p>
        <p className="text-sm text-black">Service: *Medical check-up*</p>
      </div>
    </div>
  </div>
  
  )
}

export default MedicalService