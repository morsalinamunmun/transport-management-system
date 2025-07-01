// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";

// const OverViewCard = () => {
//   const [expiringDocs, setExpiringDocs] = useState([]);
//   const [octenCost, setOctenCost] = useState(0);
//   const [dieselCost, setDieselCost] = useState(0);
//   const [petrolCost, setPetrolCost] = useState(0);
//   const [gasCost, setGasCost] = useState(0);
//   // total maintenance cost
//   const [todayCost, setTodayCost] = useState(0);
//   // trip cost
//   const [otherExpenses, setOtherExpenses] = useState(0);
//   const [demarage, setDemarage] = useState(0);
//   const [driverCommission, setDriverCommission] = useState(0);
//   const [todayIncome, setTodayIncome] = useState(0);

//   const today = dayjs().format("YYYY-MM-DD");

//   // রিমাইন্ডার ফেচ
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.dropshep.com/api/vehicle"
//         );
//         const vehicles = response.data?.data || [];

//         const todayDate = dayjs();
//         const expiring = [];

//         vehicles.forEach((vehicle) => {
//           ["fitness_date", "road_permit_date", "text_date"].forEach((type) => {
//             const date = dayjs(vehicle[type]);
//             if (
//               date.isValid() &&
//               date.diff(todayDate, "day") <= 7 &&
//               date.diff(todayDate, "day") >= 0
//             ) {
//               expiring.push({
//                 vehicle: vehicle.registration_number,
//                 document: type.replace(/_/g, " ").toUpperCase(),
//                 expireDate: date.format("DD-MM-YYYY"),
//               });
//             }
//           });
//         });

//         setExpiringDocs(expiring);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   // আজকের ফুয়েল এবং গ্যাস খরচ
//   useEffect(() => {
//     const fetchFuelData = async () => {
//       try {
//         const response = await axios.get("https://api.dropshep.com/api/fuel");
//         const fuels = response.data?.data || [];

//         let octen = 0;
//         let diesel = 0;
//         let petrol = 0;
//         let gas = 0;

//         fuels.forEach((fuel) => {
//           if (fuel.date_time === today) {
//             const totalPrice = parseFloat(fuel.total_price) || 0;
//             const type = (fuel.type || "").toLowerCase();

//             if (type === "octen") {
//               octen += totalPrice;
//             } else if (type === "diesel") {
//               diesel += totalPrice;
//             } else if (type === "petroll" || type === "petrol") {
//               petrol += totalPrice;
//             } else if (type === "gas") {
//               gas += totalPrice;
//             }
//           }
//         });

//         setOctenCost(octen);
//         setDieselCost(diesel);
//         setPetrolCost(petrol);
//         setGasCost(gas);
//       } catch (error) {
//         console.error("Error fetching fuel data:", error);
//       }
//     };

//     fetchFuelData();
//   }, [today]);

//   const totalCost = octenCost + dieselCost + petrolCost + gasCost;

//   // calculate total maintenance cost
//   useEffect(() => {
//     const fetchMaintenanceData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.dropshep.com/api/maintenance"
//         );
//         const data = response.data.data;

//         const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

//         const total = data
//           .filter((item) => item.date === today)
//           .reduce((sum, item) => sum + parseFloat(item.total_cost), 0);

//         setTodayCost(total);
//       } catch (error) {
//         console.error("Failed to fetch maintenance data", error);
//       }
//     };

//     fetchMaintenanceData();
//   }, []);

//   // trip cost
//   useEffect(() => {
//     const fetchTripData = async () => {
//       try {
//         const response = await axios.get("https://api.dropshep.com/api/trip");
//         const data = response.data.data;

//         const today = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

//         // Filter trips that happened today only
//         const todayTrips = data.filter((trip) => trip.trip_date === today);

//         // Sum today's other expenses
//         const totalOtherExpenses = todayTrips.reduce(
//           (sum, trip) => sum + parseFloat(trip.other_expenses || 0),
//           0
//         );

//         // Sum today's demarage
//         const totalDemarage = todayTrips.reduce(
//           (sum, trip) => sum + parseFloat(trip.demarage || 0),
//           0
//         );
//         // Sum today's driver commission
//         const totalCommission = todayTrips.reduce(
//           (sum, trip) => sum + parseFloat(trip.driver_percentage || 0),
//           0
//         );
//         // Sum today's trip income
//         const totalTripIncome = todayTrips.reduce(
//           (sum, trip) => sum + parseFloat(trip.trip_price || 0),
//           0
//         );

