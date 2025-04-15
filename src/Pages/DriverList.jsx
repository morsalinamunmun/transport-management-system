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
const CarList = () => {
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter section

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            ড্রাইভারের তালিকা
          </h1>
          <div className="flex gap-2">
            <Link to="/AddDriverForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> ড্রাইভার
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
              placeholder="ড্রাইভারের নাম দিয়ে খুজুন..."
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
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">নাম</th>
                <th className="px-4 py-3">মোবাইল</th>
                <th className="px-4 py-3">ঠিকানা</th>
                <th className="px-4 py-3">জরুরি অবস্থা</th>
                <th className="px-4 py-3">লাইসেন্স</th>
                <th className="px-4 py-3">লা.মেয়াদোত্তীর্ণ</th>
                <th className="px-4 py-3">স্ট্যাটাস</th>
                <th className="px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-4 font-bold">1</td>
                <td className="px-4 py-4">Jamal</td>
                <td className="px-4 py-4">0165241524</td>
                <td className="px-4 py-4">Freezer Van</td>
                <td className="px-4 py-4">Baddha</td>
                <td className="px-4 py-4">2</td>
                <td className="px-4 py-4">0</td>
                <td className="px-4 py-4">
                  <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                    Active
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="text-green-900 bg-green-50 border border-green-700 hover:bg-green-900 hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                      <FaPen className="text-[12px]" />
                    </button>
                    <button className="text-blue-900 bg-blue-50 border border-blue-700 hover:bg-blue-900 hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                      <FaEye className="text-[12px]" />
                    </button>
                    <button className="text-red-900 bg-red-50 border border-red-700 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                      <FaTrashAlt className="text-[12px]" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default CarList;
