"use client";
import React, { useState } from "react";
import Sidebar from "@/components/staff-select-timeline/Sidebar";
import ProfileHeader from "@/components/staff-select-timeline/ProfileHeader";
import TimelineSelector from "@/components/staff-select-timeline/TimelineSelector";
import EventsList from "@/components/staff-select-timeline/EventsList";
import InterpreterCarService from "@/components/staff-select-timeline/InterpreterCarService";

const generateEvents = (day: number) => [
  {
    id: day * 10 + 1,
    category: "Medical Service",
    name: "Medical Check-Up at MFU",
    date: `12 FEB 2025`,
    time: "10:00 AM - 12:00 PM",
    location: "MFU Hospital",
    description:
      "I have had a high fever, body aches, and chills for the past three days. I also have a sore throat and a persistent cough.",
    image: "/img/medical.png",
    status: "Pending",
  },
  {
    id: day * 10 + 2,
    category: "Place to Visit",
    name: `Random Place ${day}`,
    date: `12 FEB 2025`,
    time: "4:00 PM - 5:00 PM",
    location: `Location ${day}`,
    description:
      "Enjoy beautiful scenery, explore local streets, try new food, and relax at a wonderful place.",
    image: "/img/place.png",
    fee: "100฿",
    status: "Pending",
  },
];

const daysData = {
  1: generateEvents(1),
  2: generateEvents(2),
  3: generateEvents(3),
};

const StaffTimeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3 | "all">(1);
  const [tab, setTab] = useState<"service" | "user">("service");

  const eventsToShow =
    selectedDay === "all"
      ? [...daysData[1], ...daysData[2], ...daysData[3]]
      : daysData[selectedDay];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-2/3 p-6">
        <ProfileHeader tab={tab} setTab={setTab} />
        <TimelineSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <EventsList events={eventsToShow} />
        <InterpreterCarService />
      </div>
    </div>
  );
};

export default StaffTimeline;
