import React from "react";
import { motion } from "framer-motion";
import BookingTable from "./BookingTable";
import History from "./History";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface BookingTabsProps {
  activeTab: "process" | "history";
  setActiveTab: (tab: "process" | "history") => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-[30px] shadow-md border border-[#C5D1E0]">
      {/* Tab Selection */}
      <div className={`flex items-center gap-8 mb-6`} style={{fontSize: "20px"}}>
        {["process", "history"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab as "process" | "history")}
            className={`ml-5 relative px-55 py-3 rounded-[25px] font-semibold cursor-pointer transition-all ${
              activeTab === tab ? "text-white bg-blue-500 shadow-lg" : "text-gray-500"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute inset-0 rounded-[25px]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${inter.className}`}>{tab === "process" ? "In Process" : "History"}</span>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "process" ? <BookingTable /> : <History />}
      </motion.div>
    </div>
  );
};

export default BookingTabs;
