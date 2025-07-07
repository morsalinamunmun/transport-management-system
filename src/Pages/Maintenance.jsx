// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaTruck, FaPlus, FaFilter, FaPen, FaTrashAlt } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// const Maintenance = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [maintenance, setMaintenance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // Date filter state
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedMaintenanceId, setselectedMaintenanceId] = useState(null);
//   const toggleModal = () => setIsOpen(!isOpen);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // Fetch maintenance data
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/maintenance")
//       .then((response) => {
//         if (response.data.status === "success") {
//           setMaintenance(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);
//   if (loading)
//     return <p className="text-center mt-16">Loading maintenance...</p>;
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `https://api.dropshep.com/api/maintenance/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete trip");
//       }
//       // Remove fuel from local list
//       setMaintenance((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("সফলভাবে ডিলিট হয়েছে", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setIsOpen(false);
//       setselectedMaintenanceId(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
//   // export
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "সার্ভিসের ধরন", key: "service_type" },
//     { label: "গাড়ির নাম", key: "vehicle_name" },
//     { label: "মেইনটেনেন্সের ধরন", key: "service_for" },
//     { label: "পার্টস এন্ড স্পায়ারস", key: "parts_and_spairs" },
//     { label: "মেইনটেনেন্সের তারিখ", key: "date" },
//     { label: "অগ্রাধিকার", key: "dignifies" },
//     { label: "টোটাল খরচ", key: "total_cost" },
//   ];
//   const csvData = maintenance?.map((dt, index) => ({
//     index: index + 1,
//     service_type: dt.service_type,
//     vehicle_no: dt.vehicle_no,
//     service_for: dt.service_for,
//     parts_and_spairs: dt.parts_and_spairs,
//     date: dt.date,
//     dignifies: dt.dignifies,
//     total_cost: dt.total_cost,
//   }));
//   // excel
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(csvData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "maintenance.xlsx");
//   };
//   // pdf
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     const headers = [
//       { label: "#", key: "index" },
//       { label: "Service Type", key: "service_type" },
//       { label: "Vehicle No", key: "vehicle_no" },
//       { label: "Service For", key: "service_for" },
//       { label: "Parts Spars", key: "parts_and_spairs" },
//       { label: "Maintenance Date", key: "date" },
//       { label: "Priority", key: "dignifies" },
//       { label: "Total Cost", key: "total_cost" },
//     ];
//     const tableColumn = headers.map((h) => h.label);
//     const tableRows = csvData.map((row) => headers.map((h) => row[h.key]));
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("maintenance.pdf");
//   };
//   // print
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
//           th, td { border: 1px solid #000; padding: 8px; text-align: left; }
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
//   // search
//   const filteredMaintenance = maintenance.filter((dt) => {
//     const term = searchTerm.toLowerCase();
//     const maintenanceDate = dt.date;
//     const matchesSearch =
//       dt.date?.toLowerCase().includes(term) ||
//       dt.service_type?.toLowerCase().includes(term) ||
//       dt.parts_and_spairs?.toLowerCase().includes(term) ||
//       dt.maintenance_type?.toLowerCase().includes(term) ||
//       dt.cost?.toLowerCase().includes(term) ||
//       dt.vehicle_no?.toLowerCase().includes(term) ||
//       dt.cost_by?.toLowerCase().includes(term) ||
//       dt.total_cost?.toLowerCase().includes(term) ||
//       dt.dignifies?.toLowerCase().includes(term) ||
//       dt.service_for?.toLowerCase().includes(term) ||
//       dt.receipt?.toLowerCase().includes(term);
//     const matchesDateRange =
//       (!startDate || new Date(maintenanceDate) >= new Date(startDate)) &&
//       (!endDate || new Date(maintenanceDate) <= new Date(endDate));

//     return matchesSearch && matchesDateRange;
//   });

//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMaintenance = filteredMaintenance.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(maintenance.length / itemsPerPage);
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
//     <main className=" md:p-6">
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             মেইনটেনেন্স
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <Link to="/MaintenanceForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> মেইনটেনেন্স
//               </button>
//             </Link>
//             <button
//               onClick={() => setShowFilter((prev) => !prev)} // Toggle filter
//               className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
//             >
//               <FaFilter /> ফিল্টার
//             </button>
//           </div>
//         </div>
//         {/* export */}
//         <div className="md:flex justify-between mb-4">
//           <div className="flex gap-1 md:gap-3 flex-wrap">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename="maintenance.csv"
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all"
//             >
//               CSV
//             </CSVLink>
//             <button
//               onClick={exportExcel}
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer"
//             >
//               Excel
//             </button>
//             <button
//               onClick={exportPDF}
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer"
//             >
//               PDF
//             </button>
//             <button
//               onClick={printTable}
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer"
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
//         {/* Table */}
//         <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-[#11375B] text-white uppercase text-sm">
//               <tr>
//                 <th className="px-2 py-3">#</th>
//                 <th className="px-2 py-3">সার্ভিসের ধরন</th>
//                 <th className="px-2 py-3">গাড়ির নাঃ</th>
//                 <th className="px-2 py-3">মেইনটেনেন্সের ধরন</th>
//                 <th className="px-2 py-3">পার্টস এন্ড স্পায়ারস</th>
//                 <th className="px-2 py-3">মেইনটেনেন্সের তারিখ</th>
//                 <th className="px-2 py-3">অগ্রাধিকার</th>
//                 <th className="px-2 py-3">টোটাল খরচ</th>
//                 <th className="px-2 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentMaintenance?.map((dt, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-all">
//                   <td className="px-2 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-2 py-4">{dt.service_type}</td>
//                   <td className="px-2 py-4">{dt.vehicle_no}</td>
//                   <td className="px-2 py-4">{dt.service_for}</td>
//                   <td className="px-2 py-4">{dt.parts_and_spairs}</td>
//                   <td className="px-2 py-4">{dt.date}</td>
//                   <td className="px-2 py-4">{dt.dignifies}</td>
//                   <td className="px-2 py-4">{dt.total_cost}</td>
//                   <td className="action_column">
//                     <div className="flex gap-2">
//                       <Link to={`/UpdateMaintenanceForm/${dt.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                       <button className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                         <FaTrashAlt
//                           onClick={() => {
//                             setselectedMaintenanceId(dt.id);
//                             setIsOpen(true);
//                           }}
//                           className="text-[12px]"
//                         />
//                       </button>
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
//       {/* Delete modal */}
//       <td className="flex justify-center items-center">
//         {isOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-[#000000ad] z-50">
//             <div className="relative bg-white rounded-lg shadow-lg p-6 w-72 max-w-sm border border-gray-300">
//               <button
//                 onClick={toggleModal}
//                 className="text-2xl absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 cursor-pointer rounded-sm"
//               >
//                 <IoMdClose />
//               </button>

//               <div className="flex justify-center mb-4 text-red-500 text-4xl">
//                 <FaTrashAlt />
//               </div>
//               <p className="text-center text-gray-700 font-medium mb-6">
//                 আপনি কি ডিলিট করতে চান?
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleModal}
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
//                 >
//                   না
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedMaintenanceId)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
//                 >
//                   হ্যাঁ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </td>
//     </main>
//   );
// };