//         setOtherExpenses(totalOtherExpenses);
//         setDemarage(totalDemarage);
//         setDriverCommission(totalCommission);
//         setTodayIncome(totalTripIncome);
//       } catch (error) {
//         console.error("Failed to fetch trip data", error);
//       }
//     };

//     fetchTripData();
//   }, []);
//   const totalCommission = otherExpenses + demarage + driverCommission;

//   // total expense
//   const totalExpense = totalCost + todayCost + totalCommission;
//   return (
//     <div className="md:p-5">
//       <ul className="md:flex gap-3">
//         {/* আয় কার্ড */}
//         <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
//           <div className="text-primary border-b pb-3 border-gray-300">
//             <h3 className="font-semibold">আজকের আয়</h3>
//           </div>
//           <div className="p-3 text-primary font-semibold text-sm space-y-2">
//             <div className="flex items-center gap-3">
//               <p className="flex justify-between w-full mt-3 pt-3">
//                 <span>আজকের আয়</span> - <span>{todayIncome}</span>
//               </p>
//             </div>
//             {/* <div className="flex items-center gap-3">
//               <p className="flex justify-between w-full mt-3 pt-3">
//                 <span>আজকের প্রফিট</span> - <span>{todayIncome}</span>
//               </p>
//             </div> */}
//           </div>
//         </li>

//         {/* ব্যয় কার্ড */}
//         <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
//           <div className="text-primary border-b pb-3 border-gray-300">
//             <h3 className="font-semibold">আজকের ব্যয়</h3>
//           </div>
//           <div className="p-3 text-primary font-semibold text-sm space-y-2">
//             <div className="flex items-center gap-3">
//               <div className="bg-primary w-[6px] h-[6px] rounded-full" />
//               <p className="flex justify-between w-full">
//                 <span>তেলের খরচ</span> - <span>{totalCost} টাকা</span>
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="bg-primary w-[6px] h-[6px] rounded-full" />
//               <p className="flex justify-between w-full">
//                 <span>মেইনটেনেন্স খরচ</span> -{" "}
//                 <span>{todayCost.toFixed(2)} টাকা</span>
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="bg-primary w-[6px] h-[6px] rounded-full" />
//               <p className="flex justify-between w-full">
//                 <span>ট্রিপ খরচ</span> -{" "}
//                 <span>{totalCommission.toFixed(2)} টাকা</span>
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <p className="flex justify-between w-full border-t mt-3 pt-3">
//                 <span>মোট ব্যয়</span> -{" "}
//                 <span>{totalExpense.toFixed(2)} টাকা</span>
//               </p>
//             </div>
//           </div>
//         </li>

//         {/* রিমাইন্ডার কার্ড */}
//         <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
//           <div className="text-primary border-b pb-3 border-gray-300">
//             <h3 className="font-semibold">রিমাইন্ডার</h3>
//           </div>
//           <div className="py-3 text-primary font-semibold text-sm space-y-2">
//             {expiringDocs.length > 0 ? (
//               expiringDocs.map((item, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <div className="w-full">
//                     <p>গাড়ির নং: {item.vehicle}</p>
//                     <p>ডকুমেন্টের নাম: {item.document}</p>
//                     <p>মেয়াদোত্তীর্ণ তারিখ: {item.expireDate}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500">
//                 কোনো মেয়াদোত্তীর্ণ ডেট নেই
//               </p>
//             )}
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default OverViewCard;


