import React from "react";
import BookingList from "./BookingList";

interface BookingTabsProps {
  activeTab: "process" | "payment" | "completed";
  setActiveTab: (tab: "process" | "payment" | "completed") => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-4/5 max-w-4xl">
      {/* Tabs */}
      <div className="flex gap-6 text-lg font-bold cursor-pointer mb-6">
        {["process", "payment", "completed"].map((tab) => (
          <span
            key={tab}
            className={`border-b-4 px-4 pb-2 ${
              activeTab === tab
                ? tab === "process"
                  ? "border-yellow-400 text-yellow-500"
                  : tab === "payment"
                  ? "border-blue-500 text-blue-600"
                  : "border-green-500 text-green-600"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab as "process" | "payment" | "completed")}
          >
            {tab === "process" ? "In Process" : tab === "payment" ? "Wait for Payment" : "Completed"}
          </span>
        ))}
      </div>

      {/* Booking List */}
      <BookingList activeTab={activeTab} />
    </div>
  );
};

export default BookingTabs;
