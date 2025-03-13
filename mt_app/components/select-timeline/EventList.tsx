import React from "react";
import EventCard from "./EventCard";

// Define the Event interface
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  image: string;
  fee?: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
