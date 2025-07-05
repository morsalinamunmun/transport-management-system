// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   FaTruck,
//   FaChartPie,
//   FaUsers,
//   FaUserPlus,
//   FaArrowUp,
// } from "react-icons/fa";

// const StatisticsCard = () => {
//   const [trips, setTrips] = useState([]);
//   const [vehicle, setvehicle] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [uniqueCustomerCount, setUniqueCustomerCount] = useState(0);
//   const [driver, setDriver] = useState([]);
//   // trips
//   useEffect(() => {
//     axios.get("https://api.dropshep.com/api/trip").then((res) => {
//       setTrips(res.data.data);
//     });
//   }, []);
//   // vehicle
//   useEffect(() => {
//     axios.get("https://api.dropshep.com/api/vehicle").then((res) => {
//       setvehicle(res.data.data);
//     });
//   }, []);
//   // customer count
//   useEffect(() => {
//     fetch("https://api.dropshep.com/api/trip")
//       .then((res) => res.json())
//       .then((response) => {
//         const trips = response.data;

//         if (Array.isArray(trips)) {
//           // Extract all customer names
//           const customerNames = trips
//             .map((trip) => trip.customer?.trim())
//             .filter((name) => name && name !== ""); // Remove null/empty values

//           // Use Set to get unique names
//           const uniqueCustomers = new Set(customerNames);
//           setUniqueCustomerCount(uniqueCustomers.size);
//         } else {
//           console.error("Invalid data format:", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching trips:", error);
//       });
//   }, []);

//   // users
//   useEffect(() => {
//     axios.get("https://api.dropshep.com/api/users").then((res) => {
//       setUsers(res.data.data);
//     });
//   }, []);
//   // drivers
//   useEffect(() => {
//     axios.get("https://api.dropshep.com/api/driver").then((res) => {
//       setDriver(res.data.data);
//     });
//   }, []);

//   return (
//     <div className="px-1 md:px-5 py-6">
//       <ul className="grid grid-cols-2 md:flex gap-3 justify-between">
//         {/* Total Trips Card */}
//         <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
//           <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
//             <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
//               <FaTruck className="text-white text-3xl" />
//             </span>
//             <div>
//               <h3 className="text-[#11375B] md:font-semibold">টোটাল ট্রিপ</h3>
//               <span className="text-gray-500 font-semibold">
//                 {trips.length}
//               </span>
//             </div>
//           </div>
//           <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
//             <span className="pr-1 md:pr-3">আরও তথ্য</span>
//             <FaArrowUp className="inline-block" />
//           </button>
//         </li>

//         {/* Total vehicle Card */}
//         <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
//           <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
//             <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
//               <FaChartPie className="text-white text-3xl" />
//             </span>
//             <div>
//               <h3 className="text-[#11375B] md:font-semibold">টোটাল গাড়ি</h3>
//               <span className="text-gray-500 font-semibold">
//                 {vehicle.length}
//               </span>
//             </div>
//           </div>
//           <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
//             <span className="pr-1 md:pr-3">আরও তথ্য</span>
//             <FaArrowUp className="inline-block" />
//           </button>
//         </li>

//         {/* Total Customers Card */}
//         <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
//           <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
//             <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
//               <FaUsers className="text-white text-3xl" />
//             </span>
//             <div>
//               {/* todo */}
//               <h3 className="text-[#11375B] md:font-semibold">টোটাল গ্রাহক</h3>
//               <span className="text-gray-500 font-semibold">
//                 {uniqueCustomerCount}
//               </span>
//             </div>
//           </div>
//           <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
//             <span className="pr-1 md:pr-3">আরও তথ্য</span>
//             <FaArrowUp className="inline-block" />
//           </button>
//         </li>

//         {/* Drivers Card */}
//         <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
//           <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
//             <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
//               <FaUserPlus className="text-white text-3xl" />
//             </span>
//             <div>
//               <h3 className="text-[#11375B] md:font-semibold">ড্রাইভার</h3>
//               <span className="text-gray-500 font-semibold">
//                 {driver.length}
//               </span>
//             </div>
//           </div>
//           <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
//             <span className="pr-1 md:pr-3">আরও তথ্য</span>
//             <FaArrowUp className="inline-block" />
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default StatisticsCard;



