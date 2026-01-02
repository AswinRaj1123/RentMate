import React, { useEffect, useState } from "react";
import ElementAvatars from "../assets/elementavatar.png";
import loginBackgroundDesign1 from "../assets/login-background-design-2.png";
import { LandlordProfile } from "../components/Landlord_profile/Landlord_profile.jsx";
import { API_BASE_URL } from "../config";

export const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Get landlord ID from localStorage instead of hardcoded value
  const landlordId = localStorage.getItem("userId");

  // Fetch all applications for landlord
  useEffect(() => {
    const fetchApplications = async () => {
      // ✅ Check if landlordId exists
      if (!landlordId) {
        console.error("No landlord ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        // ✅ Use the new Render backend URL
        const res = await fetch(
          `${API_BASE_URL}/api/landlord/${landlordId}/applications`
        );
        const data = await res.json();
        if (res.ok) {
          setApplications(data.applications || []);
        } else {
          console.error(data.error || "Failed to fetch applications");
        }
      } catch (err) {
        console.error("❌ Fetch Applications Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [landlordId]);

  // Update Application Status Handler
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      // ✅ Use the new Render backend URL
      const res = await fetch(
        `${API_BASE_URL}/api/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, landlordId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        console.error(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("❌ Update Application Error:", err);
    }
  };

  // ✅ Show login prompt if no landlord ID
  if (!landlordId) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view applications</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <LandlordProfile />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex justify-center items-center relative overflow-hidden">
        <div className="bg-white shadow-lg rounded-lg w-[95%] max-w-5xl p-6 relative z-10">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">View Applications</h2>
            <img
              src={ElementAvatars}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No applications found.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Application Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 flex items-center space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                        👤
                      </div>
                      <span className="text-gray-800">
                        {app.applicantId?.name || "Unknown"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {app.propertyId?.title || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 flex space-x-2 justify-center">
                      {app.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "Accepted")}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "Rejected")}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`font-semibold ${
                            app.status === "Accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {app.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <img
          src={loginBackgroundDesign1}
          alt="Background Circles"
          className="absolute bottom-4 right-4 w-60 opacity-90 pointer-events-none"
        />
      </main>
    </div>
  );
};