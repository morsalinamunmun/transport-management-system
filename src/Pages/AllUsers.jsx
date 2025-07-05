// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaTruck, FaPen, FaTrashAlt } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";
// // export
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // delete modal
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const toggleModal = () => setIsOpen(!isOpen);
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   // search
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     axios
//       .get("https://api.dropshep.com/api/users")
//       .then((response) => {
//         if (response.data.status === "success") {
//           setUsers(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);
//   console.log("users", users);
//   if (loading) return <p className="text-center mt-16">Loading users...</p>;
//   // delete by id
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `https://api.dropshep.com/api/users/delete/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }
//       // Remove car from local list
//       setUsers((prev) => prev.filter((driver) => driver.id !== id));
//       toast.success("ইউজার সফলভাবে ডিলিট হয়েছে", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setIsOpen(false);
//       setSelectedUserId(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
//   // search
//   const filteredUsers = users.filter(
//     (user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.status?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   // pagination
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
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
//   // Export functionality
//   const headers = [
//     { label: "#", key: "index" },
//     { label: "নাম", key: "name" },
//     { label: "মোবাইল", key: "phone" },
//     { label: "ইমেইল", key: "email" },
//     { label: "ধরন", key: "role" },
//     { label: "স্ট্যাটাস", key: "status" },
//   ];

//   const csvData = users.map((user, index) => ({
//     index: index + 1,
//     name: user.name,
//     phone: user.phone,
//     email: user.email,
//     role: user.role,
//     status: user.status,
//   }));

//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(csvData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "user_data.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     const headers = [
//       { label: "#", key: "index" },
//       { label: "Name", key: "name" },
//       { label: "Mobile", key: "phone" },
//       { label: "Email", key: "email" },
//       { label: "Role", key: "role" },
//       { label: "Status", key: "status" },
//     ];
//     const tableColumn = headers.map((h) => h.label);
//     const tableRows = csvData.map((row) => headers.map((h) => row[h.key]));

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     });

//     doc.save("user_data.pdf");
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
//   return (
//     <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             সকল ইউজারের তালিকা
//           </h1>
//           <div className="mt-3 md:mt-0">
//             <Link to="/AddUserForm">
//               <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
//                 <FaPlus /> ইউজার
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
//               filename={"user_data.csv"}
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
//               placeholder="ইউজার খুঁজুন..."
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
//                 <th className="px-4 py-3">নাম</th>
//                 <th className="px-4 py-3">মোবাইল</th>
//                 <th className="px-4 py-3">ইমেইল</th>
//                 <th className="px-4 py-3">ধরন</th>
//                 <th className="px-4 py-3">স্ট্যাটাস</th>
//                 <th className="px-4 py-3 action_column">অ্যাকশন</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               {currentUsers?.map((user, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-all">
//                   <td className="px-4 py-4 font-bold">
//                     {indexOfFirstItem + index + 1}
//                   </td>
//                   <td className="px-4 py-4">{user.name}</td>
//                   <td className="px-4 py-4">{user.phone}</td>
//                   <td className="px-4 py-4">{user.email}</td>
//                   <td className="px-4 py-4">{user.role}</td>
//                   <td className="px-4 py-4">{user.status}</td>
//                   <td className="action_column">
//                     <div className="flex gap-1 justify-center">
//                       <Link to={`/UpdateUsersForm/${user.id}`}>
//                         <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
//                           <FaPen className="text-[12px]" />
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => {
//                           setSelectedUserId(user.id);
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
//                 আপনি কি ইউজারটি ডিলিট করতে চান?
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleModal}
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
//                 >
//                   না
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedUserId)}
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

// export default AllUsers;



// import { useEffect, useState, useRef } from "react"
// import {
//   Table,
//   Button,
//   Input,
//   Card,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Tooltip,
//   message,
//   Statistic,
//   Tag,
//   Modal,
//   Spin,
// } from "antd"
// import {
//   UserOutlined,
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SearchOutlined,
//   FileTextOutlined,
//   FileExcelOutlined,
//   FilePdfOutlined,
//   PrinterOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons"
// import axios from "axios"
// import { Link } from "react-router-dom"
// import * as XLSX from "xlsx"
// import { saveAs } from "file-saver"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"
// import { RiDeleteBinLine } from "react-icons/ri"

// const { Title, Text } = Typography
// const { Search } = Input
// const { confirm } = Modal

// const AllUsers = () => {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//   })

//   const printRef = useRef()

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("https://api.dropshep.com/api/users")
//       if (response.data.status === "success") {
//         setUsers(response.data.data)
//       }
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//       message.error("ইউজার ডেটা লোড করতে সমস্যা হয়েছে")
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`https://api.dropshep.com/api/users/delete/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete user")
//       }

//       setUsers((prev) => prev.filter((user) => user.id !== id))
//       message.success("ইউজার সফলভাবে ডিলিট হয়েছে")
//     } catch (error) {
//       console.error("Delete error:", error)
//       message.error("ডিলিট করতে সমস্যা হয়েছে!")
//     }
//   }

//   const showDeleteConfirm = (user) => {
//     confirm({
//       title: "ইউজার ডিলিট করুন",
//       icon: <ExclamationCircleOutlined />,
//       content: `আপনি কি নিশ্চিত যে "${user.name}" কে ডিলিট করতে চান?`,
//       okText: "হ্যাঁ",
//       okType: "danger",
//       cancelText: "না",
//       onOk() {
//         handleDelete(user.id)
//       },
//     })
//   }

//   // Export functionality
//   const csvData = users.map((user, index) => ({
//     index: index + 1,
//     name: user.name,
//     phone: user.phone,
//     email: user.email,
//     role: user.role,
//     status: user.status,
//   }))

//   const exportCSV = () => {
//     const csvContent = [
//       ["#", "নাম", "মোবাইল", "ইমেইল", "ধরন", "স্ট্যাটাস"],
//       ...csvData.map((item) => [item.index, item.name, item.phone, item.email, item.role, item.status]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//     saveAs(blob, "users_data.csv")
//   }

//   const exportExcel = () => {
//     const headers = ["#", "নাম", "মোবাইল", "ইমেইল", "ধরন", "স্ট্যাটাস"]

//     const formattedData = csvData.map((item) => ({
//       "#": item.index,
//       নাম: item.name,
//       মোবাইল: item.phone,
//       ইমেইল: item.email,
//       ধরন: item.role,
//       স্ট্যাটাস: item.status,
//     }))

//     const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers })
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data")
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" })
//     saveAs(data, "users_data.xlsx")
//   }

//   const exportPDF = () => {
//     const doc = new jsPDF()
//     const tableColumn = ["#", "Name", "Mobile", "Email", "Role", "Status"]

//     const tableRows = csvData.map((item) => [item.index, item.name, item.phone, item.email, item.role, item.status])

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       styles: { font: "helvetica", fontSize: 8 },
//     })

//     doc.save("users_data.pdf")
//   }

//   // Print function
//   const printTable = () => {
//     const printContent = printRef.current.innerHTML
//     const WinPrint = window.open("", "", "width=900,height=650")
//     WinPrint.document.write(`
//       <html>
//         <head>
//           <title>Print</title>
//           <style>
//             table { width: 100%; border-collapse: collapse; }
//             th, td { border: 1px solid #000; padding: 8px; text-align: center; }
//             .ant-btn { display: none; }
//           </style>
//         </head>
//         <body>${printContent}</body>
//       </html>
//     `)
//     WinPrint.document.close()
//     WinPrint.focus()
//     WinPrint.print()
//     WinPrint.close()
//   }

//   // Filter users based on search term
//   const filteredUsers = users.filter((user) => {
//     const term = searchTerm.toLowerCase()
//     return (
//       user.name?.toLowerCase().includes(term) ||
//       user.phone?.toLowerCase().includes(term) ||
//       user.email?.toLowerCase().includes(term) ||
//       user.role?.toLowerCase().includes(term) ||
//       user.status?.toLowerCase().includes(term)
//     )
//   })

//   // Calculate totals
//   const totalUsers = filteredUsers.length
//   const activeUsers = filteredUsers.filter((user) => user.status?.toLowerCase() === "active").length
//   const inactiveUsers = totalUsers - activeUsers
//   const adminUsers = filteredUsers.filter((user) => user.role?.toLowerCase() === "admin").length

//   // Get role color
//   const getRoleColor = (role) => {
//     switch (role?.toLowerCase()) {
//       case "admin":
//         return "red"
//       case "manager":
//         return "orange"
//       case "user":
//         return "blue"
//       case "driver":
//         return "green"
//       default:
//         return "default"
//     }
//   }

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "active":
//         return "success"
//       case "inactive":
//         return "error"
//       case "pending":
//         return "warning"
//       case "suspended":
//         return "error"
//       default:
//         return "default"
//     }
//   }

