"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { differenceInDays, format } from 'date-fns';
import { formatDate } from "../../Reuseable-Function/FormateDate";

interface Booking {
  hotel_bookings: hotelBookings;
}

interface hotelBookings {
  check_in_date: string;
  check_out_date: string;
  guest_children: number;
  guest_adult: number;
  total_price: number;
  room_aggregate: room_aggregate[];
  hotels: hotels;
}

interface room_aggregate {
  amount: number;
  hotel_rooms: Room;
}

interface Room {
  room_type: string;
}

interface hotels {
  name: string;
  image: string;
}

const Accommodation = () => {
  const id = localStorage.getItem('package_booking_id');
  const [data, setData] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const nights = differenceInDays(
  new Date(data?.hotel_bookings.check_out_date ?? ""),
  new Date(data?.hotel_bookings.check_in_date ?? "")
);


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
          <h3 className="font-bold text-black text-xl">Accommodation</h3>
          <div className="flex gap-4 items-start mt-4">
              {/* Image */}
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                      src="/img/hotels/wanasom03.jpg"
                                      alt=""
                                      width={80}
                                      height={80}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
              <div>
                  <p className="font-bold text-black text-sm">Wanasom Resort</p>
                  <p className="text-sm text-black">{formatDate(data?.hotel_bookings.check_in_date)} - {formatDate(data?.hotel_bookings.check_out_date)} | {nights} Nights</p>
                  <p className="text-sm text-black">{data?.hotel_bookings.room_aggregate[0]?.amount} x {data?.hotel_bookings.room_aggregate[0]?.hotel_rooms.room_type}</p>
                  <p className="text-sm text-black">Guest(s): {data?.hotel_bookings.guest_adult} Adult, {data?.hotel_bookings.guest_children} Children</p>
              </div>
          </div>
      </div></div>
  )
}

export default Accommodation