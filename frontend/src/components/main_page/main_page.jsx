import React from "react";
import { useNavigate } from "react-router-dom";
import homeImage111 from "../../assets/home-image-1-1-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f7fa] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-[#f5f7fa] w-full max-w-7xl relative">
        {/* Logo */}
        <img
          className="w-32 h-32 md:w-40 md:h-40 mb-8 object-cover"
          alt="Rentme logo"
          src={rentmeLogoTransparent1}
        />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            {/* Heading + Subtext */}
            <p className="font-bold text-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
              Find Your Perfect Rental or Roommate – Simplified!
            </p>
            <p className="font-bold text-black text-lg md:text-xl lg:text-2xl leading-normal max-w-md">
              Join RentMate to discover properties, manage leases, and connect
              with reliable partners—all in one place.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-3 bg-[#2c2c2c] text-neutral-100 text-base font-bold rounded-lg border border-solid border-[#2c2c2c] hover:bg-[#1a1a1a] transition-colors"
              >
                SIGN UP
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-[#2c2c2c] text-neutral-100 text-base font-bold rounded-lg border border-solid border-[#2c2c2c] hover:bg-[#1a1a1a] transition-colors"
              >
                SIGN IN
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center">
            <img
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover"
              alt="Home illustration"
              src={homeImage111}
            />
          </div>
        </div>
      </div>
    </div>
  );
};