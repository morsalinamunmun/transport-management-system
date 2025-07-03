// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaTruck, FaPlus, FaFilter, FaPen, FaTrashAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// //
// import toast, { Toaster } from "react-hot-toast";
// import { IoMdClose } from "react-icons/io";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";

// const Fuel = () => {
//   const [fuel, setFuel] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // Date filter state
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedFuelId, setselectedFuelId] = useState(null);
//   const toggleModal = () => setIsOpen(!isOpen);
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // Fetch fuel data
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/fuel")
//       .then((response) => {
//         if (response.data.status === "success") {
//           setFuel(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-16">Loading fuel...</p>;

//   // export functionality
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "ড্রাইভারের নাম", key: "driver_name" },
//     { label: "গাড়ির নাম", key: "vehicle_name" },
//     { label: "ফুয়েলের ধরন", key: "type" },
//     { label: "ফুয়েলিং তারিখ", key: "date_time" },
//     { label: "গ্যালন/লিটার", key: "quantity" },
//     { label: "লিটার প্রতি খরচ", key: "price" },
//     { label: "সকল খরচ", key: "total" },
//   ];
//   const csvData = fuel.map((dt, index) => ({
//     index: index + 1,
//     driver_name: dt.driver_name,
//     vehicle_name: dt.vehicle_number,
//     type: dt.type,
//     date_time: dt.date_time,
//     quantity: dt.quantity,
//     price: dt.price,
//     total: dt.quantity * dt.price,
//   }));
//   // export
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(csvData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Fuel Data");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "fuel_data.xlsx");
//   };
//   const exportPDF = () => {
//     const doc = new jsPDF();

//     const tableColumn = [
//       "#",
//       "Driver Name",
//       "Car Name",
//       "Fuel Type",
//       "Fueling Date",
//       "Gallon/Liter",
//       "Liter per cost",
//       "Total cost",
//     ];

//     const tableRows = fuel.map((dt, index) => [
//       index + 1,
//       dt.driver_name,
//       dt.driver_name,
//       dt.type,
//       dt.date_time,
//       dt.quantity,
//       dt.price,
//       dt.quantity * dt.price,
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//     });

//     doc.save("fuel_data.pdf");
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
//     <html>
//         <head>
//           <title>Print</title>
//           <style>
//             table { width: 100%; border-collapse: collapse; }
//             th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//           </style>
//         </head>
//         <body>${printContent}</body>
//       </html>
//   `);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
//   };
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`https://api.dropshep.com/api/fuel/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete trip");
//       }
//       // Remove fuel from local list
//       setFuel((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("ট্রিপ সফলভাবে ডিলিট হয়েছে", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setIsOpen(false);
//       setselectedFuelId(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
//   // search
//   const filteredFuel = fuel.filter((dt) => {
//     const term = searchTerm.toLowerCase();
//     const fuelDate = dt.date_time;
//     const matchesSearch =
//       dt.date_time?.toLowerCase().includes(term) ||
//       dt.vehicle_number?.toLowerCase().includes(term) ||
//       dt.driver_name?.toLowerCase().includes(term) ||
//       dt.trip_id_invoice_no?.toLowerCase().includes(term) ||
//       dt.pump_name_address?.toLowerCase().includes(term) ||
//       String(dt.capacity).includes(term) ||
//       dt.type?.toLowerCase().includes(term) ||
//       String(dt.quantity).includes(term) ||
//       dt.price?.toLowerCase().includes(term) ||
//       dt.total_price?.toLowerCase().includes(term);
//     const matchesDateRange =
//       (!startDate || new Date(fuelDate) >= new Date(startDate)) &&
//       (!endDate || new Date(fuelDate) <= new Date(endDate));

//     return matchesSearch && matchesDateRange;
//   });
//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentFuel = filteredFuel.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(fuel.length / itemsPerPage);
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
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             ফুয়েল হিসাব
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <Link to="/FuelForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> ফুয়েল
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
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename={"fuel_data.csv"}
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
//           {/*  */}
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
//                 <th className="px-2 md:px-4 py-3">#</th>
//                 <th className="px-2 md:px-4 py-3">ড্রাইভারের নাম</th>
//                 <th className="px-2 md:px-4 py-3">গাড়ির নাঃ</th>
//                 <th className="px-2 md:px-4 py-3">ফুয়েলের ধরন</th>
//                 <th className="px-2 md:px-4 py-3">ফুয়েলিং তারিখ</th>
//                 <th className="px-2 md:px-4 py-3">গ্যালন/লিটার</th>
//                 <th className="px-2 md:px-4 py-3">লিটার প্রতি খরচ</th>
//                 <th className="px-2 md:px-4 py-3">সকল খরচ</th>
//                 <th className="px-2 md:px-4 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentFuel?.map((dt, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-all">
//                   <td className="px-4 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-4 py-4">{dt.driver_name}</td>
//                   <td className="px-4 py-4">{dt.vehicle_number}</td>
//                   <td className="px-4 py-4">{dt.type}</td>
//                   <td className="px-4 py-4">{dt.date_time}</td>
//                   <td className="px-4 py-4">{dt.quantity}</td>
//                   <td className="px-4 py-4">{dt.price}</td>
//                   <td className="px-4 py-4">{dt.quantity * dt.price}.00</td>
//                   <td className="px-4 py-4 action_column">
//                     <div className="flex gap-2">
//                       <Link to={`/UpdateFuelForm/${dt.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => {
//                           setselectedFuelId(dt.id);
//                           setIsOpen(true);
//                         }}
//                         className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
//                       >
//                         <FaTrashAlt className="text-[12px]" />
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
//       <div className="flex justify-center items-center">
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
//                 আপনি কি ফুয়েলটি ডিলিট করতে চান?
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleModal}
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
//                 >
//                   না
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedFuelId)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
//                 >
//                   হ্যাঁ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Fuel;




import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Input,
  Modal,
  Card,
  Space,
  Typography,
  Tag,
  Row,
  Col,
  Tooltip,
  DatePicker,
  message,
} from "antd"
import {
  CarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FilterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons"
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios"
import { Link } from "react-router-dom"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import dayjs from "dayjs"
import { RiDeleteBinLine } from "react-icons/ri";

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker

const Fuel = () => {
  const [fuel, setFuel] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedFuelId, setSelectedFuelId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    fetchFuelData()
  }, [])

  const fetchFuelData = async () => {
    try {
      const response = await axios.get("https://api.dropshep.com/api/fuel")
      if (response.data.status === "success") {
        setFuel(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching fuel data:", error)
      message.error("ফুয়েল ডেটা লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedFuelId) return

    try {
      const response = await fetch(`https://api.dropshep.com/api/fuel/${selectedFuelId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete fuel")
      }

      setFuel((prev) => prev.filter((item) => item.id !== selectedFuelId))
      message.success("ফুয়েল রেকর্ড সফলভাবে ডিলিট হয়েছে")
      setDeleteModalOpen(false)
      setSelectedFuelId(null)
    } catch (error) {
      console.error("Delete error:", error)
      message.error("ডিলিট করতে সমস্যা হয়েছে!")
    }
  }

  // Export functionality
  const headers = [
    { label: "#", key: "index" },
    { label: "ড্রাইভারের নাম", key: "driver_name" },
    { label: "গাড়ির নাম", key: "vehicle_name" },
    { label: "ফুয়েলের ধরন", key: "type" },
    { label: "ফুয়েলিং তারিখ", key: "date_time" },
    { label: "গ্যালন/লিটার", key: "quantity" },
    { label: "লিটার প্রতি খরচ", key: "price" },
    { label: "সকল খরচ", key: "total" },
  ]

  const csvData = fuel.map((dt, index) => ({
    index: index + 1,
    driver_name: dt.driver_name,
    vehicle_name: dt.vehicle_number,
    type: dt.type,
    date_time: dt.date_time,
    quantity: dt.quantity,
    price: dt.price,
    total: dt.quantity * dt.price,
  }))

  const exportCSV = () => {
    const csvContent = [
      ["#", "ড্রাইভারের নাম", "গাড়ির নাম", "ফুয়েলের ধরন", "ফুয়েলিং তারিখ", "গ্যালন/লিটার", "লিটার প্রতি খরচ", "সকল খরচ"],
      ...csvData.map((item) => [
        item.index,
        item.driver_name,
        item.vehicle_name,
        item.type,
        item.date_time,
        item.quantity,
        item.price,
        item.total,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "fuel_data.csv")
  }

  const exportExcel = () => {
    const headers = ["#", "ড্রাইভারের নাম", "গাড়ির নাম", "ফুয়েলের ধরন", "ফুয়েলিং তারিখ", "গ্যালন/লিটার", "লিটার প্রতি খরচ", "সকল খরচ"]

    const formattedData = csvData.map((item) => ({
      "#": item.index,
      "ড্রাইভারের নাম": item.driver_name,
      "গাড়ির নাম": item.vehicle_name,
      "ফুয়েলের ধরন": item.type,
      "ফুয়েলিং তারিখ": item.date_time,
      "গ্যালন/লিটার": item.quantity,
      "লিটার প্রতি খরচ": item.price,
      "সকল খরচ": item.total,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fuel Data")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "fuel_data.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = [
      "#",
      "Driver Name",
      "Car Name",
      "Fuel Type",
      "Fueling Date",
      "Gallon/Liter",
      "Liter per cost",
      "Total cost",
    ]

    const tableRows = csvData.map((item) => [
      item.index,
      item.driver_name,
      item.vehicle_name,
      item.type,
      item.date_time,
      item.quantity,
      item.price,
      item.total,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })

    doc.save("fuel_data.pdf")
  }

  // print fuel table info
  // const printFuelTable = () => {
  //   // hide specific column
  //   const actionColumns = document.querySelectorAll(".action_column");
  //   actionColumns.forEach((col) => {
  //     col.style.display = "none";
  //   });
  //   const printContent = document.querySelector("table").outerHTML;
  //   const WinPrint = window.open("", "", "width=900,height=650");
  //   WinPrint.document.write(`
  //   <html>
  //       <head>
  //         <title>Print</title>
  //         <style>
  //           table { width: 100%; border-collapse: collapse; }
  //           th, td { border: 1px solid #000; padding: 8px; text-align: left; }
  //         </style>
  //       </head>
  //       <body>${printContent}</body>
  //     </html>
  // `);
  //   WinPrint.document.close();
  //   WinPrint.focus();
  //   WinPrint.print();
  //   WinPrint.close();
  // };

  const printFuelTable = () => {
  const actionColumns = document.querySelectorAll(".action_column");
  actionColumns.forEach((col) => {
    col.style.display = "none";
  });

  const printContent = document.querySelector("table").outerHTML;
  const WinPrint = window.open("", "", "width=900,height=650");
  WinPrint.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();

  // প্রিন্ট শেষ হলে UI রিকভার করার জন্য
  window.onafterprint = () => {
    actionColumns.forEach((col) => {
      col.style.display = "";
    });
    window.onafterprint = null; // ইভেন্ট মুছে ফেলুন যাতে বারবার না হয়
  };

  // যদি ব্রাউজার onafterprint সাপোর্ট না করে, তাহলে কিছু সময় পর রিকভার করুন
  setTimeout(() => {
    actionColumns.forEach((col) => {
      col.style.display = "";
    });
  }, 1000);

  WinPrint.close();
};


  // Filter fuel data
  const filteredFuel = fuel.filter((dt) => {
    const term = searchTerm.toLowerCase()
    const fuelDate = dayjs(dt.date_time)

    const matchesSearch =
      dt.date_time?.toLowerCase().includes(term) ||
      dt.vehicle_number?.toLowerCase().includes(term) ||
      dt.driver_name?.toLowerCase().includes(term) ||
      dt.trip_id_invoice_no?.toLowerCase().includes(term) ||
      dt.pump_name_address?.toLowerCase().includes(term) ||
      String(dt.capacity).includes(term) ||
      dt.type?.toLowerCase().includes(term) ||
      String(dt.quantity).includes(term) ||
      dt.price?.toLowerCase().includes(term) ||
      dt.total_price?.toLowerCase().includes(term)

    const matchesDateRange =
      dateRange.length === 0 ||
      (fuelDate.isAfter(dayjs(dateRange[0]).subtract(1, "day")) && fuelDate.isBefore(dayjs(dateRange[1]).add(1, "day")))

    return matchesSearch && matchesDateRange
  })

  // Calculate totals
  const totalQuantity = filteredFuel.reduce((sum, item) => sum + Number.parseFloat(item.quantity || 0), 0)
  const totalCost = filteredFuel.reduce(
    (sum, item) => sum + Number.parseFloat(item.quantity || 0) * Number.parseFloat(item.price || 0),
    0,
  )
  const totalRecords = filteredFuel.length
  const averagePricePerLiter = totalQuantity > 0 ? totalCost / totalQuantity : 0

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "index",
      width: 40,
      render: (_, __, index) => (
        <Text strong style={{ color: "#11375b" }}>
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </Text>
      ),
    },
    {
      title: "ড্রাইভারের নাম",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 150,
      render: (name) => (
        <Space>
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: "গাড়ির নাম",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      width: 100,
      render: (vehicle) => (
        <Space>
          <Text>{vehicle}</Text>
        </Space>
      ),
    },
    {
      title: "ফুয়েলের ধরন",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => <Tag color={type === "Petrol" ? "blue" : type === "Diesel" ? "green" : "orange"}>{type}</Tag>,
    },
    {
      title: "ফুয়েলিং তারিখ",
      dataIndex: "date_time",
      key: "date_time",
      width: 130,
      render: (date) => (
        <Space>
          <Text>{date}</Text>
        </Space>
      ),
    },
    {
      title: "গ্যালন/লিটার",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      render: (quantity) => (
        <Space>
          <Text strong>{quantity}</Text>
        </Space>
      ),
    },
    {
      title: "লিটার প্রতি খরচ",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (price) => (
        <Space>
          <Text>{price}</Text>
        </Space>
      ),
    },
    {
      title: "সকল খরচ",
      key: "total",
      width: 120,
      render: (_, record) => (
        <Text  >
          {(Number.parseFloat(record.quantity || 0) * Number.parseFloat(record.price || 0)).toFixed(2)}
        </Text>
      ),
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      width: 100,
       className: "action_column",
      render: (_, record) => (
        <Space>
          <Tooltip title="সম্পাদনা">
                     <Link to={`/update-FuelForm/${record.id}`}>
                        <EditOutlined
                          className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                        />
                        </Link>
                      </Tooltip>
          <Tooltip title="ডিলিট">
                                  <RiDeleteBinLine
                                    className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                                   onClick={() => {
                setSelectedFuelId(record.id)
                setDeleteModalOpen(true)
              }}
                                  />
                                </Tooltip> 
        </Space>
      ),
    },
  ]

  // print
  const printRef = useRef();

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
            <Title level={4} style={{ margin: 0, color: "#11375B" }}>
              <CarOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              ফুয়েল হিসাব
            </Title>
          </Col>
          <Col>
            <Space>
              <Link to="/fuel-form">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="medium"
                  style={{
                    boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
                  }}
                  className="!bg-primary"
                >
                  ফুয়েল
                </Button>
              </Link>
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
                  onChange={(dates) => setDateRange( dates ?? [])}
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
            {/* <Space>
              <Dropdown menu={{ items: exportMenuItems }} placement="bottomLeft">
                <Button icon={<ExportOutlined />}>Export</Button>
              </Dropdown>
              <Button icon={<PrinterOutlined />} onClick={printTable}>
                Print
              </Button>
            </Space> */}
            <Space wrap>
    {/* CSV */}
    <Button
      icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
      className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary"
      onClick={exportCSV}
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
      onClick={printFuelTable}
      className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary"
    >
      Print
    </Button>

  </Space>
          </Col>  
               {/* Search  fuel */}
          <Col>
  <Search
    placeholder="ফুয়েল খুঁজুন...."
    allowClear
    onChange={(e) => setSearchTerm(e.target.value)}
    enterButton={
      <Button
        style={{
          backgroundColor: "#11375B", 
          color: "#fff",              
          borderColor: "#11375B"
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
          dataSource={filteredFuel}
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
            // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
         summary={(pageData) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        let totalCost = 0;

        pageData.forEach(({ quantity, price }) => {
          const q = Number(quantity) || 0;
          const p = Number(price) || 0;
          totalQuantity += q;
          totalPrice += p;
          totalCost += q * p;
        });

        return (
          <Table.Summary fixed>
            <Table.Summary.Row className="!bg-blue-50">
              <Table.Summary.Cell index={0} colSpan={5}>
                <Text strong className="!text-primary">Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong className="!text-primary">৳ b{totalQuantity.toFixed(2)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text strong className="!text-primary">৳ {totalPrice.toFixed(2)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text strong className="!text-primary">৳ {totalCost.toFixed(2)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell />
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
        />
        </div>

        {/* Delete Modal */}
        <Modal
          title={
            <Space>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              ফুয়েল রেকর্ড ডিলিট করুন
            </Space>
          }
          open={deleteModalOpen}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setSelectedFuelId(null)
          }}
          okText="হ্যাঁ"
          cancelText="না"
          okButtonProps={{ danger: true }}
        >
          <p>আপনি কি নিশ্চিত যে এই ফুয়েল রেকর্ডটি ডিলিট করতে চান?</p>
        </Modal>

        <style jsx>{`
          :global(.ant-table-thead > tr > th) {
            padding: 8px 12px !important;
            font-weight: 500 !important;
            font-size: 14px !important;
            background-color: #f8f9fa !important;
            color: #495057 !important;
            height: auto !important;
          }
          
          :global(.ant-table-tbody > tr > td) {
            padding: 10px 12px !important;
          }
        `}</style>
      </Card>
    </div>
  )
}

export default Fuel
