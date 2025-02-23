import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout";
import SignIn from "./components/SignIn"; // Import SignIn component
// import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";
import GetProductByBarcode from "./components/GetProductByBarcode";
import ShowProducts from "./components/ShowProducts";
import UpdateProduct from "./components/UpdateProduct";
import AddVendor from "./components/AddVendor";
import ShowVendors from "./components/ShowVendors";

// Authentication check function
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute element={<ShowVendors />} />} />
        <Route path="/see/products" element={<ProtectedRoute element={<ShowProducts />} />} />
        <Route path="add/vendor" element={<ProtectedRoute element={<AddVendor />} />} />
        <Route path="add" element={<ProtectedRoute element={<AddProduct />} />} />
        <Route path="get" element={<ProtectedRoute element={<GetProductByBarcode />} />} />
        <Route path="update" element={<ProtectedRoute element={<UpdateProduct />} />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
