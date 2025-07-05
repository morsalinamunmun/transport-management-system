// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import "react-datepicker/dist/react-datepicker.css";
// import { IoMdClose } from "react-icons/io";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { FiCalendar } from "react-icons/fi";
// import { useLoaderData } from "react-router-dom";
// import Select from "react-select";
// import BtnSubmit from "../../components/Button/BtnSubmit";

// const UpdateMaintenanceForm = () => {
//   // load data
//   const updateMaintenanceLoaderData = useLoaderData();
//   const {
//     id,
//     date,
//     service_type,
//     vehicle_no,
//     parts_and_spairs,
//     maintenance_type,
//     cost,
//     cost_by,
//     total_cost,
//     dignifies,
//     service_for,
//     receipt,
//   } = updateMaintenanceLoaderData.data;
//   const [previewImage, setPreviewImage] = useState(receipt);

//   // car name / registration number
//   const [vehicles, setVehicles] = useState([]);
//   useEffect(() => {
//     fetch("https://api.dropshep.com/api/vehicle")
//       .then((response) => response.json())
//       .then((data) => setVehicles(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);

//   const vehicleOptions = vehicles.map((vehicle) => ({
//     value: vehicle.registration_number,
//     label: vehicle.registration_number,
//   }));
//   // select driver
//   const [drivers, setDrivers] = useState([]);
//   useEffect(() => {
//     fetch("https://api.dropshep.com/api/driver")
//       .then((response) => response.json())
//       .then((data) => setDrivers(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);

//   const driverOptions = drivers.map((driver) => ({
//     value: driver.name,
//     label: driver.name,
//   }));
//   const { register, handleSubmit, setValue, control } = useForm({
//     defaultValues: {
//       service_for: service_for || "",
//       vehicle_no: vehicle_no || "",
//     },
//   });

//   const maintenanceDateRef = useRef(null);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       // Append fields
//       for (const key in data) {
//         if (data[key] !== undefined && data[key] !== null) {
//           formData.append(key, data[key]);
//         }
//       }

//       // Debug: log all data being sent
//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const response = await axios.post(
//         `https://api.dropshep.com/api/maintenance/${id}`,
//         formData
//       );

//       const resData = response.data;
//       if (resData.status === "success") {
//         toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!", {
//           position: "top-right",
//         });
//         setPreviewImage(null);
//       } else {
//         toast.error("সার্ভার ত্রুটি: " + (resData.message || "অজানা সমস্যা"));
//       }
//     } catch (error) {
//       console.error(error);
//       const errorMessage =
//         error.response?.data?.message || error.message || "Unknown error";
//       toast.error("সার্ভার ত্রুটি: " + errorMessage);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreviewImage(url);
//       setValue("receipt", file);
//     }
//   };

