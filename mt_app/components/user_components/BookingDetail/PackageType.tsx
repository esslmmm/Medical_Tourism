import React from "react";

const PackageType = () => {
  return (
    <div className="bg-white p-6 rounded-[20px] shadow-md mb-4 flex justify-between border border-[#C5D1E0]">
      <span className="font-bold text-lg">Package Type: Medical Tourism (half-trip)</span>
      <div className="flex gap-2">
        <button className="bg-[#FF0707] text-white px-4 py-1 rounded-[20px] shadow-lg">Cancel the Booking</button>
        <button className="bg-[#639755] text-white px-4 py-1 rounded-[20px] shadow-lg">Can not be edited</button>
      </div>
    </div>
  );
};

export default PackageType;
