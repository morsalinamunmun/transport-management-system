// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { useForm, Controller } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
// import { FiCalendar } from "react-icons/fi";
// import Select from "react-select";
// import BtnSubmit from "../components/Button/BtnSubmit";
// const AddTripForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     control,
//     formState: { errors },
//     setValue,
//   } = useForm();
//   const tripDateRef = useRef(null);
//   const commision = parseFloat(watch("driver_percentage") || 0);
//   const fuel = parseFloat(watch("fuel_price") || 0);
//   const gas = parseFloat(watch("gas_price") || 0);
//   const totalDamarage = parseFloat(watch("demarage") || 0);
//   const other = parseFloat(watch("other_expenses") || 0);
//   const total = commision + fuel + gas + totalDamarage + other;

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
//     contact: driver.contact,
//   }));
//   // post data on server
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }
//       const response = await axios.post(
//         "https://api.dropshep.com/api/trip",
//         formData
//       );
//       const resData = response.data;
//       if (resData.status === "success") {
//         toast.success("ট্রিপ সফলভাবে সংরক্ষণ হয়েছে!", {
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
//         ট্রিপ যোগ করুন
//       </h3>
//       <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//           <Toaster position="top-center" reverseOrder={false} />
//           {/*  */}
//           <div className="border border-gray-300 p-3 md:p-5 rounded-md">
//             <h5 className="text-primary font-semibold text-center md:pb-5">
//               <span className="py-2 border-b-2 border-primary">
//                 ট্রিপ এবং গন্তব্য সেকশন
//               </span>
//             </h5>
//             <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//               <div className="w-full">
//                 <label className="text-primary text-sm font-semibold">
//                   তারিখ *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="date"
//                     {...register("trip_date", { required: true })}
//                     ref={(e) => {
//                       register("trip_date").ref(e);
//                       tripDateRef.current = e;
//                     }}
//                     className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
//                   />
//                   {errors.trip_date && (
//                     <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                   )}
//                   <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
//                     <FiCalendar
//                       className="text-white cursor-pointer"
//                       onClick={() => tripDateRef.current?.showPicker?.()}
//                     />
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-2 md:mt-0 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ট্রিপের সময়
//                 </label>
//                 <input
//                   {...register("trip_time", { required: true })}
//                   type="text"
//                   placeholder="ট্রিপের সময়..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.trip_time && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//             </div>
//             {/*  */}
//             <div className="md:flex justify-between gap-3">
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   লোড পয়েন্ট
//                 </label>
//                 <input
//                   {...register("load_point", { required: true })}
//                   type="text"
//                   placeholder="লোড পয়েন্ট..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.load_point && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   আনলোড পয়েন্ট
//                 </label>
//                 <input
//                   {...register("unload_point", { required: true })}
//                   type="text"
//                   placeholder="আনলোড পয়েন্ট..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.unload_point && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/*  */}
//           <div className="border border-gray-300 p-5 rounded-md">
//             <h5 className="text-primary font-semibold text-center pb-5">
//               <span className="py-2 border-b-2 border-primary">
//                 গাড়ি এবং ড্রাইভারের তথ্য
//               </span>
//             </h5>
//             <div className="md:flex justify-between gap-3">
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   গাড়ির নম্বর
//                 </label>
//                 <Controller
//                   name="vehicle_number"
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, value, ref } }) => (
//                     <Select
//                       inputRef={ref}
//                       value={
//                         vehicleOptions.find((c) => c.value === value) || null
//                       }
//                       onChange={(val) => onChange(val ? val.value : "")}
//                       options={vehicleOptions}
//                       placeholder="গাড়ির নম্বর নির্বাচন করুন..."
//                       className="mt-1 text-sm"
//                       classNamePrefix="react-select"
//                       isClearable
//                     />
//                   )}
//                 />
//                 {errors.vehicle_number && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ড্রাইভারের নাম
//                 </label>
//                 <Controller
//                   name="driver_name"
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, value, ref } }) => (
//                     <Select
//                       inputRef={ref}
//                       value={
//                         driverOptions.find(
//                           (option) => option.value === value
//                         ) || null
//                       }
//                       onChange={(selectedOption) => {
//                         const selectedName = selectedOption?.value || "";
//                         onChange(selectedName);

//                         // set mobile number
//                         const matchedDriver = drivers.find(
//                           (d) => d.name === selectedName
//                         );
//                         setValue(
//                           "driver_contact",
//                           matchedDriver?.contact || ""
//                         );
//                       }}
//                       options={driverOptions}
//                       placeholder="ড্রাইভারের নাম নির্বাচন করুন..."
//                       className="mt-1 text-sm"
//                       classNamePrefix="react-select"
//                       isClearable
//                     />
//                   )}
//                 />
//                 {errors.driver_name && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ড্রাইভারের মোবাইল
//                 </label>
//                 <input
//                   {...register("driver_contact", { required: true })}
//                   type="number"
//                   placeholder="ড্রাইভারের মোবাইল..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.driver_contact && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/*  */}
//           <div className="border border-gray-300 p-5 rounded-md">
//             <h5 className="text-primary font-semibold text-center pb-5">
//               <span className="py-2 border-b-2 border-primary">চলমান খরচ</span>
//             </h5>
//             <div className="md:flex justify-between gap-3">
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ড্রাইভারের কমিশন
//                 </label>
//                 <input
//                   {...register("driver_percentage", { required: true })}
//                   type="number"
//                   placeholder="ড্রাইভারের কমিশন..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.driver_percentage && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   তেলের মূল্য
//                 </label>
//                 <input
//                   {...register("fuel_price")}
//                   type="text"
//                   placeholder="তেলের মূল্য..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//               </div>
//               <div className="mt-2 md:mt-0 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   গ্যাসের মূল্য
//                 </label>
//                 <input
//                   {...register("gas_price")}
//                   type="text"
//                   placeholder="গ্যাসের মূল্য..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//               </div>
//             </div>
//             <div className="md:flex justify-between gap-3">
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   অন্যান্য খরচ
//                 </label>
//                 <input
//                   {...register("other_expenses")}
//                   type="text"
//                   placeholder="অন্যান্য খরচ..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ওয়েটিং চার্জ
//                 </label>
//                 <input
//                   {...register("demarage", { required: true })}
//                   type="number"
//                   placeholder="ওয়েটিং চার্জ..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.demarage && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-1 w-full">
//                 <label className="text-primary text-sm font-semibold">
//                   ট্রিপের খরচ
//                 </label>
//                 <input
//                   readOnly
//                   value={total}
//                   placeholder="ট্রিপের খরচ..."
//                   className="cursor-not-allowed mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-gray-200 outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//           {/*  */}
//           <div className="border border-gray-300 p-5 rounded-md">
//             <h5 className="text-primary font-semibold text-center pb-5">
//               <span className="py-2 border-b-2 border-primary">
//                 কাস্টমার এবং পেমেন্ট তথ্য
//               </span>
//             </h5>
//             <div className="md:flex justify-between gap-3">
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   কাস্টমারের নাম
//                 </label>
//                 <input
//                   {...register("customer", { required: true })}
//                   type="text"
//                   placeholder="কাস্টমারের নাম..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.customer && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   কাস্টমারের মোবাইল
//                 </label>
//                 <input
//                   {...register("customer_mobile", { required: true })}
//                   type="number"
//                   placeholder="কাস্টমারের মোবাইল..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.customer_mobile && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   ট্রিপের ভাড়া
//                 </label>
//                 <input
//                   {...register("trip_price", { required: true })}
//                   type="text"
//                   placeholder="ট্রিপের ভাড়া..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//                 {errors.trip_price && (
//                   <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
//                 )}
//               </div>
//               <div className="mt-2 md:mt-1 w-full relative">
//                 <label className="text-primary text-sm font-semibold">
//                   অগ্রিম পেমেন্ট
//                 </label>
//                 <input
//                   {...register("advance")}
//                   type="text"
//                   placeholder="অন্যান্য খরচ..."
//                   className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//                 />
//               </div>
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

// export default AddTripForm;


// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useForm, Controller } from "react-hook-form";
// import { Row, Col, Input, DatePicker, Select as AntSelect, Typography, Divider, Card } from "antd";
// import BtnSubmit from "../components/Button/BtnSubmit";

// const { Option } = AntSelect;
// const { Title } = Typography;

// const AddTripForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     control,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   const commision = parseFloat(watch("driver_percentage") || 0);
//   const fuel = parseFloat(watch("fuel_price") || 0);
//   const gas = parseFloat(watch("gas_price") || 0);
//   const totalDamarage = parseFloat(watch("demarage") || 0);
//   const other = parseFloat(watch("other_expenses") || 0);
//   const total = commision + fuel + gas + totalDamarage + other;

//   const [drivers, setDrivers] = useState([]);
//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     fetch("https://api.dropshep.com/api/vehicle")
//       .then((res) => res.json())
//       .then((data) => setVehicles(data.data));
//   }, []);

//   useEffect(() => {
//     fetch("https://api.dropshep.com/api/driver")
//       .then((res) => res.json())
//       .then((data) => setDrivers(data.data));
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }
//       const response = await axios.post("https://api.dropshep.com/api/trip", formData);
//       const resData = response.data;
//       if (resData.status === "success") {
//         toast.success("ট্রিপ সফলভাবে সংরক্ষণ হয়েছে!");
//         reset();
//       } else {
//         toast.error("সার্ভার ত্রুটি: " + (resData.message || "অজানা সমস্যা"));
//       }
//     } catch (error) {
//       toast.error("সার্ভার ত্রুটি: " + (error.message || "Unknown error"));
//     }
//   };

//   return (
//     <div className="mt-10">
//       <Toaster position="top-center" reverseOrder={false} />
//       <Card className="bg-gray-100 rounded-md">
//         <Title level={4} className="">
//         ট্রিপ যোগ করুন
//       </Title>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Row gutter={16}>
//             <Col xs={24} md={12}>
//               <label>তারিখ *</label>
//               <Controller
//                 name="trip_date"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} />}
//               />
//               {errors.trip_date && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={12}>
//               <label>ট্রিপের সময় *</label>
//               <Input {...register("trip_time", { required: true })} placeholder="ট্রিপের সময়..." />
//               {errors.trip_time && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//           </Row>

//           <Row gutter={16} className="mt-3">
//             <Col xs={24} md={12}>
//               <label>লোড পয়েন্ট *</label>
//               <Input {...register("load_point", { required: true })} placeholder="লোড পয়েন্ট..." />
//               {errors.load_point && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={12}>
//               <label>আনলোড পয়েন্ট *</label>
//               <Input {...register("unload_point", { required: true })} placeholder="আনলোড পয়েন্ট..." />
//               {errors.unload_point && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//           </Row>

//           <Divider orientation="center">গাড়ি এবং ড্রাইভারের তথ্য</Divider>
//           <Row gutter={16}>
//             <Col xs={24} md={12}>
//               <label>গাড়ির নম্বর *</label>
//               <Controller
//                 name="vehicle_number"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <AntSelect {...field} allowClear style={{ width: "100%" }}>
//                     {vehicles.map((v) => (
//                       <Option key={v.registration_number} value={v.registration_number}>
//                         {v.registration_number}
//                       </Option>
//                     ))}
//                   </AntSelect>
//                 )}
//               />
//               {errors.vehicle_number && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={12}>
//               <label>ড্রাইভারের নাম *</label>
//               <Controller
//                 name="driver_name"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field: { onChange, value } }) => (
//                   <AntSelect
//                     value={value}
//                     onChange={(val) => {
//                       const matched = drivers.find((d) => d.name === val);
//                       onChange(val);
//                       setValue("driver_contact", matched?.contact || "");
//                     }}
//                     allowClear
//                     style={{ width: "100%" }}
//                   >
//                     {drivers.map((d) => (
//                       <Option key={d.name} value={d.name}>
//                         {d.name}
//                       </Option>
//                     ))}
//                   </AntSelect>
//                 )}
//               />
//               {errors.driver_name && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//           </Row>
//           <Row gutter={16} className="mt-3">
//             <Col span={24}>
//               <label>ড্রাইভারের মোবাইল *</label>
//               <Input {...register("driver_contact", { required: true })} placeholder="ড্রাইভারের মোবাইল..." />
//               {errors.driver_contact && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//           </Row>

//           <Divider orientation="center">চলমান খরচ</Divider>
//           <Row gutter={16}>
//             <Col xs={24} md={8}>
//               <label>ড্রাইভারের কমিশন *</label>
//               <Input {...register("driver_percentage", { required: true })} type="number" />
//               {errors.driver_percentage && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={8}>
//               <label>তেলের মূল্য</label>
//               <Input {...register("fuel_price")} />
//             </Col>
//             <Col xs={24} md={8}>
//               <label>গ্যাসের মূল্য</label>
//               <Input {...register("gas_price")} />
//             </Col>
//           </Row>
//           <Row gutter={16} className="mt-3">
//             <Col xs={24} md={8}>
//               <label>অন্যান্য খরচ</label>
//               <Input {...register("other_expenses")} />
//             </Col>
//             <Col xs={24} md={8}>
//               <label>ওয়েটিং চার্জ *</label>
//               <Input {...register("demarage", { required: true })} type="number" />
//               {errors.demarage && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={8}>
//               <label>ট্রিপের খরচ</label>
//               <Input readOnly value={total} className="bg-gray-200 cursor-not-allowed" />
//             </Col>
//           </Row>

//           <Divider orientation="center">কাস্টমার এবং পেমেন্ট তথ্য</Divider>
//           <Row gutter={16}>
//             <Col xs={24} md={6}>
//               <label>কাস্টমারের নাম *</label>
//               <Input {...register("customer", { required: true })} />
//               {errors.customer && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={6}>
//               <label>কাস্টমারের মোবাইল *</label>
//               <Input {...register("customer_mobile", { required: true })} />
//               {errors.customer_mobile && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={6}>
//               <label>ট্রিপের ভাড়া *</label>
//               <Input {...register("trip_price", { required: true })} />
//               {errors.trip_price && <span className="text-red-600 text-sm">পূরণ করতে হবে</span>}
//             </Col>
//             <Col xs={24} md={6}>
//               <label>অগ্রিম পেমেন্ট</label>
//               <Input {...register("advance")} />
//             </Col>
//           </Row>

//           <div className="mt-6 text-left">
//             <BtnSubmit>সাবমিট করুন</BtnSubmit>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddTripForm;


import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Card,
  Button,
} from "antd";
import BtnSubmit from "../components/Button/BtnSubmit";
import {
  CarOutlined,
  SaveOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const AddTripForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const commision = parseFloat(watch("driver_percentage") || 0);
  const fuel = parseFloat(watch("fuel_price") || 0);
  const gas = parseFloat(watch("gas_price") || 0);
  const totalDamarage = parseFloat(watch("demarage") || 0);
  const other = parseFloat(watch("other_expenses") || 0);
  const total = commision + fuel + gas + totalDamarage + other;
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://api.dropshep.com/api/vehicle")
      .then((res) => res.json())
      .then((data) => setVehicles(data.data))
      .catch((err) => console.error(err));

    fetch("https://api.dropshep.com/api/driver")
      .then((res) => res.json())
      .then((data) => setDrivers(data.data))
      .catch((err) => console.error(err));
  }, []);

  const onFinish = async (values) => {
setLoading(true);
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const response = await axios.post("https://api.dropshep.com/api/trip", formData);
    const resData = response.data;

    if (resData.status === "success") {
      toast.success("ট্রিপ সফলভাবে সংরক্ষণ হয়েছে!");
      form.resetFields(); 
      navigate("/trip-list")
    } else {
      toast.error("সার্ভার ত্রুটি: " + (resData.message || "অজানা সমস্যা"));
    }
  } catch (error) {
    toast.error("সার্ভার ত্রুটি: " + (error?.response?.data?.message || error.message));
     setLoading(false);
  }
};

  return (
    <div className="mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="shadow">
        <Title level={4} className="text-left text-primary">
          <CarOutlined className="mr-2 text-primary" /> ট্রিপ যোগ করুন
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          {/* ট্রিপ এবং গন্তব্য সেকশন */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="তারিখ " name="trip_date" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="ট্রিপের সময় " name="trip_time" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="ট্রিপের সময়..." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="লোড পয়েন্ট " name="load_point" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="লোড পয়েন্ট..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="আনলোড পয়েন্ট " name="unload_point" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="আনলোড পয়েন্ট..." />
                </Form.Item>
              </Col>
            </Row>

          {/* গাড়ি এবং ড্রাইভারের তথ্য */}
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item label="গাড়ির নম্বর " name="vehicle_number" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Select placeholder="গাড়ির নম্বর নির্বাচন করুন">
                    {vehicles.map((v) => (
                      <Option key={v.registration_number} value={v.registration_number}>{v.registration_number}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="ড্রাইভারের নাম " name="driver_name" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Select
                    placeholder="ড্রাইভারের নাম নির্বাচন করুন"
                    onChange={(value) => {
                      form.setFieldsValue({ driver_name: value });
                      const driver = drivers.find((d) => d.name === value);
                      form.setFieldsValue({ driver_contact: driver?.contact || "" });
                    }}
                  >
                    {drivers.map((d) => (
                      <Option key={d.name} value={d.name}>{d.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="ড্রাইভারের মোবাইল " name="driver_contact" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="ড্রাইভারের মোবাইল..." />
                </Form.Item>
              </Col>
            </Row>

          {/* চলমান খরচ */}
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item label="ড্রাইভারের কমিশন " name="driver_percentage" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="কমিশন..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="তেলের মূল্য" name="fuel_price"> 
                  <Input placeholder="তেলের মূল্য..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="গ্যাসের মূল্য" name="gas_price"> 
                  <Input placeholder="গ্যাসের মূল্য..." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item label="অন্যান্য খরচ" name="other_expenses"> 
                  <Input placeholder="অন্যান্য খরচ..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="ওয়েটিং চার্জ " name="demarage" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="ওয়েটিং চার্জ..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="ট্রিপের খরচ"> 
                  <Input readOnly value={total} className="bg-gray-100 cursor-not-allowed" />
                </Form.Item>
              </Col>
            </Row>

          {/* কাস্টমার এবং পেমেন্ট তথ্য */}
            <Row gutter={16}>
              <Col xs={24} md={6}>
                <Form.Item label="কাস্টমারের নাম " name="customer" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="কাস্টমারের নাম..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item label="কাস্টমারের মোবাইল " name="customer_mobile" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="মোবাইল..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item label="ট্রিপের ভাড়া " name="trip_price" rules={[{ required: true, message: "পূরণ করতে হবে" }]}> 
                  <Input placeholder="ট্রিপের ভাড়া..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item label="অগ্রিম পেমেন্ট" name="advance"> 
                  <Input placeholder="অগ্রিম পেমেন্ট..." />
                </Form.Item>
              </Col>
            </Row>

          <Row style={{ marginTop: "32px" }}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="middel"
                // 
                className="!bg-primary w-full max-w-xs mx-auto"
              >
               সংরক্ষণ করুন
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddTripForm;
