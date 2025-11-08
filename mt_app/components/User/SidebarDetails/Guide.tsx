"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { formatDate } from "../../Reuseable-Function/FormateDate";

interface Booking {
    guide_bookings: guide_bookings;
}

interface guide_bookings {
    start: string;
    end: string;
    guides: guides;
}

interface guides {
    name: string;
    image: string;
    language: string;
}

interface BookingDetailsProps {
  data: Booking | null;
}

const GuideDetail: React.FC<BookingDetailsProps> = ({ data }) => {
  return (
      <div><div className="bg-white p-6 border-b border-[#E0E0E0]">
          <h3 className="font-bold text-black text-xl">Interpreter</h3>
          <div className="flex gap-4 items-start mt-4">
              {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src="/img/Interpreter/interpreter4.png"
                        alt=""
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
              <div className='space-y-1'>
                  <p className="font-bold text-black text-md">{data?.guide_bookings.guides?.name}</p>
                  <p className="text-sm text-black">{data?.guide_bookings.guides?.language} to Thai Language</p>
                  <p className="text-sm text-black">{formatDate(data?.guide_bookings.start)} - {formatDate(data?.guide_bookings.end)}</p>
              </div>
          </div>
      </div></div>
  )
}

export default GuideDetail