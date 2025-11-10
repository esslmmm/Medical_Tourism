"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Accommodation {
  hotel_id: number;
  name: string;
  hotel_cod: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
  contact_info: string;
  create_at: Date;
  hotel_rooms: hotel_rooms[];
}

interface hotel_rooms {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  image: string;
  hotel_room_facilities: HotelRoomFacility[];
  room_aggregate: RoomAggregate[];
  room_image: RoomImage[];
}

interface RoomAggregate {
  amount: number;
  aggregate_id: number;
  booking_id: number;
}

interface HotelRoomFacility {
  room_facilitiy_id: number;
  facility_name: string;
  description: string;
}

interface RoomImage {
  image_id: number;
  image: string;
}

interface AccommodationProfileProps {
  accommodation: Accommodation | null;
  quantities: { [roomId: number]: number };
  setQuantities: React.Dispatch<React.SetStateAction<{ [roomId: number]: number }>>;
  handleAddRoom: (room_id: number, quantity: number) => void;
}

const RoomOptionCard: React.FC<AccommodationProfileProps> = ({
  accommodation,
  quantities,
  setQuantities,
  handleAddRoom,
}) => {
  const [roomDetails, setRoomDetails] = useState<Record<number, hotel_rooms>>({});
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      if (!accommodation) return;
      try {
        const fetched: Record<number, hotel_rooms> = {};
        for (const room of accommodation.hotel_rooms) {
          const res = await fetch(`/api/services/accommodations/rooms/${room.room_id}`);
          if (!res.ok) throw new Error("Failed to fetch room");
          const data = await res.json();
          fetched[room.room_id] = data;
        }
        setRoomDetails(fetched);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [accommodation]);

  const increment = (roomId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] || 0) + 1,
    }));
  };

  const decrement = (roomId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [roomId]: Math.max((prev[roomId] || 0) - 1, 0),
    }));
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setSelectedRoomId(null);
    }
  };

  const nextImage = (imagesLength: number) => {
    setSelectedImageIndex((prev) => (prev + 1) % imagesLength);
  };

  const prevImage = (imagesLength: number) => {
    setSelectedImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!accommodation) return <p>No accommodation selected.</p>;

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 gap-6">
      {accommodation.hotel_rooms.map((room) => {
        const roomData = roomDetails[room.room_id];
        if (!roomData) return null;

        return (
          <div
            key={room.room_id}
            className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full flex flex-col lg:flex-row"
          >
            {/* Images and pricing */}
            <div className="w-full lg:w-1/3 border-gray-100 border-r-2 p-4">
              {/* Main Image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={room.image || "/img/fallback.jpg"}
                  alt="Room Image"
                  width={400}
                  height={250}
                  className="w-full object-cover cursor-pointer"
                  onClick={() => {
                    setSelectedRoomId(room.room_id);
                    setSelectedImageIndex(0);
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-2">
                {roomData.room_image?.slice(0, 2).map((img, index) => (
                  <Image
                    key={index}
                    src={img.image}
                    alt={`Thumb ${index}`}
                    width={90}
                    height={60}
                    className="rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedRoomId(room.room_id);
                      setSelectedImageIndex(index);
                    }}
                  />
                ))}

                {roomData.room_image && roomData.room_image.length > 2 && (
                  <div
                    className="relative w-[90px] h-[60px] rounded-lg bg-black flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                    onClick={() => {
                      setSelectedRoomId(room.room_id);
                      setSelectedImageIndex(2);
                    }}
                  >
                    +{roomData.room_image.length - 2} more
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold">${roomData.price_per_night} USD</p>
                <p className="text-gray-500 text-sm">Per night includes taxes and charges</p>
              </div>
            </div>

            {/* Room details */}
            <div className="w-full lg:w-1/3 px-6 border-r-2 border-gray-100">
              <h3 className="text-2xl font-bold">{roomData.room_type}</h3>
              <h4 className="text-lg font-semibold mt-4">Details</h4>
              <ul className="text-gray-600 mt-2 space-y-1">
                {roomData.hotel_room_facilities?.map((f, i) => (
                  <li key={i}>{f.facility_name}</li>
                ))}
              </ul>
              <a href="#" className="text-blue-600 font-medium mt-4 inline-block">
                ➕ See all room facilities
              </a>
            </div>

            {/* Booking action */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center ml-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decrement(room.room_id)}
                  className="border px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="text-lg font-medium">{quantities[room.room_id] || 0}</span>
                <button
                  onClick={() => increment(room.room_id)}
                  className="border px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => handleAddRoom(room.room_id, quantities[room.room_id] || 0)}
                className="w-full bg-green-400 text-white text-lg font-semibold py-3 mt-4 rounded-lg hover:bg-green-500"
                >
                Add Now
              </button>
              <p className="text-red-500 text-sm mt-2 font-medium">Limited availability</p>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedRoomId !== null && roomDetails[selectedRoomId] && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div>
            <img
              src={
                roomDetails[selectedRoomId]?.room_image?.length > 0
                  ? roomDetails[selectedRoomId].room_image[selectedImageIndex]?.image
                  : roomDetails[selectedRoomId]?.image || "/img/fallback.jpg"
              }
              alt="Room Full View"
              className="w-250 h-150 object-cover rounded-lg cursor-pointer"
            />

            {/* Show navigation buttons only if there are multiple images */}
            {roomDetails[selectedRoomId]?.room_image?.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl px-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(roomDetails[selectedRoomId].room_image.length);
                  }}
                >
                  &#10094;
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl px-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(roomDetails[selectedRoomId].room_image.length);
                  }}
                >
                  &#10095;
                </button>
              </>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default RoomOptionCard;
