// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaTruck, FaPlus, FaPen, FaEye, FaTrashAlt } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { banglaFontBase64 } from "../assets/font/banglaFont";
// const CarList = () => {
//   const [vehicles, setVehicle] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // get single car info by id
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedCar, setselectedCar] = useState(null);
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedDriverId, setSelectedDriverId] = useState(null);
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   const toggleModal = () => setIsOpen(!isOpen);
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/vehicle")
//       .then((response) => {
//         if (response.data.status === "success") {
//           setVehicle(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `https://api.dropshep.com/api/vehicle/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete driver");
//       }
//       // Remove car from local list
//       setVehicle((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("গাড়িটি সফলভাবে ডিলিট হয়েছে", {
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
//   if (loading) return <p className="text-center mt-16">Loading vehicle...</p>;

//   // export functionality
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "নাম", key: "driver_name" },
//     { label: "গাড়ি", key: "vehicle_name" },
//     { label: "ধরন", key: "category" },
//     { label: "গাড়ির আসন সংখ্যা", key: "size" },
//     { label: "এলাকা", key: "registration_zone" },
//     { label: "ট্রিপ", key: "0" },
//     { label: "রেজিস্ট্রেশন নাম্বার", key: "registration_number" },
//     // { label: "স্ট্যাটাস", key: "Active" },
//   ];

//   const csvData = vehicles.map((dt, index) => ({
//     index: index + 1,
//     driver_name: dt.driver_name,
//     vehicle_name: dt.vehicle_name,
//     category: dt.category,
//     size: dt.size,
//     registration_zone: dt.registration_zone,
//     trip: 0,
//     registration_number: dt.registration_number,
//     status: dt.status,
//   }));
//   // export
//   const exportExcel = () => {
//     // Define Bangla headers
//     const headers = [
//       "#",
//       "নাম",
//       "গাড়ি",
//       "ধরন",
//       "গাড়ির আসন সংখ্যা",
//       "এলাকা",
//       "ট্রিপ",
//       "রেজিস্ট্রেশন নাম্বার",
//       "স্ট্যাটাস",
//     ];

//     // Map your csvData to ensure column order matches the headers
//     const data = csvData.map((item, index) => ({
//       "#": index + 1,
//       নাম: item.driver_name,
//       গাড়ি: item.vehicle_name,
//       ধরন: item.category,
//       "গাড়ির আসন সংখ্যা": item.size,
//       এলাকা: item.registration_zone,
//       ট্রিপ: item.trip,
//       "রেজিস্ট্রেশন নাম্বার": item.registration_number,
//       স্ট্যাটাস: item.status,
//     }));

//     // Generate worksheet and prepend headers
//     const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

//     // Create workbook and append the sheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "vehicles Data");

