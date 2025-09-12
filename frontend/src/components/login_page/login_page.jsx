import React, { useState } from "react";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess("Login successful ✅");
      localStorage.setItem("token", data.token); // Save JWT for future requests
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user info

      // 👉 Redirect to main search page
      window.location.href = "/mainsearch";

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative image */}
      <img
        className="absolute bottom-0 right-0 w-64 h-auto opacity-50 hidden lg:block xl:w-80 2xl:w-96"
        alt="Login background"
        src={loginBackgroundDesign1}
      />

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

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
        >
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1e1e1e] mb-2">
              Email ID
            </label>
            <input
              className="w-full px-4 py-3 bg-white rounded-lg border border-[#d1d9e6] text-gray-900 placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:border-transparent transition-all duration-200"
              type="email"
              placeholder="Type your Email ID here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1e1e1e] mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-white rounded-lg border border-[#d1d9e6] text-gray-900 placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:border-transparent transition-all duration-200"
              type="password"
              placeholder="Type your Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#2e86de] bg-white border border-gray-300 rounded focus:ring-[#2e86de] focus:ring-2"
              />
              <span className="text-[#1e1e1e]">Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-[#2e86de] hover:text-[#1b4f9b] transition-colors duration-200"
            >
              Forgot password?
            </a>
          </div>

          {/* Error/Success */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2e86de] hover:bg-[#1b4f9b] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2e86de] focus:ring-offset-2 mb-6"
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#2e86de] font-semibold hover:text-[#1b4f9b] transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};