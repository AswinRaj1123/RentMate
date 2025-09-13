import React, { useState } from "react";
import loginBackgroundDesign1 from "../assets/login-background-design-2.png";

export const UserUnderstandingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    location: "",
    sleep_schedule: "",
    cleanliness: 0,
    food: "",
    social_level: 0,
    date_of_birth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCircleClick = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/ai/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("User created successfully!");
        // Optionally, redirect or clear form
      } else {
        alert(data.error || "Failed to create user");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Understand more about you
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your budget"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter location"
              required
            />
          </div>
{/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
          {/* Sleep Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sleep Schedule</label>
            <select
              name="sleep_schedule"
              value={formData.sleep_schedule}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select...</option>
              <option value="early">Early</option>
              <option value="late">Late</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cleanliness (1-5)
            </label>
            <div className="flex justify-between w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  onClick={() => handleCircleClick("cleanliness", num)}
                  className={`w-10 h-10 rounded-full border cursor-pointer flex items-center justify-center transition ${
                    num <= formData.cleanliness
                      ? "bg-blue-400 border-blue-500 text-white"
                      : "bg-gray-200 border-gray-300"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Food */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Preference</label>
            <select
              name="food"
              value={formData.food}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select...</option>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>

          {/* Social Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Level (1-5)
            </label>
            <div className="flex justify-between w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  onClick={() => handleCircleClick("social_level", num)}
                  className={`w-10 h-10 rounded-full border cursor-pointer flex items-center justify-center transition ${
                    num <= formData.social_level
                      ? "bg-blue-400 border-blue-500 text-white"
                      : "bg-gray-200 border-gray-300"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};