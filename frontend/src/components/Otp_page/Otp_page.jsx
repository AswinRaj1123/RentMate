import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Get form data and email from navigation state
  const formData = location.state?.formData;
  const email = location.state?.email || formData?.email;

  // Redirect if no form data
  useEffect(() => {
    if (!formData || !email) {
      navigate("/signup");
    }
  }, [formData, email, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

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

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    
    if (code.length !== 4) {
      setError("Please enter a valid 4-digit code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Step 1: Verify OTP
      const otpResponse = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(otpData.error || "OTP verification failed");
      }

      // Step 2: Create user account after successful OTP verification
      const userResponse = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          gender: formData.gender,
          occupation: formData.occupation,
          role: formData.role, // This comes from the mapped option in SignUpPage
        }),
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to create account");
      }

      // Success - navigate to login or dashboard
      alert("Account created successfully! Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP");
      }

      // Clear OTP inputs and start cooldown
      setOtp(["", "", "", ""]);
      setResendCooldown(60); // 60 second cooldown
      alert("New OTP sent successfully!");

    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  // Don't render if no form data
  if (!formData || !email) {
    return null;
  }

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
          <span className="font-bold">{email}</span>
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

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
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={loading}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || otp.join("").length !== 4}
          className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>

        {/* Resend Code */}
        <button
          onClick={handleResendOtp}
          disabled={resendLoading || resendCooldown > 0}
          className="mt-4 text-blue-600 hover:underline text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {resendLoading
            ? "Sending..."
            : resendCooldown > 0
            ? `Resend code in ${resendCooldown}s`
            : "Resend code"
          }
        </button>

        {/* Back to signup */}
        <button
          onClick={() => !loading && navigate("/signup")}
          disabled={loading}
          className="mt-2 block mx-auto text-gray-500 hover:text-gray-700 text-sm disabled:cursor-not-allowed"
        >
          ← Back to signup
        </button>
      </div>
    </div>
  );
};