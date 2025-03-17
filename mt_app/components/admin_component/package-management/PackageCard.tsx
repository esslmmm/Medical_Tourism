import React from "react";

const PackageCard: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition hover:scale-105">
      <img src="/img/package.png" alt="Package" className="w-full h-40 object-cover rounded-md" />
      <h4 className="text-lg font-bold mt-2">Package Name</h4>
      <p className="text-gray-600 text-sm">Package description...</p>
      <p className="text-red-500 text-sm font-bold mt-2">Expired Date</p>
    </div>
  );
};

export default PackageCard;
