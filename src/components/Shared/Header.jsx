import React, { useState } from "react";
import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";

const Header = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <main>
      <div className="flex justify-between items-center px-5 py-2.5 border-b border-gray-300">
        {/* Title */}
        <h3 className="text-primary flex items-center gap-3">
          <FaBars />
          <span className="font-semibold">Home</span>
        </h3>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md outline-none w-96 h-9 px-5"
            placeholder="Search..."
          />
          <div className="absolute top-0 right-0 bg-primary py-2.5 w-10 flex items-center justify-center rounded-r-md text-white hover:text-white hover:bg-primary transition-all duration-700 cursor-pointer">
            <FaMagnifyingGlass />
          </div>
        </div>

        {/* Admin */}
        <div className="relative bg-white p-2 rounded-md flex gap-2 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            <img
              src={avatar}
              alt="Admin"
              className="w-8 rounded-2xl drop-shadow"
            />
            <h3 className="font-semibold text-gray-500">Admin</h3>
          </div>

          {/* Dropdown */}
          {isAdminOpen && (
            <div className="absolute right-0 top-14 w-52 bg-white drop-shadow p-5 rounded-md shadow-lg z-50">
              <p className="font-semibold text-primary">Admin</p>
              <span className="text-sm text-gray-600">admin@gmail.com</span>
              <p className="mt-4">
                <button className="text-red-500 font-medium hover:underline">
                  Sign out
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
