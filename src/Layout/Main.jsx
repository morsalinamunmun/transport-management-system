import React from "react";
import { Outlet } from "react-router-dom";
import SIdeBar from "../components/SIdeBar";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";

const Main = () => {
  return (
    <div className="flex">
      {/* Sidebar stays fixed on all routes */}
      <div className="bg-gray-200 w-64">
        <SIdeBar />
      </div>

      {/* Main content (changes via routing) */}
      <div className="flex-1">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
