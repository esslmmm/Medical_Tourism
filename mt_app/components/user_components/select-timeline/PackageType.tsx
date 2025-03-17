import React from "react";

const PackageType = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 flex justify-between">
      <span className="font-bold text-lg">Package Type: Medical Tourism (half-trip)</span>
      <div className="flex gap-2">
        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Cancel the Booking</button>
        <button className="bg-yellow-400 text-white px-4 py-1 rounded-lg">Can not be edited</button>
      </div>
    </div>
  );
};

export default PackageType;
