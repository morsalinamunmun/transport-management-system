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
    <div className="px-40 h-screen flex items-center justify-center">
      <div className="border-2 border-primary rounded-xl flex justify-between">
        {/* img */}
        <div className="w-1/2">
          <img src={bgImage} alt="" className="rounded-l-lg" />
        </div>
        {/* form */}
        <div className="flex items-center justify-center w-1/2 bg-white shadow-lg rounded-xl p-8">
          <div className="bg-white shadow-lg p-7 rounded-md">
            <h2 className="text-3xl font-extrabold text-center text-[#11375B] mb-1">
              এডমিন{" "}
              <span className="font-semibold text-red-500">Nalitabari</span>
            </h2>
            <p className="text-sm text-center text-primary mb-6">লগিন করুন</p>

            <ReusableForm onSubmit={handleLogin}>
              {/* Email */}
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  placeholder="ইমেইল"
                  className="md:w-80 text-sm px-4 py-2 border border-primary rounded-md outline-none"
                  required
                />
                <span className="absolute right-0 bg-primary text-white px-4 py-[11px] rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
                  <FaEnvelope />
                </span>
              </div>
              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="পাসওয়ার্ড"
                  className="md:w-80 text-sm px-4 py-2 border border-primary rounded-md outline-none"
                  required
                />
                <span className="absolute right-0 bg-primary text-white px-4 py-[11px] rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
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
