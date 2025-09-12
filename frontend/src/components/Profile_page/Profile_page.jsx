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
    // <div className="bg-[#f5f7fa] grid justify-items-center items-start w-screen">
    //   <div className="bg-[#f5f7fa] overflow-hidden w-[1512px] h-[982px]">
        <div className="relative w-[281px] h-[982px] top-[5px] bg-white rounded shadow-md">
          <img
            className="absolute w-44 h-44 top-[94px] left-[68px] object-cover"
            alt="Rentme logo"
            src={rentmeLogo2}
          />

          <div className="h-[163px] top-[405px] left-[30px] absolute w-[251px]">
            <div className="absolute w-[251px] -top-px left-0 font-semibold text-neutral-500 text-base">
              Profile
            </div>

            <div className="flex h-12 items-center gap-2 top-[166px] left-0 absolute w-[251px]">
              <div className="flex flex-col items-start gap-1 relative flex-1">
                <div className="font-semibold text-neutral-800 text-base">
                  {loading ? "Loading..." : (user ? user.name : "Guest User")}
                </div>
                <div className="font-semibold text-neutral-400 text-base">
                  {loading ? "Loading..." : (user ? user.email : "Please log in")}
                </div>
              </div>
            </div>

            <img
              className="absolute w-[121px] h-[121px] top-[22px] left-[46px] object-cover"
              alt="Avatar"
              src={avatar}
            />
          </div>

          <div className="flex w-[214px] items-center justify-center gap-1 px-2 py-1.5 absolute top-[894px] left-[30px] bg-neutral-50 rounded cursor-pointer" onClick={user ? handleLogout : () => window.location.href = "/login"}>
            <img src={LeftIcon} alt={user ? "Logout icon" : "Login icon"} className="!relative !w-5 !h-5" />
            <div className="inline-flex items-center justify-center px-1">
              <div className="font-semibold text-neutral-800 text-base">
                {user ? "Log out" : "Log in"}
              </div>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
};
