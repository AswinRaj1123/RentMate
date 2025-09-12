import React from "react";
import { Component } from "./Component";
import { ElementAvatars } from "./ElementAvatars";
import { PropertyDefaultWrapper } from "./PropertyDefaultWrapper";
import loginBackgroundDesign1 from "./login-background-design-1.png";

export const Box = () => {
    return (
        <div className="w-[1512px] h-[982px]">
            <div className="fixed w-[1512px] h-[982px] top-0 left-0">
                <div className="relative h-[982px]">
                    <div className="absolute w-[1512px] h-[982px] top-0 left-0 bg-[#f5f7fa]">
                        <div className="flex w-[1046px] h-[58px] items-start justify-center absolute top-[175px] left-[344px]">
                            <div className="flex flex-col w-[269.75px] items-start pt-4 pb-[17px] px-4 relative self-stretch border-b [border-bottom-style:solid] border-[#e0e0e0]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#666666] text-[15.6px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Tenant
                                </div>
                            </div>

                            <div className="flex flex-col w-[265.53px] items-start pt-4 pb-[17px] px-4 relative self-stretch border-b [border-bottom-style:solid] border-[#e0e0e0]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-cell font-[number:var(--semantic-cell-font-weight)] text-[#666666] text-[length:var(--semantic-cell-font-size)] tracking-[var(--semantic-cell-letter-spacing)] leading-[var(--semantic-cell-line-height)] whitespace-nowrap [font-style:var(--semantic-cell-font-style)]">
                                    Property
                                </div>
                            </div>

                            <div className="flex flex-col w-[203.42px] items-start pt-4 pb-[17px] px-4 relative self-stretch border-b [border-bottom-style:solid] border-[#e0e0e0]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-cell font-[number:var(--semantic-cell-font-weight)] text-[#666666] text-[length:var(--semantic-cell-font-size)] tracking-[var(--semantic-cell-letter-spacing)] leading-[var(--semantic-cell-line-height)] whitespace-nowrap [font-style:var(--semantic-cell-font-style)]">
                                    Application Date
                                </div>
                            </div>

                            <div className="w-[157.3px] relative self-stretch border-b [border-bottom-style:solid] border-[#e0e0e0]" />
                        </div>

                        <div className="top-[233px] left-[344px] flex w-[1046px] h-[102px] items-start justify-center absolute">
                            <div className="w-[269.75px] items-center gap-3 px-4 py-[24.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="flex w-10 h-10 items-center justify-center pt-[8.5px] pb-[9.5px] px-0 relative bg-[#c3c9d6] rounded-[20px]">
                                    <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-[10px] relative w-fit text-white tracking-[0] leading-[normal] whitespace-nowrap">
                                        👤
                                    </div>
                                </div>

                                <div className="text-[15.6px] relative w-fit [font-family:'Roboto-Regular',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Jacob Jones
                                </div>
                            </div>

                            <div className="flex-col w-[265.53px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Regular',Helvetica] font-normal text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Greenview Apartments
                                </div>
                            </div>

                            <div className="flex-col w-[203.42px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    April 15, 2024
                                </div>
                            </div>

                            <div className="flex-col w-[157.3px] items-start px-4 py-[28.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <Component
                                    className="!flex-[0_0_auto]"
                                    hover={false}
                                    text="Accept"
                                    variant="one"
                                />
                            </div>
                        </div>

                        <div className="top-[335px] left-[344px] flex w-[1046px] h-[102px] items-start justify-center absolute">
                            <div className="w-[269.75px] items-center gap-3 px-4 py-[24.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="flex w-10 h-10 items-center justify-center pt-[8.5px] pb-[9.5px] px-0 relative bg-[#c3c9d6] rounded-[20px]">
                                    <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-[10px] relative w-fit text-white tracking-[0] leading-[normal] whitespace-nowrap">
                                        👤
                                    </div>
                                </div>

                                <div className="text-[length:var(--semantic-data-font-size)] relative w-fit font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    Arlene McCoy
                                </div>
                            </div>

                            <div className="flex-col w-[265.53px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Regular',Helvetica] font-normal text-[#333333] text-[15.6px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Downtown Loft
                                </div>
                            </div>

                            <div className="flex-col w-[203.42px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    April 12, 2024
                                </div>
                            </div>

                            <div className="flex-col w-[157.3px] items-start px-4 py-[28.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <Component
                                    className="!flex-[0_0_auto]"
                                    hover={false}
                                    text="Accept"
                                    variant="one"
                                />
                            </div>
                        </div>

                        <div className="top-[437px] left-[344px] flex w-[1046px] h-[102px] items-start justify-center absolute">
                            <div className="w-[269.75px] items-center gap-3 px-4 py-[24.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="flex w-10 h-10 items-center justify-center pt-[8.5px] pb-[9.5px] px-0 relative bg-[#c3c9d6] rounded-[20px]">
                                    <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-[10px] relative w-fit text-white tracking-[0] leading-[normal] whitespace-nowrap">
                                        👤
                                    </div>
                                </div>

                                <div className="text-[length:var(--semantic-data-font-size)] relative w-fit font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    Albert Flores
                                </div>
                            </div>

                            <div className="flex-col w-[265.53px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    Pine Street House
                                </div>
                            </div>

                            <div className="flex-col w-[203.42px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                    April 10, 2024
                                </div>
                            </div>

                            <div className="flex-col w-[157.3px] items-start px-4 py-[28.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                <PropertyDefaultWrapper
                                    className="!flex-[0_0_auto]"
                                    property1="default"
                                />
                            </div>
                        </div>

                        <div className="absolute w-[1168px] h-[443px] top-[539px] left-[344px]">
                            <div className="top-0 left-0 flex w-[1046px] h-[102px] items-start justify-center absolute">
                                <div className="w-[269.75px] items-center gap-3 px-4 py-[24.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                    <div className="flex w-10 h-10 items-center justify-center pt-[8.5px] pb-[9.5px] px-0 relative bg-[#c3c9d6] rounded-[20px]">
                                        <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-[10px] relative w-fit text-white tracking-[0] leading-[normal] whitespace-nowrap">
                                            👤
                                        </div>
                                    </div>

                                    <div className="text-[length:var(--semantic-data-font-size)] relative w-fit font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                        Kathryn Murphy
                                    </div>
                                </div>

                                <div className="flex-col w-[265.53px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                    <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                        Lakeside Condo
                                    </div>
                                </div>

                                <div className="flex-col w-[203.42px] items-start pt-[35.5px] pb-[36.5px] px-4 flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                    <div className="relative w-fit mt-[-1.00px] font-semantic-data font-[number:var(--semantic-data-font-weight)] text-[#333333] text-[length:var(--semantic-data-font-size)] tracking-[var(--semantic-data-letter-spacing)] leading-[var(--semantic-data-line-height)] whitespace-nowrap [font-style:var(--semantic-data-font-style)]">
                                        April 8, 2024
                                    </div>
                                </div>

                                <div className="flex-col w-[157.3px] items-start px-4 py-[28.5px] flex relative self-stretch border-b [border-bottom-style:solid] border-[#eaeaea]">
                                    <PropertyDefaultWrapper
                                        className="!flex-[0_0_auto]"
                                        property1="default"
                                    />
                                </div>
                            </div>

                            <img
                                className="absolute w-[425px] h-[382px] top-[61px] left-[743px] aspect-[1] object-cover"
                                alt="Login background"
                                src={loginBackgroundDesign1}
                            />
                        </div>

                        <div className="flex w-[1108px] items-center gap-[60px] pt-6 pb-[26px] px-8 absolute top-[70px] left-[278px] border-b [border-bottom-style:solid] border-[#e0e0e0]">
                            <div className="relative w-fit mt-[-1.00px] font-roboto-bold font-[number:var(--roboto-bold-font-weight)] text-[#1a1a1a] text-[length:var(--roboto-bold-font-size)] tracking-[var(--roboto-bold-letter-spacing)] leading-[var(--roboto-bold-line-height)] whitespace-nowrap [font-style:var(--roboto-bold-font-style)]">
                                View Applications
                            </div>
                        </div>
                    </div>

                    <ElementAvatars className="!h-[54px] !absolute bg-[url(/image.png)] !left-[1407px] !w-[52px] !top-[76px]" />
                </div>
            </div>
        </div>

);
};
