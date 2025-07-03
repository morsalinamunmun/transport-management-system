// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaTruck, FaPlus, FaPen, FaEye, FaTrashAlt } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// const CarList = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedDriverId, setSelectedDriverId] = useState(null);
//   const toggleModal = () => setIsOpen(!isOpen);
//   // get single driver info by id
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedDriver, setSelectedDriver] = useState(null);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/driver")
//       .then((response) => {
//         if (response.data.status === "success") {
//           setDrivers(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-16">Loading drivers...</p>;
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `https://api.dropshep.com/api/driver/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete driver");
//       }
//       // Remove driver from local list
//       setDrivers((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("ড্রাইভার সফলভাবে ডিলিট হয়েছে", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setIsOpen(false);
//       setSelectedDriverId(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
//   // view driver by id
//   const handleView = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://api.dropshep.com/api/driver/${id}`
//       );
//       if (response.data.status === "success") {
//         setSelectedDriver(response.data.data);
//         setViewModalOpen(true);
//       } else {
//         toast.error("ড্রাইভারের তথ্য লোড করা যায়নি");
//       }
//     } catch (error) {
//       console.error("View error:", error);
//       toast.error("ড্রাইভারের তথ্য আনতে সমস্যা হয়েছে");
//     }
//   };
//   // export functionality
//   const driverHeaders = [
//     { label: "#", key: "index" },
//     { label: "নাম", key: "name" },
//     { label: "মোবাইল", key: "contact" },
//     { label: "ঠিকানা", key: "address" },
//     { label: "জরুরি যোগাযোগ", key: "emergency_contact" },
//     { label: "লাইসেন্স", key: "license" },
//     { label: "লা.মেয়াদোত্তীর্ণ", key: "expire_date" },
//     { label: "স্ট্যাটাস", key: "status" },
//   ];

//   const driverCsvData = drivers?.map((driver, index) => ({
//     index: index + 1,
//     name: driver.name,
//     contact: driver.contact,
//     address: driver.address,
//     emergency_contact: driver.emergency_contact,
//     license: driver.license,
//     expire_date: driver.expire_date,
//     status: driver.status,
//   }));
//   // excel
//   const exportDriversToExcel = () => {
//     // Define English headers matching the table structure
//     const headers = [
//       "#",
//       "Name",
//       "Mobile",
//       "Address",
//       "Emergency Contact",
//       "License",
//       "License Expiry",
//       "Status",
//     ];

//     // Map driver data to match the order of headers
//     const formattedData = driverCsvData.map((driver, index) => ({
//       "#": index + 1,
//       Name: driver.name,
//       Mobile: driver.contact,
//       Address: driver.address,
//       "Emergency Contact": driver.emergency_contact,
//       License: driver.license,
//       "License Expiry": driver.expire_date,
//       Status: driver.status,
//     }));

//     // Create worksheet with custom headers
//     const worksheet = XLSX.utils.json_to_sheet(formattedData, {
//       header: headers,
//     });

//     // Create workbook
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Drivers");

//     // Write and download file
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "drivers.xlsx");
//   };

//   // pdf
//   const exportDriversToPDF = () => {
//     const doc = new jsPDF();

//     // English headers corresponding to your Bangla table
//     const tableColumn = [
//       "#",
//       "Name",
//       "Mobile",
//       "Address",
//       "Emergency Contact",
//       "License",
//       "License Expiry",
//       "Status",
//     ];

//     // Build table rows
//     const tableRows = driverCsvData.map((driver, index) => [
//       index + 1,
//       driver.name,
//       driver.contact,
//       driver.address,
//       driver.emergency_contact,
//       driver.license,
//       driver.expire_date,
//       driver.status,
//     ]);

//     // Generate PDF with autoTable
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("drivers.pdf");
//   };

