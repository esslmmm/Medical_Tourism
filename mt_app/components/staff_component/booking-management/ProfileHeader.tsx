import React from "react";

const ProfileHeader = () => {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4">
      {/* ✅ Logo on the Left */}
      <img src="/img/Logo_staff.png" alt="Logo" className="w-24 h-auto" />

      {/* ✅ Profile on the Right */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <h3 className="font-semibold text-gray-900">Ekkarat Singhala</h3>
          <p className="text-gray-500 text-sm">Junior Staff</p>
        </div>
        <img
          src="/img/profile.png"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
