import React, { useState } from "react";
import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import Sidebar from "../SIdeBar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const Header = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle signout
  const handleSignout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-5 py-2.5 border-b border-gray-300 relative z-50 bg-white">
      {/* Title */}
      <div className="flex items-center gap-3 cursor-pointer">
        <h3 className="text-primary" onClick={() => setMobileSidebarOpen(true)}>
          <FaBars />
        </h3>
        <Link to="/" className="font-semibold text-primary">
          Home
        </Link>
      </div>

      {/* Sidebar */}
      <div className="md:hidden">
        <Sidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
      </div>

      {/* Search */}
      <div className="hidden md:block relative">
        <input
          type="text"
          className="border border-gray-300 rounded-md outline-none w-96 h-9 px-5"
          placeholder="Search..."
        />
        <div className="absolute top-0 right-0 bg-primary py-2.5 w-10 flex items-center justify-center rounded-r-md text-white hover:bg-primary cursor-pointer">
          <FaMagnifyingGlass />
        </div>
      </div>

      {/* Admin */}
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
          <h3 className="font-semibold text-primary">Admin</h3>
        </div>

        {/* Dropdown */}
        {isAdminOpen && (
          <div className="absolute right-0 top-14 w-52 bg-white drop-shadow p-5 rounded-md shadow-lg z-50">
            <p className="font-semibold text-primary">Admin</p>
            <span className="text-sm text-gray-600">{user?.user?.email}</span>
            <p className="text-sm text-gray-600">{user?.user?.phone}</p>
            <p className="mt-4">
              <button
                onClick={handleSignout}
                className="text-red-500 font-medium hover:underline cursor-pointer"
              >
                Logout
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