//   // print
//   const printDriversTable = () => {
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
//   const filteredDriver = drivers.filter((driver) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       driver.name?.toLowerCase().includes(term) ||
//       driver.contact?.toLowerCase().includes(term) ||
//       driver.nid?.toLowerCase().includes(term) ||
//       driver.emergency_contact?.toLowerCase().includes(term) ||
//       driver.address?.toLowerCase().includes(term) ||
//       driver.expire_date?.toLowerCase().includes(term) ||
//       driver.note?.toLowerCase().includes(term) ||
//       driver.license?.toLowerCase().includes(term) ||
//       driver.status?.toLowerCase().includes(term)
//     );
//   });
//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentDrivers = filteredDriver.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(drivers.length / itemsPerPage);
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
//     <main className="bg-gradient-to-br from-gray-100 to-white md:p-4">
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             ড্রাইভারের তালিকা
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <Link to="/AddDriverForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> ড্রাইভার
//               </button>
//             </Link>
//           </div>
//         </div>
//         {/* export */}
//         <div className="md:flex justify-between mb-4">
//           <div className="flex gap-1 md:gap-3 flex-wrap">
//             <CSVLink
//               data={driverCsvData}
//               headers={driverHeaders}
//               filename="drivers.csv"
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all"
//             >
//               CSV
//             </CSVLink>

//             <button
//               onClick={exportDriversToExcel}
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer"
//             >
//               Excel
//             </button>

//             <button
//               onClick={exportDriversToPDF}
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer"
//             >
//               PDF
//             </button>

//             <button
//               onClick={printDriversTable}
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

//         {/* Table */}
//         <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-[#11375B] text-white uppercase text-sm">
//               <tr>
//                 <th className="px-2 py-3">#</th>
//                 <th className="px-2 py-3">নাম</th>
//                 <th className="px-2 py-3">মোবাইল</th>
//                 <th className="px-2 py-3">ঠিকানা</th>
//                 <th className="px-2 py-3">জরুরি যোগাযোগ</th>
//                 <th className="px-2 py-3">লাইসেন্স</th>
//                 <th className="px-2 py-3">লা.মেয়াদোত্তীর্ণ</th>
//                 <th className="px-2 py-3">স্ট্যাটাস</th>
//                 <th className="px-2 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentDrivers?.map((driver, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-all">
//                   <td className="px-2 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-2 py-4">{driver.name}</td>
//                   <td className="px-2 py-4">{driver.contact}</td>
//                   <td className="px-2 py-4">{driver.address}</td>
//                   <td className="px-2 py-4">{driver.emergency_contact}</td>
//                   <td className="px-2 py-4">{driver.license}</td>
//                   <td className="px-2 py-4">{driver.expire_date}</td>
//                   <td className="px-2 py-4">
//                     <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
//                       {driver.status}
//                     </span>
//                   </td>
//                   <td className="px-2 action_column">
//                     <div className="flex gap-1">
//                       <Link to={`/UpdateDriverForm/${driver.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => handleView(driver.id)}
//                         className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer"
//                       >
//                         <FaEye className="text-[12px]" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedDriverId(driver.id);
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
//       </div>
//       {/* pagination */}
//       <div className="mt-10 flex justify-center">
//         <div className="space-x-2 flex items-center">
//           <button
//             onClick={handlePrevPage}
//             className={`p-2 ${
//               currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
//             } rounded-sm`}
//             disabled={currentPage === 1}
//           >
//             <GrFormPrevious />
//           </button>
//           {[...Array(totalPages).keys()].map((number) => (
//             <button
//               key={number + 1}
//               onClick={() => handlePageClick(number + 1)}
//               className={`px-3 py-1 rounded-sm ${
//                 currentPage === number + 1
//                   ? "bg-primary text-white hover:bg-gray-200 hover:text-primary transition-all duration-300 cursor-pointer"
//                   : "bg-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
//               }`}
//             >
//               {number + 1}
//             </button>
//           ))}
//           <button
//             onClick={handleNextPage}
//             className={`p-2 ${
//               currentPage === totalPages
//                 ? "bg-gray-300"
//                 : "bg-primary text-white"
//             } rounded-sm`}
//             disabled={currentPage === totalPages}
//           >
//             <GrFormNext />
//           </button>
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
//                 আপনি কি ড্রাইভারটি ডিলিট করতে চান?
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleModal}
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
//                 >
//                   না
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedDriverId)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
//                 >
//                   হ্যাঁ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* get driver information by id */}
//       {viewModalOpen && selectedDriver && (
//         <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#000000ad] z-50">
//           <div className="w-4xl p-5 bg-gray-100 rounded-xl mt-10">
//             <h3 className="text-primary font-semibold">ড্রাইভারের তথ্য</h3>
//             <div className="mt-5">
//               <ul className="flex border border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">নামঃ</p> <p>{selectedDriver.name}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
//                   <p className="w-48">মোবাইলঃ</p>{" "}
//                   <p>{selectedDriver.contact}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">জরুরি নাম্বারঃ</p>{" "}
//                   <p>{selectedDriver.emergency_contact}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
//                   <p className="w-48">ঠিকানাঃ</p>{" "}
//                   <p>{selectedDriver.address}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">NID:</p> <p>{selectedDriver.nid}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
//                   <p className="w-48">লাইসেন্সঃ</p>{" "}
//                   <p>{selectedDriver.license}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">লাইসেন্স মেয়াদোত্তীর্ণঃ</p>{" "}
//                   <p>{selectedDriver.expire_date}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
//                   <p className="w-48">নোটঃ</p>{" "}
//                   <p>{selectedDriver.note || "N/A"}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">স্ট্যাটাসঃ</p>{" "}
//                   <p>{selectedDriver.status}</p>
//                 </li>
//               </ul>
//               <div className="flex justify-end mt-10">
//                 <button
//                   onClick={() => setViewModalOpen(false)}
//                   className="text-white bg-primary py-1 px-2 rounded-md cursor-pointer hover:bg-secondary"
//                 >
//                   বন্ধ করুন
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default CarList;




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
  Dropdown,
  Descriptions,
  message,
} from "antd"
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined,
  PrinterOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
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

