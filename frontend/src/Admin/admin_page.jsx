import React, { useEffect, useState } from "react";
import { ProfilePage } from "../components/Profile_page/Profile_page.jsx";

export const AdminPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all properties
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/api/search-properties");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch properties");
                setProperties(data.properties);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

    // Delete property handler
    const handleDelete = async (propertyId) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            const res = await fetch(`http://localhost:3000/api/property/${propertyId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete property");
            setProperties((prev) => prev.filter((p) => p._id !== propertyId));
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
            {/* Sidebar/Profile */}
            <aside className="w-full md:w-80 lg:w-96 bg-white border-r shadow flex-shrink-0 flex flex-col items-center py-8 px-4">
                <ProfilePage />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                <h1 className="text-2xl font-bold mb-6">All Properties</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {properties.map((prop) => (
                            <div key={prop._id} className="bg-[#eeeeee] rounded-[14px] shadow p-4 flex flex-col relative">
                                <img
                                    className="w-full h-32 object-cover rounded mb-4"
                                    alt={prop.title}
                                    src={prop.photos?.[0] || "/default-property.jpg"}
                                />
                                <div className="font-semibold text-black text-lg mb-1">{prop.title}</div>
                                <div className="text-black text-base mb-1">Pricing: ₹{prop.rent}</div>
                                <div className="text-black text-sm mb-1">
                                    <span className="font-semibold">Location:</span> {prop.location}
                                </div>
                                <div className="text-black text-sm mb-1">
                                    <span className="font-semibold">Description:</span> {prop.description}
                                </div>
                                {/* Delete Button */}
                                <button
                                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    onClick={() => handleDelete(prop._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
