import React, { useEffect, useState } from 'react';
import { PackageBooking, user } from '@/types/Booking';

interface MedicalServiceCardProps {
  data: PackageBooking | null;
  user?: user | null;
}

const UserDetail: React.FC<MedicalServiceCardProps> = ({ data, user }) => {

  // const formatDate = (dateString: string) => {
  //   if (!dateString) return "Invalid Date";
  //   const date = new Date(dateString);
  //   if (isNaN(date.getTime())) return "Invalid Date";

  //   return date.toLocaleDateString("en-GB", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md  border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-semibold">Booking Details</h2>
        </div>

       <div className=" rounded-2xl shadow-md p-6">

  {/* 2-Column Responsive Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* Left Column — Customer Info */}
    <div className="space-y-6 ">
      <h3 className="text-xl font-semibold text-emerald-600 mb-4 pb-3 border-b border-gray-300">User Info</h3>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-600">User Name</p>
        <p className="text-lg text-gray-800">
          {user?.name || "N/A"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-600">Booking ID</p>
        <p className="text-lg text-gray-800">
          {data?.booking_id ?? "N/A"}
        </p>
      </div>
    </div>

    {/* Right Column — Contact Detail */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-emerald-600 mb-4 pb-3 border-b border-gray-300">Contact Details</h3>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-600">Contact Name</p>
        <p className="text-lg text-gray-800">
          {data?.user_contact_detail
            ? `${data.user_contact_detail.firstname} ${data.user_contact_detail.lastname}`
            : "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600">Email</p>
          <p className="text-lg text-gray-800">
            {data?.user_contact_detail?.email ?? "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600">Phone</p>
          <p className="text-lg text-gray-800">
            {data?.user_contact_detail?.phone ?? "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600">Country</p>
          <p className="text-lg text-gray-800">
            {data?.user_contact_detail?.country ?? "N/A"}
          </p>
        </div>

      </div>
    </div>

  </div>
</div>


      </div>

    </div>
  );
};

export default UserDetail;
