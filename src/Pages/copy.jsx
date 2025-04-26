import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import {
  FaTruck,
  FaPlus,
  FaFilter,
  FaPen,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const TripList = () => {
  const [trip, setTrip] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [tripDate, settripDate] = useState(null);
  const dateRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // delete modal

  // search
  const [searchTerm, setSearchTerm] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/api/trip")
      .then((response) => {
        if (response.data.status === "success") {
          setTrip(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading trip...</p>;
  console.log("trip:", trip);

  // search
  const filteredTrip = trip.filter((dt) => {
    const term = searchTerm.toLowerCase();
    return (
      dt.trip_date?.toLowerCase().includes(term) ||
      dt.trip_time?.toLowerCase().includes(term) ||
      dt.load_point?.toLowerCase().includes(term) ||
      dt.unload_point?.toLowerCase().includes(term) ||
      dt.driver_name?.toLowerCase().includes(term) ||
      dt.driver_contact?.toLowerCase().includes(term) ||
      String(dt.driver_percentage).includes(term) ||
      dt.fuel_price?.toLowerCase().includes(term) ||
      dt.gas_price?.toLowerCase().includes(term) ||
      dt.vehicle_number?.toLowerCase().includes(term) ||
      dt.other_expenses?.toLowerCase().includes(term) ||
      dt.trip_price?.toLowerCase().includes(term)
    );
  });
  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrip = filteredTrip.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trip.length / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage((currentPage) => currentPage + 1);
  };
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            ট্রিপের হিসাব
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/AddTripForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> ট্রিপ
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
        {/* export and search*/}
        <div className="md:flex justify-between items-center">
          <div className="mt-3 md:mt-0">
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="সার্চ করুন..."
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <DatePicker
                selected={tripDate}
                onChange={(date) => settripDate(date)}
                ref={dateRef}
                placeholderText="শুরুর তারিখ..."
                className="mt-1 w-64 text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                dateFormat="dd/MM/yyyy"
              />
              <span
                onClick={() => dateRef.current?.setOpen(true)}
                className="absolute top-1 right-0 text-xl text-white bg-primary px-4 py-[9px] rounded-r-md cursor-pointer"
              >
                <HiMiniCalendarDateRange />
              </span>
            </div>
            <div className="relative w-64">
              <DatePicker
                selected={tripDate}
                onChange={(date) => settripDate(date)}
                ref={dateRef}
                placeholderText="শেষের তারিখ..."
                className="mt-1 w-64 text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                dateFormat="dd/MM/yyyy"
              />
              <span
                onClick={() => dateRef.current?.setOpen(true)}
                className="absolute top-1 right-0 text-xl text-white bg-primary px-4 py-[9px] rounded-r-md cursor-pointer"
              >
                <HiMiniCalendarDateRange />
              </span>
            </div>

            <div className="flex gap-2">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaFilter /> ফিল্টার
              </button>
            </div>
          </div>
        )}
        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-2 md:px-4 py-3">#</th>
                <th className="px-2 md:px-4 py-3">তারিখ</th>
                <th className="px-2 md:px-4 py-3">ড্রাইভার ইনফো</th>
                <th className="px-2 md:px-4 py-3">ট্রিপ এবং গন্তব্য</th>
                <th className="px-2 md:px-4 py-3">ট্রিপের খরচ</th>
                <th className="px-2 md:px-4 py-3">ট্রিপের ভাড়া</th>
                <th className="px-2 md:px-4 py-3">টোটাল আয়</th>
                <th className="px-2 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {currentTrip?.map((dt, index) => {
                const fuel = parseFloat(dt.fuel_price ?? "0") || 0;
                const gas = parseFloat(dt.gas_price ?? "0") || 0;
                const others = parseFloat(dt.other_expenses ?? "0") || 0;
                const commision = dt.driver_percentage;
                const totalCost = (fuel + gas + others + commision).toFixed(2);

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-all border-b border-gray-300"
                  >
                    <td className="px-4 py-4 font-bold">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-4">{dt.trip_date}</td>
                    <td className="px-4 py-4">
                      <p>নামঃ {dt.driver_name}</p>
                      <p>মোবাইলঃ {dt.driver_contact}</p>
                      <p>কমিশনঃ {dt.driver_percentage}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p>তারিখঃ {dt.trip_date}</p>
                      <p>লোড পয়েন্টঃ {dt.load_point}</p>
                      <p>আনলোড পয়েন্টঃ {dt.unload_point}</p>
                      <p>ট্রিপের সময়ঃ {dt.trip_time}</p>
                    </td>
                    <td className="px-4 py-4">{totalCost}</td>
                    <td className="px-4 py-4">{dt.trip_price}</td>
                    <td className="px-4 py-4">
                      {dt.trip_price - totalCost}.00
                    </td>
                    <td className="px-2">
                      <div className="flex gap-1">
                        <Link to={`/UpdateTripForm/${dt.id}`}>
                          <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                            <FaPen className="text-[12px]" />
                          </button>
                        </Link>

                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaEye className="text-[12px]" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                        >
                          <FaTrashAlt className="text-[12px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className="mt-10 flex justify-center">
        <div className="space-x-2 flex items-center">
          <button
            onClick={handlePrevPage}
            className={`p-2 ${
              currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
            } rounded-sm`}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageClick(number + 1)}
              className={`px-3 py-1 rounded-sm ${
                currentPage === number + 1
                  ? "bg-primary text-white hover:bg-gray-200 hover:text-primary transition-all duration-300 cursor-pointer"
                  : "bg-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`p-2 ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-primary text-white"
            } rounded-sm`}
            disabled={currentPage === totalPages}
          >
            <GrFormNext />
          </button>
        </div>
      </div>
    </main>
  );
};

export default TripList;
