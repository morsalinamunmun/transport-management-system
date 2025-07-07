// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
// import { FiCalendar } from "react-icons/fi";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import Select from "react-select";
// import BtnSubmit from "../components/Button/BtnSubmit";
// const FuelForm = () => {
//   const fuelDateRef = useRef(null);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     control,
//     formState: { errors },
//   } = useForm();
//   const quantity = parseFloat(watch("quantity") || 0);
//   const price = parseFloat(watch("price") || 0);
//   const total = quantity * price;
//   // driver name
//   const [drivers, setDrivers] = useState([]);
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
//   // driver name
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
//   const onSubmit = async (data) => {
//     data.total_price = total;
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }
//       const response = await axios.post(
//         "https://api.dropshep.com/api/fuel",
//         formData
//       );
//       const resData = response.data;
//       if (resData.status === "Success") {
//         toast.success("ফুয়েল সফলভাবে সংরক্ষণ হয়েছে!", {
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
//       <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
//         ফুয়েল ফর্ম
//       </h3>
//       <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Toaster position="top-center" reverseOrder={false} />
//           {/*  */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 তারিখ
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   {...register("date_time", { required: true })}
//                   ref={(e) => {
//                     register("date_time").ref(e);
//                     fuelDateRef.current = e;
//                   }}
//                   className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                 />
//                 {errors.date_time && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//                 <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                   <FiCalendar
//                     className="text-white cursor-pointer"
//                     onClick={() => fuelDateRef.current?.showPicker?.()}
//                   />
//                 </span>
//               </div>
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 গাড়ির নম্বর
//               </label>
//               <Controller
//                 name="vehicle_number"
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
//             </div>
//           </div>
//           {/*  */}
//           <div className="mt-1 md:flex justify-between gap-3">
//             <div className="mt-3 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 ড্রাইভারের নাম
//               </label>
//               <Controller
//                 name="driver_name"
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
//               {errors.driver_name && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="mt-3 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 ট্রিপ আইডি / ইনভয়েস নাম্বার
//               </label>
//               <input
//                 {...register("trip_id_invoice_no")}
//                 type="text"
//                 placeholder="ট্রিপ আইডি / ইনভয়েস নাম্বার..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>
//           {/*  */}
//           <div className="mt-1 md:flex justify-between gap-3">
//             <div className="mt-3 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 পাম্পের নাম ও ঠিকানা
//               </label>
//               <input
//                 {...register("pump_name_address", { required: true })}
//                 type="text"
//                 placeholder="পাম্পের নাম ও ঠিকানা..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.pump_name_address && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 ফুয়েল ক্যাপাসিটি
//               </label>
//               <input
//                 {...register("capacity")}
//                 type="number"
//                 placeholder="ফুয়েল ক্যাপাসিটি..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>
//           {/*  */}
//           <div className="mt-1 md:flex justify-between gap-3">
//             <div className="relative mt-3 md:mt-0 w-full">
//               <label className="text-primary text-sm font-semibold">
//                 তেলের ধরন
//               </label>
//               <select
//                 {...register("type", { required: true })}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">তেলের ধরন</option>
//                 <option value="Octen">Octen</option>
//                 <option value="Gas">Gas</option>
//                 <option value="Petroll">Petroll</option>
//                 <option value="Diesel">Diesel</option>
//               </select>
//               {errors.type && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 তেলের পরিমাণ
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("quantity", { required: true })}
//                   type="number"
//                   placeholder="তেলের পরিমাণ..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.quantity && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/*  */}
//           <div className="mt-1 md:flex justify-between gap-3">
//             <div className="mt-3 md:mt-0 w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 প্রতি লিটারের দাম
//               </label>
//               <input
//                 {...register("price", { required: true })}
//                 type="number"
//                 placeholder="প্রতি লিটারের দাম..."
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//               {errors.price && (
//                 <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//               )}
//             </div>
//             <div className="w-full relative">
//               <label className="text-primary text-sm font-semibold">
//                 মোট টাকা
//               </label>
//               <input
//                 readOnly
//                 {...register("total_price", { required: true })}
//                 type="number"
//                 defaultValue={total}
//                 value={total}
//                 placeholder="মোট টাকা..."
//                 className="cursor-not-allowed mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-gray-200 outline-none"
//               />
//             </div>
//           </div>
//           {/* Submit Button */}
//           <div className="text-left">
//             <BtnSubmit>সাবমিট করুন</BtnSubmit>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FuelForm;


import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Button, message, DatePicker, Card, Typography } from "antd";
import { FiCalendar } from "react-icons/fi";
import moment from "moment";
import {
  FireOutlined,
  SaveOutlined,
} from "@ant-design/icons"
import toast, { Toaster } from "react-hot-toast";

const { Option } = Select;
const { Title } = Typography;

const FuelForm = () => {
  const [form] = Form.useForm();
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const fuelDateRef = useRef(null);
  const [total, setTotal] = useState(0);

const onValuesChange = () => {
  const quantity = parseFloat(form.getFieldValue("quantity")) || 0;
  const price = parseFloat(form.getFieldValue("price")) || 0;
  setTotal(quantity * price);
};

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle`)
      .then((response) => response.json())
      .then((data) => setVehicles(data.data))
      .catch((error) => console.error("Error fetching vehicle data:", error));

    fetch(`${import.meta.env.VITE_BASE_URL}/api/driver`)
      .then((response) => response.json())
      .then((data) => setDrivers(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const handleSubmit = async (values) => {
    try {
      const total_price = parseFloat(values.quantity || 0) * parseFloat(values.price || 0);
      const formData = new FormData();

      for (const key in values) {
        if (key === "date_time") {
          formData.append(key, values[key].format("YYYY-MM-DD"));
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("total_price", total_price);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/fuel`, formData);
      if (response.data.status === "Success") {
        toast.success("ফুয়েল সফলভাবে সংরক্ষণ হয়েছে!");
        form.resetFields();
        Navigate("/tramessy/fuel")
      } else {
        toast.error("ত্রুটি: " + (response.data.message || "অজানা সমস্যা"));
      }
    } catch (error) {
      toast.error("সার্ভার ত্রুটি: " + (error.response?.data?.message || error.message));
    }
  };

  return (
  <div className="min-h-screen px-4 py-6">
      <Toaster/>
      <Card className="max-w-6xl mx-auto">
        <Title level={4} className="text-left text-primary">
          <FireOutlined className="mr-2 text-primary" /> ফুয়েল ফর্ম
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
        >
          <div className="grid md:grid-cols-2 gap-4 -space-y-4">
            <Form.Item
              label="তারিখ"
              name="date_time"
              rules={[{ required: true, message: "তারিখ পূরণ করতে হবে" }]}
            >
              <DatePicker
                className="w-full"
                format="YYYY-MM-DD"
                suffixIcon={<FiCalendar />}
              />
            </Form.Item>

            <Form.Item
              label="গাড়ির নম্বর"
              name="vehicle_number"
              rules={[{ required: true, message: "গাড়ির নম্বর পূরণ করতে হবে" }]}
            >
              <Select placeholder="গাড়ির নম্বর নির্বাচন করুন">
                {vehicles.map((v) => (
                  <Option key={v.registration_number} value={v.registration_number}>
                    {v.registration_number}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="ড্রাইভারের নাম"
              name="driver_name"
              rules={[{ required: true, message: "ড্রাইভারের নাম পূরণ করতে হবে" }]}
            >
              <Select placeholder="ড্রাইভারের নাম নির্বাচন করুন">
                {drivers.map((d) => (
                  <Option key={d.name} value={d.name}>
                    {d.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="ট্রিপ আইডি / ইনভয়েস নাম্বার" name="trip_id_invoice_no">
              <Input placeholder="ট্রিপ আইডি / ইনভয়েস নাম্বার..." />
            </Form.Item>

            <Form.Item
              label="পাম্পের নাম ও ঠিকানা"
              name="pump_name_address"
              rules={[{ required: true, message: "পাম্পের নাম ও ঠিকানা পূরণ করতে হবে" }]}
            >
              <Input placeholder="পাম্পের নাম ও ঠিকানা..." />
            </Form.Item>

            <Form.Item label="ফুয়েল ক্যাপাসিটি" name="capacity">
              <Input placeholder="ফুয়েল ক্যাপাসিটি..." type="number" />
            </Form.Item>

            <Form.Item
              label="তেলের ধরন"
              name="type"
              rules={[{ required: true, message: "তেলের ধরন পূরণ করতে হবে" }]}
            >
              <Select placeholder="তেলের ধরন">
                <Option value="Octen">Octen</Option>
                <Option value="Gas">Gas</Option>
                <Option value="Petroll">Petroll</Option>
                <Option value="Diesel">Diesel</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="তেলের পরিমাণ"
              name="quantity"
              rules={[{ required: true, message: "তেলের পরিমাণ পূরণ করতে হবে" }]}
            >
              <Input placeholder="তেলের পরিমাণ..." type="number" />
            </Form.Item>

            <Form.Item
              label="প্রতি লিটারের দাম"
              name="price"
              rules={[{ required: true, message: "দাম পূরণ করতে হবে" }]}
            >
              <Input placeholder="প্রতি লিটারের দাম..." type="number" />
            </Form.Item>

            <Form.Item label="মোট টাকা">
              <Input
                readOnly
                 value={(form.getFieldValue("quantity") || 0) * (form.getFieldValue("price") || 0)}
                className="bg-gray-200 cursor-not-allowed"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="!bg-primary" icon={<SaveOutlined />}>
              সাবমিট করুন
            </Button>
          </Form.Item>
        </Form>
     </Card>
    </div>

  );
};

export default FuelForm;
