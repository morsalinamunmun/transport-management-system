// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaTruck, FaFilter, FaPen } from "react-icons/fa";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
// const DailyExpense = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   // Date filter state
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [trip, setTrip] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // Fetch data
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/trip")
//       .then((response) => {
//         if (response.data.status === "success") {
//           const sortedData = response.data.data.sort((a, b) => {
//             const dateTimeA = new Date(`${a.trip_date}T${a.trip_time}`);
//             const dateTimeB = new Date(`${b.trip_date}T${b.trip_time}`);
//             return dateTimeB - dateTimeA; // descending order
//           });
//           setTrip(sortedData);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching trip data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-16">Loading trip...</p>;
//   // export
//   // ✅ Correct headers matching your table
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "তারিখ", key: "trip_date" },
//     { label: "গাড়ি নাম্বার", key: "vehicle_number" },
//     { label: "ড্রাইভারের নাম", key: "driver_name" },
//     { label: "ট্রিপ খরচ", key: "trip_price" },
//     { label: "অন্যান্য খরচ", key: "totalCost" },
//     { label: "টোটাল খরচ", key: "totalTripCost" },
//   ];

//   // ✅ Correct CSV data mapping
//   const csvData = trip.map((item, index) => {
//     const fuel = parseFloat(item.fuel_price ?? "0") || 0;
//     const gas = parseFloat(item.gas_price ?? "0") || 0;
//     const others = parseFloat(item.other_expenses ?? "0") || 0;
//     const commission = parseFloat(item.driver_percentage ?? "0") || 0;
//     const totalCost = (fuel + gas + others + commission).toFixed(2);

//     const tripPrice = parseFloat(item.trip_price ?? "0") || 0;
//     const totalTripCost = (tripPrice + parseFloat(totalCost)).toFixed(2);

//     return {
//       index: index + 1,
//       trip_date: new Date(item.trip_date).toLocaleDateString("en-GB"), // showing nicely
//       vehicle_number: item.vehicle_number,
//       driver_name: item.driver_name,
//       trip_price: tripPrice.toFixed(2),
//       totalCost,
//       totalTripCost,
//     };
//   });

