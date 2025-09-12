import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowBack from "../assets/arrow_back.svg";
import loginBackgroundDesign1 from "../assets/login-background-design-1.png";
import search from "../assets/search.png";
import rectangle112 from "../assets/Rectangle12.svg";
import rectangle113 from "../assets/Rectangle13.svg";
import rectangle114 from "../assets/Rectangle14.svg";
import rectangle115 from "../assets/Rectangle15.svg";
import rectangle11 from "../assets/Rectangle11.svg";
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
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
                <img
                    className="absolute w-44 h-44 top-[334px] left-[1073px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogo1}
                />

                <div className="absolute w-[443px] top-[73px] left-[135px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#2e3a59] text-[64px] tracking-[1.28px] leading-[normal]">
                    Smart Living, <br />
                    Starts Here
                </div>

                <img
                    className="absolute w-[421px] h-[421px] top-[561px] left-[1091px] aspect-[1] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign1}
                />

                <div className="absolute w-[771px] h-[592px] top-[334px] left-[99px]">
                    <div className="absolute w-[749px] h-[67px] top-0 left-0 rounded-[50px]">
                        <div className="absolute w-[749px] h-[67px] top-0 left-0 bg-white rounded-[50px] shadow-[0px_4px_4px_#00415940]">
                            <div className="relative w-[193px] h-[35px] top-3.5 left-[31px]">
                                <div className="absolute w-[39px] h-[35px] top-0 left-0 opacity-50">
                                    <img
                                        className="absolute w-[30px] h-[26px] top-1 left-[5px]"
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
                                    className="absolute w-[500px] h-[25px] top-0 left-[55px] opacity-50 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal] bg-transparent border-none outline-none placeholder:text-black placeholder:opacity-50"
                                />
                            </div>
                        </div>

                        <img 
                            className="absolute w-[30px] h-[30px] top-6 left-[680px] cursor-pointer" 
                            alt="Arrow Back"
                            src={arrowBack}
                            onClick={handleSearch}
                        />
                    </div>

                    <div className="absolute w-[748px] h-[462px] top-[130px] left-px bg-white rounded-[10px] border border-solid border-[#c0b7b7] shadow-[4px_4px_4px_#00000040]">
                        <div className="absolute w-[611px] h-[49px] top-[75px] left-[18px] rounded-[10px]">
                            <div className="absolute w-[611px] h-[49px] top-0 left-0 bg-white rounded-[10px] border border-solid border-[#575656] opacity-50" />

                            <input
                                type="text"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your search location"
                                className="absolute w-[575px] top-[13px] left-[18px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#1e1e1e] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)] bg-transparent border-none outline-none placeholder:text-[#b3b3b3]"
                            />
                        </div>

                        <div className="absolute w-[611px] h-[297px] top-[140px] left-[18px]">
                            <div className="absolute w-[611px] h-[268px] top-[29px] left-0 bg-white rounded-[10px] border border-solid border-[#575656] opacity-50" />

                            <div 
                                className="absolute w-[67px] top-[45px] left-[75px] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("")}
                            >
                                None
                            </div>

                            <div className="absolute w-px top-[162px] left-[142px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                                {""}
                            </div>

                            <div 
                                className="w-[178px] top-[87px] absolute left-[75px] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("1000-5000") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("1000-5000")}
                            >
                                ₹1000 - ₹5000
                            </div>

                            <div 
                                className="w-[193px] top-32 absolute left-[75px] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("5000-15000") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("5000-15000")}
                            >
                                ₹5000 - ₹15000
                            </div>

                            <div 
                                className="w-[210px] top-[169px] absolute left-[75px] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("15000-30000") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("15000-30000")}
                            >
                                ₹15000 - ₹30000
                            </div>

                            <div 
                                className="w-[215px] top-[210px] absolute left-[75px] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("30000-60000") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("30000-60000")}
                            >
                                ₹30000 - ₹60000
                            </div>

                            <div 
                                className="absolute w-[161px] top-[248px] left-[84px] aspect-[5.53] [font-family:'Inter-Light',Helvetica] font-light text-base tracking-[0] leading-[normal] cursor-pointer"
                                style={{ color: isRangeSelected("60000-max") ? "#1e1e1e" : "#b3b3b3" }}
                                onClick={() => handlePriceRangeToggle("60000-max")}
                            >
                                ₹60000 - Max
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-[84px] left-[21px]">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={isRangeSelected("1000-5000") ? rectangle11 : rectangle11}
                                    onClick={() => handlePriceRangeToggle("1000-5000")}
                                    style={{ opacity: isRangeSelected("1000-5000") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-[43px] left-[21px]">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={rectangle11}
                                    onClick={() => handlePriceRangeToggle("")}
                                    style={{ opacity: isRangeSelected("") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-[125px] left-5">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={rectangle112}
                                    onClick={() => handlePriceRangeToggle("5000-15000")}
                                    style={{ opacity: isRangeSelected("5000-15000") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-[166px] left-5">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={rectangle113}
                                    onClick={() => handlePriceRangeToggle("15000-30000")}
                                    style={{ opacity: isRangeSelected("15000-30000") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-52 left-5">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={rectangle114}
                                    onClick={() => handlePriceRangeToggle("30000-60000")}
                                    style={{ opacity: isRangeSelected("30000-60000") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[33px] h-[27px] top-[249px] left-5">
                                <img
                                    className="absolute w-[41px] h-[35px] top-0 -left-1 cursor-pointer"
                                    alt="Rectangle"
                                    src={rectangle115}
                                    onClick={() => handlePriceRangeToggle("60000-max")}
                                    style={{ opacity: isRangeSelected("60000-max") ? 1 : 0.3 }}
                                />
                            </div>

                            <div className="absolute w-[444px] top-0 left-0 font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                                Price
                            </div>
                        </div>

                        <div className="absolute w-[444px] top-[38px] left-[17px] font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                            Location
                        </div>

                        <div className="absolute w-[392px] top-4 left-[17px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                            Filters
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};