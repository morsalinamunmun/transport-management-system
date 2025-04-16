import React from "react";
import bgImage from "../../assets/bannerImg.jpeg";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ReusableForm from "./ReusableForm";

const Login = () => {
  const handleLogin = (data) => {
    console.log("Login Data:", data);
    // Add login logic here
  };

  return (
    <div className="px-40 py-8">
      <div className="border-2 border-primary rounded-xl flex justify-between">
        {/* img */}
        <div className="w-1/2">
          <img src={bgImage} alt="" className="w-fit h-fit rounded-l-lg" />
        </div>
        <div className="flex items-center justify-center w-1/2 bg-white shadow-lg rounded-xl p-8">
          <div className="">
            <h2 className="text-3xl font-extrabold text-center text-[#11375B] mb-1">
              এডমিন{" "}
              <span className="font-semibold text-red-500">Nalitabari</span>
            </h2>
            <p className="text-sm text-center text-primary mb-6">লগিন করুন</p>

            <ReusableForm onSubmit={handleLogin}>
              {/* Email / Mobile */}
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  placeholder="ইমেইল"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <span className="absolute right-3 top-2.5 text-gray-500">
                  <FaEnvelope />
                </span>
              </div>
              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="পাসওয়ার্ড"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                <span className="absolute right-3 top-2.5 text-gray-500">
                  <FaLock />
                </span>
              </div>
            </ReusableForm>

            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-[#11375B] underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
