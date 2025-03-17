import React from "react";

interface TimelineSelectorProps {
  selectedDay: 1 | 2 | 3 | "all";
  setSelectedDay: React.Dispatch<React.SetStateAction<1 | 2 | 3 | "all">>;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ selectedDay, setSelectedDay }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 className="text-xl font-bold mb-3">Timeline</h2>
      <div className="flex gap-3">
        {/* ✅ Corrected `.map()` function */}
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-lg ${selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedDay(day as 1 | 2 | 3)} // ✅ Explicitly cast day
          >
            Day {day}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded-lg ${selectedDay === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedDay("all")}
        >
          All Trip
        </button>
      </div>
    </div>
  );
};

export default TimelineSelector;
