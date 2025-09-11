import React from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import loginBackgroundDesign2 from "../assets/login-background-design-2.png";
import rupee1 from "../assets/rupee1.png";
import { ProfilePage } from "../components/Profile_page/Profile_page.jsx";

export const PropertyDetails = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Profile */}
      <aside className="hidden md:flex md:flex-col md:w-72 lg:w-80 h-screen fixed top-0 left-0 z-20 bg-white border-r shadow">
        <div className="flex-1 flex flex-col items-center py-8 px-4">
          <ProfilePage />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-2 md:pl-80 w-full">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col md:flex-row gap-8 max-w-5xl w-full mt-8 md:mt-0">
          {/* Left Side - Images */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <img
              className="w-full h-48 md:h-64 object-cover rounded"
              alt="Property main"
              src={image1}
            />
            <div className="flex gap-4">
              <img
                className="w-1/2 h-20 md:h-28 object-cover rounded"
                alt="Property view 1"
                src={image2}
              />
              <img
                className="w-1/2 h-20 md:h-28 object-cover rounded"
                alt="Property view 2"
                src={image3}
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col justify-between md:w-1/2">
            <div>
              {/* Property Name */}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Trinity Haven
              </h2>

              {/* Price */}
              <div className="flex items-center gap-1 mt-2">
                <img className="w-5 h-5" alt="Rupee" src={rupee1} />
                <span className="text-lg md:text-xl text-gray-600 font-medium">
                  1,25,000
                </span>
              </div>

              {/* Address */}
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                Electronic city street, phase I, Bengaluru, Karnataka.
              </p>

              {/* Description */}
              <div className="mt-6 text-gray-600 text-sm md:text-base">
                <h3 className="text-base font-semibold mb-2">DESCRIPTION</h3>
                <p>
                  Spacious 2BHK Rental Property - Perfect for up to 4 Roommates.
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Amenities:</span> wi-fi,
                  washing machine, refrigerator, parking, balcony, etc.
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Nearby:</span> Markets, grocery
                  stores, public transport, colleges/offices.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition">
                Find Roommates
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Send Application
              </button>
            </div>
          </div>
        </div>
        {/* Background Illustration */}
        <img
          className="absolute bottom-6 right-6 w-24 md:w-40 lg:w-56 opacity-70 pointer-events-none"
          alt="Background"
          src={loginBackgroundDesign2}
        />
      </main>
    </div>
  );
};
