"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AccommodationDetails from "../../../../components/user_components/accommodation_booking/AccommodationDetail";
import ReviewSection from "../../../../components/user_components/accommodation_booking/ReviewAccommodation";
import RoomGallery from "../../../../components/user_components/accommodation_booking/RoomGallery";
import RoomOptionCard from "../../../../components/user_components/accommodation_booking/RoomOptionCard";
import SelectAccommodation from "../../../../components/user_components/accommodation_booking/SelectAccommodation";
import SelectRoom from "../../../../components/user_components/accommodation_booking/SelectRoom";
import { addDays, differenceInCalendarDays } from "date-fns";
import { Range } from 'react-date-range';
// import Original from "../../../components/user_components/accommodation_booking/Original"; // optional

interface accommodation {
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
  hotel_facilities: hotel_facilities[];
  hotel_images: hotel_images[];
  hotel_rooms: hotel_rooms[];
  review_hotel: review_hotel[];
}

interface hotel_facilities {
  facility_id: number;
  facility_name: string;
  description: string;
}

interface hotel_images {
  image_id: number;
  image: string;
}

interface hotel_rooms {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  image: string;
}

interface review_hotel {
  review_id: number;
  user_id: number;
  rating: number;
  title_review: string;
  comment: string;
  created_at: string;
  user: user;
}
interface user {
  user_id: number;
  name: string;
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

const AccommodationBooking = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState<accommodation | null>(null);
  const [quantities, setQuantities] = useState<{ [roomId: number]: number }>({});
  const [selectedRooms, setSelectedRooms] = useState<{ room_id: number; quantity: number }[]>([]);
  const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection',
          },
        ]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

//Might be use later
//   const increment = (roomId: number) => {
//   setQuantities((prev) => ({
//     ...prev,
//     [roomId]: (prev[roomId] || 0) + 1,
//   }));
// };

// const decrement = (roomId: number) => {
//   setQuantities((prev) => ({
//     ...prev,
//     [roomId]: Math.max((prev[roomId] || 0) - 1, 0),
//   }));
// };

  const handleAddRoom = (room_id: number, quantity: number) => {
    if (quantity < 1) return;
    setSelectedRooms((prev) => {
      const existing = prev.find((r) => r.room_id === room_id);
      if (existing) {
        return prev.map((r) =>
          r.room_id === room_id ? { ...r, quantity } : r
        );
      }
      return [...prev, { room_id, quantity }];
    });
  };

  useEffect(() => {
  if (selectedAccommodation) {
    // Reset dependent states when accommodation changes
    setSelectedAccommodation
    setQuantities({});
    setSelectedRooms([]);
    setRange([{
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    }]);
    setAdults(1);
    setChildren(0);
  }
}, [selectedAccommodation]);
  

  return (
    <div>
      <SelectAccommodation
        setSelectedAccommodation={setSelectedAccommodation}
        selectedAccommodation={selectedAccommodation}
      />

      {/* Render below only if selectedAccommodation exists */}
      {!selectedAccommodation && (
        <p className="text-center text-gray-500 p-10">
          Select an accommodation to view details
        </p>
      )}

      {selectedAccommodation && (
        <>
          <RoomGallery accommodation={selectedAccommodation} />
          <AccommodationDetails
            accommodation={selectedAccommodation}
            quantities={quantities}
            selectedRooms={selectedRooms}
            ranges={range}
            adults={adults}
            children={children}
            // setQuantities={setQuantities}
            // increment={increment}
            // decrement={decrement}
          />
          <SelectRoom accommodation={selectedAccommodation} 
          range={range}
          setRange={setRange}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}/>
          <RoomOptionCard accommodation={selectedAccommodation} 
            quantities={quantities}
            setQuantities={setQuantities}
            handleAddRoom={handleAddRoom}/>
          <ReviewSection accommodation={selectedAccommodation} />
        </>
      )}
    </div>
  );
};

export default AccommodationBooking;
