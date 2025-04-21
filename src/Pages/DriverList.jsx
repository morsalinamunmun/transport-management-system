import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTruck, FaPlus, FaPen, FaEye, FaTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
const CarList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  // delete modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/api/driver")
      .then((response) => {
        if (response.data.status === "success") {
          setDrivers(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading drivers...</p>;

  console.log(drivers);
  // delete by id
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://api.dropshep.com/api/driver/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete driver");
      }
      // Remove driver from local list
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
      toast.success("ড্রাইভার সফলভাবে ডিলিট হয়েছে", {
        position: "top-right",
        autoClose: 3000,
      });

      setIsOpen(false);
      setSelectedDriverId(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("ডিলিট করতে সমস্যা হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            ড্রাইভারের তালিকা
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/AddDriverForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> ড্রাইভার
              </button>
            </Link>
          </div>
        </div>
        {/* export */}
        <div className="md:flex justify-between items-center">
          <div className="flex bg-gray-200 text-primary font-semibold rounded-md">
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              CSV
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Excel
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              PDF
            </button>
            <button className="py-2 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Print
            </button>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              placeholder="ড্রাইভারের নাম দিয়ে খুজুন..."
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">নাম</th>
                <th className="px-2 py-3">মোবাইল</th>
                <th className="px-2 py-3">ঠিকানা</th>
                <th className="px-2 py-3">জরুরি অবস্থা</th>
                <th className="px-2 py-3">লাইসেন্স</th>
                <th className="px-2 py-3">লা.মেয়াদোত্তীর্ণ</th>
                <th className="px-2 py-3">স্ট্যাটাস</th>
                <th className="px-2 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {drivers?.map((driver, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-2 py-4 font-bold">{index + 1}</td>
                  <td className="px-2 py-4">{driver.name}</td>
                  <td className="px-2 py-4">{driver.contact}</td>
                  <td className="px-2 py-4">{driver.address}</td>
                  <td className="px-2 py-4">{driver.emergency_contact}</td>
                  <td className="px-2 py-4">{driver.license}</td>
                  <td className="px-2 py-4">{driver.expire_date}</td>
                  <td className="px-2 py-4">{driver.status}</td>
                  <td className="px-2">
                    <div className="flex gap-2">
                      <button className="text-primary bg-green-50 border border-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaPen className="text-[12px]" />
                      </button>
                      <button className="text-primary bg-blue-50 border border-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaEye className="text-[12px]" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDriverId(driver.id);
                          setIsOpen(true);
                        }}
                        className="text-red-900 bg-red-50 border border-red-700 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                      >
                        <FaTrashAlt className="text-[12px]" />
                      </button>
                    </div>
                    <Toaster />
                  </td>
                  {/* Delete modal */}
                  <td className="flex justify-center items-center">
                    {isOpen && (
                      <div className="fixed left-[25%] top-[25%] flex items-center justify-center z-50">
                        <div className="relative bg-white rounded-lg shadow-lg p-6 w-72 max-w-sm border border-gray-300">
                          <button
                            onClick={toggleModal}
                            className="text-2xl absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 cursor-pointer rounded-sm"
                          >
                            <IoMdClose />
                          </button>
                          <div className="flex justify-center mb-4 text-red-500 text-4xl">
                            <FaTrashAlt />
                          </div>
                          <p className="text-center text-gray-700 font-medium mb-6">
                            আপনি কি ড্রাইভারটি ডিলিট করতে চান?
                          </p>
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={toggleModal}
                              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
                            >
                              না
                            </button>
                            <button
                              onClick={() => handleDelete(selectedDriverId)}
                              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                            >
                              হা
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-4xl p-5 bg-gray-100 mt-10">
            <h3 className="text-primary font-semibold">ড্রাইভারের তথ্য</h3>
            <div className="mt-5">
              <ul className="flex border border-gray-300">
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
                  <p className="w-48">Name</p> <p>Korim Ali</p>
                </li>
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
                  <p className="w-48">Mobile</p> <p>01755555555</p>
                </li>
              </ul>
              <ul className="flex border-b border-r border-l border-gray-300">
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
                  <p className="w-48">Emergency Contact</p> <p>01755555555</p>
                </li>
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
                  <p className="w-48">Address</p> <p>Niketon</p>
                </li>
              </ul>
              <ul className="flex border-b border-r border-l border-gray-300">
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
                  <p className="w-48">NID</p> <p>2451365242</p>
                </li>
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
                  <p className="w-48">Licence No.</p> <p>DH54216584521</p>
                </li>
              </ul>
              <ul className="flex border-b border-r border-l border-gray-300">
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
                  <p className="w-48">Licence Expire</p> <p>18-11-2027</p>
                </li>
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
                  <p className="w-48">Note</p> <p>Gentleman</p>
                </li>
              </ul>
              <ul className="flex border-b border-r border-l border-gray-300">
                <li className="w-[428px] flex text-primary font-semibold px-3 py-2 border-r border-gray-300">
                  <p className="w-48">Status</p> <p>Active</p>
                </li>
                {/* <li className="w-[428px] flex text-primary font-semibold px-3 py-2">
                  <p className="w-48">Note</p> <p>Gentleman</p>
                </li> */}
              </ul>
              <div className="flex justify-end mt-10">
                <button className="text-white bg-primary py-1 px-2 rounded-md">
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarList;
