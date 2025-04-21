import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { FaTruck, FaPlus, FaFilter, FaPen, FaTrashAlt } from "react-icons/fa";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
// export
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Fuel = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [taxDate, setTaxDate] = useState(null);
  const dateRef = useRef(null);
  const [fuel, setFuel] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/api/fuel")
      .then((response) => {
        if (response.data.status === "success") {
          setFuel(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading fuel...</p>;

  console.log("fuel", fuel);
  // export functionality
  const headers = [
    { label: "#", key: "index" },
    { label: "ড্রাইভারের নাম", key: "driver_name" },
    { label: "গাড়ির নাম", key: "vehicle_name" },
    { label: "ফুয়েলের ধরন", key: "type" },
    { label: "ফুয়েলিং তারিখ", key: "date_time" },
    { label: "গ্যালন/লিটার", key: "quantity" },
    { label: "লিটার প্রতি খরচ", key: "price" },
    { label: "সকল খরচ", key: "total" },
  ];

  const csvData = fuel.map((dt, index) => ({
    index: index + 1,
    driver_name: dt.driver_name,
    vehicle_name: dt.vehicle_number,
    type: dt.type,
    date_time: dt.date_time,
    quantity: dt.quantity,
    price: dt.price,
    total: dt.quantity * dt.price,
  }));

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fuel Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "fuel_data.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "#",
      "ড্রাইভারের নাম",
      "গাড়ির নাম",
      "ফুয়েলের ধরন",
      "ফুয়েলিং তারিখ",
      "গ্যালন/লিটার",
      "লিটার প্রতি খরচ",
      "সকল খরচ",
    ];

    const tableRows = fuel.map((dt, index) => [
      index + 1,
      dt.driver_name,
      dt.driver_name,
      dt.type,
      dt.date_time,
      dt.quantity,
      dt.price,
      dt.quantity * dt.price,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("fuel_data.pdf");
  };

  const printTable = () => {
    const printContent = document.querySelector("table").outerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(`
    <html>
      <head><title>Print</title></head>
      <body>${printContent}</body>
    </html>
  `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            ফুয়েল হিসাব
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/FuelForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> ফুয়েল
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
        <div className="md:flex justify-between items-center">
          <div className="flex bg-gray-200 text-primary font-semibold rounded-md">
            <CSVLink
              data={csvData}
              headers={headers}
              filename={"fuel_data.csv"}
              className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              CSV
            </CSVLink>
            <button
              onClick={exportExcel}
              className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              Excel
            </button>
            <button
              onClick={exportPDF}
              className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              PDF
            </button>
            <button
              onClick={printTable}
              className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              Print
            </button>
          </div>

          <div className="mt-3 md:mt-0">
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
          <div className="flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <DatePicker
                selected={taxDate}
                onChange={(date) => setTaxDate(date)}
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
                selected={taxDate}
                onChange={(date) => setTaxDate(date)}
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
            <div className="mt-2 md:mt-0 w-full relative">
              <select
                name="driverName"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">গাড়ির নাম...</option>
                <option value="Motin Ali">Motin Ali</option>
                <option value="Korim Ali">Korim Ali</option>
                <option value="Solaiman Ali">Solaiman Ali</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-3 right-2 pointer-events-none text-xl text-gray-500" />
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
                <th className="px-2 md:px-4 py-3">ড্রাইভারের নাম</th>
                <th className="px-2 md:px-4 py-3">গাড়ির নাঃ</th>
                <th className="px-2 md:px-4 py-3">ফুয়েলের ধরন</th>
                <th className="px-2 md:px-4 py-3">ফুয়েলিং তারিখ</th>
                <th className="px-2 md:px-4 py-3">গ্যালন/লিটার</th>
                <th className="px-2 md:px-4 py-3">লিটার প্রতি খরচ</th>
                <th className="px-2 md:px-4 py-3">সকল খরচ</th>
                <th className="px-2 md:px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {fuel?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-4 font-bold">{index + 1}</td>
                  <td className="px-4 py-4">{dt.driver_name}</td>
                  <td className="px-4 py-4">{dt.vehicle_number}</td>
                  <td className="px-4 py-4">{dt.type}</td>
                  <td className="px-4 py-4">{dt.date_time}</td>
                  <td className="px-4 py-4">{dt.quantity}</td>
                  <td className="px-4 py-4">{dt.price}</td>
                  <td className="px-4 py-4">{dt.quantity * dt.price}.00</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary bg-green-50 border border-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaPen className="text-[12px]" />
                      </button>
                      <button className="text-red-900 bg-red-50 border border-red-700 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaTrashAlt className="text-[12px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Fuel;
