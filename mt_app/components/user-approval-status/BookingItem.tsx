import React from "react";

interface Booking {
  id: number;
  title: string;
  date: string;
  status: "process" | "payment" | "completed";
  expiredMessage?: string | null;
}

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white p-5 rounded-lg shadow-md mb-4">
      <img src="/img/xray.png" alt="X-ray" className="w-24 h-16 rounded-md md:w-40 md:h-24" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{booking.title}</h3>
        <p className="text-gray-600">Date: {booking.date}</p>
        {booking.expiredMessage && <p className="text-red-500 text-sm">{booking.expiredMessage}</p>}
      </div>
      <div className="ml-auto flex gap-2 mt-4 md:mt-0">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View more</button>
        {booking.status === "payment" && <button className="bg-black text-white px-4 py-2 rounded-md">Pay now</button>}
      </div>
    </div>
  );
};

export default BookingItem;
