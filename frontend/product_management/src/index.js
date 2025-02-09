import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import AddProduct from './components/AddProduct';
import GetProductByBarcode from './components/GetProductByBarcode';
import ShowProducts from './components/ShowProducts';
import UpdateProduct from './components/UpdateProduct';
import AddVendor from './components/AddVendor';
import ShowVendors from './components/ShowVendors';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<ShowProducts/>}/>
      <Route path='see/vendors' element={<ShowVendors/>}/>
      <Route path='add/vendor' element={<AddVendor/>}/>
      <Route path='add' element={<AddProduct/>}/>
      <Route path='get' element={<GetProductByBarcode/>}/>
      <Route path='update' element={<UpdateProduct/>} />

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
