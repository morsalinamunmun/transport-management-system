
import React, { useEffect, useState } from "react";
import { Table, Typography, Card } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { SlCalender } from "react-icons/sl";

const { Title, Text } = Typography;

const MonthlyStatement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const fetchData = async () => {
    try {
      const [tripRes, fuelRes, maintenanceRes] = await Promise.all([
        axios.get("https://api.dropshep.com/api/trip"),
        axios.get("https://api.dropshep.com/api/fuel"),
        axios.get("https://api.dropshep.com/api/maintenance"),
      ]);

      const tripData = tripRes.data.data || [];
      const fuelData = fuelRes.data.data || [];
      const maintenanceData = maintenanceRes.data.data || [];

      const allMonths = {};
      const getMonthKey = date => dayjs(date).format("YYYY-MM");

      tripData.forEach(item => {
        const month = getMonthKey(item.trip_date);
        if (!allMonths[month]) allMonths[month] = { income: 0, trip: 0, maintain: 0 };

        allMonths[month].income += parseFloat(item.trip_price) || 0;
        allMonths[month].trip +=
          (parseFloat(item.fuel_price) || 0) +
          (parseFloat(item.gas_price) || 0) +
          (parseFloat(item.other_expenses) || 0) +
          (parseFloat(item.demarage) || 0) +
          (parseFloat(item.driver_percentage) || 0);
      });

      fuelData.forEach(item => {
        const month = getMonthKey(item.date_time);
        if (!allMonths[month]) allMonths[month] = { income: 0, trip: 0, maintain: 0 };

        allMonths[month].trip +=
          (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
      });

      maintenanceData.forEach((item) => {
  const month = getMonthKey(item.date);
  if (!allMonths[month]) {
    allMonths[month] = { income: 0, trip: 0, maintain: 0 };
  }

  const maintenanceCost = parseFloat(item.total_cost || item.cost || 0);
  allMonths[month].maintain += maintenanceCost;
});

      const sorted = Object.entries(allMonths)
        .sort(([a], [b]) => dayjs(b).diff(dayjs(a)))
        .map(([month, value], index) => {
          const totalExpense = value.trip + value.maintain;
          return {
            key: index + 1,
            month: dayjs(month).format("MMMM YYYY"),
            income: value.income,
            trip: value.trip,
            maintain: value.maintain,
            total: totalExpense,
            profit: value.income - totalExpense,
          };
        });

      setData(sorted);
    } catch (err) {
      console.error("Error loading statement data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ক্রমিক",
      dataIndex: "key",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "মাস",
      dataIndex: "month",
    },
    {
      title: "মোট আয়",
      dataIndex: "income",
      render: (value) => (
        <Text className="text-green-600">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "ট্রিপ খরচ",
      dataIndex: "trip",
      render: (value) => (
        <Text className="text-red-500">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "মেইনটেনেন্স খরচ",
      dataIndex: "maintain",
      render: (value) => (
        <Text className="text-red-500">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "মোট খরচ",
      dataIndex: "total",
      render: (value) => (
        <Text className="text-red-500">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "নিট লাভ",
      dataIndex: "profit",
      render: (value) => (
            <Text strong style={{ color: value >= 0 ? "#22c55e" : "#ff4d4f" }}>
             {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
      
      ),
    },
  ];

  const summary = () => {
    const totalIncome = data.reduce((acc, cur) => acc + cur.income, 0);
    const totalTrip = data.reduce((acc, cur) => acc + cur.trip, 0);
    const totalMaintain = data.reduce((acc, cur) => acc + cur.maintain, 0);
    const totalExpense = totalTrip + totalMaintain;
    const totalProfit = totalIncome - totalExpense;

    return (
      <Table.Summary fixed>
        <Table.Summary.Row className="bg-blue-50">
          <Table.Summary.Cell index={0} colSpan={2}>
            <Text strong>Total:</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text strong className="text-green-700">
              {totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text strong>
              {totalTrip.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text strong>
              {totalMaintain.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text strong>
              {totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text strong className="text-green-700">
              {totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-[10px]">
      <Card>
        <Title level={4} className="flex gap-3 items-center"><SlCalender />মাসিক স্টেটমেন্ট</Title>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          bordered
          summary={summary}
          scroll={{ x: "max-content" }}
          className="mt-4"

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
      </Card>
    </div>
  );
};

export default MonthlyStatement;
