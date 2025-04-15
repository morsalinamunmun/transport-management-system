import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const MaintenanceForm = () => {
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        মেইনটেনেন্স ফর্ম
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                মেইনটেনেন্স ও সময় *
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="maintenanceDate"
                  type="text"
                  placeholder="মেইনটেনেন্স ও সময়..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                সার্ভিসের ধরন
              </label>
              <select
                name="serviceQuality"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">সার্ভিসের ধরন</option>
                <option value="Maintenance">Maintenance</option>
                <option value="General">General</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                পার্টস এন্ড স্পায়ারস
              </label>
              <select
                name="spare&parts"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">পার্টস এন্ড স্পায়ারস</option>
                <option value="EngineOil">Engine Oil</option>
                <option value="Pistons">Pistons</option>
                <option value="ABS_Sensors">ABS Sensors</option>
                <option value="BrakeDrum">Brake Drum</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                মেইনটেনেসের ধরন
              </label>
              <select
                name="maintenanceType&parts"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">মেইনটেনেসের ধরন</option>
                <option value="EngineOil">Engine Oil</option>
                <option value="Pistons">Pistons</option>
                <option value="ABS_Sensors">ABS Sensors</option>
                <option value="BrakeDrum">Brake Drum</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">খরচ</label>
              <input
                name="খরচ"
                type="text"
                placeholder="খরচ ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                গাড়ির নাম্বার
              </label>
              <input
                name="carNumber"
                type="text"
                placeholder="গাড়ির নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                চার্জ বাই
              </label>
              <input
                name="charge"
                type="text"
                placeholder="চার্জ বাই..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                সর্বমোট খরচ
              </label>
              <div className="relative">
                <input
                  name="totalExpenses"
                  type="text"
                  placeholder="সর্বমোট খরচ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                মর্যাদা
              </label>
              <select
                name="priority"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">মর্যাদা...</option>
                <option value="EngineOil">Engine Oil</option>
                <option value="Pistons">Pistons</option>
                <option value="ABS_Sensors">ABS Sensors</option>
                <option value="BrakeDrum">Brake Drum</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                সার্ভিস ফর
              </label>
              <select
                name="serviceFor"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">সার্ভিস ফর...</option>
                <option value="EngineOil">Engine Oil</option>
                <option value="Pistons">Pistons</option>
                <option value="ABS_Sensors">ABS Sensors</option>
                <option value="BrakeDrum">Brake Drum</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default MaintenanceForm;
