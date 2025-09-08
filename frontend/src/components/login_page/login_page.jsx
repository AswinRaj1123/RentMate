import React from "react";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const LoginPage = () => {
    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
                <img
                    className="absolute w-[210px] h-[210px] top-[62px] left-[651px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogoTransparent1}
                />

                <div className="absolute w-[458px] h-[417px] top-[436px] left-[529px]">
                    <div className="relative w-[462px] h-[425px] -left-0.5 bg-[url(/rectangle-3.svg)] bg-[100%_100%]">
                        <p className="absolute w-[253px] h-6 top-[365px] left-[103px] [font-family:'Poppins-Regular',Helvetica] font-normal text-transparent text-sm text-center tracking-[0] leading-[22px] whitespace-nowrap">
                            <span className="text-zinc-500 font-regular-13px [font-style:var(--regular-13px-font-style)] font-[number:var(--regular-13px-font-weight)] tracking-[var(--regular-13px-letter-spacing)] leading-[var(--regular-13px-line-height)] text-[length:var(--regular-13px-font-size)]">
                                Don&#39;t have an account?{" "}
                            </span>

                            <span className="font-bold-13px font-[number:var(--bold-13px-font-weight)] text-blue-600 [font-style:var(--bold-13px-font-style)] tracking-[var(--bold-13px-letter-spacing)] leading-[var(--bold-13px-line-height)] text-[length:var(--bold-13px-font-size)]">
                                Sign up
                            </span>
                        </p>

                        <div className="absolute w-[134px] top-[245px] left-[296px] font-regular-13px font-[number:var(--regular-13px-font-weight)] text-base-02 text-[length:var(--regular-13px-font-size)] tracking-[var(--regular-13px-letter-spacing)] leading-[var(--regular-13px-line-height)] whitespace-nowrap [font-style:var(--regular-13px-font-style)]">
                            Forgot password?
                        </div>

                        <div className="absolute w-36 h-6 top-[245px] left-7">
                            <div className="absolute w-28 top-0 left-[30px] font-regular-13px font-[number:var(--regular-13px-font-weight)] text-base-02 text-[length:var(--regular-13px-font-size)] tracking-[var(--regular-13px-letter-spacing)] leading-[var(--regular-13px-line-height)] whitespace-nowrap [font-style:var(--regular-13px-font-style)]">
                                Remember me
                            </div>

                            <div className="absolute w-5 h-[21px] top-0 left-0 rounded-[5px] border border-solid border-blue-gray400" />
                        </div>

                        <div className="flex w-[402.6px] h-[43px] items-center gap-4 absolute top-[301px] left-7">
                            <button className="all-[unset] box-border flex items-center justify-center gap-2 p-3 relative flex-1 grow bg-[#2e86de] rounded-lg overflow-hidden border border-solid border-[#1b4f9b]">
                                <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                                    SIGN IN
                                </button>
                            </button>
                        </div>

                        <div className="flex flex-col w-[403px] h-[76.02px] items-start gap-2 absolute top-12 left-7">
                            <label
                                className="relative self-stretch mt-[-1.00px] font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]"
                                htmlFor="input-1"
                            >
                                Email ID
                            </label>

                            <input
                                className="min-w-60 px-4 py-3 relative self-stretch w-full ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d1d9e6] flex-1 mt-[-0.50px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]"
                                id="input-1"
                                placeholder="Type your Email ID here"
                                type="email"
                            />
                        </div>

                        <div className="flex flex-col w-[403px] h-[76.02px] items-start gap-2 absolute top-[147px] left-7">
                            <div className="relative self-stretch mt-[-1.00px] font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                                Password
                            </div>

                            <div className="flex min-w-60 items-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d1d9e6]">
                                <div className="relative flex-1 mt-[-0.50px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                                    Type your Password here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="absolute w-[636px] top-[316px] left-[438px] font-bold-52px font-[number:var(--bold-52px-font-weight)] text-base-02 text-[length:var(--bold-52px-font-size)] text-center tracking-[var(--bold-52px-letter-spacing)] leading-[var(--bold-52px-line-height)] [font-style:var(--bold-52px-font-style)]">
                    Sign in to your account
                </p>

                <img
                    className="absolute w-[421px] h-[340px] top-[642px] left-[1091px] aspect-[1] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign1}
                />
            </div>
        </div>
    );
};
