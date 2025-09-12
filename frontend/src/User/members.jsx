import React from "react";
import loginBackgroundDesign3 from "../assets/login-background-design-2.png";
import Person from "../assets/person.png";

export const MemberDetails = () => {
  // Member card data
  const members = [
    {
      name: "Jacob Jones",
      age: 20,
      gender: "M",
      occupation: "Student",
      sharing: "₹10000",
      ambience: "Peaceful",
      type: "Accept",
    },
    {
      name: "Arlene McCoy",
      age: 28,
      gender: "F",
      occupation: "Employee",
      sharing: "₹10000",
      ambience: "Party",
      type: "Accept",
    },
    {
      name: "Albert Flores",
      age: 24,
      gender: "M",
      occupation: "Student",
      sharing: "₹10000",
      ambience: "",
      type: "Accept",
    },
    {
      name: "Laura Mathew",
      age: 21,
      gender: "F",
      occupation: "Student",
      sharing: "₹10000",
      ambience: "peaceful",
      type: "Accept",
    },
  ];

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#f5f7fa] flex flex-col items-center relative">
      {/* Header */}
      <h2 className="mt-10 mb-8 text-2xl font-bold text-[#1a1a1a]">My Properties</h2>
      
      {/* Grid for member cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 z-10">
        {members.map((mem, idx) => (
          <div
            key={idx}
            className="bg-white shadow border border-gray-300 rounded-xl p-6 flex flex-col min-w-[300px] max-w-[340px] w-full"
          >
            <div className="flex items-start mb-3">
              <img
                src={Person}
                alt="Avatar"
                className="h-10 w-10 object-contain mr-4"
              />
              <div className="flex-1 text-sm text-gray-800">
                <div className="font-semibold">{mem.name}</div>
                Age - {mem.age}
                <br />
                Gender - {mem.gender}
                <br />
                Occupation - {mem.occupation}
                <br />
                Sharing amount - {mem.sharing}
                <br />
                Living ambience
                {mem.ambience ? ` - ${mem.ambience}` : ""}
              </div>
            </div>
            <button className="ml-auto mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm shadow">
              {mem.type}
            </button>
          </div>
        ))}
      </div>

      {/* Create Room Sharing button */}
      <button className="mt-0 mb-10 px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 border border-gray-500 text-gray-700">
        Create Room Sharing
      </button>

      {/* Decorative background image bottom-right */}
      <img
        src={loginBackgroundDesign3}
        alt="Decorative"
        className="pointer-events-none select-none absolute right-4 bottom-2 w-32 md:w-56 opacity-60 z-0"
      />
    </div>
  );
};
