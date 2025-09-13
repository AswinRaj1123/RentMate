import React, { useEffect, useState } from "react";
import elementAvatars from "../assets/elementavatar.png";
import loginBackgroundDesign1 from "../assets/login-background-design-1.png";
import { LandlordProfile } from "../components/Landlord_profile/Landlord_profile.jsx";

export const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get landlord ID from localStorage
  const landlordId = localStorage.getItem("userId");

  // Fetch landlord properties
  useEffect(() => {
    const fetchProperties = async () => {
      // ✅ Check if landlordId exists
      if (!landlordId) {
        console.error("No landlord ID found in localStorage");
        setError("Please log in to view your properties");
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching properties for landlord:", landlordId);

      try {
        // ✅ Use the new /api/properties endpoint
        const response = await fetch(`http://localhost:3000/api/properties`);
        
        console.log("📡 Response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("📦 All properties data:", data);
          
          // ✅ Filter properties to only show properties owned by this landlord
          const landlordProperties = data.filter(property => {
            // Handle different ways userId might be stored
            const propertyUserId = property.userId?._id || property.userId;
            const match = propertyUserId === landlordId || propertyUserId?.toString() === landlordId;
            
            if (match) {
              console.log("✅ Property match found:", property.title, "| Property userId:", propertyUserId);
            }
            
            return match;
          });
          
          setProperties(landlordProperties || []);
          console.log(`✅ Found ${landlordProperties?.length || 0} properties for landlord ${landlordId}`);
          
          if (landlordProperties.length === 0) {
            console.log("🔍 Debug: No properties found for this landlord");
            console.log("🔍 All property userIds:", data.map(p => ({ title: p.title, userId: p.userId?._id || p.userId })));
          }
        } else {
          const data = await response.json();
          const errorMessage = data.error || "Failed to fetch properties";
          setError(errorMessage);
          console.error("❌ API Error:", errorMessage);
        }
      } catch (err) {
        const errorMessage = "Network error. Please try again.";
        setError(errorMessage);
        console.error("❌ Fetch Properties Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [landlordId]);

  // Handle property deletion
  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      console.log("🗑️ Deleting property:", propertyId);
      
      const response = await fetch(
        `http://localhost:3000/api/property/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setProperties(properties.filter(property => property._id !== propertyId));
        console.log("✅ Property deleted successfully");
        alert("Property deleted successfully!");
      } else {
        const data = await response.json();
        const errorMessage = data.error || "Failed to delete property";
        console.error("❌ Delete Error:", errorMessage);
        alert("Failed to delete property. Please try again.");
      }
    } catch (err) {
      console.error("❌ Delete Property Error:", err);
      alert("Network error. Please try again.");
    }
  };

  // ✅ Show login prompt if no landlord ID
  if (!landlordId) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your properties</p>
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
            <div>
              <h2 className="text-xl font-bold text-gray-800">My Properties</h2>
              <p className="text-sm text-gray-500">Landlord ID: {landlordId}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/addproperty'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                + Add Property
              </button>
              <img
                src={elementAvatars}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your properties...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 mb-2">❌ {error}</p>
                <p className="text-sm text-gray-600">Landlord ID: {landlordId}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Using API: GET /api/properties
                </p>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-10">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-4">You haven't added any properties yet.</p>
                <p className="text-sm text-gray-500">Landlord ID: {landlordId}</p>
              </div>
              <button 
                onClick={() => window.location.href = '/addproperty'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                🏠 Add Your First Property
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600 bg-green-50 p-2 rounded">
                ✅ Found {properties.length} property(ies) for your account
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    {/* Property Image */}
                    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 overflow-hidden">
                      {property.photos && property.photos.length > 0 ? (
                        <img
                          src={property.photos[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                          🏠 No Image
                        </div>
                      )}
                      <div className="w-full h-full hidden items-center justify-center text-gray-500 bg-gray-200">
                        🏠 Image Error
                      </div>
                    </div>

                    {/* Property Details */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {property.title || "Untitled Property"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      📍 {property.location || "Location not specified"}
                    </p>
                    <p className="text-blue-600 font-bold text-lg mb-2">
                      ₹{property.rent ? property.rent.toLocaleString() : "0"}/month
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description || "No description available"}
                    </p>

                    {/* Property Stats */}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>👥 {property.numberOfTenants || 0} tenants</span>
                      <span>🆔 {property._id.slice(-6)}</span>
                    </div>

                    {/* Property Owner Info (for debugging) */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="text-xs text-gray-400 mb-2">
                        Owner: {property.userId?._id || property.userId}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => window.location.href = `/viewapplication?propertyId=${property._id}`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded transition"
                      >
                        View Apps
                      </button>
                      <button 
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
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