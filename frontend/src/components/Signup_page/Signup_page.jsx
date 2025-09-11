import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";
import flag from "../../assets/flag.png";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    occupation: "",
    option: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Phone validation (only digits, max 10)
    if (name === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle submit - Request OTP first
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, phone, password, gender, occupation, option, terms } = formData;

    // Client-side validation
    if (
      !name ||
      !email ||
      !phone ||
      phone.length !== 10 ||
      !password ||
      !gender ||
      !occupation ||
      !option ||
      !terms
    ) {
      setError("Please fill in all details correctly.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password strength validation (optional)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      
      // Step 1: Request OTP
      const response = await fetch("http://localhost:3000/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      // Step 2: Navigate to OTP page with complete form data
      // Convert option to role for backend compatibility
      const completeFormData = {
        ...formData,
        role: formData.option === "Looking" ? "Tenant" : "Landlord" // Map option to role
      };

      navigate("/otp", { 
        state: { 
          formData: completeFormData,
          email: email 
        } 
      });

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Error Message */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          className="w-full space-y-4 flex-1 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1 text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Type your First Name & Last Name here"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 text-sm">
              Email ID
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Type your Email ID here"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              disabled={loading}
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
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 py-2 focus:outline-none text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-1 text-sm"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type your Password here"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Gender & Occupation */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                disabled={loading}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">
                Occupation
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                disabled={loading}
              >
                <option value="">Occupation</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Looking or Leasing */}
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="Looking"
                checked={formData.option === "Looking"}
                onChange={handleChange}
                className="accent-blue-500"
                disabled={loading}
              />
              Looking for a Roommate?
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="Leasing"
                checked={formData.option === "Leasing"}
                onChange={handleChange}
                className="accent-blue-500"
                disabled={loading}
              />
              Leasing Out?
            </label>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mt-1 accent-blue-500"
              disabled={loading}
            />
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
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {loading ? "Sending OTP..." : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Sign In */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          Have an account?{" "}
          <span
            onClick={() => !loading && navigate("/login")}
            className={`text-blue-600 font-semibold hover:underline ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};