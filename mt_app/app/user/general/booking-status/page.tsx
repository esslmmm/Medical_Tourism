"use client";
import React, { useState } from "react";
import BookingTabs from "@/components/User/BookingStatus/BookingTabs";


const UserProfileStatus: React.FC = () => {
  return (
      <div className="flex-1 p-8 flex flex-col items-center bg-white min-h-screen">
        <BookingTabs />
      </div>
  );
};

export default UserProfileStatus;
