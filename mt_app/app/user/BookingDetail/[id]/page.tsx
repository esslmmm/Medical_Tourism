"use client";
import React, { useRef, useState } from "react";
import NavigationIcons from "../../../../components/user_components/BookingDetail/NavigationIcons";
import PackageType from "../../../../components/user_components/BookingDetail/PackageType";
import TimelineSelector from "../../../../components/user_components/BookingDetail/TimelineSelector";
import CarService from "../../../../components/user_components/BookingDetail/CarService";
import Navbarpro from "../../../../components/user_components/Main/Navbarpro";
import Footer from "../../../../components/user_components/Main/Footer";
import MedicalServiceCard from "../../../../components/user_components/BookingDetail/MedicalService";
import AccommodationCard from "../../../../components/user_components/BookingDetail/AccommodationCard";
import PlacesToVisit from "../../../../components/user_components/BookingDetail/PlacesToVisit";


const UserTimeline = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3 | "all">(1);
  
  const sections = {
    timeline: useRef<HTMLDivElement>(null),
    package: useRef<HTMLDivElement>(null),
    medical: useRef<HTMLDivElement>(null),
    accommodation: useRef<HTMLDivElement>(null),
    place: useRef<HTMLDivElement>(null),
    interpreter: useRef<HTMLDivElement>(null),
    car: useRef<HTMLDivElement>(null),
  };
  
  
  return (
    <div>
      <Navbarpro />
      <div className="p-6 max-w-4xl mx-auto font-sans">
        {/* Navigation Bar */}
        <NavigationIcons sections={sections} />

        {/* Sections with Proper Refs */}
        <div ref={sections.package}>
          <PackageType />
        </div>

        <div ref={sections.timeline}>
          <TimelineSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div>

        <div ref={sections.medical}>
          <MedicalServiceCard />
        </div>

        <div ref={sections.accommodation}>
          <AccommodationCard />
        </div>

        <div ref={sections.place}>
          <PlacesToVisit />
        </div>

        <div ref={sections.car}>
          <CarService />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTimeline;
