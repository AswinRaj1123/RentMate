import React from "react";
// import { Component } from "./Component";
import image from "../assets/image.png";

export const AdminPage = () => {
    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px]">
                <div className="relative w-[369px] h-[231px] top-[115px] left-[305px]">
                    <div className="absolute w-[369px] h-[231px] top-0 left-0">
                        <div className="relative w-[375px] h-[231px]">
                            <div className="absolute w-[375px] h-[231px] top-0 left-0">
                                <div className="relative w-[365px] h-[231px] bg-[#eeeeee] rounded-[14px] shadow-[0px_4px_4px_#00000040]">
                                    <img
                                        className="absolute w-[94px] h-[106px] top-[11px] left-[23px] object-cover"
                                        alt="Image"
                                        src={image}
                                    />

                                    <div className="absolute w-[141px] h-[61px] top-7 left-[143px]">
                                        <div className="absolute w-[141px] top-0 left-0 font-m3-body-large font-[number:var(--m3-body-large-font-weight)] text-black text-[length:var(--m3-body-large-font-size)] tracking-[var(--m3-body-large-letter-spacing)] leading-[var(--m3-body-large-line-height)] [font-style:var(--m3-body-large-font-style)]">
                                            Trinity Haven
                                        </div>

                                        <div className="absolute w-[85px] top-[37px] left-14 font-m3-body-medium font-[number:var(--m3-body-medium-font-weight)] text-black text-[length:var(--m3-body-medium-font-size)] tracking-[var(--m3-body-medium-letter-spacing)] leading-[var(--m3-body-medium-line-height)] whitespace-nowrap [font-style:var(--m3-body-medium-font-style)]">
                                            ₹ 1,25,000
                                        </div>

                                        <div className="absolute w-[50px] top-[37px] left-0 font-m3-body-medium font-[number:var(--m3-body-medium-font-weight)] text-black text-[length:var(--m3-body-medium-font-size)] tracking-[var(--m3-body-medium-letter-spacing)] leading-[var(--m3-body-medium-line-height)] [font-style:var(--m3-body-medium-font-style)]">
                                            Pricing
                                        </div>
                                    </div>

                                    <div className="absolute w-[73px] top-[119px] left-[23px] font-m3-body-medium font-[number:var(--m3-body-medium-font-weight)] text-black text-[length:var(--m3-body-medium-font-size)] tracking-[var(--m3-body-medium-letter-spacing)] leading-[var(--m3-body-medium-line-height)] [font-style:var(--m3-body-medium-font-style)]">
                                        Location
                                    </div>

                                    <div className="absolute w-[77px] top-[155px] left-[23px] font-m3-body-medium font-[number:var(--m3-body-medium-font-weight)] text-[#1e1e1e] text-[length:var(--m3-body-medium-font-size)] tracking-[var(--m3-body-medium-letter-spacing)] leading-[var(--m3-body-medium-line-height)] [font-style:var(--m3-body-medium-font-style)]">
                                        Description
                                    </div>
                                </div>
                            </div>

                            <p className="absolute w-[219px] top-[121px] left-[105px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-[10px] tracking-[0.25px] leading-5 whitespace-nowrap">
                                Electronic City Phase I, Bengaluru, Karnataka
                            </p>

                            <p className="absolute w-[219px] top-[155px] left-[105px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-[10px] tracking-[0.25px] leading-5">
                                Spacious 3-Bedroom Family Home with Large Backyard
                            </p>
                        </div>
                    </div>

                    {/* <Component className="!absolute !left-[309px] !top-[26px]" /> */}
                </div>
            </div>
        </div>
    );
};
