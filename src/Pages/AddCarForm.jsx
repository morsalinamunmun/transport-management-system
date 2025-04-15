import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddCarForm = () => {
  // const dateRef = useRef(null);
  const handleSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        গাড়ির তথ্য যোগ করুন
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                গাড়ির নাম
              </label>
              <input
                name="carName"
                type="text"
                placeholder="গাড়ির নাম..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের নাম
              </label>
              <select
                name="driverName"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">ড্রাইভারের নাম...</option>
                <option value="Motin Ali">Motin Ali</option>
                <option value="Korim Ali">Korim Ali</option>
                <option value="Solaiman Ali">Solaiman Ali</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                গাড়ির ধরন
              </label>
              <select
                name="carCategory"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">গাড়ির ধরন...</option>
                <option value="Truck">ট্রাক</option>
                <option value="Pickup">পিকআপ</option>
                <option value="Covered Van">কভার্ড ভ্যান</option>
                <option value="Trailer">ট্রেইলর</option>
                <option value="Fridge Van">ফ্রিজার ভ্যান</option>
                <option value="Car">কার</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                গাড়ির সাইজ
              </label>
              <select
                name="carSize"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">গাড়ির সাইজ...</option>
                <option value="7 Feet">7 Feet</option>
                <option value="9 Feet">9 Feet</option>
                <option value="12 Feet">12 Feet</option>
                <option value="14 Feet">14 Feet</option>
                <option value="16 Feet">16 Feet</option>
                <option value="18 Feet">18 Feet</option>
                <option value="20 Feet">20 Feet</option>
                <option value="23 Feet">23 Feet</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                রেজিস্ট্রেশন নাম্বার
              </label>
              <select
                name="registrationNumber"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">রেজিস্ট্রেশন নাম্বার...</option>
                <option value="Dhaka Metro">ঢাকা মেট্রো</option>
                <option value="Chatto Metro">চট্ট মেট্রো</option>
                <option value="Sylhet Metro">সিলেট মেট্রো</option>
                <option value="Rajshahi Metro">রাজশাহী মেট্রো</option>
                <option value="Khulna Metro">খুলনা মেট্রো</option>
                <option value="Rangpur Metro">রংপুর মেট্রো</option>
                <option value="Barisal Metro">বরিশাল মেট্রো</option>

                <option value="Dhaka">ঢাকা</option>
                <option value="Narayanganj">নারায়ণগঞ্জ</option>
                <option value="Gazipur">গাজীপুর</option>
                <option value="Tangail">টাঙ্গাইল</option>
                <option value="Manikgonj">মানিকগঞ্জ</option>
                <option value="Munshigonj">মুন্সিগঞ্জ</option>
                <option value="Faridpur">ফরিদপুর</option>
                <option value="Rajbari">রাজবাড়ী</option>
                <option value="Narsingdi">নরসিংদী</option>
                <option value="Kishorgonj">কিশোরগঞ্জ</option>
                <option value="Shariatpur">শরীয়তপুর</option>
                <option value="Gopalgonj">গোপালগঞ্জ</option>
                <option value="Madaripur">মাদারীপুর</option>

                <option value="Chattogram">চট্টগ্রাম</option>
                <option value="Cumilla">কুমিল্লা</option>
                <option value="Feni">ফেনী</option>
                <option value="Brahmanbaria">ব্রাহ্মণবাড়িয়া</option>
                <option value="Noakhali">নোয়াখালী</option>
                <option value="Chandpur">চাঁদপুর</option>
                <option value="Lokkhipur">লক্ষ্মীপুর</option>
                <option value="Bandarban">বান্দরবন</option>
                <option value="Rangamati">রাঙ্গামাটি</option>
                <option value="CoxsBazar">কক্সবাজার</option>
                <option value="Khagrasori">খাগড়াছড়ি</option>

                <option value="Barisal">বরিশাল</option>
                <option value="Barguna">বরগুনা</option>
                <option value="Bhola">ভোলা</option>
                <option value="Patuakhali">পটুয়াখালী</option>
                <option value="Pirojpur">পিরোজপুর</option>
                <option value="Jhalokati">ঝালোকাঠি</option>

                <option value="Khulna">খুলনা</option>
                <option value="Kustia">কুষ্টিয়া</option>
                <option value="Jashore">যশোর</option>
                <option value="Chuadanga">চুয়াডাঙ্গা</option>
                <option value="Satkhira">সাতক্ষীরা</option>
                <option value="Bagerhat">বাগেরহাট</option>
                <option value="Meherpur">মেহেরপুর</option>
                <option value="Jhenaidah">ঝিনাইদাহ</option>
                <option value="Norail">নড়াইল</option>
                <option value="Magura">মাগুরা</option>

                <option value="Rangpur">রংপুর</option>
                <option value="Ponchogor">পঞ্চগড়</option>
                <option value="Thakurgaon">ঠাকুরগাও</option>
                <option value="Kurigram">কুড়িগ্রাম</option>
                <option value="Dinajpur">দিনাজপুর</option>
                <option value="Nilfamari">নীলফামারী</option>
                <option value="Lalmonirhat">লালমনিরহাট</option>
                <option value="Gaibandha">গাইবান্দা</option>

                <option value="Rajshahi">রাজশাহী</option>
                <option value="Pabna">পাবনা</option>
                <option value="Bagura">বগুড়া</option>
                <option value="Joypurhat">জয়পুরহাট</option>
                <option value="Nouga">নওগাঁ</option>
                <option value="Natore">নাটোর</option>
                <option value="Sirajgonj">সিরাজগঞ্জ</option>
                <option value="Chapainawabganj">চাপাইনবাবগঞ্জ</option>

                <option value="Sylhet">সিলেট</option>
                <option value="Habiganj">হবিগঞ্জ</option>
                <option value="Moulvibazar">মৌলভীবাজার</option>
                <option value="Sunamgonj">সুনামগঞ্জ</option>

                <option value="Mymensingh">ময়মনসিংহ</option>
                <option value="Netrokona">নেত্রকোনা</option>
                <option value="Jamalpur">জামালপুর</option>
                <option value="Sherpur">শেরপুর</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>

            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                রেজিস্ট্রেশন সিরিয়াল
              </label>
              <select
                name="serial"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
                // defaultValue=""
              >
                <option value="">রেজিস্ট্রেশন সিরিয়াল...</option>
                <option value="Ta">ট</option>
                <option value="Tha">ঠ</option>
                <option value="Da">ড</option>
                <option value="Dha">ঢ</option>
                <option value="Na">ন</option>
                <option value="M">ম</option>
                <option value="Sh">শ</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                রেজিস্ট্রেশন এলাকা
              </label>
              <input
                name="registrationArea"
                type="text"
                placeholder="রেজিস্ট্রেশন এলাকা..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                রেজিস্ট্রেশন তারিখ
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="registrationDate"
                  type="text"
                  placeholder="রেজিস্ট্রেশন তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                ট্যাক্স তারিখ
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="taxDate"
                  type="text"
                  placeholder="ট্যাক্স তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                রোড পারমিট তারিখ
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="roadPermit"
                  type="text"
                  placeholder="রোড পারমিট তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                ফিটনেস তারিখ
              </label>
              <div className="relative">
                <input
                  data-datepicker
                  name="fitnessDate"
                  type="text"
                  placeholder="ফিটনেস তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AddCarForm;
