// import React, { useState } from "react";
// import {
//   FaBars,
//   FaCarRear,
//   FaChevronDown,
//   FaChevronUp,
//   FaBriefcase,
//   FaUser,
// } from "react-icons/fa6";
// import logo from "../assets/logo.png";
// import avatar from "../assets/avatar.png";
// import { Link, useLocation } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";

// const Sidebar = () => {
//   const [openMenu, setOpenMenu] = useState({
//     fleet: false,
//     business: false,
//     user: false,
//   });

//   const location = useLocation();

//   const toggleMenu = (menu) => {
//     setOpenMenu((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };

//   const isActive = (path) => location.pathname === path;
//   const isAdmin = useAdmin();

//   return (
//     <div className="overflow-y-scroll hide-scrollbar">
//       <main>
//         {/* Logo */}
//         <div className="flex justify-center border-b border-gray-300">
//           <Link to="/">
//             <img src={logo} alt="Logo" className="w-28" />
//           </Link>
//         </div>

//         {/* Admin Info */}
//         <div className="p-3 border-b border-gray-300">
//           <div className="bg-white p-2 rounded-md flex gap-2 items-center">
//             <img
//               src={avatar}
//               alt="Admin Avatar"
//               className="w-8 rounded-2xl drop-shadow"
//             />
//             <h3 className="text-primary font-semibold">এডমিন</h3>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="mt-3 px-2">
//           <ul className="space-y-2">
//             {/* Dashboard */}
//             <li
//               className={`py-3 px-2 rounded-sm cursor-pointer ${
//                 isActive("/")
//                   ? "bg-primary text-white"
//                   : "text-white bg-primary"
//               }`}
//             >
//               <Link to="/" className="flex items-center gap-2 font-semibold">
//                 <FaBars />
//                 <span className="ps-2">ড্যাশবোর্ড</span>
//               </Link>
//             </li>

//             {isAdmin ? (
//               <>
//                 {/* Fleet Management */}
//                 <li className="text-primary font-medium rounded-sm">
//                   <div
//                     onClick={() => toggleMenu("fleet")}
//                     className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FaCarRear />
//                       <span>ফ্লীট ম্যানেজমেন্ট</span>
//                     </span>
//                     {openMenu.fleet ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {openMenu.fleet && (
//                     <ul className="space-y-0 px-2 text-sm mt-2">
//                       <li>
//                         <Link
//                           to="/CarList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/CarList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/CarList") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>গাড়ি তালিকা</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/DriverList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/DriverList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/DriverList")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ড্রাইভার তালিকা</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/TripList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/TripList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/TripList") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ট্রিপ হিসাব</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Fuel"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Fuel")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Fuel") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ফুয়েল হিসাব</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Parts"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Parts")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Parts") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>পার্টস এন্ড স্পায়ারস</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Maintenance"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Maintenance")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Maintenance")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>মেইনটেনেন্স</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//                 {/* Business Reports */}
//                 <li className="text-primary font-medium rounded-sm">
//                   <div
//                     onClick={() => toggleMenu("business")}
//                     className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FaBriefcase />
//                       <span>বিজনেসের বিবরণ</span>
//                     </span>
//                     {openMenu.business ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {openMenu.business && (
//                     <ul className="space-y-3 px-2 text-sm mt-2">
//                       <li>
//                         <Link
//                           to="/DailyIncome"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/DailyIncome")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/DailyIncome")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>দৈনিক আয়</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/DailyExpense"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/DailyExpense")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/DailyExpense")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>দৈনিক ব্যয়</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//                 {/* User Control */}
//                 <li className="text-primary font-medium rounded-sm">
//                   <div
//                     onClick={() => toggleMenu("user")}
//                     className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FaUser />
//                       <span>ইউজার কন্ট্রোল</span>
//                     </span>
//                     {openMenu.user ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {openMenu.user && (
//                     <ul className="space-y-3 px-2 text-sm mt-2">
//                       <li>
//                         <Link
//                           to="/AllUsers"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/AllUsers")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/AllUsers") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>সকল ইউজার</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </>
//             ) : (
//               <>
//                 {/* Fleet Management */}
//                 <li className="text-primary font-medium rounded-sm">
//                   <div
//                     onClick={() => toggleMenu("fleet")}
//                     className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FaCarRear />
//                       <span>ফ্লীট ম্যানেজমেন্ট</span>
//                     </span>
//                     {openMenu.fleet ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {openMenu.fleet && (
//                     <ul className="space-y-0 px-2 text-sm mt-2">
//                       <li>
//                         <Link
//                           to="/CarList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/CarList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/CarList") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>গাড়ি তালিকা</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/DriverList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/DriverList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/DriverList")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ড্রাইভার তালিকা</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/TripList"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/TripList")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/TripList") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ট্রিপ হিসাব</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Fuel"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Fuel")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Fuel") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>ফুয়েল হিসাব</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Parts"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Parts")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Parts") ? "bg-white" : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>পার্টস এন্ড স্পায়ারস</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/Maintenance"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/Maintenance")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/Maintenance")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>মেইনটেনেন্স</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 {/* Business Reports */}
//                 <li className="text-primary font-medium rounded-sm">
//                   <div
//                     onClick={() => toggleMenu("business")}
//                     className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FaBriefcase />
//                       <span>বিজনেসের বিবরণ</span>
//                     </span>
//                     {openMenu.business ? <FaChevronUp /> : <FaChevronDown />}
//                   </div>

