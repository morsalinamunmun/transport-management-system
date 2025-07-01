// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FaTruck,
//   FaPlus,
//   FaFilter,
//   FaPen,
//   FaEye,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// const TripList = () => {
//   const [trip, setTrip] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // Date filter state
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTripId, setselectedTripId] = useState(null);
//   const toggleModal = () => setIsOpen(!isOpen);

//   // get single trip info by id
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedTrip, setselectedTrip] = useState(null);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // Fetch trips data
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/trip")
//       .then((response) => {
//         if (response.data.status === "success") {
//           const sortedData = response.data.data.sort((a, b) => {
//             return new Date(b.trip_date) - new Date(a.trip_date);
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
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`https://api.dropshep.com/api/trip/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete trip");
//       }
//       // Remove trip from local list
//       setTrip((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("ট্রিপ সফলভাবে ডিলিট হয়েছে", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setIsOpen(false);
//       setselectedTripId(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
//   // view trip by id
//   const handleView = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://api.dropshep.com/api/trip/${id}`
//       );
//       if (response.data.status === "success") {
//         setselectedTrip(response.data.data);
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
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "তারিখ", key: "trip_date" },
//     { label: "ড্রাইভার নাম", key: "driver_name" },
//     { label: "মোবাইল", key: "driver_contact" },
//     { label: "কমিশন", key: "driver_percentage" },
//     { label: "লোড পয়েন্ট", key: "load_point" },
//     { label: "আনলোড পয়েন্ট", key: "unload_point" },
//     { label: "ট্রিপের সময়", key: "trip_time" },
//     { label: "ট্রিপ খরচ", key: "totalCost" },
//     { label: "ট্রিপ ভাড়া", key: "trip_price" },
//     { label: "টোটাল আয়", key: "profit" },
//   ];
//   const csvData = trip.map((dt, index) => {
//     const fuel = parseFloat(dt.fuel_price ?? "0") || 0;
//     const gas = parseFloat(dt.gas_price ?? "0") || 0;
//     const others = parseFloat(dt.other_expenses ?? "0") || 0;
//     const commission = parseFloat(dt.driver_percentage ?? "0") || 0;
//     const totalCost = (
//       Number(fuel) +
//       Number(gas) +
//       Number(others) +
//       Number(commission)
//     ).toFixed(2);
//     const profit = (dt.trip_price - totalCost).toFixed(2);

//     return {
//       index: index + 1,
//       trip_date: dt.trip_date,
//       driver_name: dt.driver_name,
//       driver_contact: dt.driver_contact,
//       driver_percentage: dt.driver_percentage,
//       load_point: dt.load_point,
//       unload_point: dt.unload_point,
//       trip_time: dt.trip_time,
//       totalCost,
//       trip_price: dt.trip_price,
//       profit,
//     };
//   });
//   // export excel
//   const exportExcel = () => {
//     // Define English headers you want in the Excel file
//     const headers = [
//       "Index",
//       "Trip Date",
//       "Driver Name",
//       "Driver Contact",
//       "Driver Percentage",
//       "Load Point",
//       "Unload Point",
//       "Trip Time",
//       "Total Cost",
//       "Trip Price",
//       "Profit",
//     ];

//     // Map the csvData to match the headers
//     const formattedData = csvData.map((item, index) => ({
//       Index: index + 1,
//       "Trip Date": item.trip_date,
//       "Driver Name": item.driver_name,
//       "Driver Contact": item.driver_contact,
//       "Driver Percentage": item.driver_percentage,
//       "Load Point": item.load_point,
//       "Unload Point": item.unload_point,
//       "Trip Time": item.trip_time,
//       "Total Cost": item.totalCost,
//       "Trip Price": item.trip_price,
//       Profit: item.profit,
//     }));

//     // Generate worksheet with custom header order
//     const worksheet = XLSX.utils.json_to_sheet(formattedData, {
//       header: headers,
//     });

//     // Create and export workbook
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Data");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "trip_data.xlsx");
//   };

