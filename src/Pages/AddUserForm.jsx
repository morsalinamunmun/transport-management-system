import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddUserForm = () => {
  // const dateRef = useRef(null);
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        ইউজার তৈরি করুন
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                নাম *
              </label>
              <input
                name="driverName"
                type="text"
                placeholder="নাম..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                মোবাইল *
              </label>
              <input
                name="driverMobile"
                type="text"
                placeholder="মোবাইল..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ইমেইল *
              </label>
              <input
                name="nidNumber"
                type="text"
                placeholder="ইমেইল..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                পাসওয়ার্ড
              </label>
              <input
                name="emergencyContact"
                type="text"
                placeholder="পাসওয়ার্ড..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                কনফার্ম পাসওয়ার্ড
              </label>
              <input
                name="address"
                type="text"
                placeholder="কনফার্ম পাসওয়ার্ড..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ইউজারের ধরন
              </label>
              <select
                name="status"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">ইউজারের ধরন নির্বাচন করুন</option>
                <option value="Active">ম্যানেজার</option>
                <option value="Inactive">সুপারভাইজার</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                স্ট্যাটাস
              </label>
              <select
                name="status"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">স্ট্যাটাস নির্বাচন করুন</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
        </ReusableForm>
      </div>
    </div>
  );
};

export default AddUserForm;
