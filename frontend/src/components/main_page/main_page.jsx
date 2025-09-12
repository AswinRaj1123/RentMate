import React from "react";
import { useNavigate } from "react-router-dom";
import homeImage111 from "../../assets/home-image-1-1-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
        {/* Logo */}
        <img
          className="absolute w-[164px] h-[164px] top-[61px] left-[81px] aspect-[1] object-cover"
          alt="Rentme logo"
          src={rentmeLogoTransparent1}
        />

        {/* Heading + Subtext */}
        <div className="inline-flex flex-col gap-6 absolute top-[277px] left-[81px]">
          <p className="w-[706.25px] font-bold text-black text-[64px] leading-[normal]">
            Find Your Perfect Rental or Roommate – Simplified!
          </p>
          <p className="w-[450px] font-bold text-black text-2xl leading-[normal]">
            Join RentMate to discover properties, manage leases, and connect
            with reliable partners—all in one place.
          </p>
        </div>

        {/* Main Image */}
        <img
          className="absolute w-[483px] h-[483px] top-[244px] left-[896px] aspect-[1] object-cover"
          alt="Home illustration"
          src={homeImage111}
        />

        {/* Buttons */}
        <button
          onClick={() => navigate("/login")}
          className="w-[196px] h-[54px] absolute top-[685px] left-[366px] flex items-center justify-center bg-[#2c2c2c] text-neutral-100 text-base font-bold rounded-lg border border-solid border-[#2c2c2c]"
        >
          SIGN IN
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="w-52 h-[54px] absolute top-[685px] left-[81px] flex items-center justify-center bg-[#2c2c2c] text-neutral-100 text-base font-bold rounded-lg border border-solid border-[#2c2c2c]"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};