//   return (
//     <div className="mt-10">
//       <Toaster />
//       <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
//         মেইনটেনেন্স ফর্ম
//       </h3>
//       <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 মেইনটেনেন্স তারিখ
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   defaultValue={date}
//                   {...register("date")}
//                   ref={(e) => {
//                     register("date").ref(e);
//                     maintenanceDateRef.current = e;
//                   }}
//                   className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                 />
//                 <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                   <FiCalendar
//                     className="text-white cursor-pointer"
//                     onClick={() => maintenanceDateRef.current?.showPicker?.()}
//                   />
//                 </span>
//               </div>
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 সার্ভিসের ধরন
//               </label>
//               <select
//                 {...register("service_type")}
//                 defaultValue={service_type}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="General">General</option>
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 পার্টস এন্ড স্পায়ারস
//               </label>
//               <select
//                 {...register("parts_and_spairs")}
//                 defaultValue={parts_and_spairs}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="EngineOil">Engine Oil</option>
//                 <option value="Pistons">Pistons</option>
//                 <option value="ABS_Sensors">ABS Sensors</option>
//                 <option value="BrakeDrum">Brake Drum</option>
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 মেইনটেনেসের ধরন
//               </label>
//               <select
//                 {...register("maintenance_type")}
//                 defaultValue={maintenance_type}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="EngineOil">Engine Oil</option>
//                 <option value="Pistons">Pistons</option>
//                 <option value="ABS_Sensors">ABS Sensors</option>
//                 <option value="BrakeDrum">Brake Drum</option>
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">খরচ</label>
//               <input
//                 {...register("cost")}
//                 type="number"
//                 defaultValue={cost}
//                 placeholder="খরচ ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 গাড়ির নম্বর
//               </label>
//               <Controller
//                 name="vehicle_no"
//                 control={control}
//                 render={({ field: { onChange, value, ref } }) => (
//                   <Select
//                     inputRef={ref}
//                     value={
//                       vehicleOptions.find((c) => c.value === value) || null
//                     }
//                     onChange={(val) => onChange(val ? val.value : "")}
//                     options={vehicleOptions}
//                     placeholder={vehicle_no}
//                     className="mt-1 text-sm"
//                     classNamePrefix="react-select"
//                     isClearable
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 চার্জ বাই
//               </label>
//               <input
//                 {...register("cost_by")}
//                 defaultValue={cost_by}
//                 placeholder="চার্জ বাই..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 সর্বমোট খরচ
//               </label>
//               <input
//                 {...register("total_cost")}
//                 defaultValue={total_cost}
//                 placeholder="সর্বমোট খরচ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 প্রিয়োরিটি
//               </label>
//               <select
//                 {...register("dignifies")}
//                 defaultValue={dignifies}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 সার্ভিস ফর
//               </label>
//               <Controller
//                 name="service_for"
//                 control={control}
//                 render={({ field: { onChange, value, ref } }) => (
//                   <Select
//                     inputRef={ref}
//                     value={driverOptions.find((c) => c.value === value) || null}
//                     onChange={(val) => onChange(val ? val.value : "")}
//                     options={driverOptions}
//                     placeholder="ড্রাইভারের নাম নির্বাচন করুন..."
//                     className="mt-1 text-sm"
//                     classNamePrefix="react-select"
//                     isClearable
//                   />
//                 )}
//               />
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ক্যাশ মেমো / কাগজের ছবি
//               </label>
//               <div className="relative mt-1">
//                 <label
//                   htmlFor="receipt"
//                   className="border p-2 rounded w-full block bg-white text-gray-500 text-sm cursor-pointer"
//                 >
//                   {previewImage ? "ছবি নির্বাচিত হয়েছে" : "ছবি বাচাই করুন"}
//                 </label>
//                 <input
//                   id="receipt"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => handleImageChange(e)}
//                 />
//               </div>
//               {previewImage && (
//                 <div className="mt-3 relative flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPreviewImage(null);
//                       document.querySelector('input[type="file"]').value = null;
//                       setValue("receipt", null);
//                     }}
//                     className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                     title="Remove image"
//                   >
//                     <IoMdClose />
//                   </button>
//                   <img
//                     src={
//                       previewImage?.startsWith("blob:")
//                         ? previewImage
//                         : `https://api.dropshep.com/public/uploads/maintenance/${previewImage}`
//                     }
//                     alt="Receipt Preview"
//                     className="max-w-xs h-auto rounded border border-gray-300"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="mt-6">
//             <BtnSubmit>সাবমিট করুন</BtnSubmit>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateMaintenanceForm;



import { useEffect, useState } from "react"
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  message,
  Image,
} from "antd"
import {
  ToolOutlined,
  CalendarOutlined,
  CarOutlined,
  UserOutlined,
  DollarOutlined,
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons"
import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import moment from "moment"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const UpdateMaintenanceForm = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [drivers, setDrivers] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate();

  // Load existing data
  const updateMaintenanceLoaderData = useLoaderData()
  const {
    id,
    date,
    service_type,
    vehicle_no,
    parts_and_spairs,
    maintenance_type,
    cost,
    cost_by,
    total_cost,
    dignifies,
    service_for,
    receipt,
  } = updateMaintenanceLoaderData.data

  useEffect(() => {
    // Set initial form values
    form.setFieldsValue({
      date: date ? moment(date) : null,
      service_type: service_type || "Maintenance",
      vehicle_no: vehicle_no || "",
      parts_and_spairs: parts_and_spairs || "",
      maintenance_type: maintenance_type || "",
      cost: cost || "",
      cost_by: cost_by || "",
      total_cost: total_cost || "",
      dignifies: dignifies || "Medium",
      service_for: service_for || "",
    })

    // Set initial image preview
    if (receipt) {
      setPreviewImage(`https://api.dropshep.com/public/uploads/maintenance/${receipt}`)
    }

    // Fetch vehicles
    fetchVehicles()
    // Fetch drivers
    fetchDrivers()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch("https://api.dropshep.com/api/vehicle")
      const data = await response.json()
      setVehicles(data.data || [])
    } catch (error) {
      console.error("Error fetching vehicle data:", error)
      message.error("গাড়ির তথ্য লোড করতে সমস্যা হয়েছে")
    }
  }

  const fetchDrivers = async () => {
    try {
      const response = await fetch("https://api.dropshep.com/api/driver")
      const data = await response.json()
      setDrivers(data.data || [])
    } catch (error) {
      console.error("Error fetching driver data:", error)
      message.error("ড্রাইভারের তথ্য লোড করতে সমস্যা হয়েছে")
    }
  }

  const onFinish = async (values) => {
    setLoading(true)
     const cost = parseFloat(allValues.cost) || 0;
    const costBy = parseFloat(allValues.cost_by) || 0;

    const total = cost + costBy;
    try {
      const formData = new FormData()
      values.total_cost = total;

      // Append form fields
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === "date") {
            formData.append(key, values[key].format("YYYY-MM-DD"))
          } else {
            formData.append(key, values[key])
          }
        }
      })

      // Append image file if exists
      if (imageFile) {
        formData.append("receipt", imageFile)
      }

      const response = await axios.post(`https://api.dropshep.com/api/maintenance/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.status === "success") {
        message.success("মেইনটেনেন্স তথ্য সফলভাবে আপডেট হয়েছে!")
      } else {
        message.error("সার্ভার ত্রুটি: " + (response.data.message || "অজানা সমস্যা"))
      }
    } catch (error) {
      console.error(error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error"
      message.error("সার্ভার ত্রুটি: " + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (info) => {
    const file = info.file.originFileObj || info.file
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      setImageFile(file)
    }
  }

  const removeImage = () => {
    setPreviewImage(null)
    setImageFile(null)
  }

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("শুধুমাত্র ছবি ফাইল আপলোড করা যাবে!")
        return false
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error("ছবির সাইজ ৫MB এর কম হতে হবে!")
        return false
      }
      handleImageChange({ file })
      return false // Prevent automatic upload
    },
    showUploadList: false,
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <Card
        className="max-w-7xl mx-auto"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <Title level={4} style={{ margin: 0, color: "#11375B", textAlign: "left" }}>
            <ToolOutlined style={{ marginRight: "12px", color: "#11375B" }} />
            মেইনটেনেন্স আপডেট 
          </Title>
          {/* <Text type="secondary" style={{ display: "block", textAlign: "center", marginTop: "8px" }}>
            মেইনটেনেন্সের তথ্য আপডেট করুন
          </Text> */}
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          {/* First Row */}
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <CalendarOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      মেইনটেনেন্স তারিখ
                    </Text>
                  </Space>
                }
                
                name="date"
                rules={[{ required: true, message: "তারিখ নির্বাচন করুন!" }]}
              >
                <DatePicker
                size="middel"
                  style={{ width: "100%" }}
                  placeholder="তারিখ নির্বাচন করুন"
                  format="DD-MM-YYYY"
                  suffixIcon={<CalendarOutlined style={{ color: "#11375B" }} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <ToolOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      সার্ভিসের ধরন
                    </Text>
                  </Space>
                }
                name="service_type"
                rules={[{ required: true, message: "সার্ভিসের ধরন নির্বাচন করুন!" }]}
              >
                <Select placeholder="সার্ভিসের ধরন নির্বাচন করুন" size="middel">
                  <Option value="Maintenance">Maintenance</Option>
                  <Option value="General">General</Option>
                  <Option value="Emergency">Emergency</Option>
                  <Option value="Preventive">Preventive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Second Row */}
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <ToolOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      পার্টস এন্ড স্পায়ারস
                    </Text>
                  </Space>
                }
                name="parts_and_spairs"
                rules={[{ required: true, message: "পার্টস নির্বাচন করুন!" }]}
              >
                <Select placeholder="পার্টস নির্বাচন করুন" size="middel">
                  <Option value="EngineOil">Engine Oil</Option>
                  <Option value="Pistons">Pistons</Option>
                  <Option value="ABS_Sensors">ABS Sensors</Option>
                  <Option value="BrakeDrum">Brake Drum</Option>
                  <Option value="Tires">Tires</Option>
                  <Option value="Battery">Battery</Option>
                  <Option value="Filters">Filters</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <ToolOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      মেইনটেনেন্সের ধরন
                    </Text>
                  </Space>
                }
                name="maintenance_type"
                rules={[{ required: true, message: "মেইনটেনেন্সের ধরন নির্বাচন করুন!" }]}
              >
                <Select placeholder="মেইনটেনেন্সের ধরন নির্বাচন করুন" size="middel">
                  <Option value="EngineOil">Engine Oil Change</Option>
                  <Option value="Pistons">Piston Replacement</Option>
                  <Option value="ABS_Sensors">ABS Sensor Check</Option>
                  <Option value="BrakeDrum">Brake Drum Service</Option>
                  <Option value="TireRotation">Tire Rotation</Option>
                  <Option value="BatteryCheck">Battery Check</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Third Row */}
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <DollarOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      পার্টসের মূল্য
                    </Text>
                  </Space>
                }
                name="cost"
                rules={[{ required: true, message: "খরচের পরিমাণ লিখুন!" }]}
              >
                <InputNumber
                size="middel"
                  style={{ width: "100%" }}
                  placeholder="খরচের পরিমাণ"
                  min={0}
                  formatter={(value) => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/৳\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <CarOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      গাড়ির নম্বর
                    </Text>
                  </Space>
                }
                name="vehicle_no"
                rules={[{ required: true, message: "গাড়ির নম্বর নির্বাচন করুন!" }]}
              >
                <Select
                 size="middel"
                  placeholder="গাড়ির নম্বর নির্বাচন করুন"
                  showSearch
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {vehicles.map((vehicle) => (
                    <Option key={vehicle.id} value={vehicle.registration_number}>
                      {vehicle.registration_number} - {vehicle.vehicle_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Fourth Row */}
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <UserOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      সার্ভিস খরচ
                    </Text>
                  </Space>
                }
                name="cost_by"
              >
                <Input placeholder="চার্জ বাই (যেমন: মেকানিক নাম)"  size="middel" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <DollarOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      সর্বমোট খরচ
                    </Text>
                  </Space>
                }
                name="total_cost"
                rules={[{ required: true, message: "সর্বমোট খরচ লিখুন!" }]}
              >
                <InputNumber
                 size="middel"
                  style={{ width: "100%" }}
                  placeholder="সর্বমোট খরচ"
                  min={0}
                  formatter={(value) => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/৳\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Fifth Row */}
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <ToolOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      প্রিয়োরিটি
                    </Text>
                  </Space>
                }
                name="dignifies"
                rules={[{ required: true, message: "প্রিয়োরিটি নির্বাচন করুন!" }]}
              >
                <Select placeholder="প্রিয়োরিটি নির্বাচন করুন" size="middel">
                  <Option value="High">
                    <Space>
                      <span style={{ color: "#ff4d4f" }}>●</span>
                      High Priority
                    </Space>
                  </Option>
                  <Option value="Medium">
                    <Space>
                      <span style={{ color: "#faad14" }}>●</span>
                      Medium Priority
                    </Space>
                  </Option>
                  <Option value="Low">
                    <Space>
                      <span style={{ color: "#52c41a" }}>●</span>
                      Low Priority
                    </Space>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <UserOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      সার্ভিস ফর (ড্রাইভার)
                    </Text>
                  </Space>
                }
                name="service_for"
              >
                <Select
                 size="middel"
                  placeholder="ড্রাইভার নির্বাচন করুন"
                  showSearch
                  allowClear
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {drivers.map((driver) => (
                    <Option key={driver.id} value={driver.name}>
                      {driver.name} - {driver.contact}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Image Upload Row */}
          <Row>
            <Col span={24}>
              <Form.Item
                label={
                  <Space>
                    <Text strong style={{ color: "#11375B" }}>
                      ক্যাশ মেমো / কাগজের ছবি
                    </Text>
                  </Space>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Upload {...uploadProps}  size="middel">
                    <Button icon={<UploadOutlined />} style={{ borderColor: "#11375B", color: "#11375B" }}>
                      ছবি আপলোড করুন
                    </Button>
                  </Upload>

                  {previewImage && (
                    <div style={{ position: "relative", display: "inline-block", maxWidth: "300px" }}>
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Receipt Preview"
                        style={{
                          maxWidth: "100%",
                          borderRadius: "8px",
                          border: "1px solid #d9d9d9",
                        }}
                      />
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={removeImage}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row style={{ marginTop: "32px" }}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="middel"
                className="!bg-primary w-full max-w-xs mx-auto"
              >
                আপডেট করুন
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default UpdateMaintenanceForm