const DriverList = () => {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedDriverId, setSelectedDriverId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("https://api.dropshep.com/api/driver")
      if (response.data.status === "success") {
        setDrivers(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching driver data:", error)
      message.error("ড্রাইভারের তথ্য লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedDriverId) return

    try {
      const response = await fetch(`https://api.dropshep.com/api/driver/${selectedDriverId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete driver")
      }

      setDrivers((prev) => prev.filter((driver) => driver.id !== selectedDriverId))
      message.success("ড্রাইভার সফলভাবে ডিলিট হয়েছে")
      setDeleteModalOpen(false)
      setSelectedDriverId(null)
    } catch (error) {
      console.error("Delete error:", error)
      message.error("ডিলিট করতে সমস্যা হয়েছে!")
    }
  }

  const handleView = async (id) => {
    try {
      const response = await axios.get(`https://api.dropshep.com/api/driver/${id}`)
      if (response.data.status === "success") {
        setSelectedDriver(response.data.data)
        setViewModalOpen(true)
      } else {
        message.error("ড্রাইভারের তথ্য লোড করা যায়নি")
      }
    } catch (error) {
      console.error("View error:", error)
      message.error("ড্রাইভারের তথ্য আনতে সমস্যা হয়েছে")
    }
  }

  // Export functionality
  const driverHeaders = [
    { label: "#", key: "index" },
    { label: "নাম", key: "name" },
    { label: "মোবাইল", key: "contact" },
    { label: "ঠিকানা", key: "address" },
    { label: "জরুরি যোগাযোগ", key: "emergency_contact" },
    { label: "লাইসেন্স", key: "license" },
    { label: "লা.মেয়াদোত্তীর্ণ", key: "expire_date" },
    { label: "স্ট্যাটাস", key: "status" },
  ]

  const driverCsvData = drivers?.map((driver, index) => ({
    index: index + 1,
    name: driver.name,
    contact: driver.contact,
    address: driver.address,
    emergency_contact: driver.emergency_contact,
    license: driver.license,
    expire_date: driver.expire_date,
    status: driver.status,
  }))

  const exportCSV = () => {
    const csvContent = [
      ["#", "নাম", "মোবাইল", "ঠিকানা", "জরুরি যোগাযোগ", "লাইসেন্স", "লা.মেয়াদোত্তীর্ণ", "স্ট্যাটাস"],
      ...driverCsvData.map((item) => [
        item.index,
        item.name,
        item.contact,
        item.address,
        item.emergency_contact,
        item.license,
        item.expire_date,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "drivers_data.csv")
  }

  const exportDriversToExcel = () => {
    const headers = ["#", "নাম", "মোবাইল", "ঠিকানা", "জরুরি যোগাযোগ", "লাইসেন্স", "লা.মেয়াদোত্তীর্ণ", "স্ট্যাটাস"]

    const formattedData = driverCsvData.map((driver, index) => ({
      "#": index + 1,
      নাম: driver.name,
      মোবাইল: driver.contact,
      ঠিকানা: driver.address,
      "জরুরি যোগাযোগ": driver.emergency_contact,
      লাইসেন্স: driver.license,
      "লা.মেয়াদোত্তীর্ণ": driver.expire_date,
      স্ট্যাটাস: driver.status,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Drivers")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "drivers.xlsx")
  }

  const exportDriversToPDF = () => {
    const doc = new jsPDF()
    const tableColumn = ["#", "Name", "Mobile", "Address", "Emergency Contact", "License", "License Expiry", "Status"]

    const tableRows = driverCsvData.map((driver, index) => [
      index + 1,
      driver.name,
      driver.contact,
      driver.address,
      driver.emergency_contact,
      driver.license,
      driver.expire_date,
      driver.status,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })

    doc.save("drivers.pdf")
  }
// print driver table info
  // const printDriversTable = () => {
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

  const printDriversTable = () => {
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
  // Filter drivers based on search term
  const filteredDrivers = drivers.filter((driver) => {
    const term = searchTerm.toLowerCase()
    return (
      driver.name?.toLowerCase().includes(term) ||
      driver.contact?.toLowerCase().includes(term) ||
      driver.nid?.toLowerCase().includes(term) ||
      driver.emergency_contact?.toLowerCase().includes(term) ||
      driver.address?.toLowerCase().includes(term) ||
      driver.expire_date?.toLowerCase().includes(term) ||
      driver.note?.toLowerCase().includes(term) ||
      driver.license?.toLowerCase().includes(term) ||
      driver.status?.toLowerCase().includes(term)
    )
  })

  // Check if license is expired
  const isLicenseExpired = (expireDate) => {
    if (!expireDate) return false
    const today = new Date()
    const expire = new Date(expireDate)
    return expire < today
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
      title: "নাম",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name) => (
        <Space>
          {/* <UserOutlined style={{ color: "#11375B" }} /> */}
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: "মোবাইল",
      dataIndex: "contact",
      key: "contact",
      width: 130,
      render: (contact) => (
        <Space>
          {/* <PhoneOutlined style={{ color: "#52c41a" }} /> */}
          <Text>{contact}</Text>
        </Space>
      ),
    },
    {
      title: "ঠিকানা",
      dataIndex: "address",
      key: "address",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    // {
    //   title: "জরুরি যোগাযোগ",
    //   dataIndex: "emergency_contact",
    //   key: "emergency_contact",
    //   width: 140,
    //   render: (contact) => (
    //     <Space>
    //       {/* <PhoneOutlined style={{ color: "#fa8c16" }} /> */}
    //       <Text>{contact}</Text>
    //     </Space>
    //   ),
    // },
    {
      title: "লাইসেন্স",
      dataIndex: "license",
      key: "license",
      width: 120,
      render: (license) => (
        <Space>
          {/* <IdcardOutlined style={{ color: "#1890ff" }} /> */}
          <Text>{license}</Text>
        </Space>
      ),
    },
    // {
    //   title: "লা.মেয়াদোত্তীর্ণ",
    //   dataIndex: "expire_date",
    //   key: "expire_date",
    //   width: 130,
    //   render: (date) => (
    //     <Space>
    //       {/* <CalendarOutlined style={{ color: isLicenseExpired(date) ? "#ff4d4f" : "#52c41a" }} /> */}
    //       <Text style={{ color: isLicenseExpired(date) ? "#ff4d4f" : "inherit" }}>{date}</Text>
    //     </Space>
    //   ),
    // },
    {
      title: "স্ট্যাটাস",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        let color = "success"
        let text = "Active"

        if (status === "inactive" || status === "Inactive") {
          color = "error"
          text = "Inactive"
        } else if (status === "suspended" || status === "Suspended") {
          color = "warning"
          text = "Suspended"
        } else if (status === "pending" || status === "Pending") {
          color = "processing"
          text = "Pending"
        }

        return <Tag color={color}>{text}</Tag>
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "Suspended", value: "suspended" },
        { text: "Pending", value: "pending" },
      ],
      onFilter: (value, record) => {
        const recordStatus = record.status?.toLowerCase() || "active"
        return recordStatus === value
      },
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      width: 120,
         className: "action_column",
      render: (_, record) => (
        <Space>
          <Tooltip title="সম্পাদনা">
                              <Link to={`/UpdateDriverForm/${record.id}`}>
                                  <EditOutlined
                                    className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                                    onClick={() => (window.location.href = `/update-driverForm/${record.id}`)}
                                  />
                                  </Link>
                                </Tooltip>
        
            <Tooltip title="দেখুন">
                        <EyeOutlined 
                          className="bg-white rounded shadow-md p-1 cursor-pointer text-lg hover:bg-primary hover:!text-white transition-all duration-300"
                       onClick={() => handleView(record.id)}
                        />
                      </Tooltip>
        
          
          <Tooltip title="ডিলিট">
                                  <RiDeleteBinLine
                                    className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                                   onClick={() => {
                setSelectedDriverId(record.id)
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
        className="max-w-7xl mx-auto rounded-lg"
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
              <UserOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              ড্রাইভারের তালিকা
            </Title>
          </Col>
          <Col>
            <Link to="/add-driverForm">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="medium"
               className="!bg-primary"
              >
                ড্রাইভার
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Export and Search */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            {/* <Space>
              <Dropdown menu={{ items: exportMenuItems }} placement="bottomLeft">
                <Button icon={<ExportOutlined />}>Export</Button>
              </Dropdown>
              <Button icon={<PrinterOutlined />} onClick={printDriversTable}>
                Print
              </Button>
            </Space> */}
            <Col>
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
      onClick={exportDriversToExcel}
      className="!bg-green-50 border !border-green-100 hover:!bg-white hover:!text-primary"
    >
      Excel
    </Button>

    {/* PDF */}
    <Button
      icon={<FilePdfOutlined style={{ color: "#f5222d" }} />} 
      onClick={exportDriversToPDF}
      className="!bg-orange-50 border !border-orange-100 hover:!bg-white hover:!text-primary"
    >
      PDF
    </Button>

    {/* Print */}
    <Button
      icon={<PrinterOutlined style={{ color: "#722ed1" }} />} 
      onClick={printDriversTable}
      className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary"
    >
      Print
    </Button>
  </Space>
                    </Col>
          </Col>
         <Col>
  <Search
    placeholder="ড্রাইভার খুঁজুন..."
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
    // style={{ width: 300 }}
  />
</Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredDrivers}
          loading={loading}
          rowKey="id"
           size="middle"
          scroll={{ x: "max-content" }}
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
        />

        {/* Delete Modal */}
        <Modal
          title={
            <Space>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              ড্রাইভার ডিলিট করুন
            </Space>
          }
          open={deleteModalOpen}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setSelectedDriverId(null)
          }}
          okText="হ্যাঁ"
          cancelText="না"
          okButtonProps={{ danger: true }}
        >
          <p>আপনি কি নিশ্চিত যে এই ড্রাইভারটি ডিলিট করতে চান?</p>
        </Modal>

        {/* View Modal */}
        <Modal
          title={
            <Space>
              <EyeOutlined style={{ color: "#1890ff" }} />
              ড্রাইভারের বিস্তারিত তথ্য
            </Space>
          }
          open={viewModalOpen}
          onCancel={() => {
            setViewModalOpen(false)
            setSelectedDriver(null)
          }}
          footer={[
            <Button key="close" onClick={() => setViewModalOpen(false)}>
              বন্ধ করুন
            </Button>,
          ]}
          width={800}
        >
          {selectedDriver && (
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="নাম">{selectedDriver.name}</Descriptions.Item>
              <Descriptions.Item label="মোবাইল">{selectedDriver.contact}</Descriptions.Item>
              <Descriptions.Item label="জরুরি নাম্বার">{selectedDriver.emergency_contact}</Descriptions.Item>
              <Descriptions.Item label="ঠিকানা">{selectedDriver.address}</Descriptions.Item>
              <Descriptions.Item label="NID">{selectedDriver.nid}</Descriptions.Item>
              <Descriptions.Item label="লাইসেন্স">{selectedDriver.license}</Descriptions.Item>
              <Descriptions.Item label="লাইসেন্স মেয়াদোত্তীর্ণ">
                <Text style={{ color: isLicenseExpired(selectedDriver.expire_date) ? "#ff4d4f" : "inherit" }}>
                  {selectedDriver.expire_date}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="স্ট্যাটাস">
                <Tag
                  color={
                    selectedDriver.status === "active" || !selectedDriver.status
                      ? "success"
                      : selectedDriver.status === "inactive"
                        ? "error"
                        : selectedDriver.status === "suspended"
                          ? "warning"
                          : "processing"
                  }
                >
                  {selectedDriver.status || "Active"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="নোট" span={2}>
                {selectedDriver.note || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  )
}

export default DriverList
