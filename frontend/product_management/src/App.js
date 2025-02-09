import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ barcode: "", name: "", price: "", vendor: "" });
  const [message, setMessage] = useState("");

  // Base URL for your Express server
  const baseURL = "http://localhost:8000";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      console.log(response);
      setProducts(response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  // Fetch a product by barcode
  const fetchProductByBarcode = async () => {
    try {
      const response = await axios.post(`${baseURL}/product/${barcode}`);
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product by barcode:", err.message);
      setMessage("Product not found or error occurred.");
    }
  };

  // Add a new product
  const addProduct = async () => {
    try {
      const response = await axios.post(`${baseURL}/add/product`, newProduct);
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error adding product:", err.message);
      setMessage("Error creating product.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Tester</h1>

      {/* Fetch All Products */}
      <div>
        <h2>All Products</h2>
        <button onClick={fetchProducts}>Fetch Products</button>
        <ul>
          {products.map((product) => (
            <li key={product.barcode}>
              {product.name} - ${product.price} - Barcode: {product.barcode}
            </li>
          ))}
        </ul>
      </div>

      {/* Fetch Product by Barcode */}
      <div>
        <h2>Fetch Product by Barcode</h2>
        <input
          type="text"
          placeholder="Enter Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button onClick={fetchProductByBarcode}>Fetch Product</button>
        {product && (
          <div>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Vendor: {product.vendor}</p>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>

      {/* Add New Product */}
      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Barcode"
          value={newProduct.barcode}
          onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vendor"
          value={newProduct.vendor}
          onChange={(e) => setNewProduct({ ...newProduct, vendor: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default App;