//                   {openMenu.business && (
//                     <ul className="space-y-3 px-2 text-sm mt-2">
//                       <li>
//                         <Link
//                           to="/DailyExpense"
//                           className={`flex gap-2 items-center px-2 py-3 rounded-sm font-medium ${
//                             isActive("/DailyExpense")
//                               ? "text-white bg-primary"
//                               : "text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           <div
//                             className={`w-[6px] h-[6px] rounded-full bg-primary ${
//                               isActive("/DailyExpense")
//                                 ? "bg-white"
//                                 : "bg-primary"
//                             }`}
//                           ></div>
//                           <span>দৈনিক ব্যয়</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Sidebar;



import { useState } from "react"
import { Layout, Menu, Avatar } from "antd"
import { DashboardOutlined, CarOutlined, FundOutlined, UserOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import useAdmin from "../hooks/useAdmin"
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const isAdmin = useAdmin()

  // Get current selected key from pathname
  const getSelectedKey = () => {
    return location.pathname === "/" ? "dashboard" : location.pathname.replace("/", "")
  }

  // Admin menu items
  const adminMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/">ড্যাশবোর্ড</Link>,
    },
    {
      key: "fleet",
      icon: <CarOutlined />,
      label: "ফ্লীট ম্যানেজমেন্ট",
      children: [
        {
          key: "CarList",
          label: <Link to="/CarList">গাড়ি তালিকা</Link>,
        },
        {
          key: "DriverList",
          label: <Link to="/DriverList">ড্রাইভার তালিকা</Link>,
        },
        {
          key: "TripList",
          label: <Link to="/TripList">ট্রিপ হিসাব</Link>,
        },
        {
          key: "Fuel",
          label: <Link to="/Fuel">ফুয়েল হিসাব</Link>,
        },
        {
          key: "Parts",
          label: <Link to="/Parts">পার্টস এন্ড স্পায়ারস</Link>,
        },
        {
          key: "Maintenance",
          label: <Link to="/Maintenance">মেইনটেনেন্স</Link>,
        },
      ],
    },
    {
      key: "business",
      icon: <FundOutlined />,
      label: "বিজনেসের বিবরণ",
      children: [
        {
          key: "DailyIncome",
          label: <Link to="/DailyIncome">দৈনিক আয়</Link>,
        },
        {
          key: "DailyExpense",
          label: <Link to="/DailyExpense">দৈনিক ব্যয়</Link>,
        },
      ],
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "ইউজার কন্ট্রোল",
      children: [
        {
          key: "AllUsers",
          label: <Link to="/AllUsers">সকল ইউজার</Link>,
        },
      ],
    },
  ]

  // Regular user menu items
  // const userMenuItems = [
  //   {
  //     key: "dashboard",
  //     icon: <DashboardOutlined />,
  //     label: <Link to="/">ড্যাশবোর্ড</Link>,
  //   },
  //   {
  //     key: "fleet",
  //     icon: <CarOutlined />,
  //     label: "ফ্লীট ম্যানেজমেন্ট",
  //     children: [
  //       {
  //         key: "CarList",
  //         label: <Link to="/CarList">গাড়ি তালিকা</Link>,
  //       },
  //       {
  //         key: "DriverList",
  //         label: <Link to="/DriverList">ড্রাইভার তালিকা</Link>,
  //       },
  //       {
  //         key: "TripList",
  //         label: <Link to="/TripList">ট্রিপ হিসাব</Link>,
  //       },
  //       {
  //         key: "Fuel",
  //         label: <Link to="/Fuel">ফুয়েল হিসাব</Link>,
  //       },
  //       {
  //         key: "Parts",
  //         label: <Link to="/Parts">পার্টস এন্ড স্পায়ারস</Link>,
  //       },
  //       {
  //         key: "Maintenance",
  //         label: <Link to="/Maintenance">মেইনটেনেন্স</Link>,
  //       },
  //     ],
  //   },
  //   {
  //     key: "business",
  //     icon: <FundOutlined />,
  //     label: "বিজনেসের বিবরণ",
  //     children: [
  //       {
  //         key: "DailyExpense",
  //         label: <Link to="/DailyExpense">দৈনিক ব্যয়</Link>,
  //       },
  //     ],
  //   },
  // ]

  // const menuItems = isAdmin ? adminMenuItems : userMenuItems

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      collapsedWidth="80"
      width={260}
      className="bg-white shadow-lg custom-sider"
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        overflow: "auto",
      }}
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center p-4 border-b border-gray-200">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${collapsed ? "w-8 h-8" : "w-28 h-auto"}`}
          />
        </Link>
      </div>

      {/* Admin Info Section */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
            <Avatar  src={avatar} size={32} className="shadow-sm" />
            <div className="flex-1">
              <h3 className="text-gray-800 font-semibold text-sm">এডমিন</h3>
       
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="p-2">
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={["fleet", "business", "user"]}
          items={adminMenuItems}
          className="border-0 bg-transparent h-full custom-menu"
          style={{
            fontSize: "14px",
          }}
        />
      </div>
    </Sider>
  )
}

export default Sidebar

