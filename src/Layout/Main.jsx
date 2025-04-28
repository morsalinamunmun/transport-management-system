import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SIdeBar from "../components/SIdeBar";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";

const Main = () => {
  const location = useLocation();
  const hideMenu =
    location.pathname.includes("/Login") ||
    location.pathname.includes("/ResetPass");

  if (hideMenu) {
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen fixed bg-white border-r">
        <SIdeBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
