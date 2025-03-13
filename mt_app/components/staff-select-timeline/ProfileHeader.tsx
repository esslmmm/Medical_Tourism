import React from "react";

interface ProfileHeaderProps {
  tab: "service" | "user";
  setTab: (tab: "service" | "user") => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ tab, setTab }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <button className={`px-6 py-2 rounded-lg text-lg font-bold ${tab === "service" ? "bg-gray-200" : "text-gray-400"}`} onClick={() => setTab("service")}>
          Service Detail
        </button>
        <button className={`px-6 py-2 rounded-lg text-lg font-bold ${tab === "user" ? "bg-gray-200" : "text-gray-400"}`} onClick={() => setTab("user")}>
          User Detail
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <img src="/img/profile.png" alt="Staff" className="w-10 h-10 rounded-full border" />
        <p className="text-gray-700 font-bold">Elbert Einstein</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
