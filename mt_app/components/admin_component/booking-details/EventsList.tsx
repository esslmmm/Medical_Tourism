import React from "react";
import EventCard from "./EventCard";

interface Event {
  id: number;
  category: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  fee?: string;
  status?: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div>
      {events.map((event: Event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
