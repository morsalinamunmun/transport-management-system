
import { useEffect, useState } from "react"
import { Card, Row, Col, Statistic, List, Typography, Space, Badge, Table, Tag, Spin } from "antd"
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

  const [loadingIncome, setLoadingIncome] = useState(true)
  const [loadingReminder, setLoadingReminder] = useState(true)
  const [loadingTrips, setLoadingTrips] = useState(true)
  const [loadingExpenses, setLoadingExpenses] = useState(true)

  const today = dayjs().format("YYYY-MM-DD")

  // Reminder
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/vehicle`)
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
      } finally {
        setLoadingReminder(false)
      }
    }

    fetchVehicles()
  }, [])

  // Fuel
  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/fuel`)
        const fuels = response.data?.data || []
        let octen = 0
        let diesel = 0
        let petrol = 0
        let gas = 0

        fuels.forEach((fuel) => {
          if (fuel.date_time === today) {
            const totalPrice = Number.parseFloat(fuel.total_price) || 0
            const type = (fuel.type || "").toLowerCase()

            if (type === "octen") octen += totalPrice
            else if (type === "diesel") diesel += totalPrice
            else if (type === "petroll" || type === "petrol") petrol += totalPrice
            else if (type === "gas") gas += totalPrice
          }
        })

        setOctenCost(octen)
        setDieselCost(diesel)
        setPetrolCost(petrol)
        setGasCost(gas)
      } catch (error) {
        console.error("Error fetching fuel data:", error)
      } finally {
        setLoadingExpenses(false)
      }
    }

    fetchFuelData()
  }, [today])

  // Maintenance
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maintenance`)
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

  // Trips
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/trip`)
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
      } finally {
        setLoadingTrips(false)
        setLoadingIncome(false)
      }
    }

    fetchTripData()
  }, [])

  const totalCost = octenCost + dieselCost + petrolCost + gasCost
  const totalCommission = otherExpenses + demarage + driverCommission
  const totalExpense = totalCost + todayCost + totalCommission
  const profit = todayIncome - totalExpense

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

  // booking
  const [bookingReminders, setBookingReminders] = useState([]);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/bookings`);
      const bookings = res.data?.data || [];

      const tomorrow = dayjs().add(1, 'day').format("YYYY-MM-DD");

      const filtered = bookings.filter(booking => {
        const startDate = dayjs(booking.startDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        return startDate === tomorrow;
      });

      setBookingReminders(filtered);
    } catch (error) {
      console.error("Booking fetch error", error);
    }
  };

  fetchBookings();
}, []);


  const columns = [
    {
      title: "খরচের ধরন",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Space className="text-xs lg:text-sm">
          {record.icon}
          <p className="text-xs lg:text-lg">{text}</p>
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
        <Tag color={status === "active" ? "red" : "default"}>
          {status === "active" ? "খরচ হয়েছে" : "খরচ নেই"}
        </Tag>
      ),
    },
  ]

  return (
    <div className="p-6">
      <Row gutter={[16, 16]} className="mb-5">
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card
            size="small"
            title={
              <Space className="text-gray-800">
                <TrophyOutlined style={{ color: "#faad14" }} />
                <span>পার্টস এন্ড স্পায়ার্স</span>
              </Space>
            }
            // extra={<Badge count="আয়" style={{ backgroundColor: "#52c41a" }} />}
            className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-center h-full mt-7">
              <Statistic
                value={todayIncome}
                suffix="টাকা"
                valueStyle={{ color: "#11375b", fontSize: "20px" }}
                loading={loadingIncome}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Card
            size="small"
            title={
              <Space className="text-gray-800">
                <BellOutlined style={{ color: "#fa8c16" }} />
                <span>ডকুমেন্ট রিমাইন্ডার</span>
                {expiringDocs.length > 0 && <Badge count={expiringDocs.length} />}
              </Space>
            }
            className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            bodyStyle={{ padding: "12px", maxHeight: "100px", overflowY: "auto" }}
          >
            {loadingReminder ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="small" />
              </div>
            ) : expiringDocs.length > 0 ? (
              <List
                size="small"
                dataSource={expiringDocs}
                renderItem={(item) => (
                  <List.Item className="py-0 border-b border-gray-100 last:border-b-0">
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <div className="flex justify-between items-center">
                        <Text strong className="text-xs text-gray-900">{item.vehicle}</Text>
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
                <Text type="secondary" className="text-xs">কোনো মেয়াদোত্তীর্ণ ডেট নেই</Text>
              </div>
            )}
          </Card>
        </Col>

         <Col xs={24} sm={12} md={12} lg={8}>
  <Card
    size="small"
    title={
      <Space className="text-gray-800">
        <BellOutlined style={{ color: "#13c2c2" }} />
        <span>আগামীকাল বুকিং শুরু</span>
        {bookingReminders.length > 0 && <Badge count={bookingReminders.length} />}
      </Space>
    }
    className="h-[150px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
    bodyStyle={{ padding: "12px", maxHeight: "100px", overflowY: "auto" }}
  >
    {bookingReminders.length > 0 ? (
      <List
        size="small"
        dataSource={bookingReminders}
        renderItem={(item) => (
          <List.Item className="py-0 border-b border-gray-100 last:border-b-0">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
                <Text strong className="text-xs text-gray-900">{item.customerName}</Text>
                <Tag color="cyan" className="text-xs font-medium">
                  {item.carName}
                </Tag>
              </div>
              <Text className="text-xs text-gray-500">ফোন: {item.phone}</Text>
              <Text className="text-xs text-red-600">শুরু: {item.startDate}</Text>
            </Space>
          </List.Item>
        )}
      />
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <BellOutlined className="text-2xl mb-2" />
        <Text type="secondary" className="text-xs">কোনো বুকিং শুরু হচ্ছে না</Text>
      </div>
    )}
  </Card>
</Col>

      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
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
            className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <Table
              loading={loadingExpenses}
              dataSource={expenseTableData}
              columns={columns}
              pagination={false}
              size="small"
              rowClassName="hover:bg-gray-50 transition-colors duration-200 w-full"
              summary={(pageData) => {
                const total = pageData.reduce((sum, record) => sum + record.amount, 0)
                return (
                  <Table.Summary.Row className="bg-orange-50 border-t-2 border-orange-200">
                    <Table.Summary.Cell index={0}>
                      <Space>
                        <WarningOutlined style={{ color: "#fa8c16" }} />
                        <Text strong className="text-gray-900">সর্বমোট</Text>
                      </Space>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong style={{ color: "#fa541c", fontSize: "12px" }}>
                        {total.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="center">
                      <Tag color="orange" className="font-medium">মোট ব্যয়</Tag>
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
