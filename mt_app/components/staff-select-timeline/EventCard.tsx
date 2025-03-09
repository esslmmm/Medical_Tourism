import React from "react";

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
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-4 flex flex-col justify-between">
      <div className="flex">
        {/* Event Image */}
        <img src={event.image} className="w-24 h-24 rounded-md mr-4" alt={event.name} />
        <div>
          <h3 className="text-lg font-bold">
            {event.category === "Medical Service"
              ? `Hospital Name: ${event.location}`
              : `Name: ${event.name}`}
          </h3>
          <p className="text-md font-bold">
            Date / Time: <span className="font-normal">{event.date}, {event.time}</span>
          </p>
          <p className="text-md font-bold">
            Description: <span className="font-normal">{event.description}</span>
          </p>
          {event.fee && (
            <p className="text-md font-bold text-green-500">
              Fee: <span className="font-normal">{event.fee}</span>
            </p>
          )}
        </div>
      </div>

      {/* Approve / Disapprove Buttons */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2">Approve</button>
        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Disapprove</button>
      </div>
    </div>
  );
};

export default EventCard;
