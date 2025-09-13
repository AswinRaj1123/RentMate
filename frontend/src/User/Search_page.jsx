import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "../assets/search.png";
import image from "../assets/image.png";
import { ProfilePage } from "../components/Profile_page/Profile_page.jsx";

// filepath: d:\college_project\RentMate-1\frontend\src\User\Search_page.jsx

export const SearchResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({});

    // Parse URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const locationParam = urlParams.get('location') || '';
        const minPrice = urlParams.get('minPrice');
        const maxPrice = urlParams.get('maxPrice');
        
        setSearchQuery(locationParam);
        
        // Fetch properties based on search parameters
        fetchProperties(locationParam, minPrice, maxPrice);
    }, [location.search]);

    const fetchProperties = async (locationQuery, minPrice, maxPrice) => {
        setLoading(true);
        setError("");
        
        try {
            // Build API URL with search parameters
            const params = new URLSearchParams();
            if (locationQuery) params.append('location', locationQuery);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);
            params.append('page', '1');
            params.append('limit', '10');

            const response = await fetch(`https://rentmate-backend-4cdc.onrender.com/api/search-properties?${params.toString()}`);
            const data = await response.json();

            if (response.ok) {
                setProperties(data.properties || []);
                setPagination(data.pagination || {});
            } else {
                setError(data.error || 'Failed to fetch properties');
                setProperties([]);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Network error. Please try again.');
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    const handleNewSearch = async (e) => {
        if (e.key === 'Enter') {
            const newSearchQuery = e.target.value.trim();
            if (newSearchQuery) {
                setSearchQuery(newSearchQuery);
                await fetchProperties(newSearchQuery);
            }
        }
    };
    return (
        <div className="flex min-h-screen bg-[#f5f7fa]">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r">
                <ProfilePage />
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-4 relative">
                    <div className="flex items-center bg-white rounded-full shadow-md p-3">
                        <img 
                            src={SearchIcon} 
                            alt="Search" 
                            className="w-7 h-7 ml-2 mr-4" 
                        />
                        <input
                            type="text"
                            placeholder="Search for properties..."
                            defaultValue={searchQuery}
                            onKeyPress={handleNewSearch}
                            className="w-full bg-transparent border-none outline-none text-xl"
                        />
                    </div>
                </div>

                {/* Results Info */}
                {searchQuery && (
                    <p className="text-center text-[#b3b3b3] mb-8">
                        showing results for "{searchQuery}" 
                        {pagination.totalProperties !== undefined && ` (${pagination.totalProperties} properties found)`}
                    </p>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-gray-600">Searching properties...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => fetchProperties(searchQuery)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Property Cards Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <div key={property._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex">
                                            <div className="mr-4">
                                                <img
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                    alt="Property"
                                                    src={property.photos && property.photos[0] ? property.photos[0] : image}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-black mb-2">
                                                    {property.title}
                                                </h3>
                                                <div className="flex justify-between mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Pricing</p>
                                                        <p className="text-lg font-medium text-black">₹ {property.rent.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Tenants</p>
                                                        <p className="text-lg font-medium text-black">{property.numberOfTenants}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4">
                                            <div className="mb-2">
                                                <p className="text-sm font-medium text-gray-600">Location</p>
                                                <p className="text-sm text-black">
                                                    {property.location}
                                                </p>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-gray-600">Description</p>
                                                <p className="text-sm text-black">
                                                    {property.description || 'No description available'}
                                                </p>
                                            </div>

                                            {property.amenities && property.amenities.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium text-gray-600">Amenities</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {property.amenities.slice(0, 3).map((amenity, index) => (
                                                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                        {property.amenities.length > 3 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{property.amenities.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs text-gray-500">Owner</p>
                                                    <p className="text-sm text-black">{property.userId?.name || 'Unknown'}</p>
                                                </div>
                                                <button 
                                                    onClick={() => navigate(`/property?id=${property._id}`)}
                                                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 text-lg">No properties found matching your search criteria</p>
                                <p className="text-gray-400 text-sm mt-2">Try adjusting your search filters or location</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            {pagination.hasPrevPage && (
                                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                    Previous
                                </button>
                            )}
                            <span className="px-4 py-2 bg-blue-500 text-white rounded">
                                {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            {pagination.hasNextPage && (
                                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};