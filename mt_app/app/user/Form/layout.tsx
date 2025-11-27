"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppointmentFormData } from "./form";
import Navbarprogress from "@/components/User/medical_appointment/Navbarprogress";
import MedicalService from "@/components/User/SidebarDetails/MedicalService";
import Accommodation from "@/components/User/SidebarDetails/Accommodation";
import PlaceToVisit from "@/components/User/SidebarDetails/PlaceToVisit";
import GuideDetail from "@/components/User/SidebarDetails/Guide";


interface Booking {
  hotel_bookings: hotelBookings;
  tourism_bookings: tourismBookings;
  guide_bookings: guideBookings;
}

interface guideBookings {
    start: string;
    end: string;
    guides: guides;
}

interface guides {
    name: string;
    image: string;
    language: string;
}


interface tourismBookings{
  routes: routes;
}

interface routes{
  name: string;
  trips: trips;
}

interface trips{
  tour_id: number;
  package_places: package_places[];
}

interface package_places{
  packplace_id: number;
  place_id: String;
  date: number;
  start: string;
  end: string;
  places: places;
}

interface places{
  place_id: String;
  place_name: string;
  description: string;
  image: string;
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


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<AppointmentFormData | null>(null);
  const rawDate = form?.selectedDate;
  const date = rawDate ? new Date(rawDate) : null;

  useEffect(() => {
    const storedId = localStorage.getItem('package_booking_id');
    setId(storedId);
    const savedForm = localStorage.getItem('appointmentFormData');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);


  //Getting the Package data
  // useEffect(() => {
  //   const fetchPackage = async () => {
  //     try {
  //       if (!id) return;
  //       const res = await fetch(`/api/booking/packages/${id}`);
  //       if (!res.ok) {
  //         const errorData = await res.json();
  //         throw new Error(errorData.error || 'Unknown error');
  //       }
  //       const json = await res.json();
  //       setData(json);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPackage();
  // }, [id]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p className="text-red-500">Error: {error}</p>;

    
  return (
    <div className="min-h-screen bg-zinc-50">
        <Navbarprogress />
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        <div className="lg:col-span-2 space-y-8">
          {children}
          </div>
        <div className="lg:col-span-1">
          <MedicalService date={date} form={form}/>
          {/* {data?.tourism_bookings && <PlaceToVisit data={data} />}
          {data?.hotel_bookings && <Accommodation data={data} />}
          {data?.guide_bookings && <GuideDetail data={data} />} */}
            <div className="mt-4 text-right">
              <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
            </div>
        </div>
      </main>
          </div>
    </div>
  );
};

export default Layout;