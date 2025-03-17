import React from "react";
import BookingTable from "./BookingTable";
import History from "./History";

interface BookingTabsProps {
  activeTab: "process" | "history";
  setActiveTab: (tab: "process" | "history") => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <div className="flex gap-5 text-lg font-semibold cursor-pointer border-b">
        <span onClick={() => setActiveTab("process")} className={activeTab === "process" ? "text-blue-500 border-b-2 border-blue-500 pb-2" : "text-gray-500"}>In Process</span>
        <span onClick={() => setActiveTab("history")} className={activeTab === "history" ? "text-blue-500 border-b-2 border-blue-500 pb-2" : "text-gray-500"}>History</span>
      </div>

      {activeTab === "process" ? <BookingTable /> : <History />}
    </div>
  );
};

export default BookingTabs;
