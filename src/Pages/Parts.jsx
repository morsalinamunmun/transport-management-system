
import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Input,
  Modal,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Tooltip,
  Form,
  DatePicker,
  message,
} from "antd"
import { ToolOutlined, PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined, SearchOutlined } from "@ant-design/icons"
import axios from "axios"
import { Link } from "react-router-dom"
import { RiDeleteBinLine } from "react-icons/ri"

const { Title, Text } = Typography
const { Search } = Input

const Parts = () => {
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedPartId, setSelectedPartId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const [form] = Form.useForm()

  useEffect(() => {
    fetchParts()
  }, [])

  const fetchParts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/parts`)
      if (response.data.status === "success") {
        setParts(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching parts data:", error)
      message.error("পার্টসের তথ্য লোড করতে সমস্যা হয়েছে")
      setLoading(false)
    }
  }

  const handleAddPart = async (values) => {
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      if (values.date) {
        formData.append("date", values.date.format("YYYY-MM-DD"))
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/parts`, formData)

      if (response.data.status === "success") {
        message.success("পার্টস সফলভাবে সংরক্ষণ হয়েছে!")
        form.resetFields()
        setShowAddModal(false)
        fetchParts() // Refresh the list
      } else {
        message.error("সার্ভার ত্রুটি: " + (response.data.message || "অজানা সমস্যা"))
      }
    } catch (error) {
      console.error(error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error"
      message.error("সার্ভার ত্রুটি: " + errorMessage)
    }
  }

  const handleDelete = async () => {
    if (!selectedPartId) return

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/parts/${selectedPartId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete part")
      }

      setParts((prev) => prev.filter((part) => part.id !== selectedPartId))
      message.success("পার্টস সফলভাবে ডিলিট হয়েছে")
      setDeleteModalOpen(false)
      setSelectedPartId(null)
    } catch (error) {
      console.error("Delete error:", error)
      message.error("ডিলিট করতে সমস্যা হয়েছে!")
    }
  }

  // Filter parts based on search term
  const filteredParts = parts.filter((part) => {
    const term = searchTerm.toLowerCase()
    return part.name?.toLowerCase().includes(term) || part.date?.toLowerCase().includes(term)
  })

  // Calculate totals
  const totalParts = filteredParts.length
  const activeParts = filteredParts.filter((part) => {
    if (!part.date) return true
    const today = new Date()
    const partDate = new Date(part.date)
    return partDate >= today
  }).length
  const expiredParts = totalParts - activeParts

  // Check if part is expired
  const isPartExpired = (date) => {
    if (!date) return false
    const today = new Date()
    const partDate = new Date(date)
    return partDate < today
  }

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "index",
      width: 60,
      render: (_, __, index) => (
        <Text strong style={{ color: "#11375b" }}>
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </Text>
      ),
    },
    {
      title: "পার্টসের নাম",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name, record) => (
        <Space>
          <ToolOutlined  />
          <Text >
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: "ভ্যালিডিটি",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (date) => (
        <Space>
          <CalendarOutlined />
          <Text >{date || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "স্ট্যাটাস",
      key: "status",
      width: 120,
      render: (_, record) => {
        const expired = isPartExpired(record.date)
        return (
          <span
            className={`${expired? "text-red-500": "text-green-600"}`}
          >
            {expired ? "মেয়াদোত্তীর্ণ" : "সক্রিয়"}
          </span>
        )
      },
    },
    {
      title: "অ্যাকশন",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
           <Tooltip title="সম্পাদনা">
            <Link to={`/tramessy/update-partsForm/${record.id}`}>
                <EditOutlined
                  className="!text-yellow-500 cursor-pointer text-lg hover:!text-primary"
                />
                </Link>
              </Tooltip>
        
          <Tooltip title="ডিলিট">
                          <RiDeleteBinLine
                            className="!text-red-500 p-1 text-white cursor-pointer text-2xl rounded"
                          onClick={() => {
                setSelectedPartId(record.id)
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
        className=""
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }} gutter={[16, 16]}>
          <Col>
            <Title level={4} style={{ margin: 0, color: "#11375B" }}>
              <ToolOutlined style={{ marginRight: "12px", color: "#11375B" }} />
              পার্টসের তালিকা
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => setShowAddModal(true)}
              className="!bg-primary"
            >
              পার্টস
            </Button>
          </Col>
        </Row>

        {/* Search parts*/}
        <Row justify="end" style={{ marginBottom: "16px" }} gutter={[16, 16]}>
          <Col>
  <Search
    placeholder="পার্টস খুঁজুন..."
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
        <SearchOutlined className="!text-white"/>
      </Button>
    }
  />
</Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredParts}
          loading={loading}
          rowKey="id"
          scroll={{ x: "max-content" }}
          size="middle"
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

        {/* Add Parts Modal */}
        <Modal
          title={
            <Space>
              <PlusOutlined style={{ color: "#1890ff" }} />
              পার্টস যোগ করুন
            </Space>
          }
          open={showAddModal}
          onCancel={() => {
            setShowAddModal(false)
            form.resetFields()
          }}
          footer={null}
          width={500}
        >
          <Form form={form} layout="vertical" onFinish={handleAddPart} style={{ marginTop: "20px" }}>
            <Form.Item label="পার্টসের নাম" name="name" rules={[{ required: true, message: "পার্টসের নাম পূরণ করতে হবে" }]}>
              <Input placeholder="পার্টসের নাম লিখুন..." />
            </Form.Item>

            <Form.Item label="পার্টসের ভ্যালিডিটি" name="date">
              <DatePicker style={{ width: "100%" }} placeholder="তারিখ নির্বাচন করুন" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
              <Space>
                <Button onClick={() => setShowAddModal(false)}>বাতিল</Button>
                <Button type="primary" htmlType="submit">
                  সাবমিট করুন
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Delete Modal */}
        <Modal
          title={
            <Space>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              পার্টস ডিলিট করুন
            </Space>
          }
          open={deleteModalOpen}
          onOk={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setSelectedPartId(null)
          }}
          okText="হ্যাঁ"
          cancelText="না"
          okButtonProps={{ danger: true }}
        >
          <p>আপনি কি নিশ্চিত যে এই পার্টসটি ডিলিট করতে চান?</p>
        </Modal>
      </Card>
    </div>
  )
}

export default Parts
