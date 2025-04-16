import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SIdeBar from "../components/SIdeBar";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";

const Main = () => {
  const location = useLocation();
  const hideMenu = location.pathname.includes("/Login");
  return (
    <div className="flex">
      {/* Sidebar stays fixed on all routes */}
      {hideMenu || (
        <div className="bg-gray-200 w-64">{hideMenu || <SIdeBar />}</div>
      )}

      {/* Main content (changes via routing) */}
      <div className="flex-1">
        {hideMenu || <Header />}
        <Outlet />
        {hideMenu || <Footer />}
      </div>
    </div>
  );
};

export default Main;
