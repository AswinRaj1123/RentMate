import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import loginBackgroundDesign3 from "../assets/login-background-design-2.png";
import Person from "../assets/person.png";
import { API_BASE_URL } from "../config";

export const MemberDetails = () => {
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedSharing, setSelectedSharing] = useState("");
  const [ambienceText, setAmbienceText] = useState("");

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
        `${API_BASE_URL}/api/property/${propertyId}/applications`
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
        type: app.status,
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
        `${API_BASE_URL}/api/applications/${applicationId}/status`,
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

  // ✅ Handle Submit from Modal
  const handleSubmitSharing = async () => {
    if (!selectedSharing) {
      alert("Please select a room sharing option.");
      return;
    }
    if (!ambienceText.trim()) {
      alert("Please describe your ideal living ambience.");
      return;
    }

    try {
      // Example API call (adjust URL & payload to match your backend)
      const res = await fetch(
        `${API_BASE_URL}/api/property/${propertyId}/room-sharing`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ambience: ambienceText,
            sharingOption: selectedSharing,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room sharing");

      alert("Room sharing created successfully!");
      setShowModal(false);
      setAmbienceText("");
      setSelectedSharing("");
    } catch (err) {
      console.error("Error creating room sharing:", err);
      alert("Failed to create room sharing. Try again.");
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

      {/* ✅ Create Room Sharing Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-16 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Create Room Sharing
      </button>

      {/* ✅ Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            {/* Back button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-700 text-xl"
            >
              ←
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-center mb-2">
              Describe Your Ideal Living Ambience
            </h2>

            {/* ✅ Textbox for ambience */}
            <textarea
              value={ambienceText}
              onChange={(e) => setAmbienceText(e.target.value)}
              placeholder="Type here... (e.g., Quiet neighbourhood, pet-friendly, co-living...)"
              className="w-full border rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 mb-6"
              rows={3}
            />

            {/* Options */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setSelectedSharing("Room Sharing for ₹5000 (4 people)")}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedSharing === "Room Sharing for ₹5000 (4 people)"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Room Sharing for ₹5000 (4 people)
              </button>
              <button
                onClick={() => setSelectedSharing("Room Sharing for ₹10000 (2 people)")}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedSharing === "Room Sharing for ₹10000 (2 people)"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Room Sharing for ₹10000 (2 people)
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitSharing}
              className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
            >
              SUBMIT
            </button>
          </div>
        </div>
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