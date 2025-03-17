import React from "react";

const ProfileHeader = () => {
  return (
    <div className="flex justify-end items-center gap-3">
      <img src="/img/profile.png" alt="Profile" className="w-12 h-12 rounded-full border-2 border-gray-300" />
      <div className="text-right">
        <h3 className="font-bold">Ekkarat Singhala</h3>
        <p className="text-gray-500 text-sm">Senior Admin</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
