import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import loginBackgroundDesign2 from "../assets/login-background-design-2.png";
import rupee1 from "../assets/rupee1.png";
import { ProfilePage } from "../components/Profile_page/Profile_page.jsx";

export const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ for navigation
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const propertyId = urlParams.get("id");

    if (propertyId) {
      fetchPropertyDetails(propertyId);
    } else {
      setError("Property ID not found in URL");
      setLoading(false);
    }
  }, [location.search]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:3000/api/property/details/${propertyId}`
      );
      const data = await response.json();

      if (response.ok) {
        setProperty(data.property);
      } else {
        setError(data.error || "Failed to fetch property details");
      }
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle application
  const handleSendApplication = async () => {
    try {
      setIsSubmittingApplication(true);
      setApplicationStatus(null);
      setApplicationMessage("");

      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");

      if (!userData.id || !token) {
        setApplicationStatus("error");
        setApplicationMessage("Please log in to send an application");
        return;
      }

      const message = prompt(
        "Please enter a message for your application (e.g., why you're interested):"
      );

      if (!message || message.trim() === "") {
        setApplicationStatus("error");
        setApplicationMessage("Application message is required");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/property/${property._id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicantId: userData.id,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setApplicationStatus("success");
        setApplicationMessage(
          "Application sent successfully! The landlord will review it."
        );
      } else {
        setApplicationStatus("error");
        setApplicationMessage(data.error || "Failed to send application");
      }
    } catch (err) {
      console.error("Error sending application:", err);
      setApplicationStatus("error");
      setApplicationMessage("Network error. Please try again.");
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  // ✅ Handle Find Roommates click
  const handleFindRoommates = () => {
    if (property?._id) {
      navigate(`/members?id=${property._id}`);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
        <aside className="hidden md:flex md:flex-col md:w-72 lg:w-80 h-screen fixed top-0 left-0 z-20 bg-white border-r shadow">
          <div className="flex-1 flex flex-col items-center py-8 px-4">
            <ProfilePage />
          </div>
        </aside>
        <main className="flex-1 flex justify-center items-center px-2 md:pl-80 w-full">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading property details...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
        <aside className="hidden md:flex md:flex-col md:w-72 lg:w-80 h-screen fixed top-0 left-0 z-20 bg-white border-r shadow">
          <div className="flex-1 flex flex-col items-center py-8 px-4">
            <ProfilePage />
          </div>
        </aside>
        <main className="flex-1 flex justify-center items-center px-2 md:pl-80 w-full">
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Profile */}
      <aside className="hidden md:flex md:flex-col md:w-72 lg:w-80 h-screen fixed top-0 left-0 z-20 bg-white border-r shadow">
        <div className="flex-1 flex flex-col items-center py-8 px-4">
          <ProfilePage />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-2 md:pl-80 w-full">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col md:flex-row gap-8 max-w-5xl w-full mt-8 md:mt-0">
          {/* Left Side - Images */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <img
              className="w-full h-48 md:h-64 object-cover rounded"
              alt="Property main"
              src={
                property?.photos && property.photos[0]
                  ? property.photos[0]
                  : image1
              }
            />
            <div className="flex gap-4">
              <img
                className="w-1/2 h-20 md:h-28 object-cover rounded"
                alt="Property view 1"
                src={
                  property?.photos && property.photos[1]
                    ? property.photos[1]
                    : image2
                }
              />
              <img
                className="w-1/2 h-20 md:h-28 object-cover rounded"
                alt="Property view 2"
                src={
                  property?.photos && property.photos[2]
                    ? property.photos[2]
                    : image3
                }
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col justify-between md:w-1/2">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {property?.title || "Property Title"}
              </h2>

              <div className="flex items-center gap-1 mt-2">
                <img className="w-5 h-5" alt="Rupee" src={rupee1} />
                <span className="text-lg md:text-xl text-gray-600 font-medium">
                  {property?.rent ? property.rent.toLocaleString() : "N/A"}
                </span>
              </div>

              <p className="mt-2 text-gray-500 text-sm md:text-base">
                {property?.location || "Location not available"}
              </p>

              <div className="mt-6 text-gray-600 text-sm md:text-base">
                <h3 className="text-base font-semibold mb-2">DESCRIPTION</h3>
                <p>
                  {property?.description ||
                    "Spacious rental property perfect for multiple tenants."}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Maximum Tenants:</span>{" "}
                  {property?.numberOfTenants || "N/A"}
                </p>

                {property?.amenities && property.amenities.length > 0 && (
                  <p className="mt-2">
                    <span className="font-semibold">Amenities:</span>{" "}
                    {property.amenities.join(", ")}
                  </p>
                )}

                {property?.userId && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-800">
                      Property Owner
                    </h4>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {property.userId.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {property.userId.email || "N/A"}
                    </p>
                    {property.userId.phone && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {property.userId.phone}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleFindRoommates} // ✅ now redirects
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition"
              >
                Find Roommates
              </button>
              <button
                onClick={handleSendApplication}
                disabled={isSubmittingApplication}
                className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {isSubmittingApplication ? "Sending..." : "Send Application"}
              </button>
            </div>

            {/* Feedback Message */}
            {applicationMessage && (
              <p
                className={`mt-4 text-sm ${
                  applicationStatus === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {applicationMessage}
              </p>
            )}
          </div>
        </div>

        <img
          className="absolute bottom-6 right-6 w-24 md:w-40 lg:w-56 opacity-70 pointer-events-none"
          alt="Background"
          src={loginBackgroundDesign2}
        />
      </main>
    </div>
  );
};