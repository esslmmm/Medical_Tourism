"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { formatDate } from "../../Reuseable-Function/FormateDate";
import { guide_bookings } from '@/types/Booking';

interface BookingDetailsProps {
  data: guide_bookings | null;
}

const GuideDetail: React.FC<BookingDetailsProps> = ({ data }) => {
  return (
      <div><div className="bg-white mt-5">
          <h3 className="font-bold text-black text-xl">Interpreter</h3>
          <div className="flex gap-4 items-start mt-4">
              <div className='space-y-1'>
                  <p className="text-sm text-black">{data?.language} to Thai Language</p>
              </div>
          </div>
      </div></div>
  )
}

export default GuideDetail