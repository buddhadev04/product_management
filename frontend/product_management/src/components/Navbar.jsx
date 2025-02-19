import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ujjwal Dresses
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                All Vendors
              </Link>
            </li>
            <li className="nav-item"> 
              <Link 
                className={`nav-link ${location.pathname === "/add/vendor" ? "active" : ""}`}
                to="/add/vendor">
                  Add Vendor
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/see/product" ? "active" : ""}`}
                to="/see/products"
              >
                All Products
              </Link>
            </li> */}
            
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/add" ? "active" : ""}`}
                to="/add"
              >
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/get" ? "active" : ""}`}
                to="/get"
              >
                Get Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/update" ? "active" : ""}`}
                to="/update"
              >
                Update
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
