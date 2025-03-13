"use client";
import React, { useState } from "react";
import NavigationIcons from "../../components/select-timeline/NavigationIcons";
import PackageType from "../../components/select-timeline/PackageType";
import TimelineSelector from "../../components/select-timeline/TimelineSelector";
import EventsList from "../../components/select-timeline/EventList";
import CarService from "../../components/select-timeline/CarService";



interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  image: string;
  fee?: string;
}

const generateRandomPlaces = (day: number): Event[] => [
  {
    id: day * 10 + 1,
    name: "Medical Check-Up at MFU",
    date: `11 FEB 2025`,
    time: "10:00 AM - 12:00 PM",
    description:
      "I have had a high fever, body aches, and chills for the past three days. I also have a sore throat and a persistent cough.",
    image: "/img/medical.png",
  },
  {
    id: day * 10 + 2,
    name: `Random Place ${day}`,
    date: `11 FEB 2025`,
    time: "4:00 PM - 5:00 PM",
    description: "Enjoy beautiful scenery, explore local streets, try new food, and relax at a wonderful place.",
    image: "/img/place.png",
    fee: "Free",
  },
];

const daysData = {
  1: generateRandomPlaces(1),
  2: generateRandomPlaces(2),
  3: generateRandomPlaces(3),
};

const UserTimeline = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3 | "all">(1);
  const eventsToShow = selectedDay === "all" ? [...daysData[1], ...daysData[2], ...daysData[3]] : daysData[selectedDay];

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <NavigationIcons />
      <PackageType />
      <TimelineSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <EventsList events={eventsToShow} />
      <CarService />
    </div>
  );
};

export default UserTimeline;
