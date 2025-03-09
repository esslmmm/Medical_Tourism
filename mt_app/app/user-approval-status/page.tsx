"use client";
import React, { useState } from "react";
<<<<<<< HEAD:mt_app/app/user-approval-status/page.tsx
import Sidebar from "../../components/user-approval-status/Sidebar";
import SearchBar from "../../components/user-approval-status/SearchBar";
import BookingTabs from "../../components/user-approval-status/BookingTabs";
=======
import Sidebar from "../../../components/user-approval-status/Sidebar";
import SearchBar from "../../../components/user-approval-status/SearchBar";
import BookingTabs from "../../../components/user-approval-status/BookingTabs";
>>>>>>> 45e1973f296fbaa0d583fb8d0646799dc1b3210b:mt_app/src/app/user-approval-status/page.tsx

const UserProfileStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"process" | "payment" | "completed">("process");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col items-center">
        <SearchBar />
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default UserProfileStatus;
