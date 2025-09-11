import React from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import loginBackgroundDesign2 from "../assets/login-background-design-2.png";
import rupee1 from "../assets/rupee1.png"

export const PropertyDetails = () => {
    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px]">
                <div className="relative w-[1162px] h-[856px] top-[126px] left-[350px]">
                    <div className="absolute w-[1081px] h-[740px] top-0 left-0 bg-[#f2f2f2] rounded-[10px]" />

                    <p className="absolute w-[552px] top-[197px] left-[461px] aspect-[23] [font-family:'Roboto-Regular',Helvetica] font-normal text-[#b3b3b3] text-xl tracking-[0.50px] leading-6 whitespace-nowrap">
                        Electronic city street, phase I, Bengaluru, Karnataka.
                    </p>

                    <p className="absolute w-[505px] top-[273px] left-[461px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#b3b3b3] text-xl tracking-[0.50px] leading-6">
                        Spacious 2BHK Rental Property - Perfect for up to 4 Roomates. <br />
                        <br />
                        Amenities: wi-fi, washing machine, refrigerator, parking, balcony,
                        etc.
                        <br />
                        <br />
                        Nearby: Markets, grocery stores, public transport, colleges/offices.
                    </p>

                    <div className="absolute w-[99px] top-[163px] left-[475px] [font-family:'Roboto-Regular',Helvetica] font-normal text-[#b3b3b3] text-xl tracking-[0] leading-7 whitespace-nowrap">
                        1,25,000
                    </div>

                    <img
                        className="absolute w-3.5 h-[19px] top-[170px] left-[462px] bg-blend-color aspect-[0.71]"
                        alt="Rupee"
                        src={rupee1}
                    />

                    <button className="all-[unset] box-border left-[464px] bg-[#2c2c2c] flex w-[210px] h-[51px] items-center justify-center gap-2 p-3 absolute top-[532px] rounded-lg overflow-hidden border border-solid border-[#2c2c2c]">
                        <button className="all-[unset] box-border relative w-fit font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                            Find Roomates
                        </button>
                    </button>

                    <button className="all-[unset] box-border left-[720px] bg-[#009951] flex w-[210px] h-[51px] items-center justify-center gap-2 p-3 absolute top-[532px] rounded-lg overflow-hidden border border-solid border-[#2c2c2c]">
                        <button className="all-[unset] box-border relative w-fit font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                            Send Application
                        </button>
                    </button>

                    <img
                        className="w-[379px] h-[376px] top-[86px] left-[43px] aspect-[1.01] absolute object-cover"
                        alt="Image"
                        src={image1}
                    />

                    <img
                        className="w-[183px] h-[110px] top-[473px] left-[43px] aspect-[1.67] absolute object-cover"
                        alt="Image"
                        src={image2}
                    />

                    <img
                        className="w-[183px] h-[110px] top-[473px] left-[239px] aspect-[1.67] absolute object-cover"
                        alt="Image"
                        src={image3}
                    />

                    <div className="absolute w-[152px] top-[246px] left-[461px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#b3b3b3] text-xl tracking-[0.50px] leading-4">
                        DESCRIPTION
                    </div>

                    <p className="absolute w-[227px] top-[123px] left-[461px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#1e1e1e] text-xl leading-5">
                        <span className="tracking-[0]">Trinity</span>

                        <span className="text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] font-single-line-body-base [font-style:var(--single-line-body-base-font-style)] font-[number:var(--single-line-body-base-font-weight)]">
                            &nbsp;
                        </span>

                        <span className="[font-family:'Roboto-Regular',Helvetica] text-[22px] tracking-[0] leading-7">
                            Haven
                        </span>
                    </p>

                    <img
                        className="absolute w-[376px] h-[328px] top-[528px] left-[786px] aspect-[1] object-cover"
                        alt="Login background"
                        src={loginBackgroundDesign2}
                    />
                </div>
            </div>
        </div>
    );
};
