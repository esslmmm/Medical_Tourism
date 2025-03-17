import React from "react";

interface ProfileHeaderProps {
  tab: "service" | "user";
  setTab: (tab: "service" | "user") => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ tab, setTab }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <button 
          className={`px-6 py-2 rounded-lg text-lg font-bold ${tab === "service" ? "bg-gray-200" : "text-gray-400"}`} 
          onClick={() => setTab("service")}
        >
          Service Detail
        </button>
        <button 
          className={`px-6 py-2 rounded-lg text-lg font-bold ${tab === "user" ? "bg-gray-200" : "text-gray-400"}`} 
          onClick={() => setTab("user")}
        >
          User Detail
        </button>
      </div>

      {/* ✅ Profile Image and Name - Added Back */}
      <div className="flex items-center space-x-3">
        <img 
          src="/img/profile.png"  // Change this to the correct image path
          alt="Admin" 
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <p className="text-gray-800 font-bold text-lg">Ekkarat Singkhala</p>
          <p className="text-gray-500 text-sm">Senior Admin</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
