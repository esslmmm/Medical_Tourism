"use client";
import { differenceInCalendarDays, startOfDay, format } from 'date-fns';
import { useStepNavigator } from "../../../app/user/package_landing_page/goToNextStep";
import { submitHotelBooking } from "../../../app/api/booking/hotels/submitHotelBooking";
import { Range } from 'react-date-range';
import { useState } from "react";
import { updatePackageBooking } from '../../../app/api/booking/packages/updatePackageBooking';

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
  hotel_facilities: hotel_facilities[];
  hotel_rooms: hotel_rooms[];
  review_hotel: review_hotel[];
}

interface hotel_facilities {
  facility_id: number;
  facility_name: string;
  description: string;
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
}

interface AccommodationDetailsProps {
  accommodation: Accommodation | null;
  quantities: { [roomId: number]: number };
  selectedRooms: { room_id: number; quantity: number }[];
  ranges: Range[];
  adults: number;
  children: number;
  // setQuantities: React.Dispatch<React.SetStateAction<{ [roomId: number]: number }>>;
  // increment: (roomId: number) => void;
  // decrement: (roomId: number) => void;
}

const AccommodationDetails: React.FC<AccommodationDetailsProps> = ({
  accommodation,
  quantities,
  selectedRooms,
  ranges,
  adults, 
  children,
  // setQuantities
}) => {
  if (!accommodation) return null;
  const goToNextStep = useStepNavigator();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Convert start and end date to string
  const startDateStr = ranges[0]?.startDate
    ? format(startOfDay(ranges[0].startDate), 'yyyy-MM-dd')
    : '';

  const endDateStr = ranges[0]?.endDate
    ? format(startOfDay(ranges[0].endDate), 'yyyy-MM-dd')
    : '';
  //Nights calculation
  const nights =
    ranges.length > 0 &&
    ranges[0].startDate &&
    ranges[0].endDate
      ? differenceInCalendarDays(ranges[0].endDate, ranges[0].startDate)
      : 0;

  

  const selectedRoomDetails = selectedRooms.map((selected) => {
    const roomInfo = accommodation.hotel_rooms.find(
      (room) => room.room_id === selected.room_id
    );
    return {
      ...selected,
      room_type: roomInfo?.room_type || 'Unknown Room',
      price: roomInfo?.price_per_night || 0,
    };
  });

  const handleNext = async () => {
    setLoading(true);
    setError(null);

    if (
      !accommodation.hotel_id ||
      !startDateStr ||
      !endDateStr ||
      selectedRoomDetails.length === 0 ||
      adults + children <= 0 ||
      originalPrice <= 0
    ) {
      setError('Some booking details are missing or invalid. Please check again.');
      setLoading(false);
      return;
    }

    const bookingData = {
      hotel_id: accommodation.hotel_id,
      check_in_date: new Date(startDateStr),
      check_out_date: new Date(endDateStr),
      guest_children: children,
      guest_adult: adults,
      total_price: originalPrice,
      status: 'In_Progress',
      room_aggregate: selectedRoomDetails.map((room) => ({
        room_id: room.room_id,
        amount: room.quantity,
      })),
    };

    try {
      const response = await submitHotelBooking(bookingData);

      if (!response || response.error) {
        throw new Error(response?.error || 'Server error');
      }

      const hotel_booking_id = response.booking_id;
      const package_booking_id = localStorage.getItem('package_booking_id');

      if (!package_booking_id || !hotel_booking_id) {
        throw Error('Missing booking ID(s).');
      }

      // ✅ Update package booking with hotel_booking_id
      await updatePackageBooking(Number(package_booking_id), {
        hotel_booking_id,
      });

      goToNextStep();
    } catch (err) {
      console.error('Booking failed:', err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  // const increment = (roomId: number) => {
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


  if (!accommodation) return <p className="p-10 text-center">No accommodation data available.</p>;

  // Compute average rating from reviews
  const totalReviews = accommodation.review_hotel.length;
  const averageRating = totalReviews //Might be use later
    ? (
        accommodation.review_hotel.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      ).toFixed(1)
    : "0";

  const originalPrice = selectedRoomDetails.reduce(
  (sum, room) => sum + room.price * room.quantity * nights, 0);
  
  const discountPrice = selectedRoomDetails.reduce((sum, room) => sum + room.price * room.quantity, 0);

  return (
    <div className="p-10 flex justify-center">
      <div className="max-w-5xl w-full bg-white p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Section: Hotel Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{accommodation.name}</h2>
          <p className="text-gray-600 mt-2">{accommodation.location}, {accommodation.city}</p>
          <a href="#" className="text-green-500 font-medium mt-2 flex items-center">
            See map 📍
          </a>
          <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
            ⭐ {accommodation.rating}/5 <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
          <p className="text-gray-700 mt-4">{accommodation.description}</p>

          {/* Facilities List */}
          <h3 className="text-xl font-semibold mt-6">Facilities</h3>
          <div className="grid grid-cols-2 gap-3 mt-2 text-gray-700">
            {accommodation.hotel_facilities.map((facility) => (
              <span key={facility.facility_id}>✔ {facility.facility_name}</span>
            ))}
          </div>
        </div>

        {/* Right Section: Booking Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Booking Detail</h3>
          {selectedRoomDetails.length === 0 ? (
            <p className="text-gray-500"></p>
          ) : (
            <div className="space-y-2">
              {selectedRoomDetails.map((room) => (
                <div
                  key={room.room_id}
                  className="flex justify-between mb-2 text-gray-600"
                >
                  <span>{room.room_type}</span>
                  <span>{room.quantity} room{room.quantity > 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          )}

          {/* {selectedRoomDetails.length === 0 ? (
            <p className="text-gray-500 italic">No rooms selected</p>
          ) : (
            <div className="space-y-3">
              {selectedRoomDetails.map((room) => (
                <div
                  key={room.room_id}
                  className="flex items-center justify-between border border-gray-200 rounded-md p-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{room.room_type}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrement(room.room_id)}
                      className="w-8 h-8 text-lg font-semibold rounded bg-gray-200 hover:bg-gray-300"
                    >
                      –
                    </button>
                    <span className="min-w-[24px] text-center">{quantities[room.room_id] || 0}</span>
                    <button
                      onClick={() => increment(room.room_id)}
                      className="w-8 h-8 text-lg font-semibold rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )} */}

            <p>Total Nights: {nights}</p>
            <p>Guests: {adults} adults, {children} children</p>


          <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2 mt-10">
            <span className="text-gray-400">Total Original Price</span>
            <span className="text-red-600 px-2 py-1 rounded line-through">
              {originalPrice.toLocaleString()} USD
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total rooms</span> <span>{selectedRooms.length} rooms</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-1">
            <span>Total price</span> <span>{originalPrice.toLocaleString()} USD</span>
          </div>
          <p className="text-gray-500 text-sm flex justify-center mt-20">
            You save{" "}
            <span className="text-black font-semibold ml-1">
              {(originalPrice - discountPrice).toLocaleString()}
            </span>{" "}
            USD on this booking
          </p>
          <button
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Booking...
              </span>
            ) : 'Book Now'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AccommodationDetails;