//     // Write and save file
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const fileData = new Blob([excelBuffer], {
//       type: "application/octet-stream",
//     });
//     saveAs(fileData, "vehicles_data.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();

//     // Step 1: Register and add the font correctly
//     doc.addFileToVFS("SolaimanLipi.ttf", banglaFontBase64);
//     doc.addFont("SolaimanLipi.ttf", "SolaimanLipi", "normal");
//     doc.setFont("SolaimanLipi");

//     // Step 2: Prepare table with Bangla data
//     const tableColumn = [
//       "#",
//       "Name",
//       "Car",
//       "Category",
//       "Total Seat No",
//       "Area",
//       "Trip",
//       "Registration No",
//     ];

//     const tableRows = vehicles.map((dt, index) => [
//       index + 1,
//       dt.driver_name,
//       dt.vehicle_name,
//       dt.category,
//       dt.size,
//       dt.registration_zone,
//       0,
//       dt.registration_number,
//     ]);

//     // Step 3: Generate the PDF with proper encoding
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: {
//         font: "SolaimanLipi", // Ensure this matches the font added earlier
//         fontStyle: "normal",
//         fontSize: 10,
//       },
//       headStyles: {
//         font: "SolaimanLipi", // Ensure this matches the font added earlier
//         fontStyle: "normal",
//         fillColor: "#11375B",
//       },
//       theme: "grid",
//     });

//     doc.save("vehicles_data.pdf");
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
//       <head>
//         <title>Print</title>
//         <style>
//           table { width: 100%; border-collapse: collapse; }
//           th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//         </style>
//       </head>
//       <body>${printContent}</body>
//     </html>
//     `);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
//   };
//   // view car by id
//   const handleViewCar = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://api.dropshep.com/api/vehicle/${id}`
//       );
//       if (response.data.status === "success") {
//         setselectedCar(response.data.data);
//         setViewModalOpen(true);
//       } else {
//         toast.error("ড্রাইভারের তথ্য লোড করা যায়নি");
//       }
//     } catch (error) {
//       console.error("View error:", error);
//       toast.error("ড্রাইভারের তথ্য আনতে সমস্যা হয়েছে");
//     }
//   };
//   // search
//   const filteredCarList = vehicles.filter((vehicle) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       vehicle.vehicle_name?.toLowerCase().includes(term) ||
//       vehicle.driver_name?.toLowerCase().includes(term) ||
//       vehicle.category?.toLowerCase().includes(term) ||
//       vehicle.size?.toLowerCase().includes(term) ||
//       vehicle.registration_number?.toLowerCase().includes(term) ||
//       vehicle.registration_serial?.toLowerCase().includes(term) ||
//       vehicle.registration_zone?.toLowerCase().includes(term) ||
//       vehicle.registration_date?.toLowerCase().includes(term) ||
//       vehicle.text_date?.toLowerCase().includes(term) ||
//       vehicle.road_permit_date?.toLowerCase().includes(term) ||
//       vehicle.fitness_date?.toLowerCase().includes(term)
//     );
//   });
//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentVehicles = filteredCarList.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(vehicles.length / itemsPerPage);
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
//     <main className="  md:p-4">
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             গাড়ির তালিকা
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <Link to="/AddCarForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> গাড়ি
//               </button>
//             </Link>
//           </div>
//         </div>
//         {/* export */}
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename={"vehicles_data.csv"}
//               className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//             >
//               CSV
//             </CSVLink>
//             <button
//               onClick={exportExcel}
//               headers={headers}
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
//               placeholder="গাড়ি খুঁজুন..."
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
//                 <th className="px-2 py-3">গাড়ি</th>
//                 <th className="px-2 py-3">ধরন</th>
//                 <th className="px-2 py-3">গাড়ির আসন সংখ্যা</th>
//                 <th className="px-2 py-3">এলাকা</th>
//                 <th className="px-2 py-3">ট্রিপ</th>
//                 <th className="px-2 py-3">রেজিস্ট্রেশন নাম্বার</th>
//                 <th className="px-2 py-3">স্ট্যাটাস</th>
//                 <th className="px-2 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentVehicles?.map((vehicle, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-all">
//                   <td className="px-2 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-2 py-4">{vehicle.driver_name}</td>
//                   <td className="px-2 py-4">{vehicle.vehicle_name}</td>
//                   <td className="px-2 py-4">{vehicle.category}</td>
//                   <td className="px-2 py-4">{vehicle.size}</td>
//                   <td className="px-2 py-4">{vehicle.registration_zone}</td>

//                   <td className="px-2 py-4">0</td>
//                   <td className="px-2 py-4">{vehicle.registration_number}</td>
//                   <td className="px-2 py-4">
//                     <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
//                       Active
//                     </span>
//                   </td>
//                   <td className="px-2 py-4 action_column">
//                     <div className="flex gap-1">
//                       <Link to={`/UpdateCarForm/${vehicle.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => handleViewCar(vehicle.id)}
//                         className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer"
//                       >
//                         <FaEye className="text-[12px]" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedDriverId(vehicle.id);
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
//                 আপনি কি গাড়িটি ডিলিট করতে চান?
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
//       {/* get car information by id */}
//       {viewModalOpen && selectedCar && (
//         <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#000000ad] z-50">
//           <div className="w-4xl p-5 bg-gray-100 rounded-xl mt-10">
//             <h3 className="text-primary font-semibold">গাড়ির নাম</h3>
//             <div className="mt-5">
//               <ul className="flex border border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ড্রাইভারের নাম</p>{" "}
//                   <p>{selectedCar.driver_name}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2">
//                   <p className="w-48">গাড়ির নাম</p>{" "}
//                   <p>{selectedCar.vehicle_name}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">গাড়ির ধরন</p>{" "}
//                   <p>{selectedCar.category}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2">
//                   <p className="w-48">গাড়ির আসন সংখ্যা</p>{" "}
//                   <p>{selectedCar.size}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">রেজিস্ট্রেশন নাম্বার</p>{" "}
//                   <p>{selectedCar.registration_number}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2">
//                   <p className="w-48">রেজিস্ট্রেশন সিরিয়াল</p>{" "}
//                   <p>{selectedCar.registration_serial}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">রেজিস্ট্রেশন এলাকা</p>{" "}
//                   <p>{selectedCar.registration_zone}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2">
//                   <p className="w-48">রেজিস্ট্রেশন তারিখ</p>{" "}
//                   <p>{selectedCar.registration_date}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ট্যাক্স মেয়াদোত্তীর্ণ তারিখ</p>{" "}
//                   <p>{selectedCar.text_date || "N/A"}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2">
//                   <p className="w-48">রোড পারমিট তারিখ</p>{" "}
//                   <p>{selectedCar.road_permit_date}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary font-semibold text-sm px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ফিটনেসর মেয়াদোত্তীর্ণ তারিখ</p>{" "}
//                   <p>{selectedCar.fitness_date}</p>
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
import { useEffect, useState } from "react";
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
  Descriptions,
  message,
} from "antd";
import {
  TruckOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { banglaFontBase64 } from "../assets/font/banglaFont";
import { RiDeleteBinLine } from "react-icons/ri";

const { Title, Text } = Typography;
const { Search } = Input;

const CarList = () => {
  const [vehicles, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("https://api.dropshep.com/api/vehicle");
      if (response.data.status === "success") {
        setVehicle(response.data.data);
      }
    } catch (error) {
      message.error("গাড়ির তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.dropshep.com/api/vehicle/${selectedDriverId}`);
      setVehicle((prev) => prev.filter((v) => v.id !== selectedDriverId));
      message.success("গাড়িটি সফলভাবে ডিলিট হয়েছে");
      setDeleteModalOpen(false);
      setSelectedDriverId(null);
    } catch {
      message.error("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

  const handleViewCar = async (id) => {
    try {
      const response = await axios.get(`https://api.dropshep.com/api/vehicle/${id}`);
      if (response.data.status === "success") {
        setSelectedCar(response.data.data);
        setViewModalOpen(true);
      } else {
        message.error("গাড়ির তথ্য লোড করা যায়নি");
      }
    } catch {
      message.error("গাড়ির তথ্য আনতে সমস্যা হয়েছে");
    }
  };

  const headers = [
    { label: "#", key: "index" },
    { label: "নাম", key: "driver_name" },
    { label: "গাড়ি", key: "vehicle_name" },
    { label: "ধরন", key: "category" },
    { label: "গাড়ির আসন সংখ্যা", key: "size" },
    { label: "এলাকা", key: "registration_zone" },
    { label: "ট্রিপ", key: "trip" },
    { label: "রেজিস্ট্রেশন নাম্বার", key: "registration_number" },
  ];

  const csvData = vehicles.map((v, i) => ({
    index: i + 1,
    driver_name: v.driver_name,
    vehicle_name: v.vehicle_name,
    category: v.category,
    size: v.size,
    registration_zone: v.registration_zone,
    trip: 0,
    registration_number: v.registration_number,
  }));

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), "vehicles_data.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("SolaimanLipi.ttf", banglaFontBase64);
    doc.addFont("SolaimanLipi.ttf", "SolaimanLipi", "normal");
    doc.setFont("SolaimanLipi");
    autoTable(doc, {
      head: [["#", "Name", "Car", "Category", "Seat", "Area", "Trip", "Reg No"]],
      body: vehicles.map((v, i) => [
        i + 1,
        v.driver_name,
        v.vehicle_name,
        v.category,
        v.size,
        v.registration_zone,
        0,
        v.registration_number,
      ]),
      styles: { font: "SolaimanLipi", fontSize: 10 },
      headStyles: { fillColor: "#11375B" },
    });
    doc.save("vehicles_data.pdf");
  };

  const filteredVehicles = vehicles.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.vehicle_name?.toLowerCase().includes(term) ||
      v.driver_name?.toLowerCase().includes(term) ||
      v.category?.toLowerCase().includes(term)
    );
  });

  // Print cart tablew info
  const printCarTable = () => {
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

  const columns = [
    { title: "SL", render: (_, __, i) => i + 1, width: 50 },
    { title: "নাম", dataIndex: "driver_name" },
    { title: "গাড়ি", dataIndex: "vehicle_name" },
    // { title: "ধরন", dataIndex: "category" },
    // { title: "আসন সংখ্যা", dataIndex: "size" },
    { title: "এলাকা", dataIndex: "registration_zone" },
    { title: "ট্রিপ", render: () => 0 },
    { title: "রেজিস্ট্রেশন নাম্বার", dataIndex: "registration_number" },
    {
      title: "স্ট্যাটাস",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => {
        let color = "success"
        let text = "Active"

        if (status === "inactive" || status === "Inactive") {
          color = "error"
          text = "Inactive"
        } else if (status === "maintenance" || status === "Maintenance") {
          color = "warning"
          text = "Maintenance"
        } else if (status === "pending" || status === "Pending") {
          color = "processing"
          text = "Pending"
        }

        return <Tag color={color}>{text}</Tag>
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "Maintenance", value: "maintenance" },
        { text: "Pending", value: "pending" },
      ],
      onFilter: (value, record) => {
        const recordStatus = record.status?.toLowerCase() || "active"
        return recordStatus === value
      },
    },
    {
      title: "অ্যাকশন",
      className: "action_column",
      render: (_, record) => (
        <Space>
                   <Tooltip title="সম্পাদনা">
                    <Link to={`/update-carForm/${record.id}`}>
                        <EditOutlined
                          className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                        />
                        </Link>
                      </Tooltip>
        
                  <Tooltip title="দেখুন">
                        <EyeOutlined 
                          className="bg-white shadow-md rounded p-1 cursor-pointer text-lg hover:bg-primary hover:!text-white transition-all duration-300"
                       onClick={() => handleViewCar(record.id)}
                        />
                      </Tooltip>         
                  
                   <Tooltip title="ডিলিট">
                        <RiDeleteBinLine
                          className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                         onClick={() => {
              setSelectedDriverId(record.id);
              setDeleteModalOpen(true);
                      }}
                        />
                      </Tooltip> 
                </Space>
      ),
    },
  ];

  return (
    <div className="overflow-hidden  mx-auto -z-10">
    <div
      style={{ padding: "10px", minHeight: "100vh" }}
    >
    <Card className="rounded-lg">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ color: "#11375B" }}>
            <TruckOutlined style={{ marginRight: 8 }} /> গাড়ির তালিকা
          </Title>
        </Col>
        <Col>
          <Link to="/add-carForm">
            <Button icon={<PlusOutlined />} type="primary" className="!bg-primary">
              গাড়ি
            </Button>
          </Link>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} gutter={[16, 16]}>
        <Col>
          <Space wrap>
            <CSVLink data={csvData} headers={headers} filename="vehicles_data.csv">
              <Button icon={<FileTextOutlined style={{ color: "#1890ff" }} />} className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary">
                CSV
              </Button>
            </CSVLink>
            <Button icon={<FileExcelOutlined style={{ color: "#52c41a" }} />} onClick={exportExcel} className="!bg-green-50 border !border-green-100 hover:!bg-white hover:!text-primary">
              Excel
            </Button>
            <Button icon={<FilePdfOutlined style={{ color: "#f5222d" }} />} onClick={exportPDF} className="!bg-orange-50 border !border-orange-100 hover:!bg-white hover:!text-primary">
              PDF
            </Button>
            <Button icon={<PrinterOutlined style={{ color: "#722ed1" }} />} onClick={printCarTable} className="!bg-blue-50 border !border-blue-100 hover:!bg-white hover:!text-primary">
              Print
            </Button>
          </Space>
        </Col>
         <Col>
  <Search
    placeholder="গাড়ি খুঁজুন..."
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

      <Table
  columns={columns}
  dataSource={filteredVehicles}
  rowKey="id"
  size="middle"
  loading={loading}
  pagination={pagination}
  onChange={(pg) => setPagination(pg)}
  scroll={{ x: 'max-content' }}
  summary={(pageData) => {
    let totalTrip = 0;
    pageData.forEach(({ trip_count }) => {
      totalTrip += Number(trip_count) || 0;
    });
    return (
      <Table.Summary fixed>
        <Table.Summary.Row className="bg-blue-50">
          <Table.Summary.Cell strong index={0} colSpan={4}>
            <Text className="!text-primary">
              {/* মোট ট্রিপ */}
              Total
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <Text strong className="!text-primary">{totalTrip}</Text>
          </Table.Summary.Cell>
          {/* Remaining columns blank */}
          <Table.Summary.Cell />
          <Table.Summary.Cell />
          <Table.Summary.Cell />
        </Table.Summary.Row>
      </Table.Summary>
    );
  }}
/>


      <Modal
        title="গাড়ি ডিলিট করুন"
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="হ্যাঁ"
        cancelText="না"
        okButtonProps={{ danger: true }}
      >
        আপনি কি নিশ্চিত যে এই গাড়িটি ডিলিট করতে চান?
      </Modal>

      <Modal
        title="গাড়ির বিস্তারিত তথ্য"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        // footer={<Button type="primary" onClick={() => setViewModalOpen(false)}>বন্ধ করুন</Button>}
        footer={false}
        width={800}
      >
        {selectedCar && (
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="ড্রাইভারের নাম">{selectedCar.driver_name}</Descriptions.Item>
            <Descriptions.Item label="গাড়ির নাম">{selectedCar.vehicle_name}</Descriptions.Item>
            <Descriptions.Item label="গাড়ির ধরন">{selectedCar.category}</Descriptions.Item>
            <Descriptions.Item label="গাড়ির আসন সংখ্যা">{selectedCar.size}</Descriptions.Item>
            <Descriptions.Item label="রেজিস্ট্রেশন নাম্বার">{selectedCar.registration_number}</Descriptions.Item>
            <Descriptions.Item label="এলাকা">{selectedCar.registration_zone}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
    </div>
    </div>
  );
};

export default CarList;
