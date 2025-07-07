// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { FiCalendar } from "react-icons/fi";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { useLoaderData } from "react-router-dom";
// import Select from "react-select";
// import BtnSubmit from "../../components/Button/BtnSubmit";

// const UpdateCarForm = () => {
//   //   update loader data
//   const updateCarLoaderData = useLoaderData();
//   const {
//     id,
//     vehicle_name,
//     driver_name,
//     category,
//     size,
//     registration_number,
//     registration_serial,
//     registration_zone,
//     registration_date,
//     text_date,
//     road_permit_date,
//     fitness_date,
//     status,
//   } = updateCarLoaderData.data;
//   const { register, handleSubmit, control } = useForm({
//     defaultValues: {
//       driver_name: driver_name || "",
//     },
//   });
//   const registrationDateRef = useRef(null);
//   const taxDateRef = useRef(null);
//   const roadPermitRef = useRef(null);
//   const fitnessDateRef = useRef(null);
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

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.put(
//         `https://api.dropshep.com/api/vehicle/${id}`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const resData = response.data;
//       if (resData.status === "Vehicle updated successfully") {
//         toast.success("গাড়ি সফলভাবে আপডেট হয়েছে!", { position: "top-right" });
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
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
//       <Toaster position="top-center" reverseOrder={false} />
//       <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
//         গাড়ির তথ্য আপডেট করুন
//       </h3>
//       <div className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4">
//         {/* Vehicle & Driver Name */}
//         <div className="md:flex justify-between gap-3">
//           <div className="w-full">
//             <label className="text-primary text-sm font-semibold">
//               গাড়ির নাম
//             </label>
//             <input
//               {...register("vehicle_name")}
//               defaultValue={vehicle_name}
//               type="text"
//               className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//             />
//           </div>
//           <div className="relative mt-2 md:mt-0 w-full">
//             <label className="text-primary text-sm font-semibold">
//               ড্রাইভারের নাম
//             </label>
//             <Controller
//               name="driver_name"
//               control={control}
//               render={({ field: { onChange, value, ref } }) => (
//                 <Select
//                   inputRef={ref}
//                   value={driverOptions.find((c) => c.value === value) || null}
//                   onChange={(val) => onChange(val ? val.value : "")}
//                   options={driverOptions}
//                   placeholder="ড্রাইভারের নাম নির্বাচন করুন..."
//                   className="mt-1 text-sm"
//                   classNamePrefix="react-select"
//                   isClearable
//                 />
//               )}
//             />
//           </div>
//         </div>

//         {/* Category & Size */}
//         <div className="md:flex justify-between gap-3">
//           <div className="relative w-full">
//             <label className="text-primary text-sm font-semibold">
//               গাড়ির ধরন
//             </label>
//             <select
//               {...register("category")}
//               className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//             >
//               <option value={category}>{category}</option>
//               <option value="X Corolla">X Corolla</option>
//               <option value="Axio">Axio</option>
//               <option value="Allion">Allion</option>
//               <option value="Premio">Premio</option>
//               <option value="X Noha">X Noha</option>
//               <option value="Hiace">Hiace</option>
//             </select>
//             <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//           </div>
//           <div className="relative mt-2 md:mt-0 w-full">
//             <label className="text-primary text-sm font-semibold">
//               গাড়ির আসন সংখ্যা
//             </label>
//             <select
//               {...register("size")}
//               className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//             >
//               <option value={size}>{size}</option>
//               <option value="4">৪</option>
//               <option value="7">৭</option>
//               <option value="11">১১</option>
//             </select>
//             <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//           </div>
//         </div>

//         {/* Registration Number & Serial */}
//         <div className="md:flex justify-between gap-3">
//           <div className="w-full">
//             <label className="text-primary text-sm font-semibold">
//               রেজিস্ট্রেশন নাম্বার
//             </label>
//             <input
//               {...register("registration_number")}
//               defaultValue={registration_number}
//               type="text"
//               placeholder="রেজিস্ট্রেশন নাম্বার..."
//               className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//             />
//           </div>
//           <div className="relative mt-2 md:mt-0 w-full">
//             <label className="text-primary text-sm font-semibold">
//               রেজিস্ট্রেশন সিরিয়াল
//             </label>
//             <select
//               {...register("registration_serial")}
//               className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//             >
//               <option value={registration_serial}>{registration_serial}</option>
//               <option value="Ga">গ</option>
//               <option value="GH">ঘ</option>
//               <option value="Ca">চ</option>
//             </select>
//             <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//           </div>
//         </div>

//         {/* Registration Zone */}
//         <div className="md:flex justify-between gap-3">
//           <div className="relative w-full">
//             <label className="text-primary text-sm font-semibold">
//               রেজিস্ট্রেশন এলাকা
//             </label>
//             <select
//               {...register("registration_zone")}
//               type="text"
//               className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//             >
//               <option value={registration_zone}>{registration_zone}</option>
//               <option value="Dhaka Metro">ঢাকা মেট্রো</option>
//               <option value="Chatto Metro">চট্ট মেট্রো</option>
//               <option value="Sylhet Metro">সিলেট মেট্রো</option>
//               <option value="Rajshahi Metro">রাজশাহী মেট্রো</option>
//               <option value="Khulna Metro">খুলনা মেট্রো</option>
//               <option value="Rangpur Metro">রংপুর মেট্রো</option>
//               <option value="Barisal Metro">বরিশাল মেট্রো</option>

//               <option value="Dhaka">ঢাকা</option>
//               <option value="Narayanganj">নারায়ণগঞ্জ</option>
//               <option value="Gazipur">গাজীপুর</option>
//               <option value="Tangail">টাঙ্গাইল</option>
//               <option value="Manikgonj">মানিকগঞ্জ</option>
//               <option value="Munshigonj">মুন্সিগঞ্জ</option>
//               <option value="Faridpur">ফরিদপুর</option>
//               <option value="Rajbari">রাজবাড়ী</option>
//               <option value="Narsingdi">নরসিংদী</option>
//               <option value="Kishorgonj">কিশোরগঞ্জ</option>
//               <option value="Shariatpur">শরীয়তপুর</option>
//               <option value="Gopalgonj">গোপালগঞ্জ</option>
//               <option value="Madaripur">মাদারীপুর</option>

//               <option value="Chattogram">চট্টগ্রাম</option>
//               <option value="Cumilla">কুমিল্লা</option>
//               <option value="Feni">ফেনী</option>
//               <option value="Brahmanbaria">ব্রাহ্মণবাড়িয়া</option>
//               <option value="Noakhali">নোয়াখালী</option>
//               <option value="Chandpur">চাঁদপুর</option>
//               <option value="Lokkhipur">লক্ষ্মীপুর</option>
//               <option value="Bandarban">বান্দরবন</option>
//               <option value="Rangamati">রাঙ্গামাটি</option>
//               <option value="CoxsBazar">কক্সবাজার</option>
//               <option value="Khagrasori">খাগড়াছড়ি</option>

//               <option value="Barisal">বরিশাল</option>
//               <option value="Barguna">বরগুনা</option>
//               <option value="Bhola">ভোলা</option>
//               <option value="Patuakhali">পটুয়াখালী</option>
//               <option value="Pirojpur">পিরোজপুর</option>
//               <option value="Jhalokati">ঝালোকাঠি</option>

//               <option value="Khulna">খুলনা</option>
//               <option value="Kustia">কুষ্টিয়া</option>
//               <option value="Jashore">যশোর</option>
//               <option value="Chuadanga">চুয়াডাঙ্গা</option>
//               <option value="Satkhira">সাতক্ষীরা</option>
//               <option value="Bagerhat">বাগেরহ্যাঁট</option>
//               <option value="Meherpur">মেহেরপুর</option>
//               <option value="Jhenaidah">ঝিনাইদাহ</option>
//               <option value="Norail">নড়াইল</option>
//               <option value="Magura">মাগুরা</option>

//               <option value="Rangpur">রংপুর</option>
//               <option value="Ponchogor">পঞ্চগড়</option>
//               <option value="Thakurgaon">ঠাকুরগাও</option>
//               <option value="Kurigram">কুড়িগ্রাম</option>
//               <option value="Dinajpur">দিনাজপুর</option>
//               <option value="Nilfamari">নীলফামারী</option>
//               <option value="Lalmonirhat">লালমনিরহ্যাঁট</option>
//               <option value="Gaibandha">গাইবান্দা</option>

//               <option value="Rajshahi">রাজশাহী</option>
//               <option value="Pabna">পাবনা</option>
//               <option value="Bagura">বগুড়া</option>
//               <option value="Joypurhat">জয়পুরহ্যাঁট</option>
//               <option value="Nouga">নওগাঁ</option>
//               <option value="Natore">নাটোর</option>
//               <option value="Sirajgonj">সিরাজগঞ্জ</option>
//               <option value="Chapainawabganj">চাপাইনবাবগঞ্জ</option>

//               <option value="Sylhet">সিলেট</option>
//               <option value="Habiganj">হবিগঞ্জ</option>
//               <option value="Moulvibazar">মৌলভীবাজার</option>
//               <option value="Sunamgonj">সুনামগঞ্জ</option>

//               <option value="Mymensingh">ময়মনসিংহ</option>
//               <option value="Netrokona">নেত্রকোনা</option>
//               <option value="Jamalpur">জামালপুর</option>
//               <option value="Sherpur">শেরপুর</option>
//             </select>
//             <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//           </div>

//           <div className="relative w-full">
//             <label className="text-primary text-sm font-semibold">
//               রেজিস্ট্রেশন তারিখ
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 {...register("registration_date")}
//                 defaultValue={registration_date}
//                 ref={(e) => {
//                   register("registration_date").ref(e);
//                   registrationDateRef.current = e;
//                 }}
//                 className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//               />
//               <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                 <FiCalendar
//                   className="text-white cursor-pointer"
//                   onClick={() => registrationDateRef.current?.showPicker?.()}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="mt-2 md:mt-0 w-full">
//             <label className="text-primary text-sm font-semibold">
//               ট্যাক্স মেয়াদোত্তীর্ণ তারিখ
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 {...register("text_date")}
//                 defaultValue={text_date}
//                 ref={(e) => {
//                   register("text_date").ref(e);
//                   taxDateRef.current = e;
//                 }}
//                 className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//               />
//               <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                 <FiCalendar
//                   className="text-white cursor-pointer"
//                   onClick={() => taxDateRef.current?.showPicker?.()}
//                 />
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Date Fields */}
//         <div className="md:flex justify-between gap-3">
//           <div className="w-full">
//             <label className="text-primary text-sm font-semibold">
//               রোড পারমিট তারিখ
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 {...register("road_permit_date")}
//                 defaultValue={road_permit_date}
//                 ref={(e) => {
//                   register("road_permit_date").ref(e);
//                   roadPermitRef.current = e;
//                 }}
//                 className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//               />
//               <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                 <FiCalendar
//                   className="text-white cursor-pointer"
//                   onClick={() => roadPermitRef.current?.showPicker?.()}
//                 />
//               </span>
//             </div>
//           </div>
//           <div className="mt-2 md:mt-0 w-full">
//             <label className="text-primary text-sm font-semibold">
//               ফিটনেস মেয়াদোত্তীর্ণ তারিখ
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 {...register("fitness_date")}
//                 defaultValue={fitness_date}
//                 ref={(e) => {
//                   register("fitness_date").ref(e);
//                   fitnessDateRef.current = e;
//                 }}
//                 className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//               />
//               <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                 <FiCalendar
//                   className="text-white cursor-pointer"
//                   onClick={() => fitnessDateRef.current?.showPicker?.()}
//                 />
//               </span>
//             </div>
//           </div>
//           <div className="w-full relative">
//             <label className="text-primary text-sm font-semibold">
//               স্ট্যাটাস
//             </label>
//             <select
//               {...register("status", { required: true })}
//               className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//             >
//               <option value={status}>{status}</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>

//             <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-left">
//           <BtnSubmit>সাবমিট করুন</BtnSubmit>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default UpdateCarForm;


import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  Spin,
  Card,
  Typography,
  Row,
  Col,
} from "antd";
import {
  SaveOutlined,
} from "@ant-design/icons"
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {toast, Toaster} from "react-hot-toast";

const { Title } = Typography;
const { Option } = Select;

const UpdateCarForm = () => {
  const loaderData = useLoaderData();
  const [form] = Form.useForm();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const car = loaderData?.data;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/driver`)
      .then((res) => res.json())
      .then((data) => setDrivers(data.data))
      .catch(() => message.error("ড্রাইভার লোড করতে ব্যর্থ"));
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        registration_date: values.registration_date?.format("YYYY-MM-DD"),
        text_date: values.text_date?.format("YYYY-MM-DD"),
        road_permit_date: values.road_permit_date?.format("YYYY-MM-DD"),
        fitness_date: values.fitness_date?.format("YYYY-MM-DD"),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/vehicle/${car.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.status === "Vehicle updated successfully") {
        toast.success("গাড়ি সফলভাবে আপডেট হয়েছে!");
        navigate("/tramessy/car-list")
      } else {
        throw new Error(res.data.message || "ত্রুটি");
      }
    } catch (error) {
      toast.error(`আপডেট ব্যর্থ: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <Spin fullscreen />;

  return (
    <Card className="max-w-5xl mx-auto mt-6">
    <Toaster/>
      <Title level={4} className="text-primary mb-4">
        গাড়ির তথ্য আপডেট করুন
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...car,
          registration_date: dayjs(car.registration_date),
          text_date: dayjs(car.text_date),
          road_permit_date: dayjs(car.road_permit_date),
          fitness_date: dayjs(car.fitness_date),
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
          <Form.Item name="vehicle_name" label="গাড়ির নাম" rules={[{ required: true }]}>
          <Input placeholder="গাড়ির নাম লিখুন..." />
        </Form.Item>
          </Col>
          <Col xs={24} md={12}>
          <Form.Item name="driver_name" label="ড্রাইভারের নাম" rules={[{ required: true }]}>
          <Select placeholder="ড্রাইভার নির্বাচন করুন">
            {drivers.map((d) => (
              <Option key={d.id} value={d.name}>
                {d.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
         <Col xs={24} md={12}>
          <Form.Item name="category" label="গাড়ির ধরন" rules={[{ required: true }]}>
          <Select>
            <Option value="X Corolla">X Corolla</Option>
            <Option value="Axio">Axio</Option>
            <Option value="Allion">Allion</Option>
            <Option value="Premio">Premio</Option>
            <Option value="X Noha">X Noha</Option>
            <Option value="Hiace">Hiace</Option>
          </Select>
        </Form.Item>
         </Col>

        <Col xs={24} md={12}>
        <Form.Item name="size" label="আসনের সংখ্যা" rules={[{ required: true }]}>
          <Select>
            <Option value="4">৪</Option>
            <Option value="7">৭</Option>
            <Option value="11">১১</Option>
          </Select>
        </Form.Item>
        </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
          <Form.Item name="registration_number" label="রেজিস্ট্রেশন নাম্বার" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
          </Col>

        <Col xs={24} md={8}>
        <Form.Item name="registration_serial" label="রেজিস্ট্রেশন সিরিয়াল" rules={[{ required: true }]}>
          <Select>
            <Option value="Ga">গ</Option>
            <Option value="GH">ঘ</Option>
            <Option value="Ca">চ</Option>
          </Select>
        </Form.Item>
        </Col>

        <Col xs={24} md={8}>
        <Form.Item name="registration_zone" label="রেজিস্ট্রেশন এলাকা" rules={[{ required: true }]}>
          <Select showSearch placeholder="জোন নির্বাচন করুন">
            <Option value="Dhaka Metro">ঢাকা মেট্রো</Option>
            <Option value="Chattogram">চট্টগ্রাম</Option>
            <Option value="Sylhet Metro">সিলেট মেট্রো</Option>
            <Option value="Rajshahi Metro">রাজশাহী মেট্রো</Option>
            <Option value="Khulna Metro">খুলনা মেট্রো</Option>
            <Option value="Rangpur Metro">রংপুর মেট্রো</Option>
          </Select>
        </Form.Item>
        </Col>
        </Row>

     <Row gutter={[16, 0]}>
         <Col xs={24} md={12}>
         <Form.Item name="registration_date" label="রেজিস্ট্রেশন তারিখ" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
         </Col>

        <Col xs={24} md={12}>
        <Form.Item name="text_date" label="ট্যাক্স তারিখ" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        </Col>
     </Row>

        <Row gutter={[16,0]}>
         <Col xs={24} md={8}>
          <Form.Item name="road_permit_date" label="রোড পারমিট তারিখ" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
         </Col>

        <Col xs={24} md={8}>
        <Form.Item name="fitness_date" label="ফিটনেস তারিখ" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        </Col>

        <Col xs={24} md={8}>
        <Form.Item name="status" label="স্ট্যাটাস" rules={[{ required: true }]}>
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
        </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="!bg-primary" icon={<SaveOutlined/>}>
            আপডেট করুন
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateCarForm;
