import React from "react";
import ReusableForm from "../components/Form/ReusableForm";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import axios from "axios";
// import axios from "axios";

const AddDriverForm = () => {
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log("formData", formData);
      for (const key in data) {
        if (key === "license_image") {
          formData.append("license_image", data.license_image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.post(
        "https://api.dropshep.com/api/driver",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      // reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        ড্রাইভার তৈরি করুন
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <ReusableForm onSubmit={handleSubmit}>
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের নাম *
              </label>
              <input
                // {...register("name")}
                name="name"
                type="text"
                placeholder="ড্রাইভারের নাম..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="mt-2 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                ড্রাইভারের মোবাইল *
              </label>
              <input
                // {...register("contact")}
                name="contact"
                type="text"
                placeholder="ড্রাইভারের মোবাইল..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ন.আই.ডি নাম্বার *
              </label>
              <input
                // {...register("nid")}
                name="nid"
                type="number"
                placeholder="ন.আই.ডি নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="mt-2 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                জরুরী যোগাযোগ
              </label>
              <input
                // {...register("emergency_contact")}
                name="emergency_contact"
                type="text"
                placeholder="জরুরী যোগাযোগ নাম্বার..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                ঠিকানা *
              </label>
              <input
                // {...register("address")}
                name="address"
                type="text"
                placeholder="ঠিকানা..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="mt-2 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                বিঃদ্রঃ
              </label>
              <input
                // {...register("note")}
                name="note"
                type="text"
                placeholder="বিঃদ্রঃ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                লাইসেন্স না. *
              </label>
              <input
                // {...register("license")}
                name="license"
                type="text"
                placeholder="লাইসেন্স না. ..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                মেয়াদোত্তীর্ণ তারিখ *
              </label>
              <div className="relative">
                <input
                  // {...register("expire_date")}
                  data-datepicker
                  name="expire_date"
                  type="text"
                  placeholder="মেয়াদোত্তীর্ণ তারিখ..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                স্ট্যাটাস *
              </label>
              <select
                // {...register("status")}
                name="status"
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">স্ট্যাটাস নির্বাচন করুন</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="mt-3 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                লাইসেন্সের ছবি যুক্ত করুন
              </label>
              <div className="relative mt-1">
                <input
                  // {...register("license_image")}
                  // type="file"
                  type="text"
                  name="license_image"
                  // accept="image/*"
                  className="border p-2 rounded"
                />
              </div>
            </div>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AddDriverForm;
