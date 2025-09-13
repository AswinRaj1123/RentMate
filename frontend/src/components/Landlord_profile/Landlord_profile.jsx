import React from "react";
import { useNavigate } from "react-router-dom";
import rentmeLogo from "../../assets/rentme-logo-transparent-1.png";

export const LandlordProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // clear all user data
    navigate("/login");   // redirect to login page
  };

  return (
    <div className="h-screen w-64 bg-[#f9fafb] border-r border-gray-200 flex flex-col justify-between items-center py-6 fixed top-0 left-0 z-30">
      
      {/* Top Section: Logo + Menu */}
      <div className="w-full flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <img src={rentmeLogo} alt="RentMate Logo" className="w-16 h-16 mb-2" />
        </div>

        {/* Menu */}
        <nav className="w-full px-4 space-y-2">
          <button
            onClick={() => navigate("/MyProperties")}
            className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
          >
            <span className="mr-2">📂</span> Properties
          </button>

          <button
            onClick={() => navigate("/ViewApplication")}
            className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
          >
            <span className="mr-2">📄</span> Application
          </button>

          <button
            onClick={() => navigate("/addproperty")}
            className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
          >
            <span className="mr-2">➕</span> Add Property
          </button>
        </nav>
      </div>

      {/* ✅ Bottom Section: Logout */}
      <div className="w-full px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-red-100 text-red-600 transition"
        >
          <span className="mr-2">🚪</span> Logout
        </button>
      </div>
    </div>
  );
};