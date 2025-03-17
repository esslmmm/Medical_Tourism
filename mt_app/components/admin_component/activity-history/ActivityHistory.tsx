import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ActivityHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); // "my" or "all"
  const [sortOrder, setSortOrder] = useState("Newest");
  const totalPages = 6;
  const showItems = 9; // This is just a label now, no dropdown

  const historyData = [
    { admin: "Thuta Zaw", action: "Created", time: "12 Feb 2025 10:30 AM", type: "Package" },
    { admin: "Neon", action: "Added", time: "12 Feb 2025 10:30 AM", type: "Hospital" },
    { admin: "Ekkarat", action: "Added", time: "12 Feb 2025 10:30 AM", type: "Hotel" },
    { admin: "Singkhala", action: "Added", time: "12 Feb 2025 10:30 AM", type: "Car" },
    { admin: "James", action: "Remove", time: "12 Feb 2025 10:30 AM", type: "Package" },
    { admin: "Johnny Sins", action: "Remove", time: "12 Feb 2025 10:30 AM", type: "Car" },
    { admin: "Trump", action: "Added", time: "12 Feb 2025 10:30 AM", type: "Doctor" },
    { admin: "Obama", action: "Remove", time: "12 Feb 2025 10:30 AM", type: "Interpreter" },
    { admin: "Joe Biden", action: "Added", time: "12 Feb 2025 10:30 AM", type: "Interpreter" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Tabs: My History / All History */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-6 text-lg font-semibold transition-all ${
            activeTab === "my" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("my")}
        >
          My History
        </button>
        <button
          className={`py-2 px-6 text-lg font-semibold transition-all ${
            activeTab === "all" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All History
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="flex gap-4 items-center mb-6">
        {/* Search Bar */}
        <input
          type="text"
          className="border px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by name, action, time..."
        />
        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
          <FaFilter />
          Filter
        </button>
        {/* Show Items Label (NOT a dropdown anymore) */}
        <span className="bg-gray-200 px-4 py-2 rounded-lg">{showItems} Show Items</span>
        {/* Sort Button (Stylish Toggle) */}
        <button
          className={`px-4 py-2 rounded-lg ${
            sortOrder === "Newest"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } transition-all`}
          onClick={() => setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")}
        >
          {sortOrder}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Admin</th>
              <th className="py-3 px-4 text-left">Type of Action</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map(({ admin, action, time, type }, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                <td className="py-3 px-4">{admin}</td>
                <td className="py-3 px-4">{action}</td>
                <td className="py-3 px-4">{time}</td>
                <td className="py-3 px-4">{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <MdKeyboardArrowLeft />
        </button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-lg ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ActivityHistory;
