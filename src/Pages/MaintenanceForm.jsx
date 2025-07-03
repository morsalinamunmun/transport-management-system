// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import "react-datepicker/dist/react-datepicker.css";
// import { IoMdClose } from "react-icons/io";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { FiCalendar } from "react-icons/fi";
// import Select from "react-select";
// import BtnSubmit from "../components/Button/BtnSubmit";
// const MaintenanceForm = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     control,
//     formState: { errors },
//     watch
//   } = useForm();
//   const [previewImage, setPreviewImage] = useState(null);
//   const maintenanceDateRef = useRef(null);

// const cost = watch("cost");
// const costBy = watch("cost_by");
// useEffect(() => {
//   const total = (parseFloat(cost) || 0) + (parseFloat(costBy) || 0);
//   setValue("total_cost", total.toFixed(2));
// }, [cost, costBy, setValue]);

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

//   // post data on server
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         if (data[key] !== undefined && data[key] !== null) {
//           formData.append(key, data[key]);
//         }
//       }
//       const response = await axios.post(
//         "https://api.dropshep.com/api/maintenance",
//         formData
//       );
//       const resData = response.data;

//       if (resData.status === "success") {
//         toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!", {
//           position: "top-right",
//         });
//         reset();
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
//                   type="date"
//                   {...register("date", { required: true })}
//                   ref={(e) => {
//                     register("date").ref(e);
//                     maintenanceDateRef.current = e;
//                   }}
//                   className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                 />
//                 {errors.date && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
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
//                 {...register("service_type", { required: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">সার্ভিসের ধরন</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="General">General</option>
//               </select>
//               {errors.service_type && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//           </div>
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 পার্টস এন্ড স্পায়ারস
//               </label>
//               <select
//                 {...register("parts_and_spairs", { require: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">পার্টস এন্ড স্পায়ারস</option>
//                 <option value="EngineOil">Engine Oil</option>
//                 <option value="Pistons">Pistons</option>
//                 <option value="ABS_Sensors">ABS Sensors</option>
//                 <option value="BrakeDrum">Brake Drum</option>
//               </select>
//               {errors.parts_and_spairs && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 মেইনটেনেসের ধরন
//               </label>
//               <select
//                 {...register("maintenance_type", { required: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">মেইনটেনেসের ধরন</option>
//                 <option value="EngineOil">Engine Oil</option>
//                 <option value="Pistons">Pistons</option>
//                 <option value="ABS_Sensors">ABS Sensors</option>
//                 <option value="BrakeDrum">Brake Drum</option>
//               </select>
//               {errors.maintenance_type && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">পার্টসের মূল্য</label>
//               <input
//                 {...register("cost", { required: true })}
//                 type="number"
//                 placeholder="খরচ ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.cost && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 গাড়ির নম্বার
//               </label>
//               <Controller
//                 name="vehicle_no"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field: { onChange, value, ref } }) => (
//                   <Select
//                     inputRef={ref}
//                     value={
//                       vehicleOptions.find((c) => c.value === value) || null
//                     }
//                     onChange={(val) => onChange(val ? val.value : "")}
//                     options={vehicleOptions}
//                     placeholder="গাড়ির নম্বর নির্বাচন করুন..."
//                     className="mt-1 text-sm"
//                     classNamePrefix="react-select"
//                     isClearable
//                   />
//                 )}
//               />
//               {errors.vehicle_number && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}

//               {errors.vehicle_no && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 সার্ভিস খরচ
//               </label>
//               <input
//                 {...register("cost_by", { required: true })}
//                 type="text"
//                 placeholder="চার্জ বাই..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.cost_by && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 সর্বমোট খরচ
//               </label>
//               <input
//                 {...register("total_cost", { required: true })}
//                 type="number"
//                 placeholder="সর্বমোট খরচ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.total_cost && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 প্রিয়োরিটি
//               </label>
//               <select
//                 {...register("dignifies", { required: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">মর্যাদা...</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//               {errors.dignifies && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 সার্ভিস ফর
//               </label>
//               <Controller
//                 name="service_for"
//                 control={control}
//                 rules={{ required: true }}
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
//               {errors.service_for && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ক্যাশ মেমো / কাগজের ছবি
//               </label>
//               <div className="relative mt-1">
//                 <Controller
//                   name="receipt"
//                   control={control}
//                   rules={{ required: "পূরণ করতে হবে" }}
//                   render={({
//                     field: { onChange, ref },
//                     fieldState: { error },
//                   }) => (
//                     <div className="relative mt-1">
//                       <label
//                         htmlFor="receipt"
//                         className="border p-2 rounded w-full block bg-white text-gray-500 text-sm cursor-pointer"
//                       >
//                         {previewImage
//                           ? "ছবি নির্বাচিত হয়েছে"
//                           : "ছবি বাছাই করুন"}
//                       </label>
//                       <input
//                         id="receipt"
//                         type="file"
//                         accept="image/*"
//                         ref={ref}
//                         className="hidden"
//                         onChange={(e) => {
//                           const file = e.target.files[0];
//                           if (file) {
//                             const url = URL.createObjectURL(file);
//                             setPreviewImage(url);
//                             onChange(file); // ✅ Very important: update form field
//                           } else {
//                             setPreviewImage(null);
//                             onChange(null);
//                           }
//                         }}
//                       />
//                       {error && (
//                         <span className="text-red-600 text-sm">
//                           {error.message}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 />
//               </div>
//               {/* 🖼️ Image preview below file input */}
//               {previewImage && (
//                 <div className="mt-3 relative flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPreviewImage(null);
//                       setValue("receipt", null, { shouldValidate: true });
//                     }}
//                     className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                     title="Remove image"
//                   >
//                     <IoMdClose />
//                   </button>
//                   <img
//                     src={previewImage}
//                     alt="License Preview"
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

// export default MaintenanceForm;


import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  ToolOutlined,
  CalendarOutlined,
  CarOutlined,
  UserOutlined,
  DollarOutlined,
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const { Title, Text } = Typography;
const { Option } = Select;

const MaintenanceForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  // react-hook-form for validation & control
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Watch cost and cost_by to calculate total_cost dynamically
  const cost = watch("cost");
  const cost_by = watch("cost_by");

  useEffect(() => {
    const total = (parseFloat(cost) || 0) + (parseFloat(cost_by) || 0);
    setValue("total_cost", total.toFixed(2));
  }, [cost, cost_by, setValue]);

  // Fetch vehicles
  useEffect(() => {
    fetch("https://api.dropshep.com/api/vehicle")
      .then((res) => res.json())
      .then((data) => setVehicles(data.data || []))
      .catch(() => message.error("গাড়ির তথ্য লোড করতে সমস্যা হয়েছে"));
  }, []);

  // Fetch drivers
  useEffect(() => {
    fetch("https://api.dropshep.com/api/driver")
      .then((res) => res.json())
      .then((data) => setDrivers(data.data || []))
      .catch(() => message.error("ড্রাইভারের তথ্য লোড করতে সমস্যা হয়েছে"));
  }, []);

  // Upload props for file validation
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("শুধুমাত্র ছবি ফাইল আপলোড করা যাবে!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("ছবির সাইজ ৫MB এর কম হতে হবে!");
        return false;
      }
      handleImageChange({ file });
      return false; // prevent automatic upload
    },
    showUploadList: false,
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    setValue("receipt", null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data, "d")
    
    try {
      const formData = new FormData();

      // Calculate total_cost again to be sure
      const total = (parseFloat(data.cost) || 0) + (parseFloat(data.cost_by) || 0);
      data.total_cost = total.toFixed(2);

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          if (key === "date") {
            formData.append(key, data[key].format("YYYY-MM-DD"));
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      if (imageFile) {
        formData.append("receipt", imageFile);
      }
      // Replace URL with your actual POST URL
      const response = await axios.post(
        "https://api.dropshep.com/api/maintenance",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message || "তথ্য সফলভাবে সংরক্ষণ হয়েছে!")
        form.resetFields();
        setPreviewImage(null);
        setImageFile(null);
        // navigate("/maintenance");
      } else {
        toast.error("সার্ভার ত্রুটি: " + (response.data.message || "অজানা সমস্যা"));
      }
    } catch (error) {
      toast.error("সার্ভার ত্রুটি: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Toaster/>
      <Card
        className="max-w-7xl mx-auto"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mb-6">
          <Title level={4} style={{ color: "#11375B" }}>
            <ToolOutlined className="mr-2" />
            মেইনটেনেন্স 
          </Title>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large" form={form}>
          <Row gutter={[16, 16]} className="-space-y-4">
            {/* Maintenance Date */}
            <Col xs={24} md={12}>
              <Form.Item
                // label={
                //   <Space>
                //     <CalendarOutlined style={{ color: "#11375B" }} />
                //     <Text strong style={{ color: "#11375B" }}>
                //       মেইনটেনেন্স তারিখ
                //     </Text>
                //   </Space>
                // }
                label="মেইনটেনেন্স তারিখ"
                rules={[{ required: true, message: "তারিখ নির্বাচন করুন!"}]}>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                    size="middel"
                      {...field}
                      style={{ width: "100%" }}
                      placeholder="তারিখ নির্বাচন করুন"
                      format="DD-MM-YYYY"
                      suffixIcon={<CalendarOutlined style={{ color: "#11375B" }} />}
                      onChange={(date) => field.onChange(date)}
                      value={field.value || null}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Service Type */}
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
                validateStatus={errors.service_type ? "error" : ""}
                help={errors.service_type && "সার্ভিসের ধরন নির্বাচন করুন!"}
              >
                <Controller
                  control={control}
                  name="service_type"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="সার্ভিসের ধরন নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      options={[
                        { label: "Maintenance", value: "Maintenance" },
                        { label: "General", value: "General" },
                        { label: "Emergency", value: "Emergency" },
                        { label: "Preventive", value: "Preventive" },
                      ]}
                      size="middle"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Parts and Spares */}
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <Space>
                    <ToolOutlined style={{ color: "#11375B" }} />
                    <Text strong style={{ color: "#11375B" }}>
                      পার্টস এন্ড স্পায়ারস
                    </Text>
                  </Space>
                }
                validateStatus={errors.parts_and_spairs ? "error" : ""}
                help={errors.parts_and_spairs && "পার্টস নির্বাচন করুন!"}
              >
                <Controller
                  control={control}
                  name="parts_and_spairs"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="পার্টস নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      options={[
                        { label: "Engine Oil", value: "EngineOil" },
                        { label: "Pistons", value: "Pistons" },
                        { label: "ABS Sensors", value: "ABS_Sensors" },
                        { label: "Brake Drum", value: "BrakeDrum" },
                        { label: "Tires", value: "Tires" },
                        { label: "Battery", value: "Battery" },
                        { label: "Filters", value: "Filters" },
                      ]}
                      size="middle"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Maintenance Type */}
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
                validateStatus={errors.maintenance_type ? "error" : ""}
                help={errors.maintenance_type && "মেইনটেনেন্সের ধরন নির্বাচন করুন!"}
              >
                <Controller
                  control={control}
                  name="maintenance_type"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="মেইনটেনেন্সের ধরন নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      options={[
                        { label: "Engine Oil Change", value: "EngineOil" },
                        { label: "Piston Replacement", value: "Pistons" },
                        { label: "ABS Sensor Check", value: "ABS_Sensors" },
                        { label: "Brake Drum Service", value: "BrakeDrum" },
                        { label: "Tire Rotation", value: "TireRotation" },
                        { label: "Battery Check", value: "BatteryCheck" },
                      ]}
                      size="middle"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Cost */}
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
                validateStatus={errors.cost ? "error" : ""}
                help={errors.cost && "খরচের পরিমাণ লিখুন!"}
              >
                <Controller
                  control={control}
                  name="cost"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputNumber
                    size="middel"
                      {...field}
                      style={{ width: "100%" }}
                      min={0}
                      formatter={(val) =>
                        val ? `৳ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                      }
                      parser={(val) => val?.replace(/৳\s?|(,*)/g, "")}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Vehicle Number */}
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
                validateStatus={errors.vehicle_no ? "error" : ""}
                help={errors.vehicle_no && "গাড়ির নম্বর নির্বাচন করুন!"}
              >
                <Controller
                  control={control}
                  name="vehicle_no"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      placeholder="গাড়ির নম্বর নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      size="middle"
                    >
                      {vehicles.map((v) => (
                        <Option key={v.id} value={v.registration_number}>
                          {v.registration_number} - {v.vehicle_name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            {/* Cost By */}
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
              >
                <Controller
                  control={control}
                  name="cost_by"
                  render={({ field }) => (
                    <Input
                    size="middel"
                      {...field}
                      placeholder="চার্জ বাই (যেমন: মেকানিক নাম)"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Total Cost */}
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
                validateStatus={errors.total_cost ? "error" : ""}
                help={errors.total_cost && "সর্বমোট খরচ লিখুন!"}
              >
                <Controller
                  control={control}
                  name="total_cost"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputNumber
                    size="middel"
                      {...field}
                      style={{ width: "100%" }}
                      min={0}
                      formatter={(val) =>
                        val ? `৳ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                      }
                      parser={(val) => val?.replace(/৳\s?|(,*)/g, "")}
                      onChange={(val) => field.onChange(val)}
                      disabled // total cost auto-calculated
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Priority */}
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
                validateStatus={errors.dignifies ? "error" : ""}
                help={errors.dignifies && "প্রিয়োরিটি নির্বাচন করুন!"}
              >
                <Controller
                  control={control}
                  name="dignifies"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="প্রিয়োরিটি নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      size="middle"
                    >
                      <Option value="High">
                        <Space>
                          <span className="text-red-500 text-xl">●</span> High Priority
                        </Space>
                      </Option>
                      <Option value="Medium">
                        <Space>
                          <span className="text-yellow-500 text-xl">●</span> Medium Priority
                        </Space>
                      </Option>
                      <Option value="Low">
                        <Space>
                          <span className="text-green-500 text-xl">●</span> Low Priority
                        </Space>
                      </Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            {/* Service For (Driver) */}
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
              >
                <Controller
                  control={control}
                  name="service_for"
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      allowClear
                      placeholder="ড্রাইভার নির্বাচন করুন"
                      onChange={(val) => field.onChange(val)}
                      value={field.value || undefined}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      size="middle"
                    >
                      {drivers.map((d) => (
                        <Option key={d.id} value={d.name}>
                          {d.name} - {d.contact}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            {/* Receipt Upload */}
            <Col xs={24}>
              <Form.Item
                label={
                  <Text strong style={{ color: "#11375B" }}>
                    ক্যাশ মেমো / কাগজের ছবি
                  </Text>
                }
              >
                <Upload {...uploadProps} accept="image/*" listType="picture">
                  <Button
                    icon={<UploadOutlined />}
                    className="border-primary text-primary"
                  >
                    ছবি আপলোড করুন
                  </Button>
                </Upload>

                {previewImage && (
                  <div className="relative inline-block max-w-xs mt-4">
                    <Image
                      src={previewImage}
                      alt="Receipt Preview"
                      style={{ borderRadius: 8, border: "1px solid #d9d9d9" }}
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={removeImage}
                      className="absolute top-2 right-2 shadow-md"
                    />
                  </div>
                )}
              </Form.Item>
            </Col>

            {/* Submit Button */}
          <Row justify="center" style={{ marginTop: "32px" }}>
            <Col xs={24} className="text-center mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="middel"
                className="!bg-primary w-full max-w-xs mx-auto"
              >
                সংরক্ষণ করুন
              </Button>
            </Col>
            </Row>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default MaintenanceForm;
