import React from "react";
import arrowBack from "../assets/arrow_back.svg";
import rentmeLogo1 from "../assets/rentme-logo-transparent-1.png";

export const PropertyPage = () => {
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
                <div className="absolute w-[371px] h-[666px] top-[175px] left-[11px] bg-white rounded-2xl border border-solid border-[#d1d9e6] shadow-[2px_4px_4px_#00000040] p-6 space-y-6 overflow-y-auto">

                    {/* Title */}
                    <div>
                        <label className="block font-medium text-gray-800">Title</label>
                        <input
                            type="text"
                            placeholder="Enter property title"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium text-gray-800">Location</label>
                        <input
                            type="text"
                            placeholder="Enter property location"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Rent */}
                    <div>
                        <label className="block font-medium text-gray-800">Rent</label>
                        <input
                            type="number"
                            placeholder="Enter rent amount"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium text-gray-800">Description</label>
                        <textarea
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
                            placeholder="Enter amenities"
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                        />
                    </div>

                    {/* Number of Tenants */}
                    <div>
                        <label className="block font-medium text-gray-800">Number of Tenants</label>
                        <select
                            className="w-full mt-1 p-2 border rounded-lg border-[#d1d9e6] text-gray-600"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select max number of tenants
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4+">4+</option>
                        </select>
                    </div>

                    {/* Photos */}
                    <div>
                        <label className="block font-medium text-gray-800">Photos</label>
                        <div className="flex items-center justify-center w-full h-14 mt-1 bg-[#d9d9d9] rounded-lg cursor-pointer text-gray-500">
                            Upload photos
                        </div>
                    </div>

                    {/* Submit */}
                    <div>
                        <button className="w-full h-10 flex items-center justify-center gap-2 bg-[#2e86de] rounded-lg border border-solid border-[#1b4f9b] text-white font-medium">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
