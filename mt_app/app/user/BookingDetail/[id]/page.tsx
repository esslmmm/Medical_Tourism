"use client";
import React, { useEffect, useRef, useState } from "react";
import NavigationIcons from "@/components/User/BookingDetail/NavigationIcons";
import Navbarpro from "@/components/User/Main/Navbarpro";
import Footer from "@/components/User/Main/Footer";
import MedicalServiceCard from "@/components/User/BookingDetail/MedicalService";
import AccommodationCard from "@/components/User/BookingDetail/AccommodationCard";
import PlacesToVisit from "@/components/User/BookingDetail/PlacesToVisit";
import Guide from "@/components/User/BookingDetail/Guide";
import { useParams } from "next/navigation";

interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  guide_bookings: guide_bookings;
  hotel_bookings: hotel_bookings
  tourism_bookings: tourism_bookings;
  appointments: appointments;
  packages: packages;
}

interface packages{
  image: string;
  package_name: string;
}

interface appointments {
  appointment_id: number;
  date: string;
  timeslot: string;
  description: string;
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
  guides: Guides;
}

interface Guides {
  guide_id: number;
  name: string;
  language: string;
  phone: string;
  image: string;
}

const UserTimeline = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sections = {
    timeline: useRef<HTMLDivElement>(null),
    package: useRef<HTMLDivElement>(null),
    medical: useRef<HTMLDivElement>(null),
    accommodation: useRef<HTMLDivElement>(null),
    place: useRef<HTMLDivElement>(null),
    guide: useRef<HTMLDivElement>(null),
    car: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/booking/packages/${id}`);
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
      <Navbarpro />
      <div className="p-6 max-w-4xl mx-auto font-sans">
        {/* <BookingDetailPage /> */}
        {/* Navigation Bar */}
        <NavigationIcons sections={sections} />

        <div ref={sections?.medical}>
          <MedicalServiceCard packageBooking={packageBooking}/>
        </div>

        <div ref={sections?.accommodation}>
          <AccommodationCard hotelBooking={packageBooking?.hotel_bookings ?? null} />
        </div>

        <div ref={sections?.place}>
          <PlacesToVisit tripBooking={packageBooking?.tourism_bookings ?? null}/>
        </div>

        <div ref={sections?.guide}>
          <Guide guideBooking={packageBooking?.guide_bookings ?? null} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTimeline;