// export default Maintenance;


import { useEffect, useState, useRef } from "react"
import {
  Table,
  Button,
  Input,
  Modal,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Tooltip,
  DatePicker,
  message,
  Tag,
  Statistic,
} from "antd"
import {
  ToolOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import axios from "axios"
import { Link } from "react-router-dom"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { RiDeleteBinLine } from "react-icons/ri"

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const printRef = useRef()

  useEffect(() => {
    fetchMaintenance()
  }, [])

  const fetchMaintenance = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maintenance`)
      if (response.data.status === "success") {
        setMaintenance(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching maintenance data:", error)
      // message.error("মেইনটেনেন্স ডেটা লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedMaintenanceId) return

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/maintenance/${selectedMaintenanceId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete maintenance")
      }

      setMaintenance((prev) => prev.filter((item) => item.id !== selectedMaintenanceId))
      message.success("মেইনটেনেন্স রেকর্ড সফলভাবে ডিলিট হয়েছে")
      setDeleteModalOpen(false)
      setSelectedMaintenanceId(null)
    } catch (error) {
      console.error("Delete error:", error)
      message.error("ডিলিট করতে সমস্যা হয়েছে!")
    }
  }

  // Export functionality
  const csvData = maintenance.map((dt, index) => ({
    index: index + 1,
    service_type: dt.service_type,
    vehicle_no: dt.vehicle_no,
    service_for: dt.service_for,
    parts_and_spairs: dt.parts_and_spairs,
    date: dt.date,
    dignifies: dt.dignifies,
    total_cost: dt.total_cost,
  }))

  const exportCSV = () => {
    const csvContent = [
      ["#", "সার্ভিসের ধরন", "গাড়ির নাম", "মেইনটেনেন্সের ধরন", "পার্টস এন্ড স্পায়ারস", "মেইনটেনেন্সের তারিখ", "অগ্রাধিকার", "টোটাল খরচ"],
      ...csvData.map((item) => [
        item.index,
        item.service_type,
        item.vehicle_no,
        item.service_for,
        item.parts_and_spairs,
        item.date,
        item.dignifies,
        item.total_cost,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "maintenance_data.csv")
  }

  const exportExcel = () => {
    const headers = [
      "#",
      "সার্ভিসের ধরন",
      "গাড়ির নাম",
      "মেইনটেনেন্সের ধরন",
      "পার্টস এন্ড স্পায়ারস",
      "মেইনটেনেন্সের তারিখ",
      "অগ্রাধিকার",
      "টোটাল খরচ",
    ]

    const formattedData = csvData.map((item) => ({
      "#": item.index,
      "সার্ভিসের ধরন": item.service_type,
      "গাড়ির নাম": item.vehicle_no,
      "মেইনটেনেন্সের ধরন": item.service_for,
      "পার্টস এন্ড স্পায়ারস": item.parts_and_spairs,
      "মেইনটেনেন্সের তারিখ": item.date,
      অগ্রাধিকার: item.dignifies,
      "টোটাল খরচ": item.total_cost,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance Data")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "maintenance_data.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = [
      "#",
      "Service Type",
      "Vehicle No",
      "Service For",
      "Parts Spars",
      "Maintenance Date",
      "Priority",
      "Total Cost",
    ]

    const tableRows = csvData.map((item) => [
      item.index,
      item.service_type,
      item.vehicle_no,
      item.service_for,
      item.parts_and_spairs,
      item.date,
      item.dignifies,
      item.total_cost,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })

    doc.save("maintenance_data.pdf")
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
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
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

  // Filter maintenance data
  const filteredMaintenance = maintenance.filter((dt) => {
    const term = searchTerm.toLowerCase()

    const matchesSearch =
      dt.date?.toLowerCase().includes(term) ||
      dt.service_type?.toLowerCase().includes(term) ||
      dt.parts_and_spairs?.toLowerCase().includes(term) ||
      dt.maintenance_type?.toLowerCase().includes(term) ||
      dt.cost?.toLowerCase().includes(term) ||
      dt.vehicle_no?.toLowerCase().includes(term) ||
      dt.cost_by?.toLowerCase().includes(term) ||
      dt.total_cost?.toLowerCase().includes(term) ||
      dt.dignifies?.toLowerCase().includes(term) ||
      dt.service_for?.toLowerCase().includes(term) ||
      dt.receipt?.toLowerCase().includes(term)

    // Simple date filtering
    let matchesDateRange = true
    if (dateRange.length === 2) {
      const maintenanceDate = new Date(dt.date)
      const startDate = new Date(dateRange[0])
      const endDate = new Date(dateRange[1])
      matchesDateRange = maintenanceDate >= startDate && maintenanceDate <= endDate
    }

    return matchesSearch && matchesDateRange
  })

  // Calculate totals
  const totalMaintenance = filteredMaintenance.length
  const totalCost = filteredMaintenance.reduce((sum, item) => sum + Number(item.total_cost || 0), 0)
  const averageCost = totalMaintenance > 0 ? totalCost / totalMaintenance : 0

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
      case "উচ্চ":
        return "red"
      case "medium":
      case "মধ্যম":
        return "orange"
      case "low":
      case "নিম্ন":
        return "green"
      default:
        return "blue"
    }
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
      title: "সার্ভিসের ধরন",
      dataIndex: "service_type",
      key: "service_type",
      width: 100,
      render: (type) => (
        <Space>
          <Text strong>{type}</Text>
        </Space>
      ),
    },
    {
      title: "গাড়ির নাম",
      dataIndex: "vehicle_no",
      key: "vehicle_no",
      width: 100,
    },
    {
      title: "মেইনটেনেন্সের ধরন",
      dataIndex: "service_for",
      key: "service_for",
      width: 150,
    },
    {
      title: "পার্টস এন্ড স্পায়ারস",
      dataIndex: "parts_and_spairs",
      key: "parts_and_spairs",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (parts) => (
        <Tooltip placement="topLeft" title={parts}>
          {parts}
        </Tooltip>
      ),
    },
    {
      title: "মেইনটেনেন্সের তারিখ",
      dataIndex: "date",
      key: "date",
      width: 130,
      render: (date) => (
        <Space>
          <Text>{date}</Text>
        </Space>
      ),
    },
    {
      title: "অগ্রাধিকার",
      dataIndex: "dignifies",
      key: "dignifies",
      width: 60,
      render: (priority) => <Text >{priority}</Text>,
    },
    {
      title: "টোটাল খরচ",
      dataIndex: "total_cost",
      key: "total_cost",
      width: 120,
      render: (cost) => (
        <Space>
          <Text strong>{cost}</Text>
        </Space>
      ),
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="সম্পাদনা">
            <Link to={`/tramessy/update-maintenanceForm/${record.id}`}>
                <EditOutlined
                  className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                />
                </Link>
              </Tooltip>
      
          <Tooltip title="ডিলিট">
                                    <RiDeleteBinLine
                                      className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                                   onClick={() => {
                setSelectedMaintenanceId(record.id)
                setDeleteModalOpen(true)
              }}
                                    />
                                  </Tooltip>
        </Space>
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
              <ToolOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              মেইনটেনেন্স
            </Title>
          </Col>
          <Col>
            <Space>
              <Link to="/tramessy/MaintenanceForm">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="middle"
                  style={{
                    backgroundColor: "#11375B",
                    borderColor: "#11375B",
                    boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
                  }}
                >
                  মেইনটেনেন্স
                </Button>
              </Link>
               <Button
  icon={<FilterOutlined />}
  onClick={() => setShowFilter(!showFilter)}
  className={`border border-[#11375b] px-4 py-1 rounded 
    ${showFilter ? "bg-[#11375b] text-white" : "bg-transparent text-[#11375b]"}`}
>
  ফিল্টার
              </Button>
            </Space>
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
              placeholder="মেইনটেনেন্স খুঁজুন...."
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
            dataSource={filteredMaintenance}
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
              let totalPageCost = 0

              pageData.forEach(({ total_cost }) => {
                totalPageCost += Number(total_cost) || 0
              })

              return (
                <Table.Summary fixed>
                  <Table.Summary.Row style={{ backgroundColor: "#e6f7ff" }}>
                    <Table.Summary.Cell index={0} colSpan={7}>
                      <Text strong style={{ color: "#11375B" }}>
                        Total
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong style={{ color: "#11375B" }}>
                        ৳ {totalPageCost.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell />
                  </Table.Summary.Row>
                </Table.Summary>
              )
            }}
          />
        </div>

        {/* Delete Modal */}
        <Modal
          title={
            <Space>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              মেইনটেনেন্স রেকর্ড ডিলিট করুন
            </Space>
          }
          open={deleteModalOpen}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setSelectedMaintenanceId(null)
          }}
          okText="হ্যাঁ"
          cancelText="না"
          okButtonProps={{ danger: true }}
        >
          <p>আপনি কি নিশ্চিত যে এই মেইনটেনেন্স রেকর্ডটি ডিলিট করতে চান?</p>
        </Modal>
      </Card>
    </div>
  )
}

export default Maintenance
