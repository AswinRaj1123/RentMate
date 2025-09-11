import React, { useState } from "react";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input automatically
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length === 4) {
      alert(`Entered OTP: ${code}`);
    } else {
      alert("Please enter a valid 4-digit code.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f7fa] relative">
      {/* Background image */}
      <img
        src={loginBackgroundDesign1}
        alt="Background"
        className="absolute bottom-0 right-0 w-80 h-auto opacity-70"
      />

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md relative z-10 text-center">
        {/* Logo */}
        <img
          src={rentmeLogoTransparent1}
          alt="Rentme Logo"
          className="mx-auto mb-6 w-32 h-32 object-contain"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Enter Authentication Code
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the 4-digit code sent to <br />
          <span className="font-bold">sample@gmail.com</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition"
        >
          Continue
        </button>

        {/* Resend Code */}
        <button className="mt-4 text-blue-600 hover:underline text-sm">
          Resend code
        </button>
      </div>
    </div>
  );
};