//   // export functions
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(csvData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Data");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "expense_data.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     const headers = [
//       { label: "#", key: "index" },
//       { label: "Date", key: "trip_date" },
//       { label: "Car Number", key: "vehicle_number" },
//       { label: "Driver Name", key: "driver_name" },
//       { label: "Trip Price", key: "trip_price" },
//       { label: "Other Cost", key: "totalCost" },
//       { label: "Total Cost", key: "totalTripCost" },
//     ];
//     const tableColumn = headers.map((h) => h.label);
//     const tableRows = csvData.map((row) => headers.map((h) => row[h.key]));

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("expense_data.pdf");
//   };

//   const printTable = () => {
//     // hide specific column
//     const actionColumns = document.querySelectorAll(".action_column");
//     actionColumns.forEach((col) => {
//       col.style.display = "none";
//     });
//     const printContent = document.querySelector("table").outerHTML;
//     const WinPrint = window.open("", "", "width=900,height=650");
//     WinPrint.document.write(`
//       <html>
//         <head>
//           <title>Print</title>
//           <style>
//             table { width: 100%; border-collapse: collapse; }
//             th, td { border: 1px solid #000; padding: 8px; text-align: center; }
//           </style>
//         </head>
//         <body>${printContent}</body>
//       </html>
//     `);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
//   };

//   // search
//   const filteredExpense = trip.filter((dt) => {
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
//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTrip = filteredExpense.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(trip.length / itemsPerPage);
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
//             ব্যয়ের তালিকা
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <button
//               onClick={() => setShowFilter((prev) => !prev)} // Toggle filter
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
//         {/* export */}
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename={"dailyExpense_data.csv"}
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
//                 <th className="px-4 py-3">গাড়িনা.</th>
//                 <th className="px-4 py-3">ড্রাইভারের নাম</th>
//                 <th className="px-4 py-3">ট্রিপ খরচ</th>
//                 <th className="px-4 py-3">অন্যান্য খরচ</th>
//                 <th className="px-4 py-3">টোটাল খরচ</th>
//                 <th className="px-4 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentTrip?.map((item, index) => {
//                 const fuel = parseFloat(item.fuel_price ?? "0") || 0;
//                 const gas = parseFloat(item.gas_price ?? "0") || 0;
//                 const others = parseFloat(item.other_expenses ?? "0") || 0;
//                 const commission =
//                   parseFloat(item.driver_percentage ?? "0") || 0;
//                 const totalCost = (fuel + gas + others + commission).toFixed(2);

//                 return (
//                   <tr key={item.id} className="hover:bg-gray-50 transition-all">
//                     <td className="px-4 py-4 font-bold">
//                       {indexOfFirstItem + index + 1}
//                     </td>
//                     <td className="px-4 py-4">{item.trip_date}</td>
//                     <td className="px-4 py-4">{item.vehicle_number}</td>
//                     <td className="px-4 py-4">{item.driver_name}</td>
//                     <td className="px-4 py-4">
//                       {parseFloat(item.trip_price ?? "0").toFixed(2)}
//                     </td>
//                     <td className="px-4 py-4">{totalCost}</td>
//                     <td className="px-4 py-4">
//                       {(
//                         parseFloat(item.trip_price ?? "0") +
//                         parseFloat(totalCost)
//                       ).toFixed(2)}
//                     </td>
//                     <td className="action_column">
//                       <div className="flex justify-center">
//                         <Link to={`/UpdateExpenseForm/${item.id}`}>
//                           <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                             <FaPen className="text-[12px]" />
//                           </button>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
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

// export default DailyExpense;



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
  Spin,
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
  UserOutlined,
  FallOutlined,
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

const DailyTripExpense = () => {
  const [trip, setTrip] = useState([])
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
    fetchTripData()
  }, [])

  const fetchTripData = async () => {
    try {
      const response = await axios.get("https://api.dropshep.com/api/trip")
      if (response.data.status === "success") {
        const sortedData = response.data.data.sort((a, b) => {
          const dateTimeA = new Date(`${a.trip_date}T${a.trip_time}`)
          const dateTimeB = new Date(`${b.trip_date}T${b.trip_time}`)
          return dateTimeB - dateTimeA // descending order
        })
        setTrip(sortedData)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching trip data:", error)
      message.error("ট্রিপ ডেটা লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  // Export functionality
  const csvData = trip.map((item, index) => {
    const fuel = Number.parseFloat(item.fuel_price ?? "0") || 0
    const gas = Number.parseFloat(item.gas_price ?? "0") || 0
    const others = Number.parseFloat(item.other_expenses ?? "0") || 0
    const commission = Number.parseFloat(item.driver_percentage ?? "0") || 0
    const totalCost = (fuel + gas + others + commission).toFixed(2)
    const tripPrice = Number.parseFloat(item.trip_price ?? "0") || 0
    const totalTripCost = (tripPrice + Number.parseFloat(totalCost)).toFixed(2)

    return {
      index: index + 1,
      trip_date: new Date(item.trip_date).toLocaleDateString("en-GB"),
      vehicle_number: item.vehicle_number,
      driver_name: item.driver_name,
      trip_price: tripPrice.toFixed(2),
      totalCost,
      totalTripCost,
    }
  })

  const exportCSV = () => {
    const csvContent = [
      ["#", "তারিখ", "গাড়ি নাম্বার", "ড্রাইভারের নাম", "ট্রিপ খরচ", "অন্যান্য খরচ", "টোটাল খরচ"],
      ...csvData.map((item) => [
        item.index,
        item.trip_date,
        item.vehicle_number,
        item.driver_name,
        item.trip_price,
        item.totalCost,
        item.totalTripCost,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "daily_expense_data.csv")
  }

  const exportExcel = () => {
    const headers = ["#", "তারিখ", "গাড়ি নাম্বার", "ড্রাইভারের নাম", "ট্রিপ খরচ", "অন্যান্য খরচ", "টোটাল খরচ"]

    const formattedData = csvData.map((item) => ({
      "#": item.index,
      তারিখ: item.trip_date,
      "গাড়ি নাম্বার": item.vehicle_number,
      "ড্রাইভারের নাম": item.driver_name,
      "ট্রিপ খরচ": item.trip_price,
      "অন্যান্য খরচ": item.totalCost,
      "টোটাল খরচ": item.totalTripCost,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Expense Data")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "daily_expense_data.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = ["#", "Date", "Car Number", "Driver Name", "Trip Price", "Other Cost", "Total Cost"]

    const tableRows = csvData.map((item) => [
      item.index,
      item.trip_date,
      item.vehicle_number,
      item.driver_name,
      item.trip_price,
      item.totalCost,
      item.totalTripCost,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })

    doc.save("daily_expense_data.pdf")
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
  const filteredExpense = trip.filter((dt) => {
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
  const totalTrips = filteredExpense.length
  const totalTripCost = filteredExpense.reduce((sum, item) => sum + Number(item.trip_price || 0), 0)
  const totalOtherCost = filteredExpense.reduce((sum, item) => {
    const fuel = Number(item.fuel_price || 0)
    const gas = Number(item.gas_price || 0)
    const others = Number(item.other_expenses || 0)
    const commission = Number(item.driver_percentage || 0)
    return sum + fuel + gas + others + commission
  }, 0)
  const totalExpense = totalTripCost + totalOtherCost
  const averageExpense = totalTrips > 0 ? totalExpense / totalTrips : 0

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

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
      width: 120,
      render: (date) => (
        <Space>
          <Text>{date}</Text>
        </Space>
      ),
    },
    {
      title: "গাড়ি না.",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      width: 100,
      render: (vehicle) => (
        <Space>
          <Text strong>{vehicle}</Text>
        </Space>
      ),
    },
    {
      title: "ড্রাইভারের নাম",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 150,
      render: (name) => (
        <Space>
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: "ট্রিপ খরচ",
      dataIndex: "trip_price",
      key: "trip_price",
      width: 120,
      render: (price) => (
        <Space>
          <Text > {Number.parseFloat(price ?? "0").toFixed(2)}</Text>
        </Space>
      ),
    },
    {
      title: "অন্যান্য খরচ",
      key: "other_cost",
      width: 120,
      render: (_, record) => {
        const fuel = Number.parseFloat(record.fuel_price ?? "0") || 0
        const gas = Number.parseFloat(record.gas_price ?? "0") || 0
        const others = Number.parseFloat(record.other_expenses ?? "0") || 0
        const commission = Number.parseFloat(record.driver_percentage ?? "0") || 0
        const totalCost = (fuel + gas + others + commission).toFixed(2)
        return (
          <Space>
            <Text> {totalCost}</Text>
          </Space>
        )
      },
    },
    {
      title: "টোটাল খরচ",
      key: "total_cost",
      width: 120,
      render: (_, record) => {
        const fuel = Number.parseFloat(record.fuel_price ?? "0") || 0
        const gas = Number.parseFloat(record.gas_price ?? "0") || 0
        const others = Number.parseFloat(record.other_expenses ?? "0") || 0
        const commission = Number.parseFloat(record.driver_percentage ?? "0") || 0
        const totalOtherCost = fuel + gas + others + commission
        const tripPrice = Number.parseFloat(record.trip_price ?? "0") || 0
        const totalCost = (tripPrice + totalOtherCost).toFixed(2)
        return (
          <Space>
            <Text >
             {totalCost}
            </Text>
          </Space>
        )
      },
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Tooltip title="সম্পাদনা">
                    <Link to={`/update-expenseForm/${record.id}`}>
                        <EditOutlined
                          className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                        />
                        </Link>
                      </Tooltip>
      ),
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <Card
        className="max-w-7xl mx-auto"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
          <Col>
            <Title level={3} style={{ margin: 0, color: "#11375B" }}>
              <TruckOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              ব্যয়ের তালিকা
            </Title>
          </Col>
          <Col>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setShowFilter(!showFilter)}
              style={{
                background: showFilter ? "#11375b" : "transparent",
                color: showFilter ? "white" : "#11375b",
                borderColor: "#11375b",
              }}
            >
              ফিল্টার
            </Button>
          </Col>
        </Row>

        {/* Summary Cards */}
        {/* <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={6}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                border: "none",
              }}
            >
              <Statistic
                title={<span style={{ color: "rgba(255,255,255,0.8)" }}>মোট ট্রিপ</span>}
                value={totalTrips}
                valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                prefix={<TruckOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #52c41a 0%, #389e0d 100%)",
                border: "none",
              }}
            >
              <Statistic
                title={<span style={{ color: "rgba(255,255,255,0.8)" }}>ট্রিপ খরচ</span>}
                value={totalTripCost}
                precision={2}
                valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                prefix={<DollarOutlined />}
                suffix="৳"
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)",
                border: "none",
              }}
            >
              <Statistic
                title={<span style={{ color: "rgba(255,255,255,0.8)" }}>অন্যান্য খরচ</span>}
                value={totalOtherCost}
                precision={2}
                valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                prefix={<FallOutlined />}
                suffix="৳"
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #722ed1 0%, #531dab 100%)",
                border: "none",
              }}
            >
              <Statistic
                title={<span style={{ color: "rgba(255,255,255,0.8)" }}>মোট খরচ</span>}
                value={totalExpense}
                precision={2}
                valueStyle={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                prefix={<DollarOutlined />}
                suffix="৳"
              />
            </Card>
          </Col>
        </Row> */}

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
        <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Space wrap>
              {/* CSV */}
              <Button
                icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
                onClick={exportCSV}
                style={{
                  backgroundColor: "#e6f7ff",
                  borderColor: "#91d5ff",
                  color: "#1890ff",
                }}
              >
                CSV
              </Button>
              {/* Excel */}
              <Button
                icon={<FileExcelOutlined style={{ color: "#52c41a" }} />}
                onClick={exportExcel}
                style={{
                  backgroundColor: "#f6ffed",
                  borderColor: "#b7eb8f",
                  color: "#52c41a",
                }}
              >
                Excel
              </Button>
              {/* PDF */}
              <Button
                icon={<FilePdfOutlined style={{ color: "#f5222d" }} />}
                onClick={exportPDF}
                style={{
                  backgroundColor: "#fff2e8",
                  borderColor: "#ffbb96",
                  color: "#f5222d",
                }}
              >
                PDF
              </Button>
              {/* Print */}
              <Button
                icon={<PrinterOutlined style={{ color: "#722ed1" }} />}
                onClick={printTable}
                style={{
                  backgroundColor: "#f9f0ff",
                  borderColor: "#d3adf7",
                  color: "#722ed1",
                }}
              >
                Print
              </Button>
            </Space>
          </Col>

          {/* Search */}
          <Col>
            <Search
              placeholder="ব্যয় খুঁজুন...."
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton={
                <Button
                  style={{
                    backgroundColor: "#11375B",
                    color: "#fff",
                    borderColor: "#11375B",
                  }}
                >
                  <SearchOutlined />
                </Button>
              }
            />
          </Col>
        </Row>

        {/* Table */}
        <div ref={printRef}>
          <Table
            columns={columns}
            dataSource={filteredExpense}
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
              let totalPageTripCost = 0
              let totalPageOtherCost = 0

              pageData.forEach((item) => {
                totalPageTripCost += Number(item.trip_price || 0)
                const fuel = Number(item.fuel_price || 0)
                const gas = Number(item.gas_price || 0)
                const others = Number(item.other_expenses || 0)
                const commission = Number(item.driver_percentage || 0)
                totalPageOtherCost += fuel + gas + others + commission
              })

              const totalPageExpense = totalPageTripCost + totalPageOtherCost

              return (
                <Table.Summary fixed>
                  <Table.Summary.Row style={{ backgroundColor: "#e6f7ff" }}>
                    <Table.Summary.Cell index={0} colSpan={4}>
                      <Text strong style={{ color: "#11375B" }}>
                        পেজ টোটাল
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageTripCost.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageOtherCost.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageExpense.toFixed(2)}
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
        {/* <Divider /> */}
        {/* <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>গড় ট্রিপ খরচ</Text>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#11375B" }}>
                ৳ {totalTrips > 0 ? (totalTripCost / totalTrips).toFixed(2) : 0}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>গড় অন্যান্য খরচ</Text>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#11375B" }}>
                ৳ {totalTrips > 0 ? (totalOtherCost / totalTrips).toFixed(2) : 0}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "#666", fontSize: "14px" }}>গড় মোট খরচ</Text>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#722ed1" }}>
                ৳ {averageExpense.toFixed(2)}
              </div>
            </div>
          </Col>
        </Row> */}
      </Card>
    </div>
  )
}

export default DailyTripExpense
