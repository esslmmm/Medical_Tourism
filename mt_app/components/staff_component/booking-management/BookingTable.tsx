import React from "react";
import { FaSearch } from "react-icons/fa";

const BookingTable = () => {
  const bookings = [
    { id: "Book #124", type: "Tourism Package" },
    { id: "Book #124", type: "Medical Package" },
    { id: "Book #124", type: "Medical Tourism Package" },
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center gap-4 mb-4">
        <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">Filter</button>
        <span className="text-gray-600">4 Show items</span>
        <input type="text" className="border px-4 py-2 rounded-lg flex-1" placeholder="Search..." />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Book ID</th>
            <th className="py-3 px-4 text-left">Package Type</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(({ id, type }, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4">{id}</td>
              <td className="py-3 px-4">{type}</td>
              <td className="py-3 px-4 flex gap-2 items-center">
                <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Approve</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Disapprove</button>
                <FaSearch className="text-gray-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
