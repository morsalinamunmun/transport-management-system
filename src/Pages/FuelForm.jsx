import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const FuelForm = () => {
  // const dateRef = useRef(null);
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        ফুয়েল ফর্ম
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                তারিখ
              </label>
              <input
                data-datepicker
                name="taxDate"
                type="text"
                placeholder="তারিখ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                গাড়ির নাম্বার
              </label>
              <select
                name="carNumber"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">গাড়ির নাম্বার</option>
                <option value="Active">Dhaka metro</option>
                <option value="Active">Dhaka metro</option>
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
                name="driverName"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
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
                name="tripId"
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
                name="pampAddress"
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
                name="fuelCapacity"
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
                name="fuel"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
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
                  name="expiredDate"
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
                name="perLitterTk"
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
                name="totalTaka"
                type="text"
                placeholder="মোট টাকা..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default FuelForm;
