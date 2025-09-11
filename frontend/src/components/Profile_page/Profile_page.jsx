import React from "react";
import LeftIcon from "../../assets/LeftIcon.png";
import avatar from "../../assets/avatar.png";
import rentmeLogo2 from "../../assets/RentMe-Logo-2.png";

export const ProfilePage = () => {
  return (
    <div className="bg-[#f5f7fa] grid justify-items-center items-start w-screen">
      <div className="bg-[#f5f7fa] overflow-hidden w-[1512px] h-[982px]">
        <div className="relative w-[281px] h-[982px] top-[5px] bg-white rounded shadow-md">
          <img
            className="absolute w-44 h-44 top-[94px] left-[68px] object-cover"
            alt="Rentme logo"
            src={rentmeLogo2}
          />

          <div className="h-[163px] top-[405px] left-[30px] absolute w-[251px]">
            <div className="absolute w-[251px] -top-px left-0 font-semibold text-neutral-500 text-base">
              Profile
            </div>

            <div className="flex h-12 items-center gap-2 top-[166px] left-0 absolute w-[251px]">
              <div className="flex flex-col items-start gap-1 relative flex-1">
                <div className="font-semibold text-neutral-800 text-base">
                  Jenny Wilson
                </div>
                <div className="font-semibold text-neutral-400 text-base">
                  jen.wilson@example.com
                </div>
              </div>
            </div>

            <img
              className="absolute w-[121px] h-[121px] top-[22px] left-[46px] object-cover"
              alt="Avatar"
              src={avatar}
            />
          </div>

          <div className="flex w-[214px] items-center justify-center gap-1 px-2 py-1.5 absolute top-[894px] left-[30px] bg-neutral-50 rounded">
            <img src={LeftIcon} alt="Logout icon" className="!relative !w-5 !h-5" />
            <div className="inline-flex items-center justify-center px-1">
              <div className="font-semibold text-neutral-800 text-base">
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
