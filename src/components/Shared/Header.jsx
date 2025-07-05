import React, { useState, useContext } from "react";
import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Header = ({ setMobileSidebarOpen }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle signout
  const handleSignout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
       <header className="h-18 border-b border-gray-200 bg-card flex items-center px-6">
            {/* <SidebarTrigger className="mr-4" /> */}
           <div className="flex-1">
  <h1 className="text-sm md:text-lg font-bold text-primary">ট্রান্সপোর্ট ম্যানেজমেন্ট সফটওয়্যার</h1>
  <p className="text-[8px] md:text-xs text-gray-500">পরিবর্তনশীল জগতে স্মার্ট সমাধান</p>
</div>

              {/* Admin Dropdown */}
        <div className="relative bg-white p-2 rounded-md flex gap-2 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            <img
              src={avatar}
              alt="Admin"
              className="w-8 rounded-2xl drop-shadow"
            />
            {/* <h3 className="font-semibold text-primary">
              {user?.data?.user?.role}
            </h3> */}
          </div>
          {isAdminOpen && (
            <div className="absolute right-0 top-14 w-52 bg-white drop-shadow p-5 rounded-md shadow-lg z-50">
              <p className="font-semibold text-primary">
                {user?.data?.user?.role}
              </p>
              <span className="text-sm text-gray-600">
                {user?.data?.user?.email}
              </span>
              <p className="text-sm text-gray-600">{user?.data?.user?.phone}</p>
              <p className="mt-4">
                <button
                  onClick={handleSignout}
                  className="text-red-500 font-medium hover:underline cursor-pointer"
                >
                  লগ আউট
                </button>
              </p>
            </div>
          )}
        </div>
          </header>
    </>
  );
};

export default Header;
