"use client";
import React, { useEffect, useRef, useState } from "react";
import MedicalServiceCard from "../../../../components/staff_component/BookingDetail/MedicalService";
import PlacesToVisit from "../../../../components/staff_component/BookingDetail/PlacesToVisit";
import Guide from "../../../../components/staff_component/BookingDetail/Guide";
import UserDetail from "../../../../components/staff_component/BookingDetail/UserDetail";
import { useParams } from "next/navigation";
import { PackageBooking } from "@/types/Booking";


const StaffTimeline = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/staff/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();
        setPackageBooking(packageData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);


  if (loading) return <p className="text-center text-gray-500">Loading details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  
  
  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto font-sans">
        {/* Navigation Bar */}
        {/* <NavigationIcons sections={sections} /> */}
          <UserDetail data={packageBooking} user={packageBooking?.user}/>

        <div >
        <MedicalServiceCard packageBooking={packageBooking} setPackageBooking={setPackageBooking}/>
        </div>

        <div>
          <PlacesToVisit tripBooking={packageBooking?.tourism_bookings ?? null} setPackageBooking={setPackageBooking}/>
        </div>

        <div>
          <Guide guideBooking={packageBooking?.tourism_bookings.guide_bookings ?? null} setPackageBooking={setPackageBooking}/>
        </div>
      </div>
    </div>
  );
};

export default StaffTimeline;
