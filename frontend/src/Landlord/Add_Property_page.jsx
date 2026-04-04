import React, { useState } from "react";
import arrowBack from "../assets/arrow_back.svg";
import rentmeLogo1 from "../assets/rentme-logo-transparent-1.png";
import { LandlordProfile } from "../components/Landlord_profile/Landlord_profile.jsx";
import elementAvatars from "../assets/elementavatar.png";
import { API_BASE_URL } from "../config";

export const PropertyPage = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [numberOfTenants, setNumberOfTenants] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId"); // ✅ userId check

  // ✅ Authentication check - redirect if not logged in
  if (!userId) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to add a property</p>
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

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const amenitiesArr = amenities
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const photoNames = photos.map((file) => file.name);

    const payload = {
      userId,
      title,
      location,
      rent: Number(rent),
      description,
      amenities: amenitiesArr,
      numberOfTenants: Number(numberOfTenants),
      photos: photoNames,
    };

    console.log("📤 Payload being sent:", payload);

    try {
      // ✅ Using the new Render backend URL
      const res = await fetch(`${API_BASE_URL}/api/property`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Property added successfully!");
        // ✅ Clear form after successful submission
        setTitle("");
        setLocation("");
        setRent("");
        setDescription("");
        setAmenities("");
        setNumberOfTenants("");
        setPhotos([]);
        
        // ✅ Auto-redirect to My Properties after 2 seconds
        setTimeout(() => {
          window.location.href = '/myproperties';
        }, 2000);
      } else {
        setMessage(`❌ ${data.error || "Failed to add property"}`);
      }
    } catch (err) {
      console.error("❌ Error submitting property:", err);
      setMessage("❌ Network error, please try again later");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <LandlordProfile />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 flex justify-center items-start sm:items-center py-4 sm:py-6 px-3 sm:px-4 md:px-0">
        <div className="bg-[#f5f7fa] w-full max-w-[393px] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative rounded-lg shadow-lg">
          
          {/* Logo (top-left) */}
          <img
            className="absolute w-10 sm:w-12 md:w-[50px] top-4 sm:top-6 left-4 sm:left-6 aspect-[1] object-cover"
            alt="Rentme logo"
            src={rentmeLogo1}
          />

          {/* Back button (only on mobile) */}
          <img
            src={arrowBack}
            alt="Back"
            className="absolute w-5 sm:w-6 md:w-[30px] top-4 sm:top-6 left-16 sm:left-24 cursor-pointer block md:hidden"
            onClick={() => window.location.href = '/myproperties'}
          />

          {/* Avatar (top-right) */}
          <img
            src={elementAvatars}
            alt="User Avatar"
            className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover top-4 sm:top-6 right-4 sm:right-8"
          />

          {/* Form */}
          <form
            className="mt-16 sm:mt-24 md:mt-28 bg-white rounded-2xl border border-solid border-[#d1d9e6] shadow-[2px_4px_4px_#00000040] p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto max-h-[85vh] sm:max-h-[75vh]"
            onSubmit={handleSubmit}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Property</h2>
              <p className="text-gray-600 mt-2">Fill in the details to list your property</p>
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., 2BHK Apartment in Koramangala"
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Koramangala, Bangalore"
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Rent */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Monthly Rent (₹) *
              </label>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="e.g., 25000"
                min="1"
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your property features, nearby amenities, etc."
                rows="4"
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Amenities
              </label>
              <input
                type="text"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                placeholder="e.g., WiFi, AC, Parking, Security, Gym"
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple amenities with commas</p>
            </div>

            {/* Number of Tenants */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Maximum Number of Tenants *
              </label>
              <select
                value={numberOfTenants}
                onChange={(e) => setNumberOfTenants(e.target.value)}
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select maximum tenants
                </option>
                <option value="1">1 Tenant</option>
                <option value="2">2 Tenants</option>
                <option value="3">3 Tenants</option>
                <option value="4">4+ Tenants</option>
              </select>
            </div>

            {/* Photos */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Property Photos
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-3 border rounded-lg border-[#d1d9e6] text-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload multiple photos to attract more tenants
              </p>
              {photos.length > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  {photos.length} photo(s) selected
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full h-12 flex items-center justify-center gap-2 rounded-lg border font-medium text-white transition-colors ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#2e86de] hover:bg-[#1b4f9b] border-[#1b4f9b]"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding Property...
                  </>
                ) : (
                  "Add Property"
                )}
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`text-center text-sm mt-4 p-3 rounded-lg ${
                message.includes("✅") 
                  ? "bg-green-100 text-green-700 border border-green-300" 
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}>
                {message}
                {message.includes("✅") && (
                  <div className="mt-2 text-xs">
                    Redirecting to My Properties...
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};