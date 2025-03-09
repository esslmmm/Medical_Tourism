import React from "react";
import BookingItem from "./BookingItem";

interface BookingListProps {
  activeTab: "process" | "payment" | "completed";
}

const BookingList: React.FC<BookingListProps> = ({ activeTab }) => {
  const bookingData = [
    {
      id: 1,
      title: "Basic Check-Up And Travel Package - MFU Hospital",
      date: "2 December 2024",
      status: activeTab,
      expiredMessage: activeTab === "payment" ? "Expired 3 days before the booking confirmation timeout." : null,
    },
  ];

  return (
    <div>
      {bookingData.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
