import React from "react";
import LeftIcon from "../../assets/LeftIcon.png";
import avatar from "../../assets/avatar.png";
import rentmeLogo2 from "../../assets/RentMe-Logo-2.png";

export const ProfilePage = () => {
  const handleLogout = () => {
    alert("Logging out..."); // Replace with your actual logout logic
  };

  return (
    <div className="h-screen w-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <div className="flex flex-col justify-between bg-white shadow-md w-72 h-full p-6">
        {/* Logo */}
        <div className="flex justify-center mt-6">
          <img
            src={rentmeLogo2}
            alt="Rentme Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">Jenny Wilson</h3>
          <p className="text-sm text-gray-500">jen.wilson@example.com</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          <img src={LeftIcon} alt="Logout icon" className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
};