import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Statistic, Row, Col, Spin } from "antd"
import { CarOutlined, TeamOutlined, UserAddOutlined, TruckOutlined } from "@ant-design/icons"

const StatisticsCard = () => {
  const [trips, setTrips] = useState([])
  const [vehicle, setvehicle] = useState([])
  const [uniqueCustomerCount, setUniqueCustomerCount] = useState(0)
  const [driver, setDriver] = useState([]);

  const [loadingVehicle, setLoadingVehicle] = useState(true)
  const [loadingCustomer, setLoadingCustomer] = useState(true)
  const [loadingDriver, setLoadingDriver] = useState(true)

  // trips
  useEffect(() => {
    axios.get("https://api.dropshep.com/api/trip").then((res) => {
      setTrips(res.data.data)
    })
  }, [])

  // vehicle
  useEffect(() => {
    axios.get("https://api.dropshep.com/api/vehicle").then((res) => {
      setvehicle(res.data.data)
      setLoadingVehicle(false)
    })
  }, [])

  // customer count
  useEffect(() => {
    fetch("https://api.dropshep.com/api/trip")
      .then((res) => res.json())
      .then((response) => {
        const trips = response.data
        if (Array.isArray(trips)) {
          const customerNames = trips.map((trip) => trip.customer?.trim()).filter((name) => name && name !== "")
          const uniqueCustomers = new Set(customerNames)
          setUniqueCustomerCount(uniqueCustomers.size)
           setLoadingCustomer(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching trips:", error)
         setLoadingCustomer(false)
      })
  }, [])

  // drivers
  useEffect(() => {
    axios.get("https://api.dropshep.com/api/driver").then((res) => {
      setDriver(res.data.data)
    })
     setLoadingDriver(false)
  }, [])

  const statisticsData = [
    // {
    //   title: "টোটাল ট্রিপ",
    //   value: trips.length,
    //   icon: <TruckOutlined className="text-white text-xl" />,
    //   iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
    //   cardBg: "bg-gradient-to-r from-blue-50 to-blue-100",
    //   textColor: "text-blue-700",
    //   borderColor: "border-l-blue-500",
    // },
    {
      title: "টোটাল গাড়ি",
      value: vehicle.length,
      loading: loadingVehicle,
      icon: <CarOutlined className="!text-white text-xl" />,
      iconBg: "bg-gradient-to-r from-green-500 to-green-600",
      cardBg: "bg-gradient-to-r from-green-50 to-green-100",
      textColor: "text-green-700",
      borderColor: "border-l-green-500",
    },
    {
      title: "টোটাল গ্রাহক",
      value: uniqueCustomerCount,
      loading: loadingCustomer,
      icon: <TeamOutlined className="!text-white text-xl" />,
      iconBg: "bg-gradient-to-r from-orange-500 to-orange-600",
      cardBg: "bg-gradient-to-r from-orange-50 to-orange-100",
      textColor: "text-orange-700",
      borderColor: "border-l-orange-500",
    },
    {
      title: "ড্রাইভার",
      value: driver.length,
      loading: loadingDriver,
      icon: <UserAddOutlined className="!text-white text-xl" />,
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-600",
      cardBg: "bg-gradient-to-r from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-l-purple-500",
    },
  ]

  return (
    <div className="px-6 pt-6 ">
      <Row gutter={[20, 20]}>
        {statisticsData.map((item, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className={`${item.cardBg} ${item.borderColor} border-l-4 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden`}
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex items-center gap-2 md:gap-0 md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-primary rounded-lg shadow-md`}>{item.icon}</div>
                    <h3 className={`text-primary font-semibold text-xs md:text-base`}>{item.title}</h3>
                    </div>
                    <p className="text-3xl font-medium">{item.loading ? <Spin size="small" /> : item.value}</p>
                  </div>
                  {/* <Statistic
                    value={item.value}
                    valueStyle={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      // color: "#1f2937",
                    }}
                    className="!text-white"
                  /> */}
                </div>
                <div className="ml-4">
                  <div className={`w-2 h-16 ${item.iconBg} rounded-full opacity-30`}></div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default StatisticsCard
