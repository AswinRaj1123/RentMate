import React, { useState } from "react";
import arrowBack from "../assets/arrow_back.svg";
import rentmeLogo1 from "../assets/rentme-logo-transparent-1.png";

export const PropertyPage = () => {
    // Form state
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [rent, setRent] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState("");
    const [numberOfTenants, setNumberOfTenants] = useState("");
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Example: get userId from localStorage (set after login)
    const userId = localStorage.getItem("userId");

    // Handle photo upload (optional, here just stores file names)
    const handlePhotoChange = (e) => {
        setPhotos([...e.target.files]);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Prepare amenities as array
        const amenitiesArr = amenities.split(",").map(a => a.trim()).filter(Boolean);

        // Prepare photos as array of file names (for demo)
        const photoNames = photos.map(file => file.name);

        // Prepare payload
        const payload = {
            userId,
            title,
            location,
            rent,
            description,
            amenities: amenitiesArr,
            numberOfTenants,
            photos: photoNames
        };

        try {
            console.log("Submitting payload:", payload);
            const res = await fetch("http://localhost:3000/api/property", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Property added successfully!");
                // Optionally reset form
                setTitle(""); setLocation(""); setRent(""); setDescription("");
                setAmenities(""); setNumberOfTenants(""); setPhotos([]);
            } else {
                setMessage(data.error || "Failed to add property");
            }
        } catch (err) {
            setMessage("Server error");
        }
        setLoading(false);
    };

    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[393px] h-[852px] relative">
                {/* Logo */}
                <img
                    className="absolute w-[60px] h-[60px] top-[54px] left-[302px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogo1}
                />

                {/* Back button */}
                <img
                    src={arrowBack}
                    alt="Back"
                    className="absolute w-[30px] h-[30px] top-[69px] left-[26px] cursor-pointer"
                />

                {/* Title */}
                <h2 className="absolute top-[130px] left-[30px] text-xl font-semibold text-gray-800">
                    Add New Property
                </h2>

                {/* Form container */}
                <form
                    className="absolute w-[371px] h-[666px] top-[175px] left-[11px] bg-white rounded-2xl border border-solid border-[#d1d9e6] shadow-[2px_4px_4px_#00000040] p-6 space-y-6 overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    {/* Title */}
                    <div>
                        <label className="block font-medium text-gray-800">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter property title"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium text-gray-800">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="Enter property location"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                            required
                        />
                    </div>

                    {/* Rent */}
                    <div>
                        <label className="block font-medium text-gray-800">Rent</label>
                        <input
                            type="number"
                            value={rent}
                            onChange={e => setRent(e.target.value)}
                            placeholder="Enter rent amount"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium text-gray-800">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter description"
                            rows="3"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block font-medium text-gray-800">Amenities</label>
                        <input
                            type="text"
                            value={amenities}
                            onChange={e => setAmenities(e.target.value)}
                            placeholder="Enter amenities (comma separated)"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Number of Tenants */}
                    <div>
                        <label className="block font-medium text-gray-800">Number of Tenants</label>
                        <select
                            value={numberOfTenants}
                            onChange={e => setNumberOfTenants(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                            required
                        >
                            <option value="" disabled>
                                Select max number of tenants
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    {/* Photos */}
                    <div>
                        <label className="block font-medium text-gray-800">Photos</label>
                        <input
                            type="file"
                            multiple
                            onChange={handlePhotoChange}
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full h-10 flex items-center justify-center gap-2 bg-[#2e86de] rounded-lg border border-solid border-[#1b4f9b] text-white font-medium"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                    {message && (
                        <div className="text-center text-sm text-red-500 mt-2">{message}</div>
                    )}
                </form>
            </div>
        </div>
    );
};
