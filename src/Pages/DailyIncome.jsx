// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTruck, FaFilter, FaPen } from "react-icons/fa";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
// const DailyIncome = () => {
//   const [trips, setTrips] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   // Date filter state
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // Fetch data
//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await axios.get("https://api.dropshep.com/api/trip");
//         const sorted = res.data.data.sort(
//           (a, b) => new Date(b.trip_date) - new Date(a.trip_date)
//         );
//         setTrips(sorted);
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//       }
//     };
//     fetchTrips();
//   }, []);
//   // search
//   const filteredIncome = trips.filter((dt) => {
//     const term = searchTerm.toLowerCase();
//     const tripDate = dt.trip_date;
//     const matchesSearch =
//       dt.trip_date?.toLowerCase().includes(term) ||
//       dt.trip_time?.toLowerCase().includes(term) ||
//       dt.load_point?.toLowerCase().includes(term) ||
//       dt.unload_point?.toLowerCase().includes(term) ||
//       dt.driver_name?.toLowerCase().includes(term) ||
//       dt.driver_contact?.toLowerCase().includes(term) ||
//       String(dt.driver_percentage).includes(term) ||
//       dt.fuel_price?.toLowerCase().includes(term) ||
//       dt.gas_price?.toLowerCase().includes(term) ||
//       dt.vehicle_number?.toLowerCase().includes(term) ||
//       dt.other_expenses?.toLowerCase().includes(term) ||
//       dt.trip_price?.toLowerCase().includes(term);
//     const matchesDateRange =
//       (!startDate || new Date(tripDate) >= new Date(startDate)) &&
//       (!endDate || new Date(tripDate) <= new Date(endDate));
//     return matchesSearch && matchesDateRange;
//   });
//   // ✅ Correct headers matching your table
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "তারিখ", key: "trip_date" },
//     { label: "গাড়ি", key: "vehicle_number" },
//     { label: "লোড", key: "load_point" },
//     { label: "আনলোড", key: "unload_point" },
//     { label: "ট্রিপের ভাড়া", key: "trip_price" },
//     { label: "চলমানখরচ", key: "totalCost" }, // corrected key
//     { label: "লাভ", key: "profit" }, // corrected key
//   ];

//   // ✅ Correct CSV data mapping
//   const csvData = trips.map((dt, index) => {
//     const fuel = parseFloat(dt.fuel_price ?? "0") || 0;
//     const gas = parseFloat(dt.gas_price ?? "0") || 0;
//     const others = parseFloat(dt.other_expenses ?? "0") || 0;
//     const commission = parseFloat(dt.driver_percentage ?? "0") || 0;
//     const totalCost = (fuel + gas + others + commission).toFixed(2);
//     const profit = (
//       parseFloat(dt.trip_price ?? "0") - parseFloat(totalCost)
//     ).toFixed(2);

//     return {
//       index: index + 1,
//       trip_date: new Date(dt.trip_date).toLocaleDateString("en-GB"), // format date like in table
//       vehicle_number: dt.vehicle_number,
//       load_point: dt.load_point,
//       unload_point: dt.unload_point,
//       trip_price: dt.trip_price,
//       totalCost, // ✅ use calculated total cost
//       profit, // ✅ use calculated profit
//     };
//   });

