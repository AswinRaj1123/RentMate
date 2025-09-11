import React from "react";
// import { Component } from "./Component";
// ❌ Wrong import, commenting out because it's not a React component
// import { ElementAvatars } from "../assets/elementavatar.png";

import image2 from "../assets/image.png";
import image3 from "../assets/home1.png";
import image4 from "../assets/home2.png";
// import image5 from "../assets/elementavatar.png";
// import image6 from "../assets/home4.png";
// import image from "../assets/home5.png";

import loginBackgroundDesign1 from "../assets/login-background-design-2.png";
import rentmeLogoTransparent1 from "../assets/rentme-logo-transparent-1.png";

export const MyProperties = () => {
    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
                {/* Sidebar */}
                <div className="absolute w-[250px] h-[897px] top-[35px] left-[26px]">
                    <div className="flex flex-col w-[250px] h-[779px] items-start pl-6 pr-[25px] py-6 absolute top-[118px] left-0 bg-[#f8f9fb] border-r [border-right-style:solid] border-[#e0e0e0]">
                        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                            <Component
                                className="!self-stretch !flex-[0_0_auto] !w-full"
                                divClassName="!mr-[unset]"
                                hover={false}
                                text="🏠"
                                text1="Properties"
                                variant="three"
                            />
                            <Component
                                className="!self-stretch !flex-[0_0_auto] !w-full"
                                divClassName="!mr-[unset]"
                                hover={false}
                                text2="📄"
                                text3="Application"
                                variant="two"
                            />
                            <Component
                                className="!self-stretch !flex-[0_0_auto] !w-full"
                                divClassName="!mr-[-13.77px]"
                                hover={false}
                                text4="💬"
                                text5="Add Property"
                                variant="four"
                            />
                        </div>
                    </div>

                    <img
                        className="absolute w-[125px] h-[125px] top-0 left-12 aspect-[1] object-cover"
                        alt="Rentme logo"
                        src={rentmeLogoTransparent1}
                    />
                </div>

                {/* First Property Card */}
                <div className="absolute w-[1209px] h-[420px] top-[562px] left-[303px]">
                    <img
                        className="absolute w-[425px] h-[382px] top-[38px] left-[784px] aspect-[1] object-cover"
                        alt="Login background"
                        src={loginBackgroundDesign1}
                    />

                    <div className="w-[1026px] top-0 left-0 absolute h-[158px]">
                        <div className="relative w-[1012px] h-[158px] bg-[#eeeeee] rounded-[14px] shadow-[0px_4px_4px_#00000040]">
                            <div className="w-[1012px] top-0 left-0 bg-[#eeeeee] rounded-[14px] shadow-[0px_4px_4px_#00000040] absolute h-[158px]" />

                            <img
                                className="absolute w-[94px] h-[106px] top-[13px] left-[23px] object-cover"
                                alt="Image"
                                src={image4}
                            />

                            {/* ❌ Commenting images that are not imported
                            <img src={image5} ... />
                            <img src={image6} ... />
                            */}

                            <div className="absolute w-[188px] top-[30px] left-[143px] text-black">
                                The Shepherd's House
                            </div>

                            <div className="absolute w-[98px] top-20 left-[142px] text-black">
                                Location
                            </div>

                            <div className="absolute w-[98px] top-[106px] left-[142px] text-[#1e1e1e]">
                                Description
                            </div>

                            <div className="absolute w-[85px] top-[58px] left-[246px] text-black">
                                ₹ 2,50,000
                            </div>

                            <div className="absolute w-[97px] top-[58px] left-[143px] text-black">
                                Pricing
                            </div>

                            <div className="absolute w-[219px] top-[81px] left-[247px] text-[10px]">
                                Electronic City, Bengaluru, Karnataka
                            </div>

                            <p className="absolute w-[280px] top-[106px] left-[247px] text-[10px]">
                                Spacious 3-Bedroom Family Home with Large Backyard
                            </p>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="absolute w-[1039px] h-[83px] top-[70px] left-[276px] border-b border-[#e0e0e0]">
                    <div className="absolute top-6 left-8 text-[#1a1a1a]">
                        My Properties
                    </div>
                </div>

                {/* ❌ Commenting out - invalid React usage
                <ElementAvatars ... />
                */}

                {/* Second Property Card */}
                <div className="w-[1026px] top-[184px] left-[303px] absolute h-[158px]">
                    <div className="relative w-[1012px] h-[158px] bg-[#eeeeee] rounded-[14px] shadow-[0px_4px_4px_#00000040]">
                        <div className="w-[1012px] top-0 left-0 bg-[#eeeeee] rounded-[14px] absolute h-[158px]" />

                        {/* ❌ Commenting out undefined "image"
                        <img src={image} ... />
                        */}

                        <div className="absolute w-[141px] top-[30px] left-[143px] text-black">
                            Trinity Haven
                        </div>

                        <div className="absolute w-[98px] top-20 left-[142px] text-black">
                            Location
                        </div>

                        <div className="absolute w-[98px] top-[106px] left-[142px] text-[#1e1e1e]">
                            Description
                        </div>

                        <div className="absolute w-[85px] top-[58px] left-[246px] text-black">
                            ₹ 1,25,000
                        </div>

                        <div className="absolute w-[97px] top-[58px] left-[143px] text-black">
                            Pricing
                        </div>

                        <p className="absolute w-[219px] top-[81px] left-[247px] text-[10px]">
                            Electronic City Phase I, Bengaluru, Karnataka
                        </p>

                        <p className="absolute w-[280px] top-[106px] left-[247px] text-[10px]">
                            Spacious 3-Bedroom Family Home with Large Backyard
                        </p>
                    </div>
                </div>

                {/* Third Property Card */}
                <div className="w-[1026px] top-[373px] left-[303px] absolute h-[158px]">
                    <div className="relative w-[1012px] h-[158px] bg-[#eeeeee] rounded-[14px] shadow-[0px_4px_4px_#00000040]">
                        <div className="w-[1012px] top-0 left-0 bg-[#eeeeee] rounded-[14px] absolute h-[158px]" />

                        <img
                            className="absolute w-[94px] h-[106px] top-[13px] left-[23px] object-cover"
                            alt="Image"
                            src={image2}
                        />

                        <img
                            className="absolute w-[94px] h-[106px] top-[11px] left-[23px] object-cover"
                            alt="Image"
                            src={image3}
                        />

                        <div className="absolute w-[141px] top-[30px] left-[143px] text-black">
                            Bethel house
                        </div>

                        <div className="absolute w-[98px] top-20 left-[142px] text-black">
                            Location
                        </div>

                        <div className="absolute w-[98px] top-[106px] left-[142px] text-[#1e1e1e]">
                            Description
                        </div>

                        <div className="absolute w-[85px] top-[58px] left-[246px] text-black">
                            ₹ 2,50,000
                        </div>

                        <div className="absolute w-[97px] top-[58px] left-[143px] text-black">
                            Pricing
                        </div>

                        <div className="absolute w-[219px] top-[81px] left-[247px] text-[10px]">
                            Attibele, Bengaluru, Karnataka
                        </div>

                        <p className="absolute w-[280px] top-[106px] left-[247px] text-[10px]">
                            Spacious 3-Bedroom Family Home with Large Backyard
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
