import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTruck, FaFilter, FaPen } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
const DailyExpense = () => {
  const [showFilter, setShowFilter] = useState(false);
  // Date filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  // search
  const [searchTerm, setSearchTerm] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch data
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
        console.error("Error fetching trip data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading trip...</p>;
  console.log("trip:", trip);
  // search
  const filteredExpense = trip.filter((dt) => {
    const term = searchTerm.toLowerCase();
    const tripDate = dt.trip_date;
    const matchesSearch =
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
      dt.trip_price?.toLowerCase().includes(term);
    const matchesDateRange =
      (!startDate || new Date(tripDate) >= new Date(startDate)) &&
      (!endDate || new Date(tripDate) <= new Date(endDate));
    return matchesSearch && matchesDateRange;
  });
  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrip = filteredExpense.slice(indexOfFirstItem, indexOfLastItem);
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
            ব্যয়ের তালিকা
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)} // Toggle filter
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> ফিল্টার
            </button>
          </div>
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="relative w-64">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <FaFilter /> ফিল্টার
              </button>
            </div>
          </div>
        )}
        {/* export */}
        <div className="md:flex justify-between items-center">
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

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">তারিখ</th>
                <th className="px-4 py-3">গাড়িনা.</th>
                <th className="px-4 py-3">ড্রাইভারের নাম</th>
                <th className="px-4 py-3">ট্রিপ খরচ</th>
                <th className="px-4 py-3">অন্যান্য খরচ</th>
                <th className="px-4 py-3">টোটাল খরচ</th>
                <th className="px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {currentTrip?.map((item, index) => {
                const fuel = parseFloat(item.fuel_price ?? "0") || 0;
                const gas = parseFloat(item.gas_price ?? "0") || 0;
                const others = parseFloat(item.other_expenses ?? "0") || 0;
                const commission =
                  parseFloat(item.driver_percentage ?? "0") || 0;
                const totalCost = (fuel + gas + others + commission).toFixed(2);

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-4 font-bold">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-4">{item.trip_date}</td>
                    <td className="px-4 py-4">{item.vehicle_number}</td>
                    <td className="px-4 py-4">{item.driver_name}</td>
                    <td className="px-4 py-4">
                      {parseFloat(item.trip_price ?? "0").toFixed(2)}
                    </td>
                    <td className="px-4 py-4">{totalCost}</td>
                    <td className="px-4 py-4">
                      {(
                        parseFloat(item.trip_price ?? "0") +
                        parseFloat(totalCost)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <Link to={`/UpdateExpenseForm/${item.id}`}>
                          <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                            <FaPen className="text-[12px]" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      </div>
    </main>
  );
};

export default DailyExpense;