//   // ✅ Export Excel function
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(csvData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Data");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "dailyincome_data.xlsx");
//   };

//   // ✅ Export PDF function
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     const headers = [
//       { label: "#", key: "index" },
//       { label: "Date", key: "trip_date" },
//       { label: "Car", key: "vehicle_number" },
//       { label: "Load", key: "load_point" },
//       { label: "Unload", key: "unload_point" },
//       { label: "Trip Price", key: "trip_price" },
//       { label: "Total Cost", key: "totalCost" }, // corrected key
//       { label: "Profit", key: "profit" }, // corrected key
//     ];
//     const tableColumn = headers.map((h) => h.label);
//     const tableRows = csvData.map((row) => headers.map((h) => row[h.key]));

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("dailyincome_data.pdf");
//   };

//   // ✅ Print function
//   const printTable = () => {
//     // hide specific column
//     const actionColumns = document.querySelectorAll(".action_column");
//     actionColumns.forEach((col) => {
//       col.style.display = "none";
//     });
//     const printContent = document.querySelector("table").outerHTML;
//     const WinPrint = window.open("", "", "width=900,height=650");
//     WinPrint.document.write(`
//     <html>
//       <head>
//         <title>Print</title>
//         <style>
//           table { width: 100%; border-collapse: collapse; }
//           th, td { border: 1px solid #000; padding: 8px; text-align: center; }
//         </style>
//       </head>
//       <body>${printContent}</body>
//     </html>
//   `);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
//   };

//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTrips = filteredIncome.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(trips.length / itemsPerPage);
//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
//   };
//   const handleNextPage = () => {
//     if (currentPage < totalPages)
//       setCurrentPage((currentPage) => currentPage + 1);
//   };
//   const handlePageClick = (number) => {
//     setCurrentPage(number);
//   };

//   return (
//     <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             আয়ের তালিকা
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <button
//               onClick={() => setShowFilter((prev) => !prev)}
//               className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
//             >
//               <FaFilter /> ফিল্টার
//             </button>
//           </div>
//         </div>
//         {/* Conditional Filter Section */}
//         {showFilter && (
//           <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
//             <div className="relative w-64">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 placeholder="Start date"
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>

//             <div className="relative w-64">
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 placeholder="End date"
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>

//             <div className="mt-3 md:mt-0 flex gap-2">
//               <button
//                 onClick={() => setCurrentPage(1)}
//                 className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
//               >
//                 <FaFilter /> ফিল্টার
//               </button>
//             </div>
//           </div>
//         )}
//         {/* Export & Search */}
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename={"dailyincome_data.csv"}
//               className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//             >
//               CSV
//             </CSVLink>
//             <button
//               onClick={exportExcel}
//               className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//             >
//               Excel
//             </button>
//             <button
//               onClick={exportPDF}
//               className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//             >
//               PDF
//             </button>
//             <button
//               onClick={printTable}
//               className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//             >
//               Print
//             </button>
//           </div>
//           {/* search */}
//           <div className="mt-3 md:mt-0">
//             <span className="text-primary font-semibold pr-3">Search: </span>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               placeholder="সার্চ করুন..."
//               className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
//             />
//           </div>
//         </div>
//         {/* Table */}
//         <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-[#11375B] text-white uppercase text-sm">
//               <tr>
//                 <th className="px-4 py-3">#</th>
//                 <th className="px-4 py-3">তারিখ</th>
//                 <th className="px-4 py-3">গাড়ি</th>
//                 <th className="px-4 py-3">লোড</th>
//                 <th className="px-4 py-3">আনলোড</th>
//                 {/* <th className="px-4 py-3">কাস্টমার</th> */}
//                 <th className="px-4 py-3">ট্রিপের ভাড়া</th>
//                 {/* <th className="px-4 py-3">জরিমানা</th> */}
//                 <th className="px-4 py-3">চলমানখরচ</th>
//                 <th className="px-4 py-3">লাভ</th>
//                 <th className="px-4 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentTrips.map((trip, index) => (
//                 <tr
//                   key={trip.id || index}
//                   className="hover:bg-gray-50 transition-all"
//                 >
//                   <td className="px-4 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-4 py-4">
//                     {new Date(trip.trip_date).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="px-4 py-4">{trip.vehicle_number}</td>
//                   <td className="px-4 py-4">{trip.load_point}</td>
//                   <td className="px-4 py-4">{trip.unload_point}</td>
//                   <td className="px-4 py-4">{trip.trip_price}</td>
//                   <td className="px-4 py-4">
//                     {(
//                       Number(trip.other_expenses || 0) +
//                       Number(trip.gas_price || 0) +
//                       Number(trip.fuel_price || 0) +
//                       Number(trip.driver_percentage || 0)
//                     ).toFixed(2)}
//                   </td>
//                   <td className="px-4 py-4">
//                     {Number(trip.trip_price || 0) -
//                       (
//                         Number(trip.other_expenses || 0) +
//                         Number(trip.gas_price || 0) +
//                         Number(trip.fuel_price || 0) +
//                         Number(trip.driver_percentage || 0)
//                       ).toFixed(2)}
//                     {/* {trip.profit || "00"} */}
//                   </td>
//                   <td className="action_column">
//                     <div className="flex justify-center">
//                       <Link to={`/UpdateDailyIncomeForm/${trip.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* pagination */}
//         <div className="mt-10 flex justify-center">
//           <div className="space-x-2 flex items-center">
//             <button
//               onClick={handlePrevPage}
//               className={`p-2 ${
//                 currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
//               } rounded-sm`}
//               disabled={currentPage === 1}
//             >
//               <GrFormPrevious />
//             </button>
//             {[...Array(totalPages).keys()].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => handlePageClick(number + 1)}
//                 className={`px-3 py-1 rounded-sm ${
//                   currentPage === number + 1
//                     ? "bg-primary text-white hover:bg-gray-200 hover:text-primary transition-all duration-300 cursor-pointer"
//                     : "bg-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//             <button
//               onClick={handleNextPage}
//               className={`p-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300"
//                   : "bg-primary text-white"
//               } rounded-sm`}
//               disabled={currentPage === totalPages}
//             >
//               <GrFormNext />
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default DailyIncome;


"use client"

import { useEffect, useState, useRef } from "react"
import {
  Table,
  Button,
  Input,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Tooltip,
  DatePicker,
  message,
  Statistic,
  Divider,
} from "antd"
import {
  TruckOutlined,
  EditOutlined,
  FilterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  CalendarOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons"
import axios from "axios"
import { Link } from "react-router-dom"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker

const DailyIncome = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const printRef = useRef()

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/trip`)
      const sorted = response.data.data.sort((a, b) => new Date(b.trip_date) - new Date(a.trip_date))
      setTrips(sorted)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching trips:", error)
      // message.error("ট্রিপ ডেটা লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  // Export functionality
  const csvData = trips.map((dt, index) => {
    const fuel = Number.parseFloat(dt.fuel_price ?? "0") || 0
    const gas = Number.parseFloat(dt.gas_price ?? "0") || 0
    const others = Number.parseFloat(dt.other_expenses ?? "0") || 0
    const commission = Number.parseFloat(dt.driver_percentage ?? "0") || 0
    const totalCost = (fuel + gas + others + commission).toFixed(2)
    const profit = (Number.parseFloat(dt.trip_price ?? "0") - Number.parseFloat(totalCost)).toFixed(2)

    return {
      index: index + 1,
      trip_date: new Date(dt.trip_date).toLocaleDateString("en-GB"),
      vehicle_number: dt.vehicle_number,
      load_point: dt.load_point,
      unload_point: dt.unload_point,
      trip_price: dt.trip_price,
      totalCost,
      profit,
    }
  })

  const exportCSV = () => {
    const csvContent = [
      ["#", "তারিখ", "গাড়ি", "লোড", "আনলোড", "ট্রিপের ভাড়া", "চলমানখরচ", "লাভ"],
      ...csvData.map((item) => [
        item.index,
        item.trip_date,
        item.vehicle_number,
        item.load_point,
        item.unload_point,
        item.trip_price,
        item.totalCost,
        item.profit,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "daily_income_data.csv")
  }

  const exportExcel = () => {
    const headers = ["#", "তারিখ", "গাড়ি", "লোড", "আনলোড", "ট্রিপের ভাড়া", "চলমানখরচ", "লাভ"]

    const formattedData = csvData.map((item) => ({
      "#": item.index,
      তারিখ: item.trip_date,
      গাড়ি: item.vehicle_number,
      লোড: item.load_point,
      আনলোড: item.unload_point,
      "ট্রিপের ভাড়া": item.trip_price,
      চলমানখরচ: item.totalCost,
      লাভ: item.profit,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Income Data")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "daily_income_data.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = ["#", "Date", "Car", "Load", "Unload", "Trip Price", "Total Cost", "Profit"]

    const tableRows = csvData.map((item) => [
      item.index,
      item.trip_date,
      item.vehicle_number,
      item.load_point,
      item.unload_point,
      item.trip_price,
      item.totalCost,
      item.profit,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })

    doc.save("daily_income_data.pdf")
  }

  // Print function
  const printTable = () => {
    const printContent = printRef.current.innerHTML
    const WinPrint = window.open("", "", "width=900,height=650")
    WinPrint.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            .ant-btn { display: none; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `)
    WinPrint.document.close()
    WinPrint.focus()
    WinPrint.print()
    WinPrint.close()
  }

  // Filter trips data
  const filteredTrips = trips.filter((dt) => {
    const term = searchTerm.toLowerCase()

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
      dt.trip_price?.toLowerCase().includes(term)

    // Simple date filtering
    let matchesDateRange = true
    if (dateRange.length === 2) {
      const tripDate = new Date(dt.trip_date)
      const startDate = new Date(dateRange[0])
      const endDate = new Date(dateRange[1])
      matchesDateRange = tripDate >= startDate && tripDate <= endDate
    }

    return matchesSearch && matchesDateRange
  })

  // Calculate totals
  const totalTrips = filteredTrips.length
  const totalRevenue = filteredTrips.reduce((sum, trip) => sum + Number(trip.trip_price || 0), 0)
  const totalCost = filteredTrips.reduce((sum, trip) => {
    const fuel = Number(trip.fuel_price || 0)
    const gas = Number(trip.gas_price || 0)
    const others = Number(trip.other_expenses || 0)
    const commission = Number(trip.driver_percentage || 0)
    return sum + fuel + gas + others + commission
  }, 0)
  const totalProfit = totalRevenue - totalCost
  const averageProfit = totalTrips > 0 ? totalProfit / totalTrips : 0

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "index",
      width: 50,
      render: (_, __, index) => (
        <Text strong style={{ color: "#11375b" }}>
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </Text>
      ),
    },
    {
      title: "তারিখ",
      dataIndex: "trip_date",
      key: "trip_date",
      // width: 120,
      render: (date) => (
        <Space>
          <Text>{new Date(date).toLocaleDateString("en-GB")}</Text>
        </Space>
      ),
    },
    {
      title: "গাড়ি",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      // width: 100,
      render: (vehicle) => (
        <Space>
          <Text strong>{vehicle}</Text>
        </Space>
      ),
    },
    {
      title: "লোড",
      dataIndex: "load_point",
      key: "load_point",
      // width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (load) => (
        <Tooltip placement="topLeft" title={load}>
          {load}
        </Tooltip>
      ),
    },
    {
      title: "আনলোড",
      dataIndex: "unload_point",
      key: "unload_point",
      // width: 130,
      ellipsis: {
        showTitle: false,
      },
      render: (unload) => (
        <Tooltip placement="topLeft" title={unload}>
          {unload}
        </Tooltip>
      ),
    },
    {
      title: "ট্রিপের ভাড়া",
      dataIndex: "trip_price",
      key: "trip_price",
      // width: 120,
      render: (price) => (
        <Space>
          <Text strong> {price}</Text>
        </Space>
      ),
    },
    {
      title: "চলমানখরচ",
      key: "total_cost",
      // width: 120,
      render: (_, record) => {
        const totalCost = (
          Number(record.other_expenses || 0) +
          Number(record.gas_price || 0) +
          Number(record.fuel_price || 0) +
          Number(record.driver_percentage || 0)
        ).toFixed(2)
        return (
          <Space>
            <Text> {totalCost}</Text>
          </Space>
        )
      },
    },
    {
      title: "লাভ",
      key: "profit",
      // width: 120,
      render: (_, record) => {
        const totalCost =
          Number(record.other_expenses || 0) +
          Number(record.gas_price || 0) +
          Number(record.fuel_price || 0) +
          Number(record.driver_percentage || 0)
        const profit = Number(record.trip_price || 0) - totalCost
        return (
          <Space>
            <Text strong style={{ color: profit >= 0 ? "" : "#ff4d4f" }}>
              {profit.toFixed(2)}
            </Text>
          </Space>
        )
      },
    },
    // {
    //   title: "অ্যাকশন",
    //   key: "actions",
    //   width: 50,
    //   render: (_, record) => (
    //     <Tooltip title="সম্পাদনা">
    //                 <Link to={`/tramessy/update-dailyIncomeForm/${record.id}`}>
    //                     <EditOutlined
    //                       className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
    //                     />
    //                     </Link>
    //                   </Tooltip>
    //   ),
    // },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <Card
        className=""
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }} gutter={[16, 16]}>
          <Col>
            <Title level={4} style={{ margin: 0, color: "#11375B" }}>
              <TruckOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              আয়ের তালিকা
            </Title>
          </Col>
          <Col>
             <Button
  icon={<FilterOutlined />}
  onClick={() => setShowFilter(!showFilter)}
  className={`border border-[#11375b] px-4 py-1 rounded 
    ${showFilter ? "bg-[#11375b] text-white" : "bg-transparent text-[#11375b]"}`}
