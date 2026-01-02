import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowBack from "../assets/arrow_back.svg";
import loginBackgroundDesign1 from "../assets/login-background-design-1.png";
import search from "../assets/search.png";
import rentmeLogo1 from "../assets/RentMe-Logo-2.png";

export const MainSearchPage = () => {
    const navigate = useNavigate();
    const [searchLocation, setSearchLocation] = useState("");
    const [topSearchQuery, setTopSearchQuery] = useState("");
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

    const priceRanges = [
        { id: "none", label: "None", value: "" },
        { id: "1000-5000", label: "₹1000 - ₹5000", value: "1000-5000" },
        { id: "5000-15000", label: "₹5000 - ₹15000", value: "5000-15000" },
        { id: "15000-30000", label: "₹15000 - ₹30000", value: "15000-30000" },
        { id: "30000-60000", label: "₹30000 - ₹60000", value: "30000-60000" },
        { id: "60000-max", label: "₹60000 - Max", value: "60000-max" }
    ];

    const handlePriceRangeToggle = (rangeValue) => {
        if (rangeValue === "") {
            // If "None" is selected, clear all selections
            setSelectedPriceRanges([]);
        } else {
            setSelectedPriceRanges(prev => {
                if (prev.includes(rangeValue)) {
                    // Remove if already selected
                    return prev.filter(range => range !== rangeValue);
                } else {
                    // Add if not selected
                    return [...prev, rangeValue];
                }
            });
        }
    };

    const isRangeSelected = (rangeValue) => {
        if (rangeValue === "") {
            return selectedPriceRanges.length === 0;
        }
        return selectedPriceRanges.includes(rangeValue);
    };

    // Convert price ranges to API format
    const getPriceRangeParams = () => {
        if (selectedPriceRanges.length === 0) return {};
        
        let minPrice = null;
        let maxPrice = null;
        
        selectedPriceRanges.forEach(range => {
            const [min, max] = range.split('-');
            const minVal = parseInt(min);
            const maxVal = max === 'max' ? null : parseInt(max);
            
            if (minPrice === null || minVal < minPrice) {
                minPrice = minVal;
            }
            if (maxVal !== null && (maxPrice === null || maxVal > maxPrice)) {
                maxPrice = maxVal;
            }
        });
        
        const params = {};
        if (minPrice !== null) params.minPrice = minPrice;
        if (maxPrice !== null) params.maxPrice = maxPrice;
        return params;
    };

    // Handle search functionality
    const handleSearch = async () => {
        try {
            const searchQuery = topSearchQuery.trim() || searchLocation.trim();
            
            if (!searchQuery && selectedPriceRanges.length === 0) {
                alert("Please enter a location or select price filters to search");
                return;
            }

            // Build search parameters
            const searchParams = new URLSearchParams();
            if (searchQuery) {
                searchParams.append('location', searchQuery);
            }
            
            const priceParams = getPriceRangeParams();
            if (priceParams.minPrice) {
                searchParams.append('minPrice', priceParams.minPrice);
            }
            if (priceParams.maxPrice) {
                searchParams.append('maxPrice', priceParams.maxPrice);
            }

            // Navigate to search results page with parameters
            navigate(`/search?${searchParams.toString()}`);
            
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }
    };

    // Handle Enter key press for search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className="bg-[#f5f7fa] min-h-screen w-full flex justify-center items-center px-4 py-6 overflow-hidden">
            <div className="bg-[#f5f7fa] w-full max-w-6xl">
                <div className="flex items-start justify-between mb-6">
                    <div className="text-[#2e3a59] text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide leading-tight">
                        Smart Living, <br />
                        Starts Here
                    </div>
                    <img
                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                        alt="Rentme logo"
                        src={rentmeLogo1}
                    />
                </div>

                <div className="w-full max-w-2xl space-y-6">
                    <div className="w-full rounded-[50px]">
                        <div className="w-full bg-white rounded-[50px] shadow-[0px_4px_4px_#00415940] p-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center opacity-50">
                                    <img
                                        className="w-6 h-6"
                                        alt="Search Icon"
                                        src={search}
                                    />
                                </div>

                                <input
                                    type="text"
                                    value={topSearchQuery}
                                    onChange={(e) => setTopSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search"
                                    className="flex-1 opacity-50 font-normal text-black text-lg md:text-xl bg-transparent border-none outline-none placeholder:text-black placeholder:opacity-50"
                                />
                            
                                <img 
                                    className="w-7 h-7 cursor-pointer transform scale-x-[-1]" 
                                    alt="Arrow Forward"
                                    src={arrowBack}
                                    onClick={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg border border-solid border-[#c0b7b7] shadow-lg p-4 max-h-[400px] overflow-y-auto">
                        <div className="mb-4">
                            <div className="text-[#1e1e1e] text-sm mb-2">
                                Location
                            </div>
                            <div className="w-full rounded-lg">
                                <div className="w-full bg-white rounded-lg border border-solid border-[#575656] opacity-50" />

                                <input
                                    type="text"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter your search location"
                                    className="w-full p-2 text-[#1e1e1e] bg-transparent border border-[#575656] rounded-lg outline-none placeholder:text-[#b3b3b3]"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-[#b3b3b3] text-xs mb-1">
                                Filters
                            </div>
                            <div className="text-[#1e1e1e] text-sm mb-2">
                                Price
                            </div>

                            <div className="space-y-2 p-3 bg-white rounded-lg border border-solid border-[#575656]">
                                {priceRanges.map(range => (
                                    <div key={range.id} className="flex items-center gap-2 cursor-pointer" onClick={() => handlePriceRangeToggle(range.value)}>
                                        <div
                                            className="w-6 h-6 border-2 rounded-md flex items-center justify-center flex-shrink-0"
                                            style={{ 
                                                backgroundColor: isRangeSelected(range.value) ? "#2e3a59" : "white",
                                                borderColor: isRangeSelected(range.value) ? "#2e3a59" : "#ccc"
                                            }}
                                        >
                                            {isRangeSelected(range.value) && (
                                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                        </div>
                                        <div 
                                            className="font-light text-sm"
                                            style={{ color: isRangeSelected(range.value) ? "#1e1e1e" : "#b3b3b3" }}
                                        >
                                            {range.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};