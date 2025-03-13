import React from "react";

const Calendar = () => {
  return (
    <div className="mt-4 border rounded-md shadow-sm p-4">
      <h3 className="text-md font-bold mb-2">June 2024</h3>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <div key={index} className="font-bold">{day}</div>
        ))}
        {[...Array(30)].map((_, index) => (
          <div 
            key={index} 
            className={`p-2 rounded-lg ${[24, 25, 26, 27].includes(index + 1) ? "bg-blue-300" : ""} ${index + 1 === 28 ? "bg-red-300" : ""}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
