import React from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  image: string;
  fee?: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 flex items-start">
      <img src={event.image} alt={event.name} className="w-24 h-24 rounded-md mr-4" />
      <div>
        <h3 className="text-lg font-bold">Package Name: <span className="font-normal">{event.name}</span></h3>
        <p className="text-md font-bold">Appointment Date / Time: <span className="font-normal">{event.date}, {event.time}</span></p>
        {event.fee && <p className="text-md font-bold text-green-500">Fee: <span className="font-normal">{event.fee}</span></p>}
      </div>
    </div>
  );
};

export default EventCard;