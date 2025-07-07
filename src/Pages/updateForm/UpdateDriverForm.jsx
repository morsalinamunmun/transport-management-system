// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";
// import { FiCalendar } from "react-icons/fi";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useLoaderData } from "react-router-dom";
// import BtnSubmit from "../../components/Button/BtnSubmit";

// const UpdateDriverForm = () => {
//   const { register, handleSubmit, reset, setValue } = useForm();
//   const driverDateRef = useRef(null);
//   const updateDriverLoaderData = useLoaderData();

//   const {
//     id,
//     name,
//     contact,
//     nid,
//     emergency_contact,
//     address,
//     expire_date,
//     note,
//     license,
//     status,
//     license_image,
//   } = updateDriverLoaderData.data;
//   const [previewImage, setPreviewImage] = useState(license_image);
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreviewImage(url);
//       setValue("license_image", file);
//     }
//   };
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
//         `https://api.dropshep.com/api/driver/${id}`,
//         formData
//       );

//       const resData = response.data;
//       if (resData.status === "success") {
//         toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!", {
//           position: "top-right",
//         });
//         reset();
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
//                 ড্রাইভারের নাম
//               </label>
//               <input
//                 {...register("name")}
//                 defaultValue={name}
//                 type="text"
//                 placeholder="ড্রাইভারের নাম..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ড্রাইভারের মোবাইল
//               </label>
//               <input
//                 {...register("contact")}
//                 defaultValue={contact}
//                 type="number"
//                 placeholder="ড্রাইভারের মোবাইল..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>

//           {/* NID & Emergency Contact */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 এন.আই.ডি নাম্বার
//               </label>
//               <input
//                 {...register("nid")}
//                 defaultValue={nid}
//                 type="number"
//                 placeholder="এন.আই.ডি নাম্বার..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 জরুরী যোগাযোগ
//               </label>
//               <input
//                 {...register("emergency_contact")}
//                 defaultValue={emergency_contact}
//                 type="number"
//                 placeholder="জরুরী যোগাযোগ নাম্বার..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>

//           {/* Address & Note */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 ঠিকানা
//               </label>
//               <input
//                 {...register("address")}
//                 defaultValue={address}
//                 type="text"
//                 placeholder="ঠিকানা..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="mt-2 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 বিঃদ্রঃ
//               </label>
//               <input
//                 {...register("note")}
//                 defaultValue={note}
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
//                 লাইসেন্স না.
//               </label>
//               <input
//                 {...register("license")}
//                 defaultValue={license}
//                 type="text"
//                 placeholder="লাইসেন্স না. ..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="mt-2 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 মেয়াদোত্তীর্ণ তারিখ
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   {...register("expire_date")}
//                   defaultValue={expire_date}
//                   ref={(e) => {
//                     register("expire_date").ref(e);
//                     driverDateRef.current = e;
//                   }}
//                   className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                 />
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
//                 স্ট্যাটাস
//               </label>
//               <select
//                 {...register("status")}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value={status}>{status}</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>

//             <div className="mt-3 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 লাইসেন্সের ছবি যুক্ত করুন
//               </label>
//               <div className="relative mt-1">
//                 <label
//                   htmlFor="license_image"
//                   className="border p-2 rounded w-full block bg-white text-gray-500 text-sm cursor-pointer"
//                 >
//                   {previewImage ? "ছবি নির্বাচিত হয়েছে" : "ছবি বাচাই করুন"}
//                 </label>
//                 <input
//                   {...register("license_image")}
//                   id="license_image"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
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
//                   document.querySelector('input[type="file"]').value = null;
//                   setValue("license_image", null);
//                 }}
//                 className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                 title="Remove image"
//               >
//                 <IoMdClose />
//               </button>
//               <img
//                 src={
//                   previewImage?.startsWith("blob:")
//                     ? previewImage
//                     : `https://api.dropshep.com/public/uploads/driver/${previewImage}`
//                 }
//                 alt="License Preview"
//                 className="max-w-xs h-auto rounded border border-gray-300"
//               />
//               {/* <img
//                 src={previewImage}
//                 alt="License Preview"
//                 className="max-w-xs h-auto rounded border border-gray-300"
//               /> */}
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

// export default UpdateDriverForm;


import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
  message,
  Card,
  Typography,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const { Option } = Select;
const {Title} = Typography;

const UpdateDriverForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const updateDriverLoaderData = useLoaderData();
  const {
    id,
    name,
    contact,
    nid,
    emergency_contact,
    address,
    expire_date,
    note,
    license,
    status,
    license_image,
  } = updateDriverLoaderData?.data || {};

  const [previewImage, setPreviewImage] = useState(
    license_image
      ? `${import.meta.env.VITE_BASE_URL}/public/uploads/driver/${license_image}`
      : null
  );

  const [fileList, setFileList] = useState(
    license_image
      ? [
          {
            uid: "-1",
            name: "license.jpg",
            status: "done",
            url: `${import.meta.env.VITE_BASE_URL}/public/uploads/driver/${license_image}`,
          },
        ]
      : []
  );

  useEffect(() => {
    form.setFieldsValue({
      name,
      contact,
      nid,
      emergency_contact,
      address,
      expire_date: expire_date ? moment(expire_date) : null,
      note,
      license,
      status,
    });
  }, [form]);

  const handleSubmit = async (values) => {
    // setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "expire_date") {
          formData.append("expire_date", value?.format("YYYY-MM-DD"));
        } else {
          formData.append(key, value);
        }
      });

      if (values.license_image?.file) {
        formData.append("license_image", values.license_image.file);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/driver/${id}`,
        formData
      );

      if (response.data.status === "success") {
        toast.success("তথ্য সফলভাবে সংরক্ষণ হয়েছে!");
        form.resetFields();
        setPreviewImage(null);
        setFileList([]);
        navigate("/tramessy/driver-list")
        setLoading(false);
      } else {
        toast.error("সার্ভার ত্রুটি: " + (response.data.message || "অজানা সমস্যা"));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("সার্ভার ত্রুটি: " + errorMessage);
      
    }
  };

  return (
    <div className="mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="shadow">
        <Title level={4} className="text-left text-primary">
          <UserOutlined className="mr-2 text-primary" /> ড্রাইভার আপডেট করুন
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ড্রাইভারের নাম" name="name" rules={[{ required: false}]}>
                <Input placeholder="ড্রাইভারের নাম" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="মোবাইল নম্বর" name="contact" rules={[{ required: false}]}>
                <Input placeholder="মোবাইল নম্বর" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="এনআইডি" name="nid">
                <Input placeholder="এনআইডি" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="জরুরি নম্বর" name="emergency_contact">
                <Input placeholder="জরুরি যোগাযোগ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ঠিকানা" name="address">
                <Input placeholder="ঠিকানা" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="বিঃদ্রঃ" name="note">
                <Input placeholder="বিঃদ্রঃ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="লাইসেন্স নম্বর" name="license">
                <Input placeholder="লাইসেন্স নম্বর" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="মেয়াদোত্তীর্ণ তারিখ" name="expire_date">
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="স্ট্যাটাস" name="status">
                <Select placeholder="স্ট্যাটাস">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="লাইসেন্সের ছবি"
                name="license_image"
                valuePropName="file"
              >
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  onPreview={(file) =>
                    setPreviewImage(file.url || URL.createObjectURL(file.originFileObj))
                  }
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) =>
                    setFileList(newFileList)
                  }
                >
                  <Button icon={<UploadOutlined />}>ছবি আপলোড করুন</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <div className="my-4">
  {previewImage ? (
    <img
      src={previewImage}
      alt="Preview"
      className="max-w-xs border rounded shadow"
    />
  ) : (
    <img
  src="/no-image.png" // Put your placeholder in the public folder
  alt="No Image"
  className="max-w-xs border rounded shadow"
/>
  )}
</div>


          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit" className="!bg-primary flex justify-start" loading={loading}>
              সাবমিট করুন
            </Button>
          </Form.Item>
        </Form>
        </Card>
    </div>
  );
};

export default UpdateDriverForm;
