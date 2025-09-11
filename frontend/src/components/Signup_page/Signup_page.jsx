import React from "react";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";
import flag from "../../assets/flag.png";

export const SignUpPage = () => {
  return (
    <div className="bg-[#f5f7fa] h-screen w-screen flex items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 flex flex-col items-center">
        
        {/* Logo */}
        <img
          src={rentmeLogoTransparent1}
          alt="RentMate Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
        />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {/* Form */}
        <form className="w-full space-y-4 flex-1 flex flex-col justify-center">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1 text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Type your First Name & Last Name here"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 text-sm">
              Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder="Type your Email ID here"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-1 text-sm">
              Phone Number
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <img src={flag} alt="flag" className="w-6 h-4 mr-2" />
              <span className="mr-2 text-sm">+91</span>
              <input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                className="flex-1 py-2 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Type your Password here"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          {/* Gender & Occupation */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">Gender</label>
              <select className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">Occupation</label>
              <select className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                <option>Occupation</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Looking or Leasing */}
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="option" className="accent-blue-500" />
              Looking for a Roommate?
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="option" className="accent-blue-500" />
              Leasing Out?
            </label>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-blue-500" />
            <span>
              I agree with the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              of RentMate
            </span>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Sign In */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          Have an account?{" "}
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
