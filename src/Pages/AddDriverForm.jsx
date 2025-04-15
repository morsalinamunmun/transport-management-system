import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddDriverForm = () => {
  // const dateRef = useRef(null);
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        ড্রাইভার যোগ করুন
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের নাম *
              </label>
              <input
                name="driverName"
                type="text"
                placeholder="ড্রাইভারের নাম..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের মোবাইল *
              </label>
              <input
                name="driverMobile"
                type="text"
                placeholder="ড্রাইভারের মোবাইল..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ন.আই.ডি নাম্বার *
              </label>
              <input
                name="nidNumber"
                type="text"
                placeholder="ন.আই.ডি নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                জরুরী যোগাযোগ
              </label>
              <input
                name="emergencyContact"
                type="text"
                placeholder="জরুরী যোগাযোগ নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ঠিকানা *
              </label>
              <input
                name="address"
                type="text"
                placeholder="ঠিকানা..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                বিঃদ্রঃ
              </label>
              <input
                name="note"
                type="text"
                placeholder="বিঃদ্রঃ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                লাইসেন্স না. *
              </label>
              <input
                name="licence"
                type="text"
                placeholder="লাইসেন্স না. ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                মেয়াদোত্তীর্ণ তারিখ *
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="expiredDate"
                  type="text"
                  placeholder="মেয়াদোত্তীর্ণ তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                অবস্থা *
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
        </ReusableForm>
      </div>
    </div>
  );
};

export default AddDriverForm;
