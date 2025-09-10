import React from "react";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const OtpPage = () => {
  return (
    <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
        <img
          className="absolute w-52 h-52 top-12 left-[652px] aspect-[1] object-cover"
          alt="Rentme logo"
          src={rentmeLogoTransparent1}
        />

        <button className="all-[unset] box-border absolute w-[327px] h-12 top-[737px] left-[589px] bg-skylight rounded-[48px]">
          <div className="left-[129px] text-skydark absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] text-center tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
            Continue
          </div>
        </button>

        <div className="absolute w-[327px] h-12 top-[812px] left-[589px] rounded-[48px]">
          <div className="left-[114px] text-blue-600 absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] text-center tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
            Resend code
          </div>
        </div>

        <div className="inline-flex items-start gap-4 absolute top-[408px] left-[640px]">
          <div className="relative w-12 h-12 rounded-[48px]">
            <div className="relative w-[50px] h-[50px] -top-px -left-px bg-skywhite rounded-[64px] border border-solid border-skylight">
              <div className="absolute w-4 top-4 left-4 font-regular-none-regular font-[number:var(--regular-none-regular-font-weight)] text-inkdarkest text-[length:var(--regular-none-regular-font-size)] text-center tracking-[var(--regular-none-regular-letter-spacing)] leading-[var(--regular-none-regular-line-height)] whitespace-nowrap [font-style:var(--regular-none-regular-font-style)]">
                5
              </div>
            </div>
          </div>

          <div className="relative w-12 h-12 rounded-[48px]">
            <div className="relative w-[50px] h-[50px] -top-px -left-px bg-skywhite rounded-[64px] border border-solid border-skylight">
              <div className="absolute w-4 top-4 left-4 font-regular-none-regular font-[number:var(--regular-none-regular-font-weight)] text-inkdarkest text-[length:var(--regular-none-regular-font-size)] text-center tracking-[var(--regular-none-regular-letter-spacing)] leading-[var(--regular-none-regular-line-height)] whitespace-nowrap [font-style:var(--regular-none-regular-font-style)]">
                1
              </div>
            </div>
          </div>

          <div className="relative w-12 h-12 rounded-[48px]">
            <div className="relative w-[52px] h-[52px] -top-0.5 -left-0.5 bg-skywhite rounded-[64px] border-2 border-solid border-blue-600" />
          </div>

          <div className="relative w-12 h-12 rounded-[48px]">
            <div className="relative w-[50px] h-[50px] -top-px -left-px bg-skywhite rounded-[64px] border border-solid border-skylight" />
          </div>
        </div>

        <div className="absolute w-[327px] top-[279px] left-[596px] font-title-3 font-[number:var(--title-3-font-weight)] text-inkdarkest text-[length:var(--title-3-font-size)] text-center tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)]">
          Enter authentication code
        </div>

        <p className="absolute w-[327px] top-[327px] left-[596px] [font-family:'Inter-Regular',Helvetica] font-normal text-inkdarkest text-base text-center tracking-[0] leading-6">
          <span className="font-regular-normal-regular font-[number:var(--regular-normal-regular-font-weight)] text-[#090a0a] text-[length:var(--regular-normal-regular-font-size)] tracking-[var(--regular-normal-regular-letter-spacing)] leading-[var(--regular-normal-regular-line-height)] [font-style:var(--regular-normal-regular-font-style)]">
            Enter the 4-digit that we have sent via the
            <br />
            email{" "}
          </span>

          <span className="font-regular-normal-bold font-[number:var(--regular-normal-bold-font-weight)] [font-style:var(--regular-normal-bold-font-style)] tracking-[var(--regular-normal-bold-letter-spacing)] leading-[var(--regular-normal-bold-line-height)] text-[length:var(--regular-normal-bold-font-size)]">
            sample@gmail.com
          </span>
        </p>

        <img
          className="absolute w-[421px] h-[323px] top-[659px] left-[1091px] aspect-[1] object-cover"
          alt="Login background"
          src={loginBackgroundDesign1}
        />
      </div>
    </div>
  );
};
