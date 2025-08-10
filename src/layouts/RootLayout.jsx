import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto  ">
        <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
