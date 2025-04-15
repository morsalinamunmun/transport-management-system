import React, { useState } from "react";
import { FaTruck, FaPlus } from "react-icons/fa";
import ReusableForm from "../components/Form/ReusableForm.jsx";
import { IoMdClose } from "react-icons/io";

const Parts = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <main className="relative bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            পার্টসের তালিকা
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilter(true)}
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaPlus /> পার্টস
            </button>
          </div>
        </div>

        {/* Export + Search */}
        <div className="flex justify-between items-center">
          <div className="flex bg-gray-200 text-primary font-semibold rounded-md">
            {["CSV", "Excel", "PDF", "Print"].map((format) => (
              <button
                key={format}
                className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                {format}
              </button>
            ))}
          </div>
          <div>
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              placeholder=""
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">তারিখ</th>
                <th className="px-4 py-3">ড্রাইভার ইনফো</th>
                <th className="px-4 py-3">ট্রিপ এবং গন্তব্য</th>
                <th className="px-4 py-3">চলমান খরচ</th>
                <th className="px-4 py-3">নির্ধারিত খরচ</th>
                <th className="px-4 py-3">টোটাল ফলাফল</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-4 font-bold">1</td>
                <td className="px-4 py-4">Jamal</td>
                <td className="px-4 py-4">0165241524</td>
                <td className="px-4 py-4">Freezer Van</td>
                <td className="px-4 py-4">Baddha</td>
                <td className="px-4 py-4">2</td>
                <td className="px-4 py-4">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-2 right-2 text-white bg-primary rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl font-semibold text-[#11375B] mb-4">
              পার্টস যোগ করুন
            </h2>

            {/* ReusableForm Integration */}
            <ReusableForm
              onSubmit={(data) => {
                console.log("Form Submitted:", data);
                setShowFilter(false);
              }}
            >
              <div className="mb-4">
                <div className="w-full relative">
                  <label className="text-primary text-sm font-semibold">
                    পার্টসের নাম
                  </label>
                  <input
                    name="partsName"
                    type="text"
                    placeholder="পার্টসের নাম..."
                    className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full relative">
                  <label className="text-primary text-sm font-semibold">
                    পার্টসের ভ্যালিডিটি
                  </label>
                  <input
                    name="partsValidity"
                    type="text"
                    data-datepicker
                    placeholder="তারিখ নির্বাচন করুন..."
                    className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                  />
                </div>
              </div>
            </ReusableForm>
          </div>
        </div>
      )}
    </main>
  );
};

export default Parts;
