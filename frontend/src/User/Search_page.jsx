import React from "react";
import SearchIcon from "../assets/search.png"; // Fixed import
import image from "../assets/image.png";

export const SearchResultPage = () => {
    return (
        <div className="bg-[#f5f7fa] min-h-screen p-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-4 relative">
                <div className="relative w-full">
                    <div className="flex items-center bg-white rounded-full shadow-md p-3">
                        <img 
                            src={SearchIcon} 
                            alt="Search" 
                            className="w-7 h-7 ml-2 mr-4" 
                        />
                        <input
                            type="text"
                            placeholder="electronic city, bengaluru"
                            className="w-full bg-transparent border-none outline-none text-xl opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <p className="text-center text-[#b3b3b3] mb-8">
                showing results for "electronic city, bengaluru"
            </p>

            {/* Property Card */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex">
                        <div className="mr-4">
                            <img
                                className="w-24 h-24 object-cover rounded-lg"
                                alt="Property"
                                src={image}
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-black mb-2">
                                Trinity Haven
                            </h3>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Pricing</p>
                                    <p className="text-lg font-medium text-black">₹ 1,25,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <div className="mb-2">
                            <p className="text-sm font-medium text-gray-600">Location</p>
                            <p className="text-sm text-black">
                                Electronic City Phase I, Bengaluru, Karnataka
                            </p>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-gray-600">Description</p>
                            <p className="text-sm text-black">
                                Spacious 3-Bedroom Family Home with Large Backyard
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};