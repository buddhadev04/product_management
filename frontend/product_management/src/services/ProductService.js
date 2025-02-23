import axios from "axios";

const baseURL = "http://localhost:8000";


export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, userData);
    return response.data.message;
  } catch (err) {
    console.error("Error signing up:", err.response?.data || err.message);
    return "Error signing up.";
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/signin`, userData);
    return response.data;
  } catch (err) {
    console.error("Error signing in:", err.response?.data || err.message);
    return { error: "Error signing in" };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    return response.data.products;
  } catch (err) {
    console.error("Error fetching products:", err.message);
    return null;
  }
};

export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${baseURL}/product/${barcode}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching product by barcode:", err.message);
    return null;
  }
};

export const fetchVendors = async () => {
  try {
    const response = await axios.get(`${baseURL}/vendors`);
    console.log("Vendors fetched:", response.data);
    return response.data;
    
  } catch (err) {
    console.error("Error fetching vendors", err.message);
    return [];
  }
};

export const addVendor = async (newVendor) => {
  try {
    const response = await axios.post(`${baseURL}/add/vendor`, newVendor);
    return response.data.message;
  } catch (err){
    console.error("Error adding vendor", err.message);
    console.error("Error adding vendor:", err.response.data);
    return "Error creating vendor";
  }
};

export const updateVendor = async (vendorId, updatedVendor) => {
  try {
    const response = await axios.patch(
      `${baseURL}/update/vendor/${vendorId}`,
      updatedVendor
    );
    return response.data;
  } catch (err) {
    console.error("Error updating vendor:", err.message);
    return { error: "Error updating vendor" };
  }
};

export const deleteVendor = async (vendorId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/delete/vendor/${vendorId}`);
    return response.data.message;
  } catch (err) {
    console.error("Error deleting vendor:", err.message);
    return "Error deleting vendor";
  }
};

export const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${baseURL}/add/product`, newProduct);
    return response.data.message;
  } catch (err) {
    console.error("Error adding product:", err.response?.data || err.message);
    return "Error creating product.";
  }
};

export const updateProduct = async (barcode, updatedProduct) => {
  try {
    const response = await axios.patch(
      `${baseURL}/update/${barcode}`,
      updatedProduct
    );
    return response.data.message;
  } catch (err) {
    console.error("Error updating product by barcode:", err.message);
    return "Error updating product";
  }
};

export const deleteProduct = async (barcode) => {
  try {
    const response = await axios.delete(
      `${baseURL}/delete/${barcode}`);
    return response.data.message;
  } catch (err) {
    console.error("Error deleting product by barcode:", err.message);
    return "Error deleting product";
  }
};