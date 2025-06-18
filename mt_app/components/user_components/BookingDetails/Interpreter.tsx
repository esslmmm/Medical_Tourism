"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { formatDate } from "../../Reuseable-Function/FormateDate";

interface Booking {
    inter_bookings: inter_bookings;
}

interface inter_bookings {
    start: string;
    end: string;
    interpreters: interpreters;
}

interface interpreters {
    name: string;
    image: string;
    language: string;
}


const Interpreter = () => {
    const id = localStorage.getItem('package_booking_id');
    const [data, setData] = useState<Booking | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    //Getting the Package data
        useEffect(() => {
        const fetchPackage = async () => {
            try {
            const res = await fetch(`/api/booking/packages/${id}`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Unknown error');
            }

            const json = await res.json();
            setData(json);
            } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            }
        };

        fetchPackage();
        }, [id]);
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="text-red-500">Error: {error}</p>;
        
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
                  <p className="font-bold text-black text-md">{data?.inter_bookings.interpreters?.name}</p>
                  <p className="text-sm text-black">{data?.inter_bookings.interpreters?.language} to Thai Language</p>
                  <p className="text-sm text-black">{formatDate(data?.inter_bookings?.start)} - {formatDate(data?.inter_bookings?.end)}</p>
              </div>
          </div>
      </div></div>
  )
}

export default Interpreter