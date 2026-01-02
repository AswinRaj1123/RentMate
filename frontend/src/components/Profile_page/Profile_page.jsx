import React, { useState, useEffect } from "react";
import LeftIcon from "../../assets/LeftIcon.png";
import avatar from "../../assets/avatar.png";
import rentmeLogo2 from "../../assets/RentMe-Logo-2.png";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      console.log("Stored user string:", storedUser); // Debug log
      console.log("Stored token:", storedToken); // Debug log
      
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser); // Debug log
        setUser(parsedUser);
      } else if (!storedToken) {
        // If no token and no user, redirect to login
        console.log("No token found, redirecting to login");
        window.location.href = "/login";
        return;
      } else {
        console.log("Token found but no user data");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Clear invalid data
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
        <div className="h-full w-full bg-white flex flex-col p-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              className="w-32 h-32 object-cover"
              alt="Rentme logo"
              src={rentmeLogo2}
            />
          </div>

          {/* Profile Section */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="font-semibold text-neutral-500 text-sm mb-4">
                Profile
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  alt="Avatar"
                  src={avatar}
                />
              </div>

              {/* User Info */}
              <div className="text-center space-y-1">
                <div className="font-semibold text-neutral-800 text-base">
                  {loading ? "Loading..." : (user ? user.name : "Guest User")}
                </div>
                <div className="font-semibold text-neutral-400 text-sm break-words">
                  {loading ? "Loading..." : (user ? user.email : "Please log in")}
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button - Always at bottom */}
          <div className="mt-auto">
            <button 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded cursor-pointer transition-colors" 
              onClick={user ? handleLogout : () => window.location.href = "/login"}
            >
              <img src={LeftIcon} alt={user ? "Logout icon" : "Login icon"} className="w-5 h-5" />
              <div className="font-semibold text-neutral-800 text-base">
                {user ? "Log out" : "Log in"}
              </div>
            </button>
          </div>
        </div>
  );
};
