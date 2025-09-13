import React from "react";
import ElementAvatars from "../assets/elementavatar.png";
import loginBackgroundDesign1 from "../assets/login-background-design-2.png";

export const ViewApplication = () => {
  const applications = [
    { name: "Jacob Jones", property: "Greenview Apartments", date: "April 15, 2024" },
    { name: "Arlene McCoy", property: "Downtown Loft", date: "April 12, 2024" },
    { name: "Albert Flores", property: "Pine Street House", date: "April 10, 2024" },
    { name: "Kathryn Murphy", property: "Lakeside Condo", date: "April 8, 2024" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex justify-center items-center relative overflow-hidden">
      {/* White Card */}
      <div className="bg-white shadow-lg rounded-lg w-[95%] max-w-5xl p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">View Applications</h2>
          <img
            src={ElementAvatars}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-4">Tenant</th>
              <th className="py-3 px-4">Property</th>
              <th className="py-3 px-4">Application Date</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-4 flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                    👤
                  </div>
                  <span className="text-gray-800">{app.name}</span>
                </td>
                <td className="py-4 px-4">{app.property}</td>
                <td className="py-4 px-4">{app.date}</td>
                <td className="py-4 px-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decorative Floating Circles */}
      <img
        src={loginBackgroundDesign1}
        alt="Background Circles"
        className="absolute bottom-4 right-4 w-60 opacity-90 pointer-events-none"
      />
   </div>
  );
};
