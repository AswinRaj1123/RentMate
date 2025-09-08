import React from "react";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative image - positioned responsively */}
            <img
                className="absolute bottom-0 right-0 w-64 h-auto opacity-50 hidden lg:block xl:w-80 2xl:w-96"
                alt="Login background"
                src={loginBackgroundDesign1}
            />
            
            {/* Main content container */}
            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        className="w-24 h-24 mx-auto mb-6 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                        alt="Rentme logo"
                        src={rentmeLogoTransparent1}
                    />
                    <h1 className="text-2xl font-bold text-[#1e1e1e] mb-2 sm:text-3xl lg:text-4xl">
                        Sign in to your account
                    </h1>
                </div>

                {/* Login Form Container */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                    {/* Email Field */}
                    <div className="mb-6">
                        <label
                            className="block text-sm font-medium text-[#1e1e1e] mb-2"
                            htmlFor="email-input"
                        >
                            Email ID
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-white rounded-lg border border-[#d1d9e6] text-gray-900 placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:border-transparent transition-all duration-200"
                            id="email-input"
                            placeholder="Type your Email ID here"
                            type="email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label
                            className="block text-sm font-medium text-[#1e1e1e] mb-2"
                            htmlFor="password-input"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 bg-white rounded-lg border border-[#d1d9e6] text-gray-900 placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:border-transparent transition-all duration-200"
                                id="password-input"
                                placeholder="Type your Password here"
                                type="password"
                            />
                        </div>
                    </div>

                    {/* Remember me and Forgot password */}
                    <div className="flex items-center justify-between mb-6 text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-[#2e86de] bg-white border border-gray-300 rounded focus:ring-[#2e86de] focus:ring-2"
                            />
                            <span className="text-[#1e1e1e]">Remember me</span>
                        </label>
                        <a
                            href="#"
                            className="text-[#2e86de] hover:text-[#1b4f9b] transition-colors duration-200"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button className="w-full bg-[#2e86de] hover:bg-[#1b4f9b] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:ring-offset-2 mb-6">
                        SIGN IN
                    </button>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="text-[#2e86de] font-semibold hover:text-[#1b4f9b] transition-colors duration-200"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

            {/* Additional decorative elements for larger screens */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-[#2e86de] opacity-10 rounded-full hidden xl:block"></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#2e86de] opacity-10 rounded-full hidden xl:block"></div>
        </div>
    );
};