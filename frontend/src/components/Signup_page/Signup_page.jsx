import React from "react";
import Circle from "../../assets/circle.png";
// import Frame from "./Frame";
// import Property1Default from "./Property1Default";
// import PropertyDefaultWrapper from "./PropertyDefaultWrapper";
import image1 from "../../assets/flag.png";
import loginBackgroundDesign2 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const SignUpPage = () => {
    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
                <img
                    className="absolute w-36 h-36 top-[27px] left-[684px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogoTransparent1}
                />

                <div className="absolute w-[533px] h-[662px] top-[274px] left-[489px]">
                    <div className="absolute w-[533px] h-[662px] top-0 left-0">
                        <div className="relative h-[662px]">
                            <div className="absolute w-[533px] h-[662px] top-0 left-0">
                                <div className="h-[662px]">
                                    <div className="relative w-[535px] h-[662px]">
                                        <div className="absolute w-[535px] h-[662px] top-0 left-0">
                                            <div className="relative w-[533px] h-[662px] bg-basewhite rounded-[20px] border border-solid border-[#d1d9e6] shadow-[0px_10px_15px_#00000008,2px_4px_4px_#0000000f]">
                                                
                                                {/* Input Fields Section */}
                                                <div className="absolute w-[482px] h-[424px] top-[15px] left-[26px]">
                                                    {/* Occupation */}
                                                    <div className="flex flex-col w-[234px] h-[90px] items-start gap-2 absolute top-[334px] left-[241px]">
                                                        <div className="relative self-stretch mt-[-1.00px] font-body-base text-[#1e1e1e]">
                                                            Occupation
                                                        </div>
                                                    </div>

                                                    {/* Gender */}
                                                    <div className="w-[234px] h-[90px] top-[334px] flex flex-col items-start gap-2 absolute left-0">
                                                        <div className="relative self-stretch mt-[-1.00px] font-body-base text-[#1e1e1e]">
                                                            Gender
                                                        </div>
                                                    </div>

                                                    {/* Name */}
                                                    <div className="w-[482px] h-[89.36px] top-0 flex flex-col items-start gap-2 absolute left-0">
                                                        <label
                                                            className="relative self-stretch mt-[-1.00px] font-body-base text-[#1e1e1e]"
                                                            htmlFor="input-1"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            className="min-w-60 px-4 py-3 bg-white rounded-lg border border-solid border-[#d1d9e6]"
                                                            id="input-1"
                                                            placeholder="Type your First Name & Last Name here"
                                                            type="text"
                                                        />
                                                    </div>

                                                    {/* Email */}
                                                    <div className="w-[482px] h-[89.36px] top-[82px] flex flex-col items-start gap-2 absolute left-0">
                                                        <label
                                                            className="relative self-stretch mt-[-1.00px] font-body-base text-[#1e1e1e]"
                                                            htmlFor="input-2"
                                                        >
                                                            Email ID
                                                        </label>
                                                        <input
                                                            className="min-w-60 px-4 py-3 bg-white rounded-lg border border-solid border-[#d1d9e6]"
                                                            id="input-2"
                                                            placeholder="Type your Email ID here"
                                                            type="email"
                                                        />
                                                    </div>

                                                    {/* Password */}
                                                    <div className="w-[482px] h-[89.36px] top-[245px] flex flex-col items-start gap-2 absolute left-0">
                                                        <div className="relative self-stretch font-body-base text-[#1e1e1e]">
                                                            Password
                                                        </div>
                                                        <div className="flex min-w-60 items-center px-4 py-3 bg-white rounded-lg border border-solid border-[#d1d9e6]">
                                                            <div className="text-[#b3b3b3]">
                                                                Type your Password here
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Phone Number */}
                                                    <div className="absolute w-[482px] h-[82px] top-[163px] left-0">
                                                        <div className="relative h-[82px]">
                                                            <div className="w-[482px] flex flex-col gap-2 absolute left-0">
                                                                <div className="font-body-base text-[#1e1e1e]">
                                                                    Phone Number
                                                                </div>
                                                                <div className="flex items-center px-4 py-3 bg-white rounded-lg border border-solid border-[#d1d9e6]">
                                                                    <div className="flex-1 text-[#1e1e1e]">
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+91
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <img
                                                                className="absolute w-[34px] h-[23px] top-[37px] left-4 object-cover"
                                                                alt="flag"
                                                                src={image1}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Leasing Out Button */}
                                                <div className="inline-flex h-[38px] items-start absolute top-[444px] left-[315px] rounded-lg">
                                                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 rounded-lg overflow-hidden">
                                                        <img src={Circle} alt="circle icon" className="w-5 h-5" />
                                                        <div className="text-primary-700 text-sm">
                                                            Leasing Out?
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Terms & Conditions */}
                                                <div className="absolute w-[364px] h-[26px] top-[498px] left-[25px]">
                                                    <p className="text-sm">
                                                        <span className="text-[#080814]">I agree with the </span>
                                                        <span className="text-blue-600">Terms & Conditions</span>
                                                        <span className="text-[#080814]"> of RentMate</span>
                                                    </p>
                                                    <div className="absolute w-[19px] h-[22px] top-0 left-0 rounded-[5px] border border-solid border-blue-gray400" />
                                                </div>

                                                {/* Create Account Button */}
                                                <div className="flex w-[482px] h-[51px] items-center gap-4 absolute top-[538px] left-[25px]">
                                                    <button className="flex-1 p-3 bg-[#2e86de] rounded-lg border border-solid border-[#1b4f9b] text-white">
                                                        CREATE ACCOUNT
                                                    </button>
                                                </div>

                                                {/* Sign In Link */}
                                                <p className="absolute w-[444px] h-[26px] top-[599px] left-[43px] text-sm text-center">
                                                    <span className="text-zinc-500">Have an account? </span>
                                                    <span className="font-bold text-blue-600 cursor-pointer">
                                                        Sign in
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Unused components commented out */}
                                        {/*
                                        <div className="inline-flex items-start absolute top-[445px] left-[54px] rounded-lg">
                                            <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 rounded-lg overflow-hidden">
                                                <Property1Default className="!relative !w-5 !h-5" />
                                                <div className="text-primary-700 text-sm">
                                                    Looking for a Roomate?
                                                </div>
                                            </div>
                                        </div>

                                        <Frame
                                            className="!left-[26px] !absolute !top-[380px]"
                                            property1="default"
                                        />

                                        <PropertyDefaultWrapper
                                            className="!left-[286px] !absolute !top-[378px]"
                                            property1="default"
                                        />
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="absolute w-[636px] top-[178px] left-[437px] text-center text-5xl font-bold text-base-02">
                    Create Account
                </div>

                {/* Background Image */}
                <img
                    className="absolute w-[407px] h-[343px] top-[639px] left-[1105px] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign2}
                />
            </div>
        </div>
    );
};
