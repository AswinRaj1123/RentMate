import React, { useEffect, useState } from "react";
import elementAvatars from "../assets/elementavatar.png";
import loginBackgroundDesign1 from "../assets/login-background-design-1.png";
import { LandlordProfile } from "../components/Landlord_profile/Landlord_profile.jsx";

export const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const landlordId = "YOUR_LANDLORD_ID"; // 👉 Replace with logged-in landlord's ID

  // Fetch landlord properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/landlord/${landlordId}/properties`
        );
        const data = await res.json();
        if (res.ok) {
          setProperties(data.properties || []);
        } else {
          console.error(data.error || "Failed to fetch properties");
        }
      } catch (err) {
        console.error("❌ Fetch Properties Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [landlordId]);

  return (
    <div className="bg-[#f5f7fa] min-h-screen flex">
      {/* Sidebar */}
      <LandlordProfile />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col items-center relative overflow-hidden">
        {/* Background Image */}
        <img
          className="absolute bottom-10 right-10 w-72 md:w-96 object-cover"
          alt="Login background"
          src={loginBackgroundDesign1}
        />

        {/* Header */}
        <div className="w-full max-w-6xl flex justify-between items-center border-b border-[#e0e0e0] py-6 px-8">
          <h1 className="font-bold text-[#1a1a1a] text-lg md:text-xl">
            My Properties
          </h1>

          {/* Avatar */}
          <img
            src={elementAvatars}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Property Cards */}
        <div className="w-full max-w-6xl flex flex-col gap-6 px-6 mt-8">
          {loading ? (
            <p className="text-gray-500 text-center">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="text-gray-500 text-center">No properties found.</p>
          ) : (
            properties.map((property) => (
              <div
                key={property._id}
                className="w-full bg-[#eeeeee] rounded-xl shadow-md p-6 flex gap-6 items-start"
              >
                {/* Property Image */}
                <img
                  className="w-24 h-28 md:w-32 md:h-36 object-cover rounded"
                  alt="Property"
                  src={
                    property.photos && property.photos.length > 0
                      ? property.photos[0]
                      : "https://via.placeholder.com/150"
                  }
                />

                {/* Property Details */}
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-lg text-black">
                    {property.title}
                  </h2>

                  <div className="flex gap-4 text-sm font-medium text-black">
                    <span>Pricing:</span>
                    <span>₹ {property.rent}</span>
                  </div>

                  <p className="text-xs text-black leading-5">
                    <span className="font-medium">Location: </span>
                    {property.location}
                  </p>

                  <p className="text-xs text-black leading-5">
                    <span className="font-medium">Description: </span>
                    {property.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};