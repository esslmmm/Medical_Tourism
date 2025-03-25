"use client";
import React, { useState } from "react";
import SearchBar from "../../../../../components/user_components/approval-status/SearchBar";
import BookingTabs from "../../../../../components/user_components/approval-status/BookingTabs";



const UserProfileStatus: React.FC = () => {
  return (
      <div className="flex-1 p-8 flex flex-col items-center">
        <SearchBar />
        <BookingTabs />
      </div>
  );
};

export default UserProfileStatus;