>
  ফিল্টার
              </Button>
          </Col>
        </Row>

        {/* Filter Section */}
        {showFilter && (
          <Card style={{ marginBottom: "16px" }}>
            <Row gutter={16} align="middle">
              <Col sm={10} lg={20}>
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={(dates) => setDateRange(dates ?? [])}
                  placeholder={["শুরুর তারিখ", "শেষের তারিখ"]}
                />
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  icon={<FilterOutlined />}
                  style={{ background: "#11375B", borderColor: "#11375B" }}
                >
                  ফিল্টার
                </Button>
              </Col>
            </Row>
          </Card>
        )}

        {/* Export and Search */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }} gutter={[16, 16]}>
          <Col>
            <Space wrap>
              {/* CSV */}
              <Button
                icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
                onClick={exportCSV}
                className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary"
              >
                CSV
              </Button>
              {/* Excel */}
              <Button
                icon={<FileExcelOutlined style={{ color: "#52c41a" }} />}
                onClick={exportExcel}
                className="!bg-green-50 border !border-green-100 hover:!bg-white hover:!text-primary"
              >
                Excel
              </Button>
              {/* PDF */}
              <Button
                icon={<FilePdfOutlined style={{ color: "#f5222d" }} />}
                onClick={exportPDF}
                className="!bg-orange-50 border !border-orange-100 hover:!bg-white hover:!text-primary"
              >
                PDF
              </Button>
              {/* Print */}
              <Button
                icon={<PrinterOutlined style={{ color: "#722ed1" }} />}
                onClick={printTable}
                className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary"
              >
                Print
              </Button>
            </Space>
          </Col>

          {/* Search */}
          <Col>
            <Search
              placeholder="আয় খুঁজুন...."
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton={
                <Button
                  className="!bg-primary !border-primary"
                  style={{
                    backgroundColor: "#11375B"
                  }}
                >
                  <SearchOutlined className="!text-white"/>
                </Button>
              }
            />
          </Col>
        </Row>

        {/* Table */}
        <div ref={printRef}>
          <Table
            columns={columns}
            dataSource={filteredTrips}
            loading={loading}
            rowKey="id"
            scroll={{ x: "max-content" }}
            size="middle"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              onChange: (page, pageSize) => {
                setPagination({ current: page, pageSize })
              },
              onShowSizeChange: (current, size) => {
                setPagination({ current: 1, pageSize: size })
              },
            }}
            summary={(pageData) => {
              let totalPageRevenue = 0
              let totalPageCost = 0

              pageData.forEach((trip) => {
                totalPageRevenue += Number(trip.trip_price || 0)
                const cost =
                  Number(trip.other_expenses || 0) +
                  Number(trip.gas_price || 0) +
                  Number(trip.fuel_price || 0) +
                  Number(trip.driver_percentage || 0)
                totalPageCost += cost
              })

              const totalPageProfit = totalPageRevenue - totalPageCost

              return (
                <Table.Summary fixed>
                  <Table.Summary.Row style={{ backgroundColor: "#e6f7ff" }}>
                    <Table.Summary.Cell index={0} colSpan={5}>
                      <Text strong style={{ color: "#11375B" }}>
                       Total
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageRevenue.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageCost.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text strong style={{ color: totalPageProfit >= 0 ? "#11375B" : "#ff4d4f" }}>
                        ৳ {totalPageProfit.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell />
                  </Table.Summary.Row>
                </Table.Summary>
              )
            }}
          />
        </div>

        {/* Additional Summary */}
        {/* <Divider />
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>গড় ট্রিপ আয়</Text>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#11375B" }}>
                ৳ {totalTrips > 0 ? (totalRevenue / totalTrips).toFixed(2) : 0}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>গড় ট্রিপ খরচ</Text>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#11375B" }}>
                ৳ {totalTrips > 0 ? (totalCost / totalTrips).toFixed(2) : 0}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>লাভের হার</Text>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: totalProfit >= 0 ? "#52c41a" : "#ff4d4f",
                }}
              >
                {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </Col>
        </Row> */}
      </Card>
    </div>
  )
}

export default DailyIncome
