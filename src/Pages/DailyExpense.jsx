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
  DatePicker,
  message,
  Form,
  Modal,
} from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

const { Title, Text } = Typography
const { Search } = Input

const DailyExpense = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const printRef = useRef()
  const [isModalVisible, setIsModalVisible] = useState(false)
const [form] = Form.useForm()

const showModal = () => setIsModalVisible(true)
const handleCancel = () => {
  form.resetFields()
  setIsModalVisible(false)
}

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("https://api.example.com/api/daily-expense")
      setExpenses(response.data || [])
      setLoading(false)
    } catch (err) {
      message.error("ডেটা লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  const filteredData = expenses.filter((item) =>
    [item.description, item.recipient_name, item.amount]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const exportCSV = () => {
    const csvContent = [
      ["ক্রমিক", "তারিখ", "খরচের বিবরণ", "যাকে প্রদান", "পরিমাণ"],
      ...filteredData.map((item, i) => [
        i + 1,
        item.date,
        item.description,
        item.recipient_name,
        item.amount.toFixed(2),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "general_expense.csv")
  }

  const exportExcel = () => {
    const data = filteredData.map((item, i) => ({
      ক্রমিক: i + 1,
      তারিখ: item.date,
      "খরচের বিবরণ": item.description,
      "যাকে প্রদান": item.recipient_name,
      পরিমাণ: item.amount.toFixed(2),
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "General Expense")
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    saveAs(new Blob([buffer]), "general_expense.xlsx")
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [["ক্রমিক", "তারিখ", "খরচের বিবরণ", "যাকে প্রদান", "পরিমাণ"]],
      body: filteredData.map((item, i) => [
        i + 1,
        item.date,
        item.description,
        item.recipient_name,
        item.amount.toFixed(2),
      ]),
    })
    doc.save("general_expense.pdf")
  }

  const printTable = () => {
    const content = printRef.current.innerHTML
    const win = window.open("", "", "width=900,height=650")
    win.document.write(`
      <html>
        <head><title>Print</title></head>
        <body>${content}</body>
      </html>
    `)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  const columns = [
    {
      title: "ক্রমিক",
      render: (_, __, i) => i + 1,
      width: 70,
    },
    {
      title: "তারিখ",
      dataIndex: "date",
      width: 120,
    },
    {
      title: "খরচের বিবরণ",
      dataIndex: "description",
    },
    {
      title: "যাকে প্রদান",
      dataIndex: "recipient_name",
    },
    {
      title: "পরিমাণ",
      dataIndex: "amount",
      render: (amount) => amount.toFixed(2),
    },
    {
      title: "অ্যাকশন",
      render: (_, record) => (
        <Space>
          <Tooltip title="সম্পাদনা">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="ডিলিট">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // new khoroc handler
  const handleFormSubmit = async (values) => {
  try {
    console.log("Submitted values:", values)
    // You can use axios.post() here to submit to your backend
    message.success("খরচ যুক্ত করা হয়েছে")
    form.resetFields()
    setIsModalVisible(false)
    fetchExpenses() // refresh data
  } catch (err) {
    message.error("খরচ যুক্ত করতে ব্যর্থ")
  }
}

  return (
    <div style={{ padding: "10px" }}>
      <Card className="max-w-6xl mx-auto">
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={4}>দৈনিক খরচের তালিকা</Title>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="middel" className="!bg-primary" onClick={showModal}>
              নতুন খরচ
            </Button>
          </Col>
        </Row>

        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Space wrap>
              <Button icon={<FileTextOutlined />} onClick={exportCSV}>CSV</Button>
              <Button icon={<FileExcelOutlined />} onClick={exportExcel}>Excel</Button>
              <Button icon={<FilePdfOutlined />} onClick={exportPDF}>PDF</Button>
              <Button icon={<PrinterOutlined />} onClick={printTable}>Print</Button>
            </Space>
          </Col>
          {/* search */}
          <Col>
            <Search
              placeholder="ব্যয় খুঁজুন...."
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

        <div ref={printRef}>
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            summary={(pageData) => {
              const total = pageData.reduce((sum, item) => sum + item.amount, 0)
              return (
                <Table.Summary.Row className="bg-blue-50">
                  <Table.Summary.Cell colSpan={4} align="right">
                    মোট:
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text strong>{total.toFixed(2)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell />
                </Table.Summary.Row>
              )
            }}
          />
        </div>
      </Card>
      {/* add khoroc modal */}
      <Modal
  title="নতুন খরচ যুক্ত করুন"
  open={isModalVisible}
  onCancel={handleCancel}
  onOk={() => form.submit()}
  okText="সাবমিট"
  cancelText="বাতিল করুন"
  centered
>
  <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
   <Row gutter={[16, 0]}>
     <Col md={12}>
     <Form.Item
      name="date"
      label="তারিখ"
      rules={[{ required: true, message: "তারিখ দিন" }]}
    >
      <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} size="middel"/>
    </Form.Item>
     </Col>

   <Col md={12}>
    <Form.Item
      name="recipient_name"
      label="প্রাপকের নাম"
      rules={[{ required: true, message: "প্রাপকের নাম দিন" }]}
    >
      <Input placeholder="যাকে প্রদান " size="middel"/>
    </Form.Item>
   </Col>
   </Row>

   <Row gutter={[16, 0]}>
     <Col md={12}>
     <Form.Item
      name="amount"
      label="পরিমাণ"
      rules={[{ required: true, message: "পরিমাণ দিন" }]}
    >
      <Input type="number" placeholder="পরিমাণ" size="middel" />
    </Form.Item>
     </Col>
    <Col md={12}>
    <Form.Item
      name="description"
      label="খরচের বিবরণ"
      rules={[{ required: true, message: "খরচের বিবরণ লিখুন" }]}
    >
      <Input placeholder="খরচের বিবরণ" size="middel"/>
    </Form.Item>
    </Col>
   </Row>
  </Form>
</Modal>

    </div>
  )
}

export default DailyExpense
