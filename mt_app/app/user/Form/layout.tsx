"use client"
import React, { useEffect, useState, Suspense } from "react";
import { AppointmentFormData } from "./form";
import Navbarprogress from "@/components/User/medical_appointment/Navbarprogress";
import MedicalService from "@/components/User/SidebarDetails/MedicalService";
import PlaceToVisit from "@/components/User/SidebarDetails/PlaceToVisit";
import GuideDetail from "@/components/User/SidebarDetails/Guide";
import { tourism_bookings } from "@/types/Booking";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<tourism_bookings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<AppointmentFormData | null>(null);
  const rawDate = form?.selectedDate;
  const date = rawDate ? new Date(rawDate) : null;

  useEffect(() => {
    const storedId = localStorage.getItem('tourism_id');
    setId(storedId);
    const savedForm = localStorage.getItem('appointmentFormData');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);


  //Getting the Package data
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        if (!id) return;
        const res = await fetch(`/api/booking/trips/${id}`);
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
    <div className="min-h-screen bg-zinc-50">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbarprogress />
        </Suspense>
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        <div className="lg:col-span-2 space-y-8">
          {children}
          </div>
        <div className="lg:col-span-1 bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-md sm:p-6">
          <MedicalService date={date} form={form}/>
          <PlaceToVisit data={data} />
            {data?.guide_bookings && <GuideDetail data={data.guide_bookings} />}
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