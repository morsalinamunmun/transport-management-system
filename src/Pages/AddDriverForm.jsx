// import React, { useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";
// import { FiCalendar } from "react-icons/fi";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import BtnSubmit from "../components/Button/BtnSubmit";

// const AddDriverForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm();
//   const [previewImage, setPreviewImage] = useState(null);
//   const driverDateRef = useRef(null);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         if (data[key] !== undefined && data[key] !== null) {
//           formData.append(key, data[key]);
//         }
//       }
//       const response = await axios.post(
//         "https://api.dropshep.com/api/driver",
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
//         ড্রাইভার তৈরি করুন
//       </h3>
//       <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name & Contact */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ড্রাইভারের নাম *
//               </label>
//               <input
//                 {...register("name", { required: true })}
//                 type="text"
//                 placeholder="ড্রাইভারের নাম..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.name && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ড্রাইভারের মোবাইল *
//               </label>
//               <input
//                 {...register("contact", { required: true })}
//                 type="number"
//                 placeholder="ড্রাইভারের মোবাইল..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />{" "}
//               {errors.contact && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//           </div>

//           {/* NID & Emergency Contact */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 এন.আই.ডি নাম্বার *
//               </label>
//               <input
//                 {...register("nid", { required: true })}
//                 type="number"
//                 placeholder="এন.আই.ডি নাম্বার..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.nid && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 জরুরী যোগাযোগ
//               </label>
//               <input
//                 {...register("emergency_contact")}
//                 type="number"
//                 placeholder="জরুরী যোগাযোগ নাম্বার..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.emergency_contact && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//           </div>

//           {/* Address & Note */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ঠিকানা *
//               </label>
//               <input
//                 {...register("address", { required: true })}
//                 type="text"
//                 placeholder="ঠিকানা..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.address && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 বিঃদ্রঃ
//               </label>
//               <input
//                 {...register("note")}
//                 type="text"
//                 placeholder="বিঃদ্রঃ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>

//           {/* License & Expiry */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 লাইসেন্স না. *
//               </label>
//               <input
//                 {...register("license", { required: true })}
//                 type="text"
//                 placeholder="লাইসেন্স না. ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.license && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="mt-2 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 মেয়াদোত্তীর্ণ তারিখ *
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   {...register("expire_date", { required: true })}
//                   ref={(e) => {
//                     register("expire_date").ref(e);
//                     driverDateRef.current = e;
//                   }}
//                   className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                 />
//                 {errors.expire_date && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//                 <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                   <FiCalendar
//                     className="text-white cursor-pointer"
//                     onClick={() => driverDateRef.current?.showPicker?.()}
//                   />
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Status & License Image */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 স্ট্যাটাস *
//               </label>
//               <select
//                 {...register("status", { required: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">স্ট্যাটাস নির্বাচন করুন</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//               {errors.status && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>

//             <div className="mt-3 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 লাইসেন্সের ছবি যুক্ত করুন
//               </label>
//               <div className="relative mt-1">
//                 <Controller
//                   name="license_image"
//                   control={control}
//                   rules={{ required: "পূরণ করতে হবে" }}
//                   render={({
//                     field: { onChange, ref },
//                     fieldState: { error },
//                   }) => (
//                     <div className="relative mt-1">
//                       <label
//                         htmlFor="license_image"
//                         className="border p-2 rounded w-full block bg-white text-gray-500 text-sm cursor-pointer"
//                       >
//                         {previewImage
//                           ? "ছবি নির্বাচিত হয়েছে"
//                           : "ছবি বাছাই করুন"}
//                       </label>
//                       <input
//                         id="license_image"
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
//             </div>
//           </div>

//           {/* Preview */}
//           {previewImage && (
//             <div className="mt-3 relative flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewImage(null);
//                   document.getElementById("license_image").value = "";
//                 }}
//                 className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                 title="Remove image"
//               >
//                 <IoMdClose />
//               </button>
//               <img
//                 src={previewImage}
//                 alt="License Preview"
//                 className="max-w-xs h-auto rounded border border-gray-300"
//               />
//             </div>
//           )}

//           <div className="mt-6 text-left">
//             <BtnSubmit>সাবমিট করুন</BtnSubmit>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDriverForm;


// Ant Design version of AddDriverForm

import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Upload,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Space,
  message,
  Image,
} from "antd";
import {
  IdcardOutlined,
  PhoneOutlined,
  HomeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UploadOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

const AddDriverForm = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "expire_date") {
          formData.append(key, values[key].format("YYYY-MM-DD"));
        } else if (key !== "license_image") {
          formData.append(key, values[key]);
        }
      });
      if (imageFile) formData.append("license_image", imageFile);

      const response = await axios.post("https://api.dropshep.com/api/driver", formData);
      if (response.data.status === "success") {
        toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!");
        form.resetFields();
        setPreviewImage(null);
        setImageFile(null);
        navigate("/driver-list")
      } else {
        toast.error("সার্ভার ত্রুটি: " + (response.data.message || "অজানা সমস্যা"));
      }
    } catch (error) {
      toast.error("সার্ভার ত্রুটি: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  return (
    <div className="mt-10 p-[10px]">
      <Toaster/>
      <Card className="max-w-7xl mx-auto">
        <Title level={4} className="text-primary mb-6">
          ড্রাইভার তৈরি করুন
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          {/* Name & Contact */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="ড্রাইভারের নাম"
                name="name"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <Input placeholder="ড্রাইভারের নাম..." prefix={<IdcardOutlined />} size="middel"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="ড্রাইভারের মোবাইল"
                name="contact"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <Input placeholder="মোবাইল নাম্বার..." prefix={<PhoneOutlined />} size="middel"/>
              </Form.Item>
            </Col>
          </Row>

          {/* NID & Emergency */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="এন.আই.ডি নাম্বার"
                name="nid"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="NID নাম্বার..." size="middel" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="জরুরী যোগাযোগ" name="emergency_contact">
                <Input placeholder="জরুরী নাম্বার..." size="middel" />
              </Form.Item>
            </Col>
          </Row>

          {/* Address & Note */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="ঠিকানা"
                name="address"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <Input placeholder="ঠিকানা..." prefix={<HomeOutlined />} size="middel" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="বিঃদ্রঃ" name="note">
                <Input placeholder="বিঃদ্রঃ..." prefix={<FileTextOutlined />} size="middel"/>
              </Form.Item>
            </Col>
          </Row>

          {/* License & Expiry */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="লাইসেন্স নাম্বার"
                name="license"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <Input placeholder="লাইসেন্স নাম্বার..." size="middel"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="মেয়াদোত্তীর্ণ তারিখ"
                name="expire_date"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="তারিখ নির্বাচন করুন" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          {/* Status & Upload */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="স্ট্যাটাস"
                name="status"
                rules={[{ required: true, message: "পূরণ করতে হবে" }]}
              >
                <Select placeholder="স্ট্যাটাস নির্বাচন করুন">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="লাইসেন্সের ছবি" name="license_image">
                <Upload
                  beforeUpload={(file) => {
                    handleImageChange({ file });
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>ছবি আপলোড করুন</Button>
                </Upload>
                {previewImage && (
                  <div className="mt-2 relative">
                    <Image
                      src={previewImage}
                      alt="License Preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={removeImage}
                      style={{ position: "absolute", top: 4, right: 4 }}
                    />
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* Submit */}
          <Row >
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="middel"
                icon={<CheckCircleOutlined />}
                className="!bg-primary"
              >
                সাবমিট করুন
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddDriverForm;
