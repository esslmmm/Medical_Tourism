import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditPopup from "./EditPopup";

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
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    place: event.name,
    departTime: event.time.split("-")[0].trim(),
    returnTime: event.time.split("-")[1].trim(),
  });

  const handleSave = (newData: { place: string; departTime: string; returnTime: string }) => {
    setEventData(newData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-4 relative border border-gray-200">
      {/* 📝 Edit Button - Added Back */}
      <button 
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={() => setIsEditing(true)}
      >
        <FaEdit className="text-gray-600" />
      </button>

      <div className="flex">
        <img src={event.image} className="w-24 h-24 rounded-md mr-4" alt={event.name} />
        <div>
          <h3 className="text-lg font-bold">Name: {eventData.place}</h3>
          <p className="text-md font-bold">Date: <span className="font-normal">{event.date}</span></p>
          <p className="text-md font-bold">Depart Time: <span className="font-normal">{eventData.departTime}</span></p>
          <p className="text-md font-bold">Return Time: <span className="font-normal">{eventData.returnTime}</span></p>
          <p className="text-md font-bold">Description: <span className="font-normal">{event.description}</span></p>
          {event.fee && <p className="text-md font-bold text-green-500">Fee: {event.fee}</p>}
        </div>
      </div>

      {/* ✅ Approve / Disapprove Buttons */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">Approve</button>
        <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 ml-2">Disapprove</button>
      </div>

      {/* ✅ Edit Popup Modal */}
      {isEditing && (
        <EditPopup 
          isOpen={isEditing} 
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          currentPlace={eventData.place}
          currentDepartTime={eventData.departTime}
          currentReturnTime={eventData.returnTime}
        />
      )}
    </div>
  );
};

export default EventCard;
