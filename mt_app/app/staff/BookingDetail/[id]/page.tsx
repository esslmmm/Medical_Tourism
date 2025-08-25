"use client";
import React, { useRef, useState } from "react";
import NavigationIcons from "../../../../components/staff_component/BookingDetail/NavigationIcons";
import TimelineSelector from "../../../../components/staff_component/BookingDetail/TimelineSelector";
import MedicalServiceCard from "../../../../components/staff_component/BookingDetail/MedicalService";
import AccommodationCard from "../../../../components/staff_component/BookingDetail/AccommodationCard";
import PlacesToVisit from "../../../../components/staff_component/BookingDetail/PlacesToVisit";
import Guide from "../../../../components/staff_component/BookingDetail/Guide";
import UserDetail from "../../../../components/staff_component/BookingDetail/UserDetail";



const StaffTimeline = () => {
  const [selectedDay, setSelectedDay] = useState<number | "all">(1);
  
  const sections = {
    timeline: useRef<HTMLDivElement>(null),
    medical: useRef<HTMLDivElement>(null),
    accommodation: useRef<HTMLDivElement>(null),
    place: useRef<HTMLDivElement>(null),
    guide: useRef<HTMLDivElement>(null),
    car: useRef<HTMLDivElement>(null),
  };
  
  
  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto font-sans">
        {/* Navigation Bar */}
        <NavigationIcons sections={sections} />

        <div ref={sections.timeline}>
          <TimelineSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div>

        <div>
          <UserDetail  />
        </div>

        <div ref={sections.medical}>
          <MedicalServiceCard selectedDay={selectedDay}/>
        </div>

        <div ref={sections.accommodation}>
          <AccommodationCard selectedDay={selectedDay}/>
        </div>

        <div ref={sections.place}>
          <PlacesToVisit selectedDay={selectedDay}/>
        </div>

        <div ref={sections.guide}>
          <Guide selectedDay={selectedDay}/>
        </div>
      </div>
    </div>
  );
};

export default StaffTimeline;
