import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import { PackageBooking, user } from '@/types/Booking';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MedicalServiceCardProps {
  data: PackageBooking | null;
  user?: user | null;
}

const UserDetail: React.FC<MedicalServiceCardProps> = ({data, user}) => {

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
   <div className={`${inter.className} mb-6`}>
  <h2 className="ml-2 text-2xl font-bold mb-4 text-gray-800">Booking Detail</h2>

  <div className="border border-[#C5D1E0] w-full max-w-[850px] p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all">
    <div className="flex flex-col md:flex-row gap-12">
      {/* Left Column — Customer Info */}
      <div className="space-y-5">
        <div>
          <p className="text-md font-semibold text-gray-600">Customer Name</p>
          <p className="text-lg font-medium text-gray-800">
            {user?.name || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-600">Booking ID</p>
          <p className="text-lg font-medium text-gray-800">
            {data?.booking_id ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Right Column — Contact Detail */}
      <div className="flex-1 space-y-5">
        <div>
          <p className="text-md font-semibold text-gray-600">Contact Name</p>
          <p className="text-lg font-medium text-gray-800">
            {data?.user_contact_detail
              ? `${data.user_contact_detail.firstname} ${data.user_contact_detail.lastname}`
              : "N/A"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10">
          <div>
            <p className="text-md font-semibold text-gray-600">Phone</p>
            <p className="text-lg font-medium text-gray-800">
              {data?.user_contact_detail?.phone ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-md font-semibold text-gray-600">Country</p>
            <p className="text-lg font-medium text-gray-800">
              {data?.user_contact_detail?.country ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default UserDetail;