//   // pdf
//   const exportPDF = () => {
//     const headers = [
//       { label: "#", key: "index" },
//       { label: "Date", key: "trip_date" },
//       { label: "Driver Name", key: "driver_name" },
//       { label: "Contact", key: "driver_contact" },
//       { label: "Commission", key: "driver_percentage" },
//       { label: "Load Point", key: "load_point" },
//       { label: "Unload Point", key: "unload_point" },
//       { label: "Trip Time", key: "trip_time" },
//       { label: "Total Cost", key: "totalCost" },
//       { label: "Trip Fare", key: "trip_price" },
//       { label: "Profit", key: "profit" },
//     ];

//     const tableColumn = headers.map((h) => h.label);
//     const tableRows = csvData.map((row) => headers.map((h) => row[h.key]));

//     const doc = new jsPDF();
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("trip_data.pdf");
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
//             th, td { border: 1px solid #000; padding: 8px; text-align: left; }
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
//   // Filter trips by search term and date range
//   const filteredTrip = trip.filter((dt) => {
//     const term = searchTerm.toLowerCase();
//     const tripDate = dt.trip_date;
//     const matchesSearch =
//       dt.trip_date?.toLowerCase().includes(term) ||
//       dt.trip_time?.toLowerCase().includes(term) ||
//       dt.load_point?.toLowerCase().includes(term) ||
//       dt.unload_point?.toLowerCase().includes(term) ||
//       dt.driver_name?.toLowerCase().includes(term) ||
//       dt.customer?.toLowerCase().includes(term) ||
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
//   const currentTrip = filteredTrip.slice(indexOfFirstItem, indexOfLastItem);
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
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             ট্রিপের হিসাব
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <Link to="/AddTripForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> ট্রিপ
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
//         {/* export and search*/}
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//             <CSVLink
//               data={csvData}
//               headers={headers}
//               filename={"trip_data.csv"}
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
//                 <th className="px-1 py-3">#</th>
//                 <th className="px-1 py-3">তারিখ</th>
//                 <th className="px-1 py-3">ড্রাইভার ইনফো</th>
//                 <th className="px-1 py-3">ট্রিপ এবং গন্তব্য</th>
//                 <th className="px-1 py-3">কাস্টমারের তথ্য</th>
//                 <th className="px-1 py-3">ট্রিপের খরচ</th>
//                 <th className="px-1 py-3">ট্রিপের ভাড়া</th>
//                 {/* <th className="px-2 py-3">টোটাল আয়</th> */}
//                 <th className="px-1 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentTrip?.map((dt, index) => {
//                 const demarage = parseFloat(dt.demarage ?? "0") || 0;
//                 const fuel = parseFloat(dt.fuel_price ?? "0") || 0;
//                 const gas = parseFloat(dt.gas_price ?? "0") || 0;
//                 const others = parseFloat(dt.other_expenses ?? "0") || 0;
//                 const commision = dt.driver_percentage;
//                 const totalCost = (
//                   Number(demarage) +
//                   Number(fuel) +
//                   Number(gas) +
//                   Number(others) +
//                   Number(commision)
//                 ).toFixed(2);

//                 return (
//                   <tr
//                     key={index}
//                     className="hover:bg-gray-50 transition-all border-b border-gray-300"
//                   >
//                     <td className="px-1 py-3 font-bold">
//                       {indexOfFirstItem + index + 1}
//                     </td>
//                     <td className="px-1 py-3">{dt.trip_date}</td>
//                     <td className="px-1 py-3">
//                       <p>নামঃ {dt.driver_name}</p>
//                       <p>মোবাইলঃ {dt.driver_contact}</p>
//                       <p>কমিশনঃ {dt.driver_percentage}</p>
//                     </td>
//                     <td className="px-1 py-4">
//                       <p>তারিখঃ {dt.trip_date}</p>
//                       <p>লোড পয়েন্টঃ {dt.load_point}</p>
//                       <p>আনলোড পয়েন্টঃ {dt.unload_point}</p>
//                       <p>ট্রিপের সময়ঃ {dt.trip_time}</p>
//                     </td>
//                     <td className="px-1 py-4">
//                       <p>
//                         কাস্টমারের নামঃ <p>{dt.customer}</p>
//                       </p>
//                       <p>
//                         কাস্টমারের মোবাইলঃ <p>{dt.customer_mobile}</p>
//                       </p>
//                     </td>
//                     <td className="px-1 py-3">{totalCost}</td>
//                     <td className="px-1 py-3">{dt.trip_price}</td>
//                     {/* <td className="px-2 py-3">
//                       {dt.trip_price - totalCost}.00
//                     </td> */}
//                     <td className="px-1 action_column">
//                       <div className="flex gap-1">
//                         <Link to={`/UpdateTripForm/${dt.id}`}>
//                           <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                             <FaPen className="text-[12px]" />
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => handleView(dt.id)}
//                           className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer"
//                         >
//                           <FaEye className="text-[12px]" />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setselectedTripId(dt.id);
//                             setIsOpen(true);
//                           }}
//                           className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
//                         >
//                           <FaTrashAlt className="text-[12px]" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
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
//                 আপনি কি ট্রিপটি ডিলিট করতে চান?
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleModal}
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
//                 >
//                   না
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedTripId)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
//                 >
//                   হ্যাঁ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* get trip information by id */}
//       {viewModalOpen && selectedTrip && (
//         <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#000000ad] z-50">
//           <div className="w-4xl p-5 bg-gray-100 rounded-xl mt-10">
//             <h3 className="text-primary font-semibold">ট্রিপের তথ্য</h3>
//             <div className="mt-5">
//               <ul className="flex border border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ট্রিপের সময়</p>{" "}
//                   <p>{selectedTrip.trip_time}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2">
//                   <p className="w-48">ট্রিপের তারিখ</p>{" "}
//                   <p>{selectedTrip.trip_date}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">লোড পয়েন্ট</p>{" "}
//                   <p>{selectedTrip.load_point}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2">
//                   <p className="w-48">আনলোড পয়েন্ট</p>{" "}
//                   <p>{selectedTrip.unload_point}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ড্রাইভারের নাম</p>{" "}
//                   <p>{selectedTrip.driver_name}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2">
//                   <p className="w-48">ড্রাইভারের মোবাইল</p>{" "}
//                   <p>{selectedTrip.driver_contact}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ড্রাইভারের কমিশন</p>{" "}
//                   <p>{selectedTrip.driver_percentage}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">তেলের মূল্য</p>{" "}
//                   <p>{selectedTrip.trip_price}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">গ্যাসের মূল্য</p>{" "}
//                   <p>{selectedTrip.gas_price}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">গাড়ির নম্বর</p>{" "}
//                   <p>{selectedTrip.vehicle_number}</p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">অন্যান্য খরচ</p>{" "}
//                   <p>{selectedTrip.other_expenses}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ট্রিপের খরচ</p>{" "}
//                   <p>
//                     {(
//                       Number(selectedTrip.trip_price) +
//                       Number(selectedTrip.gas_price) +
//                       Number(selectedTrip.other_expenses) +
//                       Number(selectedTrip.driver_percentage)
//                     ).toFixed(2)}{" "}
//                   </p>
//                 </li>
//               </ul>
//               <ul className="flex border-b border-r border-l border-gray-300">
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">ট্রিপের ভাড়া</p>{" "}
//                   <p>{selectedTrip.trip_price}</p>
//                 </li>
//                 <li className="w-[428px] flex text-primary text-sm font-semibold px-3 py-2 border-r border-gray-300">
//                   <p className="w-48">কাস্টমারের নাম</p>{" "}
//                   <p>{selectedTrip.customer}</p>
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

// export default TripList;



import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Input,
  DatePicker,
  Modal,
  Card,
  Space,
  Typography,
  Tooltip,
  Tag,
  Row,
  Col,
  Statistic,
  Divider,
  message,
  Dropdown,
} from "antd"
import {
  TruckOutlined,
  PlusOutlined,
  FilterOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined,
  PrinterOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import { RiDeleteBinLine } from "react-icons/ri";
import dayjs from "dayjs"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { saveAs } from "file-saver"

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Search } = Input

const TripList = () => {
  const [trip, setTrip] = useState([])
  const [filteredTrip, setFilteredTrip] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState(null)

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(null)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [pagination, setPagination] = useState({
  current: 1,
  pageSize: 10,
})

  // Fetch trips data
  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch("https://api.dropshep.com/api/trip")
      const data = await response.json()

      if (data.status === "success") {
        const sortedData = data.data.sort((a, b) => {
          return new Date(b.trip_date).getTime() - new Date(a.trip_date).getTime()
        })
        setTrip(sortedData)
        setFilteredTrip(sortedData)
      }
    } catch (error) {
      console.error("Error fetching trip data:", error)
      message.error("ট্রিপের তথ্য লোড করতে সমস্যা হয়েছে")
    } finally {
      setLoading(false)
    }
  }

  // Filter function
  useEffect(() => {
    const filtered = trip.filter((dt) => {
      const term = searchTerm.toLowerCase()
      const tripDate = dayjs(dt.trip_date)

      const matchesSearch =
        dt.trip_date?.toLowerCase().includes(term) ||
        dt.trip_time?.toLowerCase().includes(term) ||
        dt.load_point?.toLowerCase().includes(term) ||
        dt.unload_point?.toLowerCase().includes(term) ||
        dt.driver_name?.toLowerCase().includes(term) ||
        dt.customer?.toLowerCase().includes(term) ||
        dt.driver_contact?.toLowerCase().includes(term) ||
        String(dt.driver_percentage).includes(term) ||
        String(dt.fuel_price).includes(term) ||
        String(dt.gas_price).includes(term) ||
        dt.vehicle_number?.toLowerCase().includes(term) ||
        String(dt.other_expenses).includes(term) ||
        String(dt.trip_price).includes(term)

      const matchesDateRange =
        !dateRange || (tripDate.isAfter(dateRange[0]?.startOf("day")) && tripDate.isBefore(dateRange[1]?.endOf("day")))

      return matchesSearch && matchesDateRange
    })

    setFilteredTrip(filtered)
  }, [trip, searchTerm, dateRange])

  // Delete trip
  const handleDelete = async () => {
    if (!selectedTripId) return

    try {
      const response = await fetch(`https://api.dropshep.com/api/trip/${selectedTripId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete trip")
      }

      setTrip((prev) => prev.filter((trip) => trip.id !== selectedTripId))
      message.success("ট্রিপ সফলভাবে ডিলিট হয়েছে")
      setDeleteModalOpen(false)
      setSelectedTripId(null)
    } catch (error) {
      console.error("Delete error:", error)
      message.error("ডিলিট করতে সমস্যা হয়েছে!")
    }
  }

  // View trip details
  const handleView = async (id) => {
    try {
      const response = await fetch(`https://api.dropshep.com/api/trip/${id}`)
      const data = await response.json()

      if (data.status === "success") {
        setSelectedTrip(data.data)
        setViewModalOpen(true)
      } else {
        message.error("ট্রিপের তথ্য লোড করা যায়নি")
      }
    } catch (error) {
      console.error("View error:", error)
      message.error("ট্রিপের তথ্য আনতে সমস্যা হয়েছে")
    }
  }

  // Calculate totals
  const calculateTotals = () => {
    const totalTrips = filteredTrip.length
    const totalCost = filteredTrip.reduce((sum, trip) => {
      const fuel = Number.parseFloat(trip.fuel_price) || 0
      const gas = Number.parseFloat(trip.gas_price) || 0
      const others = Number.parseFloat(trip.other_expenses) || 0
      const demarage = Number.parseFloat(trip.demarage) || 0
      const commission = Number.parseFloat(trip.driver_percentage) || 0
      return sum + fuel + gas + others + demarage + commission
    }, 0)

    const totalRevenue = filteredTrip.reduce((sum, trip) => sum + (trip.trip_price || 0), 0)
    const totalProfit = totalRevenue - totalCost

    return { totalTrips, totalCost, totalRevenue, totalProfit }
  }

  const { totalTrips, totalCost, totalRevenue, totalProfit } = calculateTotals()

  // Export functions
  const exportData = filteredTrip.map((dt, index) => {
    const fuel = Number.parseFloat(dt.fuel_price) || 0
    const gas = Number.parseFloat(dt.gas_price) || 0
    const others = Number.parseFloat(dt.other_expenses) || 0
    const demarage = Number.parseFloat(dt.demarage) || 0
    const commission = Number.parseFloat(dt.driver_percentage) || 0
    const totalCost = fuel + gas + others + demarage + commission
    const profit = (dt.trip_price || 0) - totalCost

    return {
      index: index + 1,
      trip_date: dt.trip_date,
      driver_name: dt.driver_name,
      driver_contact: dt.driver_contact,
      driver_percentage: dt.driver_percentage,
      load_point: dt.load_point,
      unload_point: dt.unload_point,
      trip_time: dt.trip_time,
      totalCost: totalCost.toFixed(2),
      trip_price: dt.trip_price,
      profit: profit.toFixed(2),
    }
  })

  const exportExcel = () => {
    const headers = [
      "Index",
      "Trip Date",
      "Driver Name",
      "Driver Contact",
      "Driver Percentage",
      "Load Point",
      "Unload Point",
      "Trip Time",
      "Total Cost",
      "Trip Price",
      "Profit",
    ]

    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Data")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(data, "trip_data.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = [
      "#",
      "Date",
      "Driver",
      "Contact",
      "Commission",
      "Load",
      "Unload",
      "Time",
      "Cost",
      "Price",
      "Profit",
    ]
    const tableRows = exportData.map((row) => [
      row.index,
      row.trip_date,
      row.driver_name,
      row.driver_contact,
      row.driver_percentage,
      row.load_point,
      row.unload_point,
      row.trip_time,
      row.totalCost,
      row.trip_price,
      row.profit,
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8 },
    })
    doc.save("trip_data.pdf")
  }

  const exportCSV = () => {
    const csvContent = [
      [
        "#",
        "তারিখ",
        "ড্রাইভার নাম",
        "মোবাইল",
        "কমিশন",
        "লোড পয়েন্ট",
        "আনলোড পয়েন্ট",
        "ট্রিপের সময়",
        "ট্রিপ খরচ",
        "ট্রিপ ভাড়া",
        "টোটাল আয়",
      ],
      ...exportData.map((row) => [
        row.index,
        row.trip_date,
        row.driver_name,
        row.driver_contact,
        row.driver_percentage,
        row.load_point,
        row.unload_point,
        row.trip_time,
        row.totalCost,
        row.trip_price,
        row.profit,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "trip_data.csv")
  }

  const exportMenuItems = [
    {
      key: "csv",
      label: "CSV",
      icon: <ExportOutlined />,
      onClick: exportCSV,
    },
    {
      key: "excel",
      label: "Excel",
      icon: <ExportOutlined />,
      onClick: exportExcel,
    },
    {
      key: "pdf",
      label: "PDF",
      icon: <ExportOutlined />,
      onClick: exportPDF,
    },
  ]

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "index",
      width: 50,
      render: (_, __, index) => (
        <Text strong style={{ color: "#11375b" }} >
          {index + 1}
        </Text>
      ),
    },
    {
      title: "তারিখ",
      dataIndex: "trip_date",
      key: "trip_date",
      // width: 130,
      render: (date) => (
        <Space direction="vertical" size={0}>
          <Text>
            <CalendarOutlined /> {date}
          </Text>
        </Space>
      ),
    },
    // {
    //   title: "ড্রাইভার ইনফো",
    //   key: "driver_info",
    //   // width: 100,
    //   render: (_, record) => (
    //     <Space direction="vertical" size={0}>
    //       <Text>
    //         <UserOutlined /> {record.driver_name}
    //       </Text>
    //       <Text type="secondary">
    //         <PhoneOutlined /> {record.driver_contact}
    //       </Text>
    //       <div>কমিশন: {record.driver_percentage}</div>
    //     </Space>
    //   ),
    // },
    {
      title: "ট্রিপ এবং গন্তব্য",
      key: "trip_destination",
      // width: 200,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>তারিখ: {record.trip_date}</Text>
          <Text>
            <EnvironmentOutlined /> লোড: {record.load_point}
          </Text>
          <Text>
            <EnvironmentOutlined /> আনলোড: {record.unload_point}
          </Text>
          <Text>সময়: {record.trip_time}</Text>
        </Space>
      ),
    },
    {
      title: "কাস্টমারের তথ্য",
      key: "customer_info",
      // width: 100,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>নাম: {record.customer}</Text>
          <Text>মোবাইল: {record.customer_mobile}</Text>
        </Space>
      ),
    },
    {
      title: "ট্রিপের খরচ",
      key: "total_cost",
      // width: 130,
      render: (_, record) => {
        const fuel = Number.parseFloat(record.fuel_price) || 0
        const gas = Number.parseFloat(record.gas_price) || 0
        const others = Number.parseFloat(record.other_expenses) || 0
        const demarage = Number.parseFloat(record.demarage) || 0
        const commission = Number.parseFloat(record.driver_percentage) || 0
        const totalCost = fuel + gas + others + demarage + commission

        return (
          <div>
            <DollarOutlined /> {totalCost.toFixed(2)}
          </div>
        )
      },
    },
    {
      title: "ট্রিপের ভাড়া",
      dataIndex: "trip_price",
      key: "trip_price",
      // width: 130,
      render: (price) => (
        <div>
          <DollarOutlined /> {price}
        </div>
      ),
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      // width: 100,
      // fixed: "right",
      render: (_, record) => (
        <Space>
           <Tooltip title="সম্পাদনা">
                <EditOutlined
                  className="text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                  onClick={() => (window.location.href = `/UpdateTripForm/${record.id}`)}
                />
              </Tooltip>

          <Tooltip title="দেখুন">
                <EyeOutlined 
                  className="border border-gray-200 rounded p-1 cursor-pointer text-lg hover:bg-primary hover:!text-white transition-all duration-300"
                onClick={() => handleView(record.id)}
                />
              </Tooltip>         
          
           <Tooltip title="ডিলিট">
                <RiDeleteBinLine
                  className="bg-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                 onClick={() => {
                setSelectedTripId(record.id)
                setDeleteModalOpen(true)
              }}
                />
              </Tooltip> 
        </Space>
      ),
    },
  ]

  return (
    <div className="overflow-hidden  mx-auto -z-10">
    <div
      style={{ padding: "24px", minHeight: "100vh" }}
    >
      <Card
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
          <Col>
            <Title level={2} style={{ margin: 0, color: "#11375B" }}>
              <TruckOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              ট্রিপের হিসাব
            </Title>
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ background: "#11375B", borderColor: "#11375B" }}
                onClick={() => (window.location.href = "/AddTripForm")}
              >
                ট্রিপ
              </Button>
              <Button
                icon={<FilterOutlined />}
                onClick={() => setShowFilter(!showFilter)}
                style={{ background: "#11375B", borderColor: "#11375B", color: "white" }}
              >
                ফিল্টার
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Export and Search */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
          <Col>
            <Space>
              <Dropdown menu={{ items: exportMenuItems }} placement="bottomLeft">
                <Button icon={<ExportOutlined />}>Export</Button>
              </Dropdown>
              <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
                Print
              </Button>
            </Space>
          </Col>
          <Col>
            <Search
              placeholder="সার্চ করুন..."
              allowClear
              style={{ width: 300 }}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>

        {/* Filter Section */}
        {showFilter && (
          <Card style={{ marginBottom: "16px", background: "#f8f9fa" }}>
            <Row gutter={16} align="middle">
              <Col span={8}>
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={(dates) => setDateRange(dates)}
                  placeholder={["শুরুর তারিখ", "শেষের তারিখ"]}
                />
              </Col>
              <Col>
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

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredTrip}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1200 }}
          // scroll={{ x: 'max-content' }}
           pagination={{
    current: pagination.current,
    pageSize: pagination.pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (page, pageSize) => {
      setPagination({ current: page, pageSize })
    },
    onShowSizeChange: (current, size) => {
      setPagination({ current: 1, pageSize: size }) // page reset to 1 when size changes
    },
  }}
        />

        {/* Delete Modal */}
        <Modal
          title={
            <Space>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              ট্রিপ ডিলিট করুন
            </Space>
          }
          open={deleteModalOpen}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setSelectedTripId(null)
          }}
          okText="হ্যাঁ"
          cancelText="না"
          okButtonProps={{ danger: true }}
        >
          <p>আপনি কি নিশ্চিত যে এই ট্রিপটি ডিলিট করতে চান?</p>
        </Modal>

        {/* View Modal */}
        <Modal
          title={
            <Space>
              <EyeOutlined style={{ color: "#1890ff" }} />
              ট্রিপের বিস্তারিত তথ্য
            </Space>
          }
          open={viewModalOpen}
          onCancel={() => {
            setViewModalOpen(false)
            setSelectedTrip(null)
          }}
          footer={[
            <Button key="close" onClick={() => setViewModalOpen(false)}>
              বন্ধ করুন
            </Button>,
          ]}
          width={800}
        >
          {selectedTrip && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card size="small" title="ট্রিপের তথ্য">
                    <p>
                      <strong>ট্রিপের সময়:</strong> {selectedTrip.trip_time}
                    </p>
                    <p>
                      <strong>ট্রিপের তারিখ:</strong> {selectedTrip.trip_date}
                    </p>
                    <p>
                      <strong>লোড পয়েন্ট:</strong> {selectedTrip.load_point}
                    </p>
                    <p>
                      <strong>আনলোড পয়েন্ট:</strong> {selectedTrip.unload_point}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="ড্রাইভারের তথ্য">
                    <p>
                      <strong>ড্রাইভারের নাম:</strong> {selectedTrip.driver_name}
                    </p>
                    <p>
                      <strong>ড্রাইভারের মোবাইল:</strong> {selectedTrip.driver_contact}
                    </p>
                    <p>
                      <strong>ড্রাইভারের কমিশন:</strong> {selectedTrip.driver_percentage}
                    </p>
                    <p>
                      <strong>গাড়ির নম্বর:</strong> {selectedTrip.vehicle_number}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="খরচের তথ্য">
                    <p>
                      <strong>তেলের মূল্য:</strong> {selectedTrip.fuel_price}
                    </p>
                    <p>
                      <strong>গ্যাসের মূল্য:</strong> {selectedTrip.gas_price}
                    </p>
                    <p>
                      <strong>অন্যান্য খরচ:</strong> {selectedTrip.other_expenses}
                    </p>
                    <p>
                      <strong>ডেমারেজ:</strong> {selectedTrip.demarage}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="কাস্টমারের তথ্য">
                    <p>
                      <strong>কাস্টমারের নাম:</strong> {selectedTrip.customer}
                    </p>
                    <p>
                      <strong>কাস্টমারের মোবাইল:</strong> {selectedTrip.customer_mobile}
                    </p>
                    <p>
                      <strong>ট্রিপের ভাড়া:</strong> {selectedTrip.trip_price}
                    </p>
                  </Card>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="মোট খরচ"
                    value={
                      (Number(selectedTrip.fuel_price) || 0) +
                      (Number(selectedTrip.gas_price) || 0) +
                      (Number(selectedTrip.other_expenses) || 0) +
                      (Number(selectedTrip.demarage) || 0) +
                      (Number(selectedTrip.driver_percentage) || 0)
                    }
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="ট্রিপের ভাড়া"
                    value={selectedTrip.trip_price}
                    precision={2}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="লাভ"
                    value={
                      (selectedTrip.trip_price || 0) -
                      ((Number(selectedTrip.fuel_price) || 0) +
                        (Number(selectedTrip.gas_price) || 0) +
                        (Number(selectedTrip.other_expenses) || 0) +
                        (Number(selectedTrip.demarage) || 0) +
                        (Number(selectedTrip.driver_percentage) || 0))
                    }
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </Card>
    </div>
    </div>
  )
}

export default TripList