//   if (loading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Spin size="large" />
//       </div>
//     )
//   }

//   // Table columns
//   const columns = [
//     {
//       title: "SL",
//       key: "index",
//       width: 50,
//       render: (_, __, index) => (
//         <Text strong style={{ color: "#11375b" }}>
//           {(pagination.current - 1) * pagination.pageSize + index + 1}
//         </Text>
//       ),
//     },
//     {
//       title: "নাম",
//       dataIndex: "name",
//       key: "name",
//       width: 150,
//       render: (name) => (
//         <Space>
//           <Text strong>{name}</Text>
//         </Space>
//       ),
//     },
//     {
//       title: "মোবাইল",
//       dataIndex: "phone",
//       key: "phone",
//       width: 130,
//       render: (phone) => (
//         <Space>
//           <Text>{phone}</Text>
//         </Space>
//       ),
//     },
//     {
//       title: "ইমেইল",
//       dataIndex: "email",
//       key: "email",
//       width: 200,
//       ellipsis: {
//         showTitle: false,
//       },
//       render: (email) => (
//         <Tooltip placement="topLeft" title={email}>
//           <Space>
//             <Text>{email}</Text>
//           </Space>
//         </Tooltip>
//       ),
//     },
//     {
//       title: "ধরন",
//       dataIndex: "role",
//       key: "role",
//       width: 100,
//       render: (role) => <Text>{role}</Text>,
//       filters: [
//         { text: "Admin", value: "admin" },
//         { text: "Manager", value: "manager" },
//         { text: "User", value: "user" },
//         { text: "Driver", value: "driver" },
//       ],
//       onFilter: (value, record) => {
//         const recordRole = record.role?.toLowerCase() || ""
//         return recordRole === value
//       },
//     },
//     {
//       title: "স্ট্যাটাস",
//       dataIndex: "status",
//       key: "status",
//       width: 100,
//       align: "center",
//       render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
//       filters: [
//         { text: "Active", value: "active" },
//         { text: "Inactive", value: "inactive" },
//         { text: "Pending", value: "pending" },
//         { text: "Suspended", value: "suspended" },
//       ],
//       onFilter: (value, record) => {
//         const recordStatus = record.status?.toLowerCase() || ""
//         return recordStatus === value
//       },
//     },
//     {
//       title: "অ্যাকশন",
//       key: "actions",
//       width: 120,
//       align: "center",
//       render: (_, record) => (
//         <Space>
//            <Tooltip title="সম্পাদনা">
//                   <Link to={`/update-usersForm/${record.id}`}>
//                         <EditOutlined
//                           className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
//                         />
//                         </Link>
//                       </Tooltip>
//                              <Tooltip title="ডিলিট">
//                                   <RiDeleteBinLine
//                                     className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
//                                    onClick={() => showDeleteConfirm(record)}
                                
//                                   />
//                                   </Tooltip>
//         </Space>
//       ),
//     },
//   ]

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "10px",
//       }}
//     >
//       <Card
//         className="max-w-7xl mx-auto"
//         style={{
//           boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//           background: "rgba(255,255,255,0.9)",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         {/* Header */}
//         <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
//           <Col>
//             <Title level={4} style={{ margin: 0, color: "#11375B" }}>
//               <UserOutlined style={{ marginRight: "12px", color: "#11375B" }} />
//               সকল ইউজারের তালিকা
//             </Title>
//           </Col>
//           <Col>
//             <Link to="/add-userForm">
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 size="middel"
//                 className="!bg-primary"
//               >
//                 ইউজার
//               </Button>
//             </Link>
//           </Col>
//         </Row>

//         {/* Export and Search */}
//         <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
//           <Col>
//             <Space wrap>
//               {/* CSV */}
//               <Button
//                 icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
//                 onClick={exportCSV}
//                 style={{
//                   backgroundColor: "#e6f7ff",
//                   borderColor: "#91d5ff",
//                   color: "#1890ff",
//                 }}
//               >
//                 CSV
//               </Button>
//               {/* Excel */}
//               <Button
//                 icon={<FileExcelOutlined style={{ color: "#52c41a" }} />}
//                 onClick={exportExcel}
//                 style={{
//                   backgroundColor: "#f6ffed",
//                   borderColor: "#b7eb8f",
//                   color: "#52c41a",
//                 }}
//               >
//                 Excel
//               </Button>
//               {/* PDF */}
//               <Button
//                 icon={<FilePdfOutlined style={{ color: "#f5222d" }} />}
//                 onClick={exportPDF}
//                 style={{
//                   backgroundColor: "#fff2e8",
//                   borderColor: "#ffbb96",
//                   color: "#f5222d",
//                 }}
//               >
//                 PDF
//               </Button>
//               {/* Print */}
//               <Button
//                 icon={<PrinterOutlined style={{ color: "#722ed1" }} />}
//                 onClick={printTable}
//                 style={{
//                   backgroundColor: "#f9f0ff",
//                   borderColor: "#d3adf7",
//                   color: "#722ed1",
//                 }}
//               >
//                 Print
//               </Button>
//             </Space>
//           </Col>

