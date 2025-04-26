import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { FaTruck, FaFilter, FaPen } from "react-icons/fa";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const DailyIncome = () => {
  const [taxDate, setTaxDate] = useState(null);
  const [trips, setTrips] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  // search
  const [searchTerm, setSearchTerm] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const dateRef = useRef(null);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get("https://api.dropshep.com/api/trip");
        const sorted = res.data.data.sort(
          (a, b) => new Date(b.trip_date) - new Date(a.trip_date)
        );
        setTrips(sorted);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };
    fetchTrips();
  }, []);
  console.log("trips", trips);
  // search
  const filteredIncome = trips.filter((dt) => {
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
  const currentTrips = filteredIncome.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trips.length / itemsPerPage);
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
            আয়ের তালিকা
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
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
              <DatePicker
                selected={taxDate}
                onChange={(date) => setTaxDate(date)}
                ref={dateRef}
                placeholderText="ট্যাক্স তারিখ..."
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
                selected={taxDate}
                onChange={(date) => setTaxDate(date)}
                ref={dateRef}
                placeholderText="ট্যাক্স তারিখ..."
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
              <button className="mt-1 bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-sm px-4 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaFilter /> ফিল্টার
              </button>
            </div>
          </div>
        )}
        {/* Export & Search */}
        <div className="md:flex justify-between items-center">
          <div className="flex bg-gray-200 text-primary font-semibold rounded-md">
            {["CSV", "Excel", "PDF", "Print"].map((label) => (
              <button
                key={label}
                className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                {label}
              </button>
            ))}
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
                <th className="px-4 py-3">গাড়ি</th>
                <th className="px-4 py-3">লোড</th>
                <th className="px-4 py-3">আনলোড</th>
                <th className="px-4 py-3">কাস্টমার</th>
                <th className="px-4 py-3">ট্রিপের ভাড়া</th>
                <th className="px-4 py-3">জরিমানা</th>
                <th className="px-4 py-3">চলমানখরচ</th>
                <th className="px-4 py-3">লাভ</th>
                <th className="px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {currentTrips.map((trip, index) => (
                <tr
                  key={trip.id || index}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-4 font-bold">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(trip.trip_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-4">{trip.vehicle_number}</td>
                  <td className="px-4 py-4">{trip.load_point}</td>
                  <td className="px-4 py-4">{trip.unload_point}</td>
                  <td className="px-4 py-4">{trip.customer_name}</td>
                  <td className="px-4 py-4">{trip.trip_price}</td>
                  <td className="px-4 py-4">{trip.penalty || 0}</td>
                  <td className="px-4 py-4">
                    {(
                      Number(trip.other_expenses || 0) +
                      Number(trip.gas_price || 0) +
                      Number(trip.fuel_price || 0) +
                      Number(trip.driver_percentage || 0)
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    {Number(trip.trip_price || 0) -
                      (
                        Number(trip.other_expenses || 0) +
                        Number(trip.gas_price || 0) +
                        Number(trip.fuel_price || 0) +
                        Number(trip.driver_percentage || 0)
                      ).toFixed(2)}
                    {/* {trip.profit || "00"} */}
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaPen className="text-[12px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

export default DailyIncome;
