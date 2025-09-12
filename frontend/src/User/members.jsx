import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import loginBackgroundDesign3 from "../assets/login-background-design-2.png";
import Person from "../assets/person.png";

export const MemberDetails = () => {
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get propertyId from URL query
  const urlParams = new URLSearchParams(location.search);
  const propertyId = urlParams.get("id");

  useEffect(() => {
    if (propertyId) {
      fetchMembers(propertyId);
    } else {
      setError("Property ID not found in URL");
      setLoading(false);
    }
  }, [propertyId]);

  // ✅ Fetch applications (members) for the property
  const fetchMembers = async (propertyId) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:3000/api/property/${propertyId}/applications`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch members");

      const formattedMembers = data.applications.map((app) => ({
        id: app._id,
        name: app.applicantId?.name || "Unknown",
        email: app.applicantId?.email || "N/A",
        phone: app.applicantId?.phone || "N/A",
        gender: app.applicantId?.gender || "N/A",
        occupation: app.applicantId?.occupation || "N/A",
        sharing: `₹${app.propertyId?.rent || 0}`,
        type: app.status, // "Pending", "Accepted", "Rejected"
      }));

      setMembers(formattedMembers);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Could not load members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update application status
  const updateStatus = async (applicationId, status) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setMembers((prev) =>
        prev.map((m) =>
          m.id === applicationId ? { ...m, type: data.application.status } : m
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#f5f7fa] flex flex-col items-center relative">
      {/* Header */}
      <h2 className="mt-10 mb-8 text-2xl font-bold text-[#1a1a1a]">
        Members Applied
      </h2>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-600">Loading members...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Members Grid */}
      {!loading && !error && members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 z-10">
          {members.map((mem) => (
            <div
              key={mem.id}
              className="bg-white shadow border border-gray-300 rounded-xl p-6 flex flex-col min-w-[300px] max-w-[340px] w-full"
            >
              <div className="flex items-start mb-3">
                <img
                  src={Person}
                  alt="Avatar"
                  className="h-10 w-10 object-contain mr-4"
                />
                <div className="flex-1 text-sm text-gray-800">
                  <div className="font-semibold">{mem.name}</div>
                  Email - {mem.email}
                  <br />
                  Phone - {mem.phone}
                  <br />
                  Gender - {mem.gender}
                  <br />
                  Occupation - {mem.occupation}
                  <br />
                  Sharing amount - {mem.sharing}
                </div>
              </div>

              <div className="flex gap-2 ml-auto mt-2">
                {mem.type === "Pending" ? (
                  <>
                    <button
                      onClick={() => updateStatus(mem.id, "Accepted")}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm shadow"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(mem.id, "Rejected")}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm shadow"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-1 rounded text-sm shadow ${
                      mem.type === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {mem.type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <p className="text-gray-600 mb-12">No members have applied yet.</p>
        )
      )}

      {/* Decorative background */}
      <img
        src={loginBackgroundDesign3}
        alt="Decorative"
        className="pointer-events-none select-none absolute right-4 bottom-2 w-32 md:w-56 opacity-60 z-0"
      />
    </div>
  );
};