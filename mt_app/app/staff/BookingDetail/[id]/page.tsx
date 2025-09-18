"use client";
import React, { useEffect, useRef, useState } from "react";
import NavigationIcons from "../../../../components/staff_component/BookingDetail/NavigationIcons";
import MedicalServiceCard from "../../../../components/staff_component/BookingDetail/MedicalService";
import AccommodationCard from "../../../../components/staff_component/BookingDetail/AccommodationCard";
import PlacesToVisit from "../../../../components/staff_component/BookingDetail/PlacesToVisit";
import Guide from "../../../../components/staff_component/BookingDetail/Guide";
import UserDetail from "../../../../components/staff_component/BookingDetail/UserDetail";
import { useParams } from "next/navigation";

interface PackageBooking {
  booking_id: number;
  appointment_id: number;
  status: string;
  create_at: string;
  guide_bookings: guide_bookings;
  tourism_bookings: tourism_bookings;
  appointments: appointments;
  packages: packages;
  hotel_bookings: hotel_bookings
}

interface packages{
  image: string;
  package_name: string;
  hospitals: hospitals;
}

interface appointments {
  appointment_id: number;
  date: string;
  timeslot: string;
  description: string;
  status: string;
  appointment_files?: AppointmentFile[];
}

interface AppointmentFile {
  id: number;
  appointmentId: number;
  fileId: number;
  createdAt: string;
  files: File;
}

interface File {
  id: number;
  userId: number;
  originalName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryId: string;
  url: string;
  uploadedAt: string;
  category: string;
  description: string | null;
}

interface tourism_bookings {
  tourism_id: number;
  status: string;
  trips: trips
  
}

interface trips {
  tour_id: number;
  package_places: PackagePlaces[];
}

interface PackagePlaces {
  packplace_id: number;
  place_id: number;
  tour_id: number;
  date: string;
  start: string;
  end: string;
  places: Places;
}

interface Places {
  place_id: number;
  place_name: string;
  image: string;
  fee: number;
}

interface hotel_bookings {
  booking_id: number;
  hotel_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: string;
  guest_adult: string | null;
  guest_children: string | null;
  hotels: Hotels;
  room_aggregate: RoomAggregate[];
}

interface Hotels {
  hotel_id: number;
  name: string;
  contact_info: string;
  check_in_time: string;
  image: string;
  hotel_code: number;
}

interface RoomAggregate {
  aggregate_id: number;
  room_id: number;
  booking_id: number;
  amount: number;
  hotel_rooms: HotelRooms;
}

interface HotelRooms {
  room_id: number;
  hotel_id: number;
  room_type: string;
}

interface guide_bookings {
  booking_id: number;
  guide_id: number;
  start: string;
  end: string;
  status: string
  guides: Guides;
}

interface Guides {
  guide_id: number;
  name: string;
  language: string;
  phone: string;
  image: string;
}

interface hospitals {
  hospital_id: number;
  name: string;
  hospital_code: string;
  contact_info: string;
  image: string;
}


const StaffTimeline = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sections = {
    timeline: useRef<HTMLDivElement>(null),
    medical: useRef<HTMLDivElement>(null),
    accommodation: useRef<HTMLDivElement>(null),
    place: useRef<HTMLDivElement>(null),
    guide: useRef<HTMLDivElement>(null),
    car: useRef<HTMLDivElement>(null),
  };


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
        <NavigationIcons sections={sections} />
          <UserDetail  />

        <div ref={sections.medical}>
        <MedicalServiceCard packageBooking={packageBooking} setPackageBooking={setPackageBooking}/>
        </div>

        <div ref={sections.accommodation}>
        <AccommodationCard hotelBooking={packageBooking?.hotel_bookings ?? null} setPackageBooking={setPackageBooking} />
        </div>

        <div ref={sections.place}>
          <PlacesToVisit tripBooking={packageBooking?.tourism_bookings ?? null} setPackageBooking={setPackageBooking}/>
        </div>

        <div ref={sections.guide}>
          <Guide guideBooking={packageBooking?.guide_bookings ?? null} setPackageBooking={setPackageBooking}/>
        </div>
      </div>
    </div>
  );
};

export default StaffTimeline;
