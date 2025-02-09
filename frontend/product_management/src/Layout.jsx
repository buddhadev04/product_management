import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container flex-fill">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
