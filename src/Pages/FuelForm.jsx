import axios from "axios";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineArrowDropDown } from "react-icons/md";

const FuelForm = () => {
  const fuelDateRef = useRef(null);

  const { register, handleSubmit, reset, watch } = useForm();
  const quantity = parseFloat(watch("quantity") || 0);
  const price = parseFloat(watch("price") || 0);
  const total = quantity * price;
  const onSubmit = async (data) => {
    console.log("add fuel data", data);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/fuel",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("ফুয়েল সফলভাবে সংরক্ষণ হয়েছে!", {
          position: "top-right",
        });
        reset();
      } else {
        toast.error("সার্ভার ত্রুটি: " + (resData.message || "অজানা সমস্যা"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("সার্ভার ত্রুটি: " + errorMessage);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        ফুয়েল ফর্ম
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toaster position="top-center" reverseOrder={false} />
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                তারিখ
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("date_time")}
                  ref={(e) => {
                    register("date_time").ref(e);
                    fuelDateRef.current = e;
                  }}
                  className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                />
                <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                  <FiCalendar
                    className="text-white cursor-pointer"
                    onClick={() => fuelDateRef.current?.showPicker?.()}
                  />
                </span>
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                গাড়ির নাম্বার
              </label>
              <select
                {...register("vehicle_number", { required: true })}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">গাড়ির নাম্বার</option>
                <option value="Dhaka metro">Dhaka metro</option>
                <option value="Dhaka metro">Dhaka metro</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের নাম
              </label>
              <select
                {...register("driver_name", { required: true })}
                name="driver_name"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">ড্রাইভারের নাম</option>
                <option value="Korim">Korim</option>
                <option value="Korim">Korim</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                ট্রিপ আইডি / ইনভয়েস নাম্বার
              </label>
              <input
                {...register("trip_id_invoice_no", { required: true })}
                type="text"
                placeholder="ট্রিপ আইডি / ইনভয়েস নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                পাম্পের নাম ও ঠিকানা
              </label>
              <input
                {...register("pump_name_address", { required: true })}
                type="text"
                placeholder="পাম্পের নাম ও ঠিকানা..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ফুয়েল ক্যাপাসিটি
              </label>
              <input
                {...register("capacity", { required: true })}
                type="text"
                placeholder="ফুয়েল ক্যাপাসিটি..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                তেলের ধরন
              </label>
              <select
                {...register("type", { required: true })}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">তেলের ধরন</option>
                <option value="Octen">Octen</option>
                <option value="Gas">Gas</option>
                <option value="Petroll">Petroll</option>
                <option value="Diesel">Diesel</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                তেলের পরিমাণ
              </label>
              <div className="relative">
                <input
                  {...register("quantity", { required: true })}
                  type="text"
                  placeholder="তেলের পরিমাণ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                প্রতি লিটারের দাম
              </label>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="প্রতি লিটারের দাম..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                মোট টাকা
              </label>
              <input
                readOnly
                {...register("total_price", { required: true })}
                type="text"
                value={total}
                placeholder="মোট টাকা..."
                className="cursor-not-allowed mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-left">
            <button
              type="submit"
              className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-secondary cursor-pointer"
            >
              সাবমিট করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuelForm;
