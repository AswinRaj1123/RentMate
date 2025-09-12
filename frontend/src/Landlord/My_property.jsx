import React from "react";
import elementAvatars from "../assets/elementavatar.png";
import image from "../assets/image.png";
import loginBackgroundDesign1 from "../assets/login-background-design-1.png";

export const MyProperties = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen w-screen flex flex-col items-center relative overflow-hidden">
      
      {/* Background Image */}
      <img
        className="absolute bottom-10 right-10 w-72 md:w-96 object-cover"
        alt="Login background"
        src={loginBackgroundDesign1}
      />

      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center border-b border-[#e0e0e0] py-6 px-8">
        <h1 className="font-bold text-[#1a1a1a] text-lg md:text-xl">
          My Properties
        </h1>

        {/* Avatar */}
        <img
          src={elementAvatars}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Property Card */}
      <div className="w-full max-w-6xl flex justify-center px-6 mt-8">
        <div className="w-full bg-[#eeeeee] rounded-xl shadow-md p-6 flex gap-6 items-start">
          {/* Property Image */}
          <img
            className="w-24 h-28 md:w-32 md:h-36 object-cover rounded"
            alt="Property"
            src={image}
          />

          {/* Property Details */}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg text-black">Trinity Haven</h2>

            <div className="flex gap-4 text-sm font-medium text-black">
              <span>Pricing:</span>
              <span>₹ 1,25,000</span>
            </div>

            <p className="text-xs text-black leading-5">
              <span className="font-medium">Location: </span>
              Electronic City Phase I, Bengaluru, Karnataka
            </p>

            <p className="text-xs text-black leading-5">
              <span className="font-medium">Description: </span>
              Spacious 3-Bedroom Family Home with Large Backyard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