import { useEffect, useState } from "react"
import { Card, Row, Col, Statistic, List, Typography, Space, Badge, Table, Tag } from "antd"
import {
  DollarOutlined,
  ToolOutlined,
  BellOutlined,
  TrophyOutlined,
  FireOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons"
import axios from "axios"
import dayjs from "dayjs"
import { FaCarSide } from "react-icons/fa6"

const { Title, Text } = Typography

const OverViewCard = () => {
  const [expiringDocs, setExpiringDocs] = useState([])
  const [octenCost, setOctenCost] = useState(0)
  const [dieselCost, setDieselCost] = useState(0)
  const [petrolCost, setPetrolCost] = useState(0)
  const [gasCost, setGasCost] = useState(0)
  const [todayCost, setTodayCost] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)
  const [demarage, setDemarage] = useState(0)
  const [driverCommission, setDriverCommission] = useState(0)
  const [todayIncome, setTodayIncome] = useState(0)

  const [trips, setTrips] = useState([])

  const today = dayjs().format("YYYY-MM-DD")

    
  // রিমাইন্ডার ফেচ
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("https://api.dropshep.com/api/vehicle")
        const vehicles = response.data?.data || []
        const todayDate = dayjs()
        const expiring = []

        vehicles.forEach((vehicle) => {
          ;["fitness_date", "road_permit_date", "text_date"].forEach((type) => {
            const date = dayjs(vehicle[type])
            if (date.isValid() && date.diff(todayDate, "day") <= 7 && date.diff(todayDate, "day") >= 0) {
              expiring.push({
                vehicle: vehicle.registration_number,
                document: type.replace(/_/g, " ").toUpperCase(),
                expireDate: date.format("DD-MM-YYYY"),
                daysLeft: date.diff(todayDate, "day"),
              })
            }
          })
        })

        setExpiringDocs(expiring)
      } catch (error) {
        console.error("Error fetching vehicle data:", error)
      }
    }

    fetchVehicles()
  }, [])

  // আজকের ফুয়েল এবং গ্যাস খরচ
  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        const response = await axios.get("https://api.dropshep.com/api/fuel")
        const fuels = response.data?.data || []
        let octen = 0
        let diesel = 0
        let petrol = 0
        let gas = 0

        fuels.forEach((fuel) => {
          if (fuel.date_time === today) {
            const totalPrice = Number.parseFloat(fuel.total_price) || 0
            const type = (fuel.type || "").toLowerCase()

            if (type === "octen") {
              octen += totalPrice
            } else if (type === "diesel") {
              diesel += totalPrice
            } else if (type === "petroll" || type === "petrol") {
              petrol += totalPrice
            } else if (type === "gas") {
              gas += totalPrice
            }
          }
        })

        setOctenCost(octen)
        setDieselCost(diesel)
        setPetrolCost(petrol)
        setGasCost(gas)
      } catch (error) {
        console.error("Error fetching fuel data:", error)
      }
    }

    fetchFuelData()
  }, [today])

  const totalCost = octenCost + dieselCost + petrolCost + gasCost

  // calculate total maintenance cost
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get("https://api.dropshep.com/api/maintenance")
        const data = response.data.data
      
        const today = new Date().toISOString().split("T")[0]

        const total = data
          .filter((item) => item.date === today)
          .reduce((sum, item) => sum + Number.parseFloat(item.total_cost), 0)

        setTodayCost(total)
      } catch (error) {
        console.error("Failed to fetch maintenance data", error)
      }
    }

    fetchMaintenanceData()
  }, [])

  // trip cost
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get("https://api.dropshep.com/api/trip")
        const data = response.data.data
          setTrips(data)
        const today = new Date().toISOString().split("T")[0]

        const todayTrips = data.filter((trip) => trip.trip_date === today)

        const totalOtherExpenses = todayTrips.reduce(
          (sum, trip) => sum + Number.parseFloat(trip.other_expenses || 0),
          0,
        )

        const totalDemarage = todayTrips.reduce((sum, trip) => sum + Number.parseFloat(trip.demarage || 0), 0)

        const totalCommission = todayTrips.reduce(
          (sum, trip) => sum + Number.parseFloat(trip.driver_percentage || 0),
          0,
        )

        const totalTripIncome = todayTrips.reduce((sum, trip) => sum + Number.parseFloat(trip.trip_price || 0), 0)

        setOtherExpenses(totalOtherExpenses)
        setDemarage(totalDemarage)
        setDriverCommission(totalCommission)
        setTodayIncome(totalTripIncome)
      } catch (error) {
        console.error("Failed to fetch trip data", error)
      }
    }

    fetchTripData()
  }, [])

  const totalCommission = otherExpenses + demarage + driverCommission
  const totalExpense = totalCost + todayCost + totalCommission
  const profit = todayIncome - totalExpense

  // Expense table data
  const expenseTableData = [
    {
      key: "1",
      type: "তেলের খরচ",
      amount: totalCost,
      icon: <FireOutlined style={{ color: "#fa8c16" }} />,
      status: totalCost > 0 ? "active" : "inactive",
    },
    {
      key: "2",
      type: "মেইনটেনেন্স খরচ",
      amount: todayCost,
      icon: <ToolOutlined style={{ color: "#f5222d" }} />,
      status: todayCost > 0 ? "active" : "inactive",
    },
    {
      key: "3",
      type: "ট্রিপ খরচ",
      amount: totalCommission,
      icon: <UserOutlined style={{ color: "#13c2c2" }} />,
      status: totalCommission > 0 ? "active" : "inactive",
    },
  ]

  const columns = [
    {
      title: "খরচের ধরন",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Space>
          {record.icon}
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "পরিমাণ (টাকা)",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => (
        <Text strong style={{ color: amount > 0 ? "#f5222d" : "#8c8c8c" }}>
          {amount.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "স্ট্যাটাস",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "active" ? "red" : "default"}>{status === "active" ? "খরচ হয়েছে" : "খরচ নেই"}</Tag>
      ),
    },
  ]

  return (
    <div className="p-6 ">
      {/* Top Row - Income and Reminder Cards */}
      <Row gutter={[16, 16]} className="mb-5">
        {/* আয় কার্ড */}
        <Col xs={12} md={12} lg={8}>
          <Card
            size="small"
            title={
              <Space className="text-gray-800">
                <TrophyOutlined style={{ color: "#faad14" }} />
                <span>আজকের আয়</span>
              </Space>
            }
            extra={<Badge count="আয়" style={{ backgroundColor: "#52c41a" }} />}
            hoverable
            className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Statistic
                value={todayIncome}
                suffix="টাকা"
                valueStyle={{ color: "#11375b", fontSize: "20px" }}
                className=" flex justify-center text-center text-primary"
              />
          
            </Space>
          </Card>
        </Col>

        {/* রিমাইন্ডার কার্ড */}
        <Col xs={12} md={12} lg={8}>
          <Card
            size="small"
            title={
              <Space className="text-gray-800">
                <BellOutlined style={{ color: "#fa8c16" }} />
                <span>রিমাইন্ডার</span>
                {expiringDocs.length > 0 && <Badge count={expiringDocs.length} />}
              </Space>
            }
            hoverable
            className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            bodyStyle={{ padding: "12px", maxHeight: "140px", overflowY: "auto" }}
          >
            {expiringDocs.length > 0 ? (
              <List
                size="small"
                dataSource={expiringDocs}
                renderItem={(item) => (
                  <List.Item className="py-2 border-b border-gray-100 last:border-b-0">
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <div className="flex justify-between items-center">
                        <Text strong className="text-xs text-gray-900">
                          {item.vehicle}
                        </Text>
                        <Tag color={item.daysLeft <= 3 ? "red" : "orange"} className="text-xs font-medium">
                          {item.daysLeft} দিন
                        </Tag>
                      </div>
                      <Text className="text-xs text-gray-500">{item.document}</Text>
                      <Text className="text-xs text-red-600">{item.expireDate}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <BellOutlined className="text-2xl mb-2" />
                <Text type="secondary" className="text-xs">
                  কোনো মেয়াদোত্তীর্ণ ডেট নেই
                </Text>
              </div>
            )}
          </Card>
        </Col>
        {/* Total Trip */}
        <Col xs={12} md={12} lg={8}>
       <Card
            size="small"
            title={
              <Space className="text-gray-800">
                
                <FaCarSide style={{ color: "#faad14" }}/>
                <span>টোটাল ট্রিপ</span>
              </Space>
            }
            hoverable
            className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Statistic
                value={trips.length}
                prefix="টোটাল ট্রিপ"
                valueStyle={{ color: "#11375b", fontSize: "20px" }}
                className="text-center justify-center"
              />
            </Space>
          </Card>
        </Col>

      </Row>

{/* ব্যয় কার্ড */}
       <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
        <Card
        title={
          <Space className="text-gray-800">
            <DollarOutlined style={{ color: "#1890ff" }} />
            <span>আজকের ব্যয় বিবরণী</span>
          </Space>
        }
        extra={
          <Space className="text-gray-600">
            <Text>মোট ব্যয়:</Text>
            <Text strong style={{ color: "#fa541c", fontSize: "16px" }}>
              {totalExpense.toFixed(2)} টাকা
            </Text>
          </Space>
        }
        hoverable
        className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
      >
        <Table
          dataSource={expenseTableData}
          columns={columns}
          pagination={false}
          size="small"
          className="overflow-x-auto"
          rowClassName="hover:bg-gray-50 transition-colors duration-200 w-full"
          summary={(pageData) => {
            const total = pageData.reduce((sum, record) => sum + record.amount, 0)
            return (
              <Table.Summary.Row className="bg-orange-50 border-t-2 border-orange-200">
                <Table.Summary.Cell index={0}>
                  <Space>
                    <WarningOutlined style={{ color: "#fa8c16" }} />
                    <Text strong className="text-gray-900">
                      সর্বমোট
                    </Text>
                  </Space>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong style={{ color: "#fa541c", fontSize: "12px" }}>
                    {total.toFixed(2)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="center">
                  <Tag color="orange" className="font-medium">
                    মোট ব্যয়
                  </Tag>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )
          }}
        />
      </Card>
        </Col>
       </Row>
      
    </div>
  )
}

export default OverViewCard
