// import React, { useContext } from "react";
// import bgImage from "../../assets/bus-login-image.jpg";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import ReusableForm from "./ReusableForm";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (data) => {
//     const { email, password } = data;
//     const result = await login(email, password);

//     if (result.success) {
//       navigate("/tramessy");
//     } else {
//       alert(result.message || "Login failed");
//     }
//   };

//   return (
//     <div className="md:px-40 h-screen flex items-center justify-center">
//       <div className="md:border-2 border-primary rounded-xl md:flex md:flex-col lg:flex-row justify-between">
//         {/* img */}
//         <div className="hidden md:block md:w-1/2 h-[28rem] mt-10 md:mt-0">
//           <img src={bgImage} alt="" className="rounded-lg md:rounded-l-lg h-full" />
//         </div>
//         {/* form */}
//         <div className="flex items-center justify-center md:w-1/2 bg-white rounded-xl py-7 md:p-8">
//           <div className="bg-white shadow-lg p-5 md:p-7 rounded-md border md:border-none border-gray-200">
//             <h2 className="text-3xl font-extrabold text-center text-[#11375B] mb-1">
//               এডমিন{" "}
//               <span className="font-semibold text-red-500">Parkline Travels Limited</span>
//             </h2>
//             <p className="text-sm text-center text-primary mb-6">লগিন করুন</p>

//             <ReusableForm onSubmit={handleLogin}>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="ইমেইল"
//                   className="w-full md:w-80 text-sm px-4 py-2 border border-gray-300 rounded-md outline-none"
//                   required
//                 />
//                 <span className="absolute right-0 bg-primary text-white px-4 py-[11px] rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
//                   <FaEnvelope />
//                 </span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="পাসওয়ার্ড"
//                   className="w-full md:w-80 text-sm px-4 py-2 border border-gray-300 rounded-md outline-none"
//                   required
//                 />
//                 <span className="absolute right-0 bg-primary text-white px-4 py-[11px] rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
//                   <FaLock />
//                 </span>
//               </div>
//             </ReusableForm>

//             <div className="mt-4 text-center">
//               <Link to="/ResetPass">
//                 <span className="text-sm text-[#11375B] underline hover:text-red-500 transition-all duration-700">
//                   পাসওয়ার্ড ভুলে গেছেন?
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext } from "react";
import bgImage from "../../assets/parkline-login.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ReusableForm from "./ReusableForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const result = await login(email, password);

    if (result.success) {
      navigate("/tramessy");
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-10 lg:px-20 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={bgImage}
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#11375B] mb-1">
              এডমিন{" "}
              <span className="font-semibold text-red-500">Parkline Travels Limited</span>
            </h2>
            <p className="text-sm text-center text-primary mb-6">লগিন করুন</p>

            <ReusableForm onSubmit={handleLogin}>
              <div className="relative mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="ইমেইল"
                  className="w-full text-sm px-4 py-2 pr-10 border border-gray-300 rounded-md outline-none"
                  required
                />
                <span className="absolute top-0 right-0 h-full flex items-center justify-center bg-primary text-white px-4 rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
                  <FaEnvelope />
                </span>
              </div>
              <div className="relative mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="পাসওয়ার্ড"
                  className="w-full text-sm px-4 py-2 pr-10 border border-gray-300 rounded-md outline-none"
                  required
                />
                <span className="absolute top-0 right-0 h-full flex items-center justify-center bg-primary text-white px-4 rounded-r-md hover:bg-secondary transition-all duration-500 cursor-pointer">
                  <FaLock />
                </span>
              </div>
            </ReusableForm>

            <div className="mt-4 text-center">
              <Link to="/ResetPass">
                <span className="text-sm text-[#11375B] underline hover:text-red-500 transition-all duration-700">
                  পাসওয়ার্ড ভুলে গেছেন?
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
