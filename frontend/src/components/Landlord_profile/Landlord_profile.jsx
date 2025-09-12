import React from "react";
import rentmeLogo from "../../assets/rentme-logo-transparent-1.png";

export const LandlordProfile = () => {   // ✅ Fixed spelling
  return (
    <div className="h-screen w-64 bg-[#f9fafb] border-r border-gray-200 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <img src={rentmeLogo} alt="RentMate Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-lg font-bold text-[#1a1a1a]">RentMate</h1>
        <p className="text-xs text-gray-500">Smart Rent, More Easy</p>
      </div>

      {/* Menu */}
      <nav className="w-full px-4 space-y-2">
        {/* Active menu item */}
        <div className="flex items-center px-4 py-2 rounded-lg bg-[#e8f0fe] text-[#1a1a1a] font-medium cursor-pointer">
          <span className="mr-2">📂</span> Properties
        </div>

        {/* Other items */}
        <div className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
          <span className="mr-2">📄</span> Application
        </div>

        <div className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
          <span className="mr-2">➕</span> Add Property
        </div>
      </nav>
    </div>
  );
};
