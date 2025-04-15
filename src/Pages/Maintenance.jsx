import React, { useState } from "react";
import {
  FaTruck,
  FaPlus,
  FaFilter,
  FaPen,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Maintenance = () => {
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter section

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            মেইনটেনেন্স
          </h1>
          <div className="flex gap-2">
            <Link to="/MaintenanceForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> মেইনটেনেন্স
              </button>
            </Link>
            <button
              onClick={() => setShowFilter((prev) => !prev)} // Toggle filter
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> ফিল্টার
            </button>
          </div>
        </div>
        {/* export */}
        <div className="flex justify-between items-center">
          <div className="flex bg-gray-200 text-primary font-semibold rounded-md">
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              CSV
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Excel
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              PDF
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Print
            </button>
          </div>
          <div>
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              placeholder=""
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="mt-5 space-y-5 transition-all duration-300 pb-5">
            <div>
              <h3 className="text-[#11375B] font-semibold">Employee type</h3>
              <select className="border border-[#11375B] border-b-2 mt-2 py-2 px-3 outline-none rounded-md bg-transparent">
                <option>Please select one</option>
                <option>External</option>
                <option>Internal</option>
              </select>
            </div>

            <div>
              <h3 className="text-[#11375B] font-semibold">Blood group</h3>
              <select className="border border-[#11375B] border-b-2 mt-2 py-2 px-3 outline-none rounded-md bg-transparent">
                <option>Please select one</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>
        )}
        {/* Table */}
      </div>
    </main>
  );
};

export default Maintenance;