//           {/* Search */}
//           <Col>
//             <Search
//               placeholder="ইউজার খুঁজুন...."
//               allowClear
//               onChange={(e) => setSearchTerm(e.target.value)}
//               enterButton={
//                 <Button
//                   style={{
//                     backgroundColor: "#11375B",
//                     color: "#fff",
//                     borderColor: "#11375B",
//                   }}
//                 >
//                   <SearchOutlined />
//                 </Button>
//               }
//             />
//           </Col>
//         </Row>

//         {/* Table */}
//         <div ref={printRef}>
//           <Table
//             columns={columns}
//             dataSource={filteredUsers}
//             loading={loading}
//             rowKey="id"
//             scroll={{ x: "max-content" }}
//             size="middle"
//             pagination={{
//               current: pagination.current,
//               pageSize: pagination.pageSize,
//               showSizeChanger: true,
//               pageSizeOptions: ["10", "20", "50", "100"],
//               onChange: (page, pageSize) => {
//                 setPagination({ current: page, pageSize })
//               },
//               onShowSizeChange: (current, size) => {
//                 setPagination({ current: 1, pageSize: size })
//               },
//             }}
//           />
//         </div>
//       </Card>
//     </div>
//   )
// }

// export default AllUsers


import { useEffect, useState, useRef } from "react";
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
  message,
  Tag,
  Modal,
  Spin,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

const { Title, Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchUsers();
  }, []);
   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.dropshep.com/api/users");
      if (response.data.status === "success") {
        setUsers(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("ইউজার ডেটা লোড করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  //  Show confirmation modal
  const showDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };
  // cancel delete modal
  const handleCancel = () => {
    setDeleteModalVisible(false);
    setSelectedUser(null);
  };

  //  Delete user
const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.delete(
        `https://api.dropshep.com/api/users/delete/${selectedUser.id}`
      );
      if (response.data.status === "success") {
        setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
        message.success("ইউজার সফলভাবে ডিলিট হয়েছে");
        setDeleteModalVisible(false);
        setSelectedUser(null);
      } else {
        throw new Error("ডিলিট ব্যর্থ");
      }
    } catch (error) {
      console.error("Delete error:", error);
      message.error("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };


  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "SL",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 60,
    },
    {
      title: "নাম",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "মোবাইল",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ইমেইল",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ধরন",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "স্ট্যাটাস",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="সম্পাদনা">
            <Link to={`/update-usersForm/${record.id}`}>
              <EditOutlined className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary" />
            </Link>
          </Tooltip>
          <Tooltip title="ডিলিট">
            <RiDeleteBinLine
              className="text-red-500 cursor-pointer text-xl"
               onClick={() => {
  showDeleteModal(record);
}}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="max-w-7xl mx-auto">
        {/* Header */}
        <Row justify="space-between" align="middle" className="mb-4">
          <Col>
            <Title level={4} style={{ margin: 0, color: "#11375B" }}>
              <UserOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              সকল ইউজারের তালিকা
            </Title>
          </Col>
          <Col>
            <Link to="/add-userForm">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="!bg-primary"
              >
                ইউজার
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Search */}
        <Row justify="end" className="mb-4">
          <Col>
            <Search
              placeholder="ইউজার খুঁজুন..."
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
        <Table
        size="small"
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
        />
      </Card>
      <Modal
        visible={deleteModalVisible}
        title="ডিলিট কনফার্মেশন"
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="হ্যাঁ"
        cancelText="না"
        okButtonProps={{ danger: true }}
      >
        <ExclamationCircleOutlined style={{ color: "red", marginRight: 8 }} />
        আপনি কি নিশ্চিত যে "{selectedUser?.name}" ইউজারকে ডিলিট করতে চান?
      </Modal>
    </div>
  );
};

export default AllUsers;
