import React from "react";
import { Outlet } from "react-router-dom";
import SIdeBar from "../components/SIdeBar";

const Main = () => {
  return (
    <div className="flex gap-10">
      {/* Sidebar stays fixed on all routes */}
      <div className="w-80 bg-gray-200 min-h-screen">
        <SIdeBar />
      </div>

      {/* Main content (changes via routing) */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
