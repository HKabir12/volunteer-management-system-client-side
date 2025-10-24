import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto  ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
