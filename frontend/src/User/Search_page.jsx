import React from "react";
import SearchIcon from "../assets/search.png";
import image from "../assets/image.png";
import { ProfilePage } from "../components/Profile_page/Profile_page.jsx";

// filepath: d:\college_project\RentMate-1\frontend\src\User\Search_page.jsx

export const SearchResultPage = () => {
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
                            placeholder="electronic city, bengaluru"
                            className="w-full bg-transparent border-none outline-none text-xl opacity-50"
                        />
                    </div>
                </div>

                {/* Results Info */}
                <p className="text-center text-[#b3b3b3] mb-8">
                    showing results for "electronic city, bengaluru"
                </p>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Example Property Card */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
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
                    {/* Repeat the above card for more properties */}
                </div>
            </div>
        </div>
    );
};