import axios from "axios";
import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddTripForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const tripDateRef = useRef(null);
  const fuel = parseFloat(watch("fuel_price") || 0);
  const gas = parseFloat(watch("gas_price") || 0);
  const totalDamarage = parseFloat(watch("damarage") || 0);
  const other = parseFloat(watch("other_expenses") || 0);
  const total = fuel + gas + totalDamarage + other;
  console.log("total", total);
  const onSubmit = async (data) => {
    console.log("add car data", data);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/trip",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "success") {
        toast.success("ট্রিপ সফলভাবে সংরক্ষণ হয়েছে!", {
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
        ট্রিপ যোগ করুন
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toaster position="top-center" reverseOrder={false} />
          {/*  */}
          <div className="border border-gray-300 p-3 md:p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center md:pb-5">
              <span className="py-2 border-b-2 border-primary">
                ট্রিপ এবং গন্তব্য সেকশন
              </span>
            </h5>
            <div className="mt-5 md:mt-0 md:flex justify-between gap-3">
              <div className="w-full">
                <label className="text-primary text-sm font-semibold">
                  তারিখ *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("trip_date", { required: true })}
                    ref={(e) => {
                      register("trip_date").ref(e);
                      tripDateRef.current = e;
                    }}
                    className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                  />
                  {errors.trip_date && (
                    <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                  )}
                  <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                    <FiCalendar
                      className="text-white cursor-pointer"
                      onClick={() => tripDateRef.current?.showPicker?.()}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  ট্রিপের সময়
                </label>
                <input
                  {...register("trip_time", { required: true })}
                  type="text"
                  placeholder="ট্রিপের সময়..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.trip_time && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
            </div>
            {/*  */}
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  লোড পয়েন্ট
                </label>
                <input
                  {...register("load_point", { required: true })}
                  type="text"
                  placeholder="লোড পয়েন্ট..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.load_point && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  আনলোড পয়েন্ট
                </label>
                <input
                  {...register("unload_point", { required: true })}
                  type="text"
                  placeholder="আনলোড পয়েন্ট..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.unload_point && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                গাড়ি এবং ড্রাইভারের তথ্য
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  গাড়ির নম্বর
                </label>
                <select
                  {...register("vehicle_number", { required: true })}
                  className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                >
                  <option value="">গাড়ির নম্বর</option>
                  <option value="Dhama metro-1">Dhama metro-1</option>
                  <option value="Dhama metro-2">Dhama metro-2</option>
                </select>
                {errors.vehicle_number && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
              <div className="w-full relative">
                <label className="text-primary text-sm font-semibold">
                  ড্রাইভারের নাম
                </label>
                <select
                  {...register("driver_name", { required: true })}
                  className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                >
                  <option value="">ড্রাইভারের নাম</option>
                  <option value="Motin">Motin</option>
                  <option value="Korim">Korim</option>
                </select>
                {errors.driver_name && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  ড্রাইভারের মোবাইল
                </label>
                <input
                  {...register("driver_contact", { required: true })}
                  type="number"
                  placeholder="ড্রাইভারের মোবাইল..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.driver_contact && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  ড্রাইভারের কমিশন
                </label>
                <input
                  {...register("driver_percentage")}
                  type="number"
                  placeholder="ড্রাইভারের কমিশন..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">চলমান খরচ</span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <label className="text-primary text-sm font-semibold">
                  তেলের মূল্য
                </label>
                <input
                  {...register("fuel_price")}
                  type="text"
                  placeholder="তেলের মূল্য..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  গ্যাসের মূল্য
                </label>
                <input
                  {...register("gas_price")}
                  type="text"
                  placeholder="গ্যাসের মূল্য..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  অন্যান্য খরচ
                </label>
                <input
                  {...register("other_expenses")}
                  type="text"
                  placeholder="অন্যান্য খরচ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  জরিমানা
                </label>
                <input
                  {...register("damarage")}
                  type="number"
                  placeholder="জরিমানা..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
              <div className="w-full">
                <label className="text-primary text-sm font-semibold">
                  ট্রিপের খরচ
                </label>
                <input
                  readOnly
                  value={total}
                  placeholder="ট্রিপের খরচ..."
                  className="cursor-not-allowed mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                কাস্টমার এবং পেমেন্ট তথ্য
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  কাস্টমারের নাম
                </label>
                <input
                  {...register("customer_name", { required: true })}
                  type="text"
                  placeholder="কাস্টমারের নাম..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.customer_name && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  ট্রিপের ভাড়া
                </label>
                <input
                  {...register("trip_price", { required: true })}
                  type="text"
                  placeholder="ট্রিপের ভাড়া..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.trip_price && (
                  <span className="text-red-600 text-sm">পূরণ করতে হবে</span>
                )}
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  অগ্রিম পেমেন্ট
                </label>
                <input
                  {...register("advance_payment", { required: true })}
                  type="text"
                  placeholder="অন্যান্য খরচ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
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

export default AddTripForm;